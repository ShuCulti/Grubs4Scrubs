# Collection Description: Student Meal Planner (Grubs4Scrubs)

## Introduction

The Student Meal Planner is a full-stack web application I'm building as my individual project for Semester 2. The idea came from something I see every day around me: students living on their own for the first time who have no real system for planning their meals. Most of us end up either ordering takeout we can't really afford, buying random groceries without a plan and watching half of it expire, or just eating the same three meals on repeat because it's all we know how to cook. It's not a complicated problem to understand, but it's one that really affects people's budgets, health, and energy levels on a daily basis.

The app lets users browse budget-friendly recipes filtered by things like prep time, cost, and dietary preferences, drag them into a weekly meal planner, and then automatically add to a grocery list based on what they've planned. The frontend is built in React 19 with Vite, and the backend runs on ASP.NET Core Web API with raw ADO.NET handling all database access (no ORM allowed for this project, so every query goes through parameterized SqlCommands). Auth is handled with JWT tokens attached to requests through an Axios interceptor. The goal is to cover all the Semester 2 learning outcomes (full-stack web development, software quality through testing, agile methodology, UX, security, and professional development) while also building something I'd genuinely want to use myself.

The main stakeholders are students (the end users), myself as the developer, and my S2 teachers who assess whether the learning outcomes have been met. The core challenge is scoping it realistically so the must-have features are solid before I start chasing extras, which is something I know from previous projects I need to be very intentional about.

## Project progress

### Sprint 1: Foundation (Weeks 1 to 5)

The first sprint was all about getting the skeleton of the project standing. I set up the React frontend and the ASP.NET Core backend, got them talking to each other, created the Git repository, and configured the initial CI pipeline with GitHub Actions. On the backend side I designed the database schema using dbdiagram.io and set up authentication with JWT tokens. On the frontend I created the register and login pages and started working on protected routing so unauthenticated users can't access the dashboard. I also made lo-fi wireframes for all the main screens to guide the rest of the development.

Evidence for this sprint includes the Project Plan, the S2 Individual Project Analysis document, and the high-fidelity wireframes, all of which show the foundation I built and the decisions behind it.

### Sprint 2: Core Features (Weeks 6 to 9)

During the second sprint I got the SQL Server database created and had the frontend, backend, and database working together end to end. In Sprint 1 I had a simple Axios base URL set up but only one basic fetch that returned nothing meaningful. Now that fetch pulls real data since the database exists and has content. On the frontend, I previously only had half of the home page done. Since then I added a Dashboard page, a Recipes page, and a Recipe View page (you can see these in the Frontend Implementation Showcase and the UI mockups in this portfolio). I also have some other HTTP methods I want to build out, but right now I'm focused on finishing the user login system. The models are done and the controller has some methods written. I just need to create the frontend pages for them.

### Sprint 3: Meal Planning and Grocery List (Weeks 10 to 13)

This sprint had a lot going on. The biggest addition was the Shopping List feature, built full-stack from scratch. On the backend I created the ShoppingItem model, repository, service, and controller (with all the matching interfaces) following the same layered architecture pattern I'd been using for recipes. On the frontend I built the ShoppingListPage with full CRUD: users can add items with a name, quantity, and price, check them off, edit them inline, and delete them. There's also an estimated total that updates live.

I also finished the auth system. The AuthController handles registration and login, with BCrypt hashing passwords before they hit the database and JWT tokens generated on successful login. The token includes claims for user ID, email, and username, and expires after 24 hours. On top of that I got recipe editing working (PUT endpoint wired up) and fixed the recipe creation form so it sends instructions, ingredients, and tips to the API, which I'd forgotten to include in the earlier version.

On the testing side I expanded the xUnit test suite and added more logic to the FakeRepository. The tests now cover create (valid, empty title, negative budget), GetById (existing and missing), delete (existing and missing), and update (existing and missing), all using the Arrange-Act-Assert pattern against the in-memory fake.

I also restructured the frontend into its own folder per my coach's feedback and cleaned up the .gitignore so my .md files and node modules stopped cluttering the git repo. These changes have been documented in Backend API Endpoints (G4S).pdf, Architecture Design - Student Meal Planner.pdf, and Entity Relationship Diagram (ERD).pdf.

### Sprint 4: Polish and Finalization (Weeks 14 to 18)

This sprint covered the JWT authentication flow, the Favourites feature, security hardening on the controllers, and the class diagrams.

I built the whole JWT auth flow end to end. The register endpoint hashes passwords with BCrypt before anything touches the database, and it checks for a duplicate email first. Login pulls the user by email, verifies the password against the stored hash with BCrypt.Verify, and if it checks out it generates a signed token and sends it back. The token packs the user's id, email and username into claims, signs them with HMAC-SHA256 using a symmetric key from config, and writes it out as the usual header.payload.signature string. On the React side I store the token and attach it to every request through an Axios interceptor, so the Authorization Bearer header goes out automatically; the backend validates it with the JWT middleware in Program.cs, matching the same issuer, audience and key I signed it with.

BCrypt stores its salt and cost factor inside the hash, so login verifies the password against the stored hash rather than decrypting it, since hashing is one-way. The user id in the token can be trusted because editing the payload breaks the signature. That is why the controller reads the user's identity from the token claims and never from the request body: the client can change the payload, but it can't forge a valid signature.

I built Favourites as a full slice across the three layers. The controller exposes GetById, Create and Delete, all behind [Authorize]. Create reads the userId from the token claims, checks the favourite doesn't already exist, then saves it. The service holds the duplicate-check logic. The repository runs the SQL with raw ADO.NET (parameterized SqlCommand, SqlDataReader, mapping rows into Favourite objects) and includes a GetByUserAndRecipe method used for the duplicate check and for unfavouriting later. On the frontend the add handler posts to the endpoint and re-fetches the list.

Hardening the controllers surfaced several issues that I fixed: an IDOR risk where a user could read or delete another user's favourite by guessing an id; a Create method that returned Created() without inserting the row; and a stray route attribute causing double routing. I changed the response for an existing favourite from 400 to 409 Conflict. I also corrected three CORS points I had wrong: CORS is enforced by the browser, not the server; the string in [Authorize] is a policy name, not an auth scheme; and access control comes from the token, not the request origin.

I restructured the backend. I removed the Domain layer and moved the models and repository interfaces into the Business layer, organised into folders. I also dropped the service interfaces. Their only use here would be swapping the implementation to unit-test the controllers, which I'm not doing, so the controllers now use the concrete service directly. This leaves a three-layer structure: API, Business, and DataAccess.

On the database side, the Favourites table has a unique constraint on the user-and-recipe pair, so the same user can't favourite the same recipe twice. I handle that in the data layer by catching the SQL unique-violation codes (2627 and 2601) in the FavouriteRepository, so a duplicate comes back as a clean conflict instead of a raw SQL exception, and the service also checks GetByUserAndRecipe before inserting, so there are two layers stopping duplicates. For timestamps, the models stamp CreatedAt with DateTime.UtcNow and the inserts set it (the seed data uses GETUTCDATE()). The database is still running locally on SQL Server; I haven't deployed it anywhere yet.

For design, I built the Favourite API class diagrams in draw.io across the Controller, Service and Data Access layers, showing how they connect through the interfaces. I corrected the UML arrow notation for implementing an interface, holding a reference to one, and a loose dependency. These build on the earlier ERD and conceptual model and the three-layer architecture.

Evidence for this sprint includes the Backend API Endpoints document, the Architecture Design document, the Favourite API class diagrams, and the updated ERD and conceptual model.

Next: finish the Meal Planner backend (the model and data access exist; the service, controller, and DI wiring remain), and fix the frontend token storage so protected requests stop returning 401.
