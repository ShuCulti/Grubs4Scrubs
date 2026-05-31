# Grubs4Scrubs — Project Context for AI Sessions

Read this file at the start of every new session to get up to speed on the project.

## What this project is

A full-stack web app for Dutch students to plan budget-friendly meals. Users browse recipes, drag them into a weekly meal planner, and generate a grocery list. Built as Boss's individual project for Fontys FHICT Semester 2.

## Tech stack

- **Frontend:** React 19 with Vite. Custom CSS (NOT Tailwind). Uses lucide-react for icons. React Router for navigation.
- **Backend:** ASP.NET Core Web API (.NET 10). Raw ADO.NET with parameterized SqlCommands for all database access. NO ORM. NO Entity Framework Core. This is a hard project requirement.
- **Database:** SQL Server. Tables: Users, Recipes, ShoppingItems.
- **Auth:** JWT tokens stored in memory (not localStorage). BCrypt.Net for password hashing. Tokens include claims for user ID (NameIdentifier), email, and username. 24-hour expiry.
- **HTTP client:** Axios with a global instance in `Frontend/src/services/recipeService.js` (baseURL: `http://localhost:5075/api`).
- **Testing:** xUnit test project with FakeRepository pattern (in-memory List<T> implementing the repository interfaces). 8 tests covering RecipeService CRUD.

## Architecture — Layered with Dependency Inversion

Four C# projects plus a test project:

```
Grubs4Scrubs.API        → Controllers (thin, delegate to services)
Grubs4Scrubs.Business   → Service interfaces + implementations (validation, business logic)
Grubs4Scrubs.DataAccess → Repository implementations (SQL Server via ADO.NET)
Grubs4Scrubs.Domain     → Models + Repository interfaces
Grubs4Scrubs.Tests      → xUnit tests + FakeRepository
```

**Why interfaces are where they are:**
- Repository interfaces (IRecipeRepository, IUserRepository, IShoppingItemRepository) live in **Domain** because both Business and DataAccess need them. This is the Dependency Inversion Principle — Business depends on Domain (not DataAccess), and DataAccess implements Domain's interfaces.
- Service interfaces (IRecipeService, IUserService, IShoppingItemService) live in **Business** alongside their implementations because only the API layer consumes them. No other layer needs to see service contracts.

**Dependency chain:** API → Business → Domain ← DataAccess. Business and DataAccess never reference each other.

## Backend file structure

```
Grubs4Scrubs.API/
  Controllers/
    RecipeController.cs
    UserController.cs
    ShoppingItemController.cs
    AuthController.cs
  Program.cs

Grubs4Scrubs.Business/
    IRecipeService.cs / RecipeService.cs
    IUserService.cs / UserService.cs
    IShoppingItemService.cs / ShoppingItemService.cs

Grubs4Scrubs.DataAccess/
    RecipeRepository.cs
    UserRepository.cs
    ShoppingItemRepository.cs
    DbSeeder.cs

Grubs4Scrubs.Domain/
    Recipe.cs
    User.cs (Id, Email, PasswordHash, UserName, GoogleId?, CreatedAt)
    ShoppingItem.cs (UserId, Id, Name, Quantity, Price, IsChecked)
    AuthDtos.cs (RegisterDto: UserName/Email/Password, LoginDto: Email/Password)
    IRecipeRepository.cs
    IUserRepository.cs
    IShoppingItemRepository.cs

Grubs4Scrubs.Tests/
    UnitTest1.cs (8 tests for RecipeService)
    FakeRepository.cs (in-memory IRecipeRepository)
```

## Frontend file structure

```
Frontend/src/
  main.jsx              — BrowserRouter, all routes, wrapped in AuthProvider
  services/
    recipeService.js    — Axios instance (baseURL http://localhost:5075/api)
    authService.js      — loginUser(Email, Password), registerUser(UserName, Email, Password)
  context/
    AuthContext.jsx      — createContext + AuthProvider with token/setToken in useState
  Pages/
    HomePage.jsx
    DashboardPage.jsx
    RecipesPage.jsx
    RecipeViewPage.jsx
    MealPlannerPage.jsx
    ShoppingListPage.jsx — Full CRUD with inline editing, checkbox toggle, estimated total
    LoginPage.jsx        — Wired up to authService.loginUser, stores token in AuthContext, redirects to /dashboard
    SignUpPage.jsx       — Wired up to authService.registerUser, redirects to /login on success
  Components/
    Navbar.jsx
    Footer.jsx
    Searchbar.jsx
```

## Auth system (current state)

**Backend (done):**
- AuthController with POST /Auth/register (checks duplicate email, BCrypt hash, creates User) and POST /Auth/login (GetByEmail, BCrypt.Verify, returns { token })
- JWT generated with SymmetricSecurityKey + HmacSha256, claims: NameIdentifier, Email, Name

**Frontend (done):**
- authService.js with loginUser and registerUser async functions
- AuthContext.jsx with AuthProvider wrapping the app, holds token in useState(null)
- LoginPage calls loginUser, stores token via setToken from useContext, navigates to /dashboard
- SignUpPage calls registerUser, navigates to /login on success

**Still needed:**
- ProtectedRoute component (check token in context, redirect to /login if null)
- Axios interceptor to attach Bearer token to every request
- Token expiry handling

## Known bugs fixed

- UserRepository.MapUser was missing the PasswordHash column, causing BCrypt.Verify to crash with "Invalid salt: salt cannot be null or empty". Fixed by adding `PasswordHash = reader.GetString(reader.GetOrdinal("PasswordHash"))` to the MapUser method.

## Semester structure

4 sprints (NOT 5):
- Sprint 1: Weeks 1–5 (Foundation: project setup, React + ASP.NET skeleton, Git, CI, wireframes, JWT auth backend)
- Sprint 2: Weeks 6–9 (Core Features: SQL Server database, frontend pages, real data fetching)
- Sprint 3: Weeks 10–13 (ShoppingList full-stack, auth system with BCrypt/JWT, recipe editing, unit tests, frontend restructuring)
- Sprint 4: Weeks 14–18 (Polish and finalization — in progress)

## Portfolio docs

Located in `Grubs4Scrubs.Docs/`. Includes collection descriptions, unit testing evidence, class diagrams (.drawio files for Recipe, User, ShoppingItem), and other LO evidence.

Boss has custom skills installed for generating portfolio docs:
- `ed-fhict` — Evidence Descriptions for Canvas
- `fhict-portfolio-docs` — Full portfolio documents across all 6 LOs
- `grubs4scrubs-research-doc` — Formal DOT framework research documents as .docx
- `humanized-writing` — Voice rules for all prose (no em dashes, contractions, varied rhythm, no AI buzzwords)

## How Boss works

- Boss is learning. He wants to be taught step by step, not have code written for him. Walk him through concepts, explain what each piece does, and let him write the code.
- One task at a time. Don't try to do everything in one go.
- Boss is sensitive to AI detection in writing. Always follow the humanized-writing skill rules for any prose.
- Boss gets frustrated when context is lost. Read this file first in every session.
