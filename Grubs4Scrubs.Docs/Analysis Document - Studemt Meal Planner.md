**Student Meal Planner**

Analysis Document

*An Analysis Document for the Grubs4Scrubs Project* 

 

 

Date: May 2026

Author: Yao Cheng Zhou

**Table of Contents**

[**Introduction	3**](#heading=)

[**Project Description	3**](#heading=)

[**Project Analysis	3**](#heading=)

[**Gap 1: Budget Awareness	3**](#heading=)

[**Gap 2: Student-Friendly Complexity	3**](#heading=)

[**Gap 3: Meal Planning Integration	4**](#heading=)

[**Gap 4: Nutritional Transparency	4**](#heading=)

[**Existing Solutions	4**](#heading=)

[**Stakeholder Analysis	4**](#heading=)

[**Functional Requirements	6**](#heading=)

[**User Management	6**](#heading=)

[**Recipe Management	6**](#heading=)

[**Meal Planning	6**](#heading=)

[**Grocery List	6**](#heading=)

[**Non-Functional Requirements	8**](#heading=)

[**Domain Model	9**](#heading=)

[**Implemented Entities	9**](#heading=)

[**Planned Entities	9**](#heading=)

[**Entity Relationships	9**](#heading=)

[**Entity Relationship Diagram	10**](#heading=)

[**Constraints	11**](#heading=)

[**Assumptions	11**](#heading=)

[**Conclusion	11**](#heading=)

# **Introduction**

This document covers the full analysis behind Grubs4Scrubs, a web app I'm building for my Semester 2 individual project at Fontys ICT. The whole idea is pretty straightforward: students need an easy way to find cheap, quick meals they can actually make in a dorm or small kitchen. I've been there, and most recipe apps don't really get what it's like cooking on a tight budget with barely any gear.

The purpose of this analysis is to break down the problem, figure out what already exists, define what the app needs to do, and map out the data model that supports everything. This document started as groundwork before building, but I've been updating it as development progresses to keep it honest about what's actually implemented versus what's still planned.

# **Project Description**

Grubs4Scrubs is a student meal planner web application. The frontend runs on React 19 with Vite and custom CSS (I originally used Tailwind but removed it in Sprint 3 to keep styling consistent across all pages). The backend is an ASP.NET Core Web API built on .NET 10 with a SQL Server database, using raw ADO.NET for all data access. Authentication runs on BCrypt for password hashing and JWT tokens for session management.

The target audience is pretty specific: college and university students who are living on their own for the first time, cooking with limited equipment, and watching every euro they spend on food. The app needs to feel fast and simple because nobody wants to fight with a complicated interface just to figure out what's for dinner.

# **Project Analysis**

I looked at the problem from a few different angles to figure out what gaps exist and where Grubs4Scrubs can actually add value.

## **Gap 1: Budget Awareness**

Most recipe platforms don't show you what a meal actually costs. They'll list ingredients but you're on your own figuring out the price. For students, that's a dealbreaker. If you've got 15 euros to last the week, you need to know upfront whether a recipe fits your budget. Grubs4Scrubs includes an estimated budget per recipe and filters by price range so you can plan around what you can actually afford.

## **Gap 2: Student-Friendly Complexity**

A lot of recipe apps assume you've got a full kitchen with every tool imaginable. Students typically have a single pan, a pot, maybe a microwave. The recipes on Grubs4Scrubs are specifically tagged by prep time and cook time, and they're written for people who don't have sous vide machines or stand mixers. Quick, simple, doable with basic gear.

## **Gap 3: Meal Planning Integration**

Finding a recipe is one thing, but planning a whole week of meals is another problem entirely. Most free apps either don't have meal planning at all or lock it behind a subscription. Grubs4Scrubs will let users drag recipes into a weekly planner and auto-generate a grocery list from the combined ingredients. No paywall, no premium tier.

## **Gap 4: Nutritional Transparency**

Students tend to either eat too much junk food or accidentally under-eat because they're busy. Each recipe in Grubs4Scrubs shows calories, protein, fats, and carbs right on the card. It's not a full diet tracker, but it gives you enough info to make reasonable choices without needing a separate app for nutrition.

# **Existing Solutions**

Before building anything, I looked at three popular apps that overlap with what Grubs4Scrubs is trying to do. Here's how they compare:

| Feature | AllRecipes | Mealime | Grubs4Scrubs |
| :---- | :---- | :---- | :---- |
| Budget per recipe | No | No | Yes |
| Student-focused recipes | No | Partially | Yes |
| Meal planning | No | Yes (paid) | Yes (free) |
| Grocery list generation | Yes (basic) | Yes | Yes |
| Nutritional info | Yes | Partial | Yes |
| Prep/Cook time filters | Yes | Yes | Yes |
| Free to use | Yes (with ads) | Freemium | Yes |

The main takeaway is that none of the existing options combine budget tracking, student-specific recipes, and free meal planning in one place. AllRecipes is massive but generic and ad-heavy. Mealime is slick but locks planning behind a paywall. Grubs4Scrubs fills the gap by keeping everything free, focused, and built around what students actually need.

# **Stakeholder Analysis**

I identified the key stakeholders and what each of them cares about:

| Stakeholder | Interest | Impact |
| :---- | :---- | :---- |
| Students (end users) | Finding cheap, easy meals. Planning their week without overthinking it. | Primary users. Their feedback shapes what features matter most. |
| Fontys ICT (school) | Seeing proper software engineering practices. Clean architecture, testing, documentation. | They grade the project. The technical decisions need to demonstrate learning outcomes. |
| Developer (me) | Building something real that works. Learning React, .NET, and SQL Server properly. | I make all the decisions and do all the work. My skill growth directly affects quality. |

# **Functional Requirements**

I broke the functional requirements down using MoSCoW prioritization. Here's what the app needs to do:

## **User Management**

| ID | Requirement | Priority | Status |
| :---- | :---- | :---- | :---- |
| FR-01 | Users can register with email and password | Must | Done |
| FR-02 | Users can log in and receive a JWT token | Must | Done (backend) |
| FR-03 | Users can log in via Google OAuth | Should | Planned |
| FR-04 | Users can view and edit their profile | Should | Planned |

## **Recipe Management**

| ID | Requirement | Priority | Status |
| :---- | :---- | :---- | :---- |
| FR-05 | Users can browse all available recipes | Must | Done |
| FR-06 | Users can view recipe details including nutritional info | Must | Done |
| FR-07 | Users can filter recipes by category, budget, and prep time | Must | Done (category filters working, budget/prep time planned) |
| FR-08 | Users can search recipes by keyword | Must | Done |
| FR-09 | Users can create and submit their own recipes | Should | Done |
| FR-10 | Users can edit and delete their own recipes | Should | Done |

## **Meal Planning**

| ID | Requirement | Priority | Status |
| :---- | :---- | :---- | :---- |
| FR-11 | Users can create a weekly meal plan | Should | Planned |
| FR-12 | Users can assign recipes to specific days and meal types | Should | Planned |
| FR-13 | Users can view their meal plan for the current week | Should | Planned |

## **Grocery List**

| ID | Requirement | Priority | Status |
| :---- | :---- | :---- | :---- |
| FR-14 | System generates a grocery list from the weekly meal plan | Could | Partial (manual shopping list with CRUD exists) |
| FR-15 | Users can check off items on the grocery list | Could | Done |

# **Non-Functional Requirements**

| ID | Requirement | Category |
| :---- | :---- | :---- |
| NFR-01 | Pages should load within 2 seconds on a standard connection | Performance |
| NFR-02 | The app should work on mobile and desktop browsers | Usability |
| NFR-03 | Passwords must be hashed using BCrypt before storage | Security |
| NFR-04 | The API should follow RESTful conventions | Maintainability |
| NFR-05 | The codebase should use layered architecture with clear separation of concerns | Maintainability |
| NFR-06 | Business logic should be covered by unit tests using xUnit with fake repositories | Quality |
| NFR-07 | User authentication should use JWT tokens with BCrypt password hashing | Security |

# **Domain Model**

The domain model describes the core entities in the system and how they relate to each other. Some of these are already implemented in code, while others are planned for upcoming sprints.

## **Implemented Entities**

User is the central entity. Every user has an email, a hashed password (BCrypt), a username, and optionally a Google ID for OAuth login. Registration and login are fully working on the backend through the AuthController, which issues JWT tokens on successful login. The frontend has LoginPage and SignUpPage components that talk to these endpoints.

Recipe holds all the info about a single meal: title, description, prep and cook times, servings, an estimated budget, a category, tags, tips, and nutritional data (calories, protein, fats, carbs as integers). Ingredients and instructions are stored as JSON strings inside the Recipe table because the school doesn't allow an ORM, so I'm keeping things manageable with raw ADO.NET queries. Each recipe can optionally belong to a user via UserId. Full CRUD is implemented on both frontend and backend. The RecipeViewPage has an edit modal for updating all fields and a delete button, plus an "Add to Shopping List" button that pushes ingredients directly to the ShoppingItem API.

ShoppingItem (originally planned as GroceryItem) is now a standalone entity with its own table, full backend CRUD (ShoppingItemController, ShoppingItemService, ShoppingItemRepository), and a working frontend page. Each item has a name, quantity (as a string), price, a checkbox for marking it off, and a UserId for future per-user filtering. The ShoppingListPage supports adding, editing, deleting, and checking off items. The current implementation is a manual shopping list (plus the recipe integration mentioned above) rather than auto-generated from meal plans, but the table and API are in place for that integration later.

## **Planned Entities**

MealPlan represents a weekly plan created by a user. It has a name, a start date, and an end date. The frontend already has a MealPlannerPage with hardcoded sample data, but the backend tables and API don't exist yet.

MealSlot ties a specific recipe to a day of the week and a meal type (breakfast, lunch, dinner) within a meal plan. Each MealPlan will contain multiple MealSlots.

Favorite is a simple join table that lets users bookmark recipes they want to come back to. It just links a UserId to a RecipeId with a timestamp.

## **Entity Relationships**

Here's how everything connects: a User can have zero or many Recipes (one-to-many). A User can also have zero or many ShoppingItems, MealPlans, and Favorites (all one-to-many). Each MealPlan contains one or many MealSlots (one-to-many), and each MealSlot references exactly one Recipe (many-to-one). A Favorite links back to exactly one Recipe (many-to-one). On the frontend, recipes can push their ingredients directly into ShoppingItems through the "Add to Shopping List" button, which creates one ShoppingItem per ingredient.

# **Entity Relationship Diagram**

The ERD below shows all entities with their attributes, data types, primary keys, and foreign keys. Blue entities (User, Recipe, ShoppingItem) are implemented in the codebase with full CRUD operations. The auth system (register, login, JWT) is also complete on the backend. Purple entities (MealPlan, MealSlot, Favorite) are planned for future sprints.

![Entity Relationship Diagram for Grubs4Scrubs showing implemented and planned entities][image1]  
The diagram uses color coding to distinguish between implemented and planned entities. Cardinality labels (1, 0..\*, 1..\*) show how many instances of one entity can relate to another. Note that Ingredients and Instructions are currently stored as JSON strings inside the Recipe table rather than as separate normalized tables.

# **Constraints**

There are a few constraints that shape how I can build this project:

* No ORM allowed. The school requires raw ADO.NET with parameterized SQL queries, which means I'm writing all the data access code by hand. It's more work, but it forces me to actually understand what's happening at the database level.

* Single developer. I'm the only person working on this, so I have to be realistic about scope. That's why the MoSCoW prioritization matters: Must-haves get done first, everything else is stretch.

* Time-boxed to one semester. The project runs alongside other coursework, so I can't spend unlimited time on it. Sprint planning and backlog management keep things on track.

* SQL Server as the database. This is a school requirement. I'm running it locally for development.

* The frontend must be a JavaScript framework. I chose React because it's the most widely used and has the best job market relevance.

# **Assumptions**

A few assumptions I'm working with:

* Users have a modern browser (Chrome, Firefox, Safari, Edge). I'm not supporting Internet Explorer.

* Users have basic internet access. The app isn't designed for offline use right now.

* Recipe nutritional data is estimated and provided by the recipe creator. It's not pulled from a certified nutrition database.

* The app will be hosted locally during development. Deployment to a cloud provider is a stretch goal.

# **Conclusion**

This analysis has held up well through actual development. The gaps I identified early on (budget awareness, student-friendly recipes, free meal planning, nutritional transparency) still drive the features I'm building. Most of the Must-have requirements are done: users can browse recipes, view full details with nutrition info, search and filter, create new recipes, and edit or delete existing ones. The auth system (register, login, JWT) is working on the backend. The shopping list is fully functional with its own CRUD API and frontend page, including the ability to push ingredients straight from a recipe.

What's left is mostly the Should-have and Could-have features: meal planning with the weekly drag-and-drop planner, Google OAuth, user profiles, and auto-generating grocery lists from meal plans. The domain model and ERD have proven accurate. ShoppingItem moved from planned to implemented without needing schema changes, which tells me the upfront design work was worth it. Unit tests cover the core RecipeService logic with a FakeRepository, and the layered architecture keeps things organized even as the codebase grows. The foundation is solid, and the remaining features are well-scoped for the time I have left.

[image1]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAmwAAAGpCAIAAAC/Ov3oAABOw0lEQVR4Xu29d3QVV77v+f58Mz2zZt59M/PmXb/b99275ra729jd7W7b7dBgu2nAdmMDJhpMsIkGDCY4gG0RRFYGoUCWQCAyJiOSEiAJECIIIZAEyihnCQHS/KQf7C7vraM6nFCqU/p+1nfttWvXrn0Opc3+qOCcqv/UCgAAAACH+E9yAwAAAADsAxIFAAAAHAQSBQAAABwEEgUAAAAcBBIFAAAAHAQSBQAAABwEEgUezHO/+oPc5FJo/M+mfCW3ugeX/FluZ+V0Po4DfyJpwGcd4Vn7A+BZQKLAXNTV19Oyu/enwyWlZb/8zR/l3T9HVxiUh48eUf2dDwa/+No7jY1NL/35XbmfbVwiAN03qa28N/CTzvvTOaEOdHI67GZLotpXedY/kTRg5yPw26usqqLy92/0btXrD4CnA4kCc0Frrt+aMKnltbffp8qZuERe0Kn824fDuNJ/6OjN26JFO9llwPBxXK+pqX3uqUSfaxfq1NnzeEyWUEFh8erQDSye07EJ3I3KpqYHYkBKQ0Nj2zgPH1KZeSc7Ne3ahZTLPI498FAMv9b19AwqJ06fq93LFa1EufLxqPH//uJrT45/aimxt/h+CVVq6+qofPTosZDohi1Rzc3N/+P5lydMnyM6c4WUVlhUTJUHD9r+mNdu3FTfVe/+Q7Vnks72t15LxOvSCHxIVs5degk6M0/enObtcc+Wlhbu36p5S1T/tx6vvfDK27EJ57mz9kfQ56PhpWXl/sHh4uU++eyLt/72EVUqKtvcTGOKlwOgy4FEgbmgVZIWUFEXZasNiUo9KWMmfUnifKN3f25hiRJbonZyB5LHv/z6jxRu1169cUUr0WFjJnFlxLgpfDilvKKS+wvo/VD7r//4F6m9VfMmWzWvRQrhztJLSxI9eSbuOc0fofWppSi+QaG0SU4S74r0I8YXjWJTjElKo6P4j//yW32opcN39Vz7mZSOFSOIQ+ISL9CZ4Q6tnUpUvB9WOKuXO2t/BL/9Uy/RU3TYGLlDbJLsuScAZgASBeZi8oyvtauwKImUy1dEi5AoXRpq+6h1NtDiFf6iha5Qf/ReJbqpEtVeBonK/kPHuM/YyTP4cspOtO9HvFaPVzuWKF1Yixb6o4k3IJCuRL9ftFwdn/7I6vvnDs+1K23+wmWiffTEL9V3JTpLx4oRxCGffzFLnJlWzdvTvgT1174llih5UYyp/gjOJaVoXx0SBaYFEgWm4052zkt/fve1t98PWb+lVbOIt7b/Wx9dGj6nkShdNf7PF169l5tPmzO/+fH5P7yVczdX9H/uqUS3795P16b/1uO1yO27eVdE1C46sLq6RruC014aQXslSgL4S58B0+fMp80Dh4//7vW//vXvQ56Mbh/PPb2uIhOouvpg8KdaWxC/+v2bok6VwaMmPBmoHWEpupTkysaI7f/621fotDx+/I9/zv3ksy/efm/QgOHjeFP7KnxdGBy+6V9/86flfmtaO1I7nWdxJrVvRozAh/iuDpX+j5nf3q9ffkv7Wwu/onhLJFHapD77fjrCY2p/BBcvp/37i681NzeLl2uFRIGJgUQBMCn8v7ByqznQas8B6FqfVLrMd7UzgwBgBiBRAAAAwEEgUQAAAMBBIFEAAADAQSBRAAAAwEEgUQAAAMBBIFEAAADAQSBRAAAAwEEgUQAAAMBBIFEAAADAQSBRAAAAwEEgUQAAAMBBIFEAAADAQSBRs/DcR7MQ+yOfPmA5TsWfbwbAQGjKybPQDiBRs6B6AukkNzLuyGcQWAh5eQPAEBzwKCRqFlRPWCD/POhrl4dHhkStjby2AWAU8lzUAxI1C0I8vDl79Q7VSZT4tEy10ZxR/eeS8OCQqLWRFzYAjEKei3pAomZBuIfrXE71iaxrbPq3wW3mqK5rGPjtapYo7W180Cx1MFvYeW9M8xm1fOtfZwd9EbSH6sl3q6jkdiov5FRQufpQsnDkmJVRXEm8Uya6cQmJdh+kde25X/1BarEHx44C3Rx5LuoBiZoF4R7e/MInUtS1HYREqXzQ/FDaa6oIib48Yem3G4+yRCUvkkQv5lZrJUqdvwr9CRLt5kjrmtDh7v2H/uP3b9TV1TU0NPzmjz25/aNhY3v3H0qVoaMn/u3DYatDN9TX14u9ADwT8lzUAxI1C8I9XBflfwz7Nik92z/6xJw10duOnxcSpc0xi9eLDqrDujxCe64NDw6JWhtpXRM6pIoIbx46GsOboRsiSKKij/YoAOxHnot6QKJmQZVQJ3nW/l0S1X8uCQ8OiVobaV3TSrSquvqj4WN/9F558fIVbv/X375yJzunvKJCSPS7BUtTLqVCosAB5LmoByRqFlQJIZ0EErU28sKmcCzmdHVNDTQJXI48F/WARM2C6gmkk0Ci1kZe2AAwCnku6gGJmoXS+oeInYFELY+8sAFgFPJc1AMSNQuqKhBbgUQtj7ywAWAU8lzUAxI1C6yHmPX/knljN1WKK8tL65uFNhL3f8iVo8G/UKXSVVng66fdXLYmmJJVVJaRW5SRV8wtVGYWlIgOXFkZEnrqwkV1QDsDiVoeeWEDwCjkuagHJGoWWA8k0dORL1LlTOTvtNpgiRaVF5pBosU1TZTFAYFCoiV1bb5niVIlOGKrkOiq0DBVoiIp6ZlSiz2BRC2PdlGjH7c6B7QdAHAh8lzUAxI1C7w0kETFMnFm6x9EnSSaX9zmG5NIlErvwKBjCecLqxpEO0t0efBaqnv5+FJsXYk6GUjU8mgXNSMlWlRcot1saGjUbjqJdvBB42Zo9gATIc9FPSBRs6AuE4itQKKWR7uo6Uq0z9AJ85YGlpZXHI6JPZeS+lq/Edyek5s/+LOvSFdV1TU/Ll/da8BYbWNNbS13mz5vaWVVddODBzPmLxs6frYYVtpLw5IFo/cf/f27H19Ku8F7tXXa1Xvw+JBNO3hz1Bff7th3ZMy0eXkFRbQpBhdvgIa9X1pGLe+NmHw7+x6Pw3t5BNAlyHNRD0jULKjLBGIrkKjl0S5quhLdf+QUG2hpQDiV/UdNpTI3v5D3imu+75cFqY3ES70GcqW4pDQx6bJoZ8TeCbO8mttN2dz+iqKDqNMuqtfV1fNmVk4ulT16DqCysPg+Dy69AbLs8TOJm7fv43HEXtCFyHNRD0jULNCvuoidgUQtj3ZR05UoAC5Enot6QKJmQVUFYiuQqOWRFzYAjEKei3pAomZBVYWU+cuCuLLr4HF1r5GJS0q6evPmoZMnK6urV64Nidi928vH90RsXFjk1otXr/Jebbs6gpOBRC2PvLABYBTyXNQDEjULqiqksER37D/KEs3NL2xq/7CD2tOAeAcGXUy7GrBufdCGjdcyMkiW0t4O210VSNTyyAsbAEYhz0U9IFGzoKpCipDo0sB13JKZdXfad0vUnpYPJGp5tIvatD8tVqPtAIALkeeiHpCoWVBVgdgKJGp5tIsaKbO+okmKtgMxfNJcqaVDpK+Bdo6tzt8u9pebbMAfze0EWx2OnIyTm4BRyHNRD0jULKiqQGwFErU82kVNV6Kv9RvhgEQDwiI1ezrAlkS9VgbLTTaw5UiB2mHI+FlU/rhijdQODEOei3pAomZB/RA/YiuQqOXRLmoOSFTIiSpcT791p7ikNCHpkujDXyflPnw/BBpH6iy1MyTRnHt5fKD4vqk4cGPU3rLySm0jQy/Hne/mFqRnZmXffTLCu4M+o0p5RSV/r5Qlevx0gjgQGIw8F/WARM2CqgrEViBRy6Nd1HQl2tz+z7kv9hp48cp13tRKdPp3S2pqa+vq67/6YcXwiXPEIWnXM7Sdb2ffo55qZ24fNeUbFmfz0yvRwuL7k+YsFBIVB4r7LdwvLRNv4/zFK2Ri7jzl68XjvpwvOsz8fvm9vAKS6KdTv9ux/+jUb71pV9+hE/lAYDzyXNTDKYnSWobYH/n0/ZxSRRXajPtqQVF14+/e+Vjd1WEGfd7B99NdlZhzyUnXM/aeOJVXXrsiOGTjzj1ePr6HzsStjdiakHqN92rb1RGczHOQqNXRLmr2SBQAVyHPRT0gUePS+bpfqqhCG5IolamZuen32p6O8mq/EUk3sqhCv8mKPkMmzOXKByOnskQ37znGHTLy2m4Br+3sZLwDg8iXfuHrA9ZvTL5xi2Qp7e2w3VXRPZnA05EXNgCMQp6LekCicv550NeujRi583W/VFGFNu1Xok18JUoqnfzN0iu3837/7scT5i6+W1LNfViiJy+kvdp3xMSvvUvbJfrJF/Nu3G3zbqlLJdq10T2ZwNORFzYAjEKei3pAoj+LqkCXhAfvfN0vVVSB2IruyQSejrywAWAU8lzUwzUS5bq2xUPDzntjmk/0uVtU+SJoD9WvFNRdyKmgTW2563ymcOSZjGKuJN4p48O52/zNxyFRd0T3ZAJPR17YADAKeS7q4XqJinaxGZ+W+esR8yRdmTNCoi9PWHriWgFJNL2kaeTSSEmiy3fFrT6ULCRKnf9t2HxVoqIDD975uq9+GxKxFd2TCTwdeWEDwCjkuaiH6yVKCdl35p3pK8UmSVRylWmjleg/P70SZSOSTUVJLSxR2nzv2xDqvGxnrJAoNXK38BOpkKg7onsygacjrWtHg38Rs+7/bWyouhIzvqwgqTj72JnNv5L6ND992KcBOP9CDx48kJuAOZDnoh6ukahlIq4dXRsevPN1X1WFNhNmeZVXVhXeL1F3Ub6cv0xtdF/qGhr4US1ePr41dXVqB3dH92QCT0da10iiXJJEM84vOhvxW+3eF3sNHDRuxqt9h5PblgWu6z9q6ruDPqN50qPngLWbtlOHMdPmRe05TJWX3h7U3P547fdHTKFK78Hj7+UVDBg9nepUofLzmT80t39zlA/kOmX4pLlzFqwqLa/gRnohesXX+o2g+hL/sB9XrOE3QPUpcxdR46gvvt2wbc+Py1eLVxH9+cujH4+byUMBsyHPRT0gUePS+bqvqkIb+mv/Sp9hVNl7OOb8xTT6e3gi9tyO/Ud5L0uUNgeNncEt85cFcTeKOpqTIYk2tT+qZfmaYHWvAdE9mcDTkdY1lihBEi3I3Cc2BXwfA3Lb/iOnLqXdoPrSgPDjZxI3b98n+pDVuEJ/m/zDIkQ7MWrKN1zhdu2B9Ddo2ITZVMnNLxQ3T2CJUiUrJ5fvNMSbpWXl3IH5flkQHcV10X/3wRPNz3LvQGAw8lzUAxI1Lp2v+6oqtKG/9lzZe+QklX2HTaLSZ+3mQeNmNtmQKHej5UAdzdOjezKBpyOta1qJlhUk1Vblqh7V5c0PRslNTzl4/IzcBLor8lzUwymJliofm0RsRXfdV1WhGxZqN4zuyQSejrywAWAU8lzUAxI1KLrrvqoKxFZ0TybwdOSFDQCjkOeiHq6RaOaN3VQWV5aX1jeLxsT9H3LlaPAvVKl0VRb4+ol6Quq1ZWuCKVlFZRm5RRl5bXf2oU0qMwva7pMnNlcEh+SW1aij2R/ddV89BLEV3ZMJPB15YQPAKOS5qIdrJHo68kUqz0T+TrvSsUSLygvNINHimibK4oBArUSphSVK9eCIrUKiq0LDVIlSuTx4LZUp6Znq+LrRXffVQ+zJR2NnajfF7XPdGjpvXNGeTCOjezKBpyMvbAAYhTwX9XCNREXObP2DqJNE84vbfGMSiZa23xj9WML5wqoGbty0ay9LlO3o5eNLsXUlKkrHorvuq4do03vIBK7cLih768MxVHmr/+js4kqSaH5FXV55He9liY6Y8m3c5fRX+42g+ruDx1/PKVQHdCZ0Mg+diV8VGg6JAjchrWu/9H5PVE5knH9j9Zif739mPpvR9lUWAFTkuaiHiyWK2Iruuq8eoo24dzzfgz7+8k1uJInmltWKbuJK9E99hlF5Kukqf8tFHdCZiN9I+DcM46N7MoGnI61r5E72qKgIaHofP5PIT7rmloKi+01Pb2VQUlqemHRZ9OSK+L6m6HbsdDxXAJDnoh6QqEHRXffVQ6S8/sGo1Zt338ovpWtQ2nzz75/eKargf87l56OVKhKl/G3opP0nz6mjeXR0TybwdKR1TXslmldRJHm0WfOka66nXrvJ9dleq8SDuIVEiVf6DJv+3RLu1vNDZ69rgZWQ56IeTklU/dgkYiu6676qCsRWdE8m8HTkhc1Rjp6K5xsSdcK7gz6Tm0A3Rp6LekCiBkV33VdVgdiK7skEno68sAFgFPJc1MONEp0wy6tHzwFx5y+qu7phdNd99RDEVnRPJvB05IUNAKOQ56Ie7pUoV/oMmTBvSUBJWfmhmFjaTLtxS+3s7tQ1NCwOCNy4IzpkS0RMXJyXj6+6l9ulXa6K7rqvHmLa8L1zKQt8/dS9BkT3ZAJPR17YADAKeS7qYYRE9x45mXLlOlWW+Ie/9PagxqYmtbMB8Q5su51sSVnZroOHjpw+zY2hEZEXr17lvdxuTomK+8h7+4dNnruIKq/2Hc43zs3OzafSPyzi/U+mtLX3G0GdN+/YP+qLb9VxXBKS6InYON/QMEgUuAl5YQPAKOS5qIcbJYpoo7vuq4dIKa+sSkxO1T6Y5XRCUtyFS1yn31RqauvOpaQ2tRv3ROw5uvpXB3FJ8BQX4G7kha17M2nOQrkJuA15LuoBiRoU3XVfPUSbk3HnX+s3giorVm8YPnGOaP9w9DSusESbnl6JhkfsEk90sV50TybwdKR1LWNl20M6O6Qs5cJN7ydfbiGSRw5otu9516vXb/vze5/Irc4REBYpNwFPQ56LejglUfVjk4it6K77qiocyxvvj6yuqVXbrRTdkwk8HWldExI9+/oLXHKFaKysvLfjHw8HLTpxRNQ74fzFK9pN/gceqqTfuqNtpLKw+H7z06eBEr5rN1O5JfqAtk/z09s19B81lTf7Dp2oveeDdihRD9m0g/dqB9fuzSsoan56awhgGPJc1MOMEr1TVKE2cqIOnlIbPSK66756CGIruicTeDrywuYGPp/5Az8fu7ldbJVV1a/0GSb2/u6dj4uKS/7SfzRvCs8tDQjv9dGYpYHreJOd12vAWN4UjZSVazYMnzSXW7RDifr+I6e4RTu4tLfvsEknziYmX77KHYAByHNRDzdKdNxXC+6V1twuKFN3dR6SKB1b2tHt1B2WaMy55KTrGXtPnMorr10RHLJx5x5qXBkStjZia0LqNd7L7V4+vofOxKkjOBnddV89BLEV3ZMJPB15YTM3ZxKS5CbgschzUQ+3SzQzv02i079fyTeiu5pVwHtp19R5y8O2/3QtuzD5RhY39mi/yytLlH+bo82wqAPiqLWR+7LvV6mvZU+8A4PIl37h6wPWb0y+cUvdy+0kUfVY56O77quHaMNn46W3B6m7umF0TybwdOSFDQCjkOeiHu6VKJXkyMKqBrqmXBa8ZeuBmKPxl/ghKq/2G7HAbx1VJsxd/On07/mQ4ZO/vZqVr70SfbHXwHcHj+ejcstq6Uq0oPLJM1g8K7TukwXlM6hBPUTK10uCqDx3te3BOF/+sIp/w+iS8EPl1m2PXrMl8tDZeP5yrbRXbXdhIFHLIy9sABiFPBf1cKNEEW101331ECkkUboSLalre+w5/Z7RhRItbb9wpzL7fkXUT4f3nzzDsgzeEknX+rxX2+7y6J5M4OnICxsARiHPRT0gUYNC6/6F7zq7GFUP6Tyvvz9SbewmgUQtj7SudfIVF4miE4dzd0XJrR0xYZbXvsMn5VbnuJp+S25ymj5DJ8hNwJ3Ic1EPpySqfvcAsRWWqHwGNaiqQGwFErU80rrmcolm3M6msqmpicrLV9N7fjhm+ryllVXVTZrvmI6ZNo+/ZNLc/gHaquqa0vKKwzGxtPneiMniQGqn+sTZC5qffsWFD6RDamprHzx4oB1ZjCk+0EuOnLc0kEam+uS5C/mBbimp18RRx08ncE9gDPJc1AMSNShCorYuRtVDEFuBRC2PtK7ZKdE7a/3lJhs8aFea+JJJ26f2eg38WQ8b3xNdGhB+/Ezi5u37tH02bNvDm/5hbd9Y5UY+JCsnVzuyGFO8NFUupd3gem5+oXi0uDjqxxVruAKMQZ6LerhRon8bMoHKnh+NUXdR3vz7p1Su27pb3eWOxCUlXb1589DJk5XV1SvXhkTsbntdn9DQsMitF69e5b3c7uXjeyI2Th3Byeiu++ohiK3onkzg6cgLm7l584NRcpPr4GtfYBjyXNTDCIlm38ujCv2SReVr/Ubw7ej8QiMCwiNZopt37OdDXuw1kCt5hcUNrr5PvXdg0MW0qwHr1gdt2HgtI0Pdy+0G3IC+w4tR9RBtxN38PTe7Dx+mMvX69YLi4pq6tjsUSlkVEqo2dhhI1PLICxsARiHPRT3cKNGDJ85WVtd8OHpa7LkUWjQrqqozs+5O+26JkOjtnHsk0YSky70Hj+dDXukzjCtTvl50+Wq6OqbnpkOJ1ra7hOtnzp2jOtulula+bx9LNPX6zVf7jcjMvtv09Ilys7xWDmu/le7EOQuWB63XHpJ8+Zo0iKuiPldO+5uHrefKcT23oKBNosofkEIDqo0dBhK1PPLCBoBRyHNRDzdKFNFGWvfZoyTRB+0/M//wdfuOHeOe/IyUkrIy7eHiSpR/zygsLuEnyhWXlMUntT3I5X7pP/pTo/ZYd0R6rhwLsvPnyt3OyeEKSXTHgZ+i9rX98wN1qKqp4fLY2bPqC3UYSNTyyAsbAEYhz0U9IFGDItb9R/V15/q/o/6LrnqInTkVf0FttHYgUcsjL2wAGIU8F/VwSqLqdw8QWxHr/tnXX9Cew6Kf9hQe2NXqhES7YSBRyyMvbAAYwqn48/Jc1KMrJareX7706e1zPSV5FbVqY4cR637cO3/ksyddjKqHILYCiXYHaDmTVzgA3IkDBm11q0QPxSZfyrgbse+4uoujlSjfLLfUbRJ17CkuPqHhVPqv20C7OryDHe1SGzuM7rqvHoLYiu7JBAAAY3CjRFmHVF7NyucKt2TklfAmSTT9XnFp+83oSaJpd550U4dySRx4igtLlEIS5bvFSvFf75REtRej6iHa8GNtjiVc4s1Bn89S+9jKrfzS0vYTuyIkUtqlPrrVzpEX+PqpjVKKa5rURpekw5MJAADG40aJUt78+6fTvl/JFVqvaTV/q/9o2ny17wiWKNX/NnTS/pPn+EqU29VxLBDddV89RBuWKJ3DpPbHxgnVrd26L+b8FaosXbO5tP2xcdzOp5E63y4oO554mVtmej35/UD8QkMDUk6cSxW/zdgv0fCoaKrQFTyVi/wD6JePnPuVvPdOUdm6HTshUQCA5XGvRG3l9fdH5lfWq+0Wjq11X1yMqodoI/65+8rtvN+/+/HEr715M+rgqdhLN6ji5RdOLnx38PjS9kvAyd8sza+oK6xqmDZ/xeAJc7jzyKnzqMwpqaIXFU+d+/KHVdwhNTOXjhIjmzm2TiYAABhM10i0G0Z33VcPMSZ7jsf3H/2l2m7m6J5MAAAwBqckqn73ALGVTtZ9vhhVVYHYSicnEwAAjMREEnX3fXYW+PqpjQ2NjYv8A9R2l6eTdZ8lqh6C2EonJxMAAIzEjRLt034DesqgsTNe7Tvc2z9s8txFTU/vMk/moLL34PE5ufn5RcX9R00liZ6OT3p7wDix14XJuJPFEhVPaLmXn+8TGsoS9fLxTUxJ4TvZcrs6gpPpfN13+Z/X2un8ZAIAgGG4UaJCDHzHef5EaNPTu7/uOnj8/MU0buQWkqjoQ3vVAZ0JS3T1xk3roqK4JSk1tan9Pq4s0dLycm27y9P5uq8r0dMJSZlZd31DNqu7jI/6XDmv9ufHmee5cgAAYAxulCjljQ9GhUfsYomuWL1hePvzRv7w7mAq/z5yKpV9h006fiYxt6CIr0T5qEU+IbzXStFd99VDtOnQstx4PeM234Y+624uN/IJp9PY4RPHXBLpuXLaG83z3g7bXRXdkwmsQdX+5xHEsMjzzz7cK1FERHfdVw/Rpu1KNPuuX8iWF3sNTE5te8ZZfUPDtO+WVNXUkCnFA9Hyi4onzlnAEm3SPJ/VYqGT6dd7j3wGgYWgFa3lQRGCGBx5ItoBJGpQnJRo5zlyMu6j0dOlxsamprr6tqeqWS98MqVb+QMroa5uCGJM5Lmoh1MSVb97gNiKWyXa3cInM9PHG9ejVkVd2hDEmMhzUQ+LS/Tq8kVqY5dEV6LqIYitQKKWR13aEMSYyHNRD6ckStBaZrbQwirqSd/PVTt0YeTTp0FVxbOGbzTvoQneIt8cv5NofyOBRy2JtK79MPE/P24qoFLbeGrfNxVFKeoiaCt7NozMv31CO0j2jf0t7YNzKb2E9HKUTb5/7WQvYo3Ic1EPZyVqQnhV5ZIuVuTdZkVVhTbi3rmdxJZE7bynvP1RnyvHz4+z57ly17LzqLxT2PZWT55PKX36pDn1VTqJdFkPj1oPaV0jY3G4ziVLtOp+auyhH28kb7qVup3avSb/QttHlC1PJUodqGX57Ofu3jwoBpdeQtvuP+95MSZLVPQvvhsbf2Sh6I9YI/Jc1MOyElXrJkdVhTba56320Dzohuvap7Vs3nMsI7ekpK5ZdGCJ8uNfXBXpuXLSw1Y7f64c5TZL9MJF3nRSosB6SOsaGevW5ShJjaf3f8cSJTuKnroSFQNSmXPjgLabeAltHyHRlqdXotKw2kMQC0Sei3pYXKK2WkyIqgpttBIdNulrfkQrRX1aC0l0wtzF8ak3RX9+MAs//kUd2chcvpWtNnIc/udcxiN+xMB+1KXN+UQEvvdM//yLdM/Ic1EP60hU/MttJ+tpJ7u6HFUVtrLzaOyFa7fV9u4TVaKt5v7hgmdFXdoQxJjIc1GP7iVRRrdDl6CqArGVDiXaatafLHAAdWlDEGMiz0U9rCPRs6+/kBXs1/osK6n9PQ1A/TYkYiu2JAosg7q0IYgxkeeiHtaRqOCZ1PhMnd2KqgqL5XZ2DlfWbWt7BsCqkNArN25wy8q1IYkpF9VDbKUTiZrnBwqcQV3adOPMB3zqytPVxq6Na99SypkAtRHpMPJc1KO7S5ShQxw4yrWoqtBmwiwvKsd+Of/suZTNO/aP+uLbHj0HDJ84xy9ky0/HzjQ9vRl9nyETKqtrxN3q/9J/dElZeduj6PqN4L1Xrmeogz9rTsTG+YaGkfkSklN4k280f/HqVbFX287hemNTU2Z2dur1Nn3mFhRSGbFrNw2lvkon6USirQ5NAGA21KXt5J45Ad//hire0/8r+TJ44R8WT/+nw9smRwa+Lxqp0lSTtWTG/y36R4cO5vZF0/4Lj0ObZ36aT5WNq96hsro0LejHHmysLf59uP122s5zJ5atW/EWH86vdefqbh7K99v/r6k2Szh7+ax/rq+8SX3oPdAmH0gVemPUkyoxu2ennQv3+ebfK4ou8iHUXnAnhkcQh4s+2rdE+XHS//K4qVAMSzkcNaUw6xRVqJ1b6KijO6ZTJf7IIm7hPy+/xIaVvUii4h1GBPQ7f2K56INIkeeiHpDoz3DmWCdRVaENS7SpXZYnYs/NWxIw5PNZtLn3cIxoP3fxCtf5QXLnUtqe6SYe6sKDXL2ZKY3sWLwDg2rr608lJPDT5ViQl6+13Rmf92rbObsPH6byzt27GXfuUCWvsHDZ6jW8a2nQ6sqqavVVbAUStTzq0paaENJcd1fcHoGUwBWKdM8Eys1LW7m/ODxk8StcWbvoj8J/ZfkXFk/7p5anl30sUR6ERti78VPe5NdiifK3YiiX4la3aG7XwH1oQHHgtQsb+IVS49fmpP/Eb4yPpRcqzD5NI2gPF320b4lCm+uWv6V9PyRRKi/ErLh/L45byJExe+aQFIVE+c/Lb5I7iHfY0ibdtk8pi3OCaCPPRT0g0Q5wfgQHUFWhjVai/HS5pMtX6Up075GT1Pinvw3jq8+/fvw5XYmKB8m91f/T4pIyIdH3hk8+djpBHdywrApxzdPOO5doaxf9BIELUZc2IUVxJUr1Y9HTw5b+WTRSpbHmDktI9Pea/IuHDbmLpv6fPM6K2f/jyPYvuE5GqbqfKl2JtrRbLe7wAn4JOpwr61f8hV/C55t/oyvRwB9e4M7LZv13OlwoShxIPgtb+jq/Eyr95v0qPSWCD/Gf/3x6yhYeQXs499G+JcqCKf87/RnFsBR6/5v9erMCN/n+lX4toApJlF+USvHnFW9SK9EtAX2pm/acINrIc1EPSNQmrhrHTlRVILaiK9FWw398wLWoS5vI0pn/7UFdjtreTbJ97UC18ZkSHTr48LbJajvCkeeiHpCoDq4drRNUVSC2Yo9EWw382QGXoy5tCGJM5LmoByRqF+4YU0L9NiRiK5Co5VGXNgQxJvJc1AMSfQbcN3LrU4m+6DP0l97vUZlXXXf/6f1v7UxGSYna6I4U1zRxZYGvn7Z92ZpgKjMLSgqrGtSjXBg7Jdrq5h8ZcB/q0tZhakqvqo3i/w61+WHif16z4Hdquz3h/9TsMPy/pOLjPM6HPzTUeTr8U7doPihUmnduyYz/p0XzwSJbPbXh/11G5LmoByT6zLhpfNaDkKikjdeCxlD5e78RVP5qedtN53+7qu1GuAtObNx6+fQ3h9d+su2H4HP7paPcFJLooTPxq0LDhUT5fvck0TMpqbYkmnwjU210LPZLtNVtPy/gVtSlzeebfz/703zSA39cKOVMwPa1A0O822RQXpjMH67hkEQf1GY/biqMCOjHX/xoaZcTf69DNIqPtmZf3+f95f+ljkMpyDrZ0v6/sHGHvLhF6hOzZ05TTRZJdMPKXpXFl7lxwZT/LffWEfFCYvxHjflXEkPp7VGlpf3jRdw/KvijxurbXKf3Kd7/zrAhoUteo8Z7GYe4z+OmAvGnFm9G9Gc1rl/ZM2D+r/kssUSpGx2o/VMIifJ74HfIEuXOd28ePBb95NR1t8hzUQ9I1EFc/iqsB9YnlSvORGm18eaaz6js4TOEyr7rpp/IvEKu3XMtcfPFE9RCEqUyrahAko2bwlei3oFBfOkpQptZRWUk0W0HDkYfOqoe6KpAopZHXdrEp21piSdnkERry65nXdtTWXxJ6ik+hlpX8Y/7FZCcGqpuUYUbpaOCfuyhjuM1+Rf8RcyY3bO5Re1DEo0KHkAS5UvS6tI0bqd3q311Gr+m7FpjzR0SFb+99JQticeW8N4fJ/2voidLtIXff3k6/QGlPvynbtG8GdE/dMmrVDkfs4Lb6XcOkqjoJv4UFO6pfQ/0Dum9af+ALP5uGHku6gGJOoULX0tVhZTnVwy8VlxYWNP4H8s/4k0qt1yMKW2X6Iit3xt2JdrleSaJtrr0xwSMQV3aumduXY5SGx1LJ/8ojWgjz0U9IFEX4OeKGx6pqkBs5Vkl2toVswI4g7q0IYgxkeeiHpCoK3HmpVVVILbigERbnfvpAINRlzYEMSbyXNQDEnU9jr0B9duQiK1AopZHXdpckg7/SbPDT/Mi3TbyXNQDEnUXz/o2VFV0mB37j6qN3S2OSbT12X8ooKtQl7YO0+FXNTps5xYnJfq4qSB82Zst7R//KclLvJG8+dblqMriS3zLe8qyr/57S/s3XsQ3VfZtGqOOg5g58lzUAxJ1L/a/GVUVUuYvC2pql+gb748Mi9j5+3c/TrlyXe1mQOoaGhYHBG7cER2yJSImru1RLdobzfNetd2FcViirc/yEwFdiHZR0969ff3KntzI93AXsrx/L44FyT1FO9X5Q7lCouKu9OJOuSTRppos8Sqcm5e2iseHaUfjt8GOFJv8lZWW9g/r8l3gVYmKe82v+vp/UoXelTi8pf07muJ1+Y/G7fzS9E7onefeOsIvrbW+dhDEJZHnoh6QqEHovitVFVKERP1CtnAL332+S+Id2PZmSsrKdh08dOT0aZZlaEQkPw2N9mrbXR5nJNpqx88CdDnSusZ3ZucneTXVZrU8vYf73ZsHxS0CNvq8K3pq2zncopWo+JomO6nqfiofK25hf2LXV8GLXlZv1H5w60TyFj/mjLJ4+j9dilvNshR3gRdu016J8l3yywuSVnu9RBIVd89vaZeoeF3+o7Vo7iOvSpTeGB+oHQRxSeS5qAckaiidvDdVFbbShe40SSBRy6MubZ1n4dT/Q210Mh3+26+TcclVo/3//ow4EHku6gGJdgEdvkNVFYitOCnRVhs/AmAe1KUNQYyJPBf1gES7DOl9ql/kQGzFeYm2KucfmAp1aUMQA1K1/3l5LuoBiXYx4t2qqkBsxSUSBSZHXeAQxN2RZ6EdQKKmgN6zqgptxn21gMpBn88SLZH7Y9Ru3SSukqgnThUAgKmARM0CuaETlZJEe340Vki0R88BLNGzKdeHTJjLjVzJyC35fPaij8bOzK+o44eruDzFNU2LAwLXbY9esyXy0Nl4/iqLtFdtd2FcJdFWj50tAACTAImaBWGIDlUqXYkKiZY+dSdXrmbl816SKFWu3M5Th3JJvAODqMy+XxH10+H9J8+wLIO3RCakXuO92naXBxIFAJgESNQsSJ7oUKUIx4USbfXYCQMAMAOQqFlQVVEKldqIayXa6rFzBgDQ5UCiZkH9NqQ29IdSG7ttXC5RAABwDEjULKiqUAOVctwhUQ+dNgCArgUSNQuqKqS8+fdPwyJ2NplJpQt8/dRGA+IOibZ67MwBAHQhkKhZUFWhTY+eA0Q97catpnaVTpqzcOyX86mefPna8IlzqJJ9L+/jz2a6+wEvdQ0N/KgWi0m01WMnDwCgq4BEzYKqCm36DJnAlZfeHtTY1MT1u3kF4qqUJEqbor9bb1JPBm1qf1TLmXPnaurq1A7uDiQKADAJkKhZUFVhf8zzD7zGxH0SbfXY+QMA6BIgUbOgqsKBdBObulWirR47hQAAxgOJmgX125AOx8/q3y51t0RbPXYWAQAMBhI1C6oqnIyFVQqJAgBMAiRqFlRVaDPuqwX3SmtuF5RpG+15kIs7VFpc0xRzLjnpeoaXj29hVYPawd0xQKKtHjuRAABGAomaBVUV2rBEM/PL/DdE813mM/JKSKLp94qp/mq/EUMmzOWbzt/Mva8e7lqVkkRL2+8yv9DPX91rQIyRaKvHziUAgGFAomZBVYU2/BQXStTBU6XtBqVyof96KlMzcyd/s1RItJMnt7hWpV0YwyTa6rHTCQBgDJCoWVBV4aZYQKWQKADAJECiZkFVhVvj0So1UqKtHjujAAAGAImaBfXbkAaEzpWfB3611GCJtnrspAIAuBtI1CyoqtDNoLEz1EbH4lkqhUQBACYBEjULqiq0OZ2QlJl11zdks7bRhRLl2KnSuoaGuKSkqzdvevn4WuzeuZ3gofMKAOBWIFGzoKpCG+1TXERYolF7D7/SZ5i61+HoqlTcgH6hn7+614B0iUQBAEAFEjULqiq0absSzb7rF7LlxV4Dk1OvcSNJtKKyqqiklK5Qdx88oR7lTHRV2oXpKol66NQCALgPSNQsqKowQ8yp0q6SaKsds8vLx1duAgBYF0jULKiqME/MptIulGirMsEy7mRRucjPP2LX7kePH6sS9QkNi9zddgKpnnIlrbS84satW1IfAICHAomaBfXbkGaLn2m+Wmoeia5aG0Llmo2byisrb2VlbY7eSRJNSE7+R+/W1iWBQVt27hKb5y9e8gkJ1ewHAHgwkKhZUFVhznSi0iWBq6kki+SW1VBl2ergq1m5gRs2Fdc2UaPa3+F0rURbPXaOAQBcDiRqFlRVaMP3zh0/Z1HvIROo0qPngLCoAyOmfKv2NCDFNU2HzsTTeV7g6yftyr5fQQZdt2PnsjVraZNLblfHcThdLtFWj51mAADXAomaBVUV2rBEdx2LI32Wtj8E7cDp83O9A9WeBkQ8xWXZmuBOLkzdFzNItNVjZxoAwIVYVqLhW7elpacnpqTkFhSs2bS5tf2/plrbPzzJLY8ePVI/A9KFqKrQhiW6JmLP0IlfU+X9kVNXb97Nj20xQwxWqUkkCgAAlpWoYFP0TipJnI8fP6YKldxCRO3bp+3Ztaiq8LgYplLzSBQXowB0c6wvUU9BVYWHxgCVmkeirR473wAALgESNQvqtyE9On7u/GqpqSTa6rFTDgDgPJCoWVBV4UyKS8rURhdmga+f2tjQ2LjIP0BqdIdNIVEAgEmARM2Cqgpt+gyZwJVBY2e82ne4t39YTm7+5LmLuJ1vT9978HhqzC8q7j9qKkn0dHzS2wPGib0uTMadLJboidg4bqlvaKitr2eJevn4Jqak1LY/3eVefr5PaGiTq1VqNom2euysAwA4CSRqFlRVaCNEyE9uoU3KoZhYbt918Pj5i2ncyE90IYnyJu9VB3QmLNHVGzeti4riFjIolQXFxSzR0vJybk9KTdUe6CqVmlCirR478QAAzgCJmgVVFVLe+GBUeMQuluiK1RuOn0lct3X3iElzafPvI6dS2XfYJGrMLSjiK1E+apFPCO81T5xXqTklCgDohkCiZkFVhbXjjEpNK1EPnXsAAIeBRM2CqoruEMdUalqJtnrs9AMAOAYkahbUb0N2n/g941dLzSzRVo+dgQAAB4BEzYKqiu4W+1UKiQIATAIkaiJIDAj9+NTGDiOfPjPhuZMQAPBMQKLAjFjgh2iBPwIAQBdIFJga/DQBAGYGEgUegIf+TD30bQMA7AcSBR1wa8VCuckEeOJP1hPfMwDAfiBR0AHmlCiDny8AwDxAoqADzr7+gtxkMuin7Ck/aE95nwAAB4BEgWfjET9uj3iTAAAHgESBFTD/D9387xAA4ACQKLAOZv7Rm/m9AQAcBhIFVsO0E8C0bwwA4DCQKLAm5pwG5nxXAACHgUSBlcFkAAC4FUgUWB9TTQlTvRkAgJNAoqC7YJ6JYZ53AgBwEkgUdC9MMj1M8jYAAE4CiYLuiF9X3/Coa18dAOAqIFEAugZMVAAsACQKujtdOGG68KUBAC4BEgXgCZg5AIBnBRIF4Gdg/gAA7AcSBaBjDJtIhr0QAMDlQKIAdIYx08mYVwEAuBxIFAB9MKkAAB0CiQJgL26dWm4dHADgJiBRAJ4N900w940MAHATkCgAjuCOaeaOMQEAbgUSBcBxXD7ZXD4gAMCtQKIAOItrp5xrRwMAuBVIFADX4MKJ58KhAABuBRIFwJW4ZPq5ZBAAgAFAogC4BSfnoZOHAwCMARIFwF04ORWdPBwAYACQKADuxc/RB4A7dhQAwEggUQAMwoGZ6cAhAAAjgUQBMJRnnZ8b314kNwEATAMkCkAXYO8sbWlJGTnA3s4AAMOBRAHoSjBdAfBoIFEAuh510t74YXbBnh1iU+0AADADkCgAZkE7dR/V1ebv2iY2U0bhH3UBMCPWkWjcO3/kCtYa4NHwBK5KTclY+kOHuwAA5sEiEm3IvUvl5fGftLYvNEU/7Sk8sEvuBIDn0KEvO2wEAHQhFpFoy8OHVPJv7lhogGVQJ7PaAgDoQiwiUS1YZYDFkKY0ZjgA5gESBcAzwMQGwIRAogB4En7td+LFJAfAJECiAOgw7U+LEfsjnz4ALA0kCoAOqieQTnIj4458BgGwLpAoADqonrB2xL8YP1PE4ZAo6FZAogDooGrGwlHtaH94BEgUdCsgUQB0EILR1u2MA4d0bViHAX33rh10kOtngtMC++1rrH5A9c3jTlQX13P7lvExVFL7ha03IVHQbYFEAdBBCIY3r8ff5s3c9EIqs67kNtU/+P79wNjo5LXTo6K8D2UkZ899e6U4hMrHj1tE3eRhHbY8buEKJX799YaqJpJlbUkDSXT9yKNBH+zXSlT05BEgUdCtgEQB0EEIRtSpMv1V74baJq4TLNHgpxKVDmGJekSEEfnvUfCAn9rqf3siS5bolQNZ4m8Ztd9OKIBEQbfFKYmqfwORTiKfPs8hJi5+7ZaI/KIi3iy8f983NMzLx7ehsfHRo0fNzQ8fNDdTe1p6uti7OXqndgSPRv1RWjhaiT5reARIFHQrIFHj4tGLS15hIVmT6xu271gSGMSb3oGB3Pjw4cOwyK3kUbE37sIFcbhHo/4okU7i0fMcgGcFErU36u/d9odHwOLioaiTAekkmOegW+EaiVI9fvdFrqh/qTjlhVUXDqat/HT9wwePeFPtY+awDh8/+scHLvjji+L/iu5nVnI7n5y2/yuKx/8VWYH6iibEzmCeg+6GyyRKVJfVciOV3/Xxy0zJofqM15dyo5Bo6sl03uRjG+uefDrj63dXacc0W1iH/n3+8dH/ityanKRikuXJgMv8gQsh0ZbHLfjUomVQVYHYCuY56G64TKJkzYbaJm4Uux40Ngs1ConyLtr8/v3AyzHpN89niUO0Y5otwojaRH8VS7Lc8OkxligtIn7a789F4vtzVkAY4l7aTiqr75fUVzSKxgt7+3PlaPAvVKl0VRb4+ol6ckra8tXBlIJ7JXfvFNzLKqRG2qQyN6eI+/DmyuCQ0sJKdTT7g3kOuhsuk6i2smn+3uYHD30/2xQ+Z2d16ZPLU1WiVD5qfsTfB+A+2jHNFtWg9odHwOLioQhDnI3o0V6+pNUGS7SqMN8MEq0uracs9g/USpRaWKJUD90cKSTqExKmSpTKFWvWUnk1LUMdXzeY56C74RqJdpOodrQzfDgWFw9FVUVs5O9FnSRalnuz3hxXouRLKr0Dgk6dPVd5v5YbI6L3sETZjl4+vhRbV6KidCyY56C7AYkaFywuHoqqCsRWMM9BdwMSNS5YXDwUVRWIrWCeg+6GUxJV/wohtoLFxXNprkLsDeY56G4YIVEz/F9Rh9m8fZfa2HlqyxrURnuCxcVzUVWB2ArmOehuuFKi8VF/1m6a6qP/1aX1sfFJV1LTvXx8xQcuCu7dF59a3HXgsPjUIpmyww9ccCN3e9ZgcfFctJJ4yWfYwA2ztS2vB46h8mW/EapRKD8eDKWyoLBC3eXWLPD1UxsNCOY56G64UqIZCcu1m+b81OJCP3/RqJXo7gNHhESj9x3sUKJcQqLdDa0kSKL5BeXaFiHRW3fza8sfUD07t6hf2LS+oVOb2yU6cbv3B+FfSrJxUxrKH1IWB7R9xUXda0Awz0F3w5USlfLk+3NFpvj+XIdx4J9z68r/8S37ZwoWF89FKwmSaPPPryw/iZhP5S+936OyqbIlIyeP24VEi4oqY69f0Q7ivpBBqaRfFs/GJtWVNqsd3B3Mc9DdcKNEEW2wuHguqioQW8E8B90NSNSgYHHxXFRVILaCeQ66G05JVP0rhNgKFhfPRf2VCLEVzHPQ3XCNRH/p/d5LPsOqy5qaKltUf3QSwz61yP9X1IxPLYJnR1WFk6G/L2qjNYJ5DrobrpSopA3tR/+fXz6Ayj8Hjs7Ju983dOrelLM/Hgwds9VrY/xB6Sg3hSQacyrRNyQcEgXPilYSL/kMXXF8s7blk4h55SXVV+5kqkaRQj254j6JdvhVLiODeQ66G66RaHP7pxYDT+7Qtvxl9edUvrhqCJXvh09PTL9GawdFfGqxue3LAMXaQ9wX8anF5auD1b0GBIuL56KVBEm015rx2hZSI0sxJ6+wtrzxTm4et/993QzvI+upkpVbQOVvV35MPW/m3K13s0Trla9yGRnMc9DdcJlEO8zzKwbezSupL3/4q+Uf0eabQeOOpJ4XEv008gfDrkS7PFhcPBdVFdrw9eVrAaNHb/3hQsZ1ql/NunP4cgJJlH6DXH16B7XcyM4et20B98wrKHGfRLs8mOegu+FeiSIiWFw8F1UVdmb7heNqo7WDeQ66G5CoQcHi4rmoqkBsBfMcdDeckqj6VwixFSwunov6KxFiK5jnoLsBiRoULC6ei6oKZ1KSW602ujBd9flzDuY56G64UaLjZ3hFRR8ZPG4W1V/sNbCuvHHg6Bmv9BkWvml3bXnj4pWhk2YtVI9yU46fjPUJCVsZHBKfkEybx07GUllVUpuckib2cruXj696uPORFpdbKxZqTiQwNaoqtDl7+vLtGwV+QZHqLsruPaekFpJoU2XLyInfdrjXyfiFriOJ0jyPjN4bGb2PJnPYlm03r2VTZZF/AJW+IeHeAUHUk9vVEZwMJAq6G+6V6LnEKyxRcufISd+QRHnX4lVhPXoOoKhHuS+0dlSV1J08nbB6w6Z1kVHcePHiNbGX290nUb/ee8Spg0Q9CFUV2tA05sqgMTOpLMgu195yhDSZd6eMKq/1+4R7kkT/Omh8aV4N71UHdDIk0aB1G6+n3dE2NlU8ZomWFbS9rvsCiYLuhnslSiWb8g/vDh42fo5Wosv81lOLepRVIxYXVikk6kGoqtCGrkTvpBf6r97KEp0y2zs15fbdzPv8EJVlvhuppEvV6V8vGzXp25yMYvHPuelpd3mvlQKJgu6GGyWKaCMtLtqrUmByVFUgtgKJgu4GJGpQOlxcoFKPQFUFYisdznMALIxTElX/CiG20sniApWaHPVXIsRWOpnnAFiSbiRRk3/0Hyo1LaoqEFvRnecAWAw3SlR8apErL/Ya+KCyZdCYma/2GS52UaiRNteG7Zw134cqVcWNf+73iTqak8lMv8cSjTmVwC25Wfd9QsLUnm6KPYsLPGpO6GeH2B/deQ6AlXCjRCmVhfXn4q/x5/hf6TN81KRv+ROM2k/2Z97IHzx2lta4lJMnktXRnAlLdM2Gzeu3PnnUTHLSNbWb+2L/4gKVmhD62SH2Rz59AFgX90oUEbFfogLYFAAATA4kalAckCgDlQIAgGlxSqLqxwoQW3FYoq3wKAAAmBVI1KA4I1EGKgUAALPhRomOn+HVo+eAM2dStI18F8CXew+5mJwuGvn+uu7OAl8/tdGwOC9R5plUutDXT24CAADgOtwrUa70/nj8mrDtVMnPKRE3nY89e4nK2rKGvftPsUQnzlywzHe9Oo6rQhI9fjJO3F+eKm6613yHcZVEGVWlN2+3DZ6eeZvKpgcPHj586B0QyBJdoFHpo8ePD588JTYBAAA4gxES3b0vprK49lb6vfqnV6KU7xYF5mXfLy2oHDZ+ztDPZ1NL4b1SdRBXxTc0nFyyc9+hw8dP17cbdF1klHdAkNrTTXGtRBlJpYv8A6hcEhjEm1SJT0oioa7euEn0Ibku8PEVmwAAAJzBjRJFtHGHRBn1qhQAAIAxQKIGxX0SbYVHAQCgi3BKouq3IRFbcatEGagUAAAMBhI1KAZIlIFKAQDAMNwr0Tc/+DR8wx61vfnnt8/llORWU7l37+kO9zqfDp/i0lTxWG10RwyTKAOVAgCAAbhRouKe8oPGzCRXTfpq0Qq/Tc1PvcWazLlVPHjsrE+nzMvOKCKJTpu7NCR8l9jr2pBET55K9PLx5U3+igu9mUX+AVQpzW9TuGhXD3cyBkuUcVClLS2FB3bJjQAAABTcKNE+gydyhZ/cUppXQ2XR3crKoobmdk3m3i7hDqxbkmjGtVxucblE/ULXkUR37T9y9Hhsc7sp12/d4R0QtDRoDUu0rKDt7VG4XR3ByXSJRBkHVQoAAEAPN0oU0aYLJQoAAMBNQKIGxQwSxSUpAAC4Fqckqn4bErEVM0iU6USlKaMGtLa0yK0AAABsAIkaFPNIVNCJTQEAANiDUxIlMZgw5Aa10Qwxm0QZqBQAABzGKYkSJAazhaygNpok8ukDAADgyTgrUROCSyvHwHkDAIBnBRIFPwNnDwAA7Mc6Ej37+gtcgQacB+cQAADswToSzfTx5goE4CpwJgEAoHMgUbOgfpoX6STy6QMAgK7AOhIVQKLdIfioMwDADECiZkH1hIVDPyOHwyNAogAAMwCJmgUhGKrH777IFVU/nPLCKtr71RvLcq7m86Z2bycHmiSsw8ePWoQa1w46SGVj9QMqN487cT+zktvpz0KbVN6OL4BEAQBmAxI1C0IwvFldVsuNVH7Xxy8zJYfqM15fyo0s0UfNj77t7cubJyPO+X62SRyiestUYR3699nL7qRU5NbkJBWTRE8GXCZrrh95VEiUyi3jY3gTEgUAmApI1CwIwbS2W7Ohtokbxa4Hjc1fv7uKN/nSc820bWJT21k7mjkjjKhN9FexJNENnx5jidZXNAl9Unkh8iYkCgAwG5CoWRCCEXWubJq/t/nBQ7rKDJ+zs7r0yeUpWTP3ZtHjxy2rRm/gTSofNDSf2JxIlaRDadoBTRjVoPaHR4BEAQBmABI1C6ppLBxVjfaHR4BEAQBmABI1C6ppkE4CiQIAzAAkahZUTyCdBBIFAJgBSNQsqM/xRmwFEgUAmARI1CywHk6u/5ezES9xPfXYJNUfR4N/oTYanOrSeq4s8PXTti9fHUxZGRxCdS8fXwptUj03p0hsciXmdII6rP2BRAEAJgESNQusB5LovbSdVEmPXaDVxoW9/ak8Ef7fTCLR4ydjfULChETryhvrn0qUKqGbI8mUtJc2E89dIolyN97LSU5OozLtSoY6vm4gUQCASYBEzQLrgSQqVFFZmCvqJNHCjFP1ZroS9Q4I0kqx/qlEC++V5NzJv5dVyC0F90o6lKgzgUQBACYBEjULqiq0MdWVaJcHEgUAmARI1CyoqkBsBRIFAJgESNQsqKpAbAUSBQCYBEjULDRXIfYGEgUAmARI1CywHl7yGfZL7/eorC5raqpsUf2hZuu5Yx3WpdwvrlYbHUtD+UOuLPD1U/caEEgUAGASIFGzwHoQEpW0MTLi+5RbGT1WDab6DwdDx2z1orwRNLa5XZy0lypHUs9TnQ73j4mizaGbvzl99RLv+s3KQa6VaMypRN+QcEgUANDNsaxE/cPXLfT1yy0oWLNpM236hIRSGb51W2Z2dmJKCtWXBAZR6eXjy427Dx+mQ342kLGwHlifVAae3KHVBrnwi+jlD6rark1Jk5QDF+OobH4q0edXDOR6v7Bp3M49aVfCjavNbrgS5a+4qHsNCCQKADAJlpUoQRLdFL1TtD98+FDUSa6PHz8Wm0RVdU3g+g3aFoNRVaENX1ByFh1e33/dzLVndn+4/qtmzZUo11/2G+F1MIw3WaLNrr4S7fJAogAAk2BliW7ds/fne0yNqgrEViBRAIBJsLJEPQtVFYitQKIAAJMAiZoF9duQiK1AogAAkwCJmgXWw0s+Q9s/nTu0vKS6tv2u7p1nS8JBtZFD46iNLomtp7gYFkgUAGASIFGzwHoQEpW08UnEPCp3JsXM/2nNp5HfU/2FVYPr2yXqfWR939CpVH8tYPTte3nc8zcrBrlVotJTXAwOJAoAMAmQqFlgPbA+ubyXXyy0wWrclPBTQWEpVe7k5nE7SXTJ0Q3aFup5M+duvfuvRL0Dgk6dPVd5v1bt4O5AogAAkwCJmgVVFXZm+4XjaqO1A4kCAEwCJGoWVFUgtgKJAgBMAiRqFtQvciC2AokCAEwCJGoWVFUgtgKJAgBMAiRqFlRVaDNh5sKXew+5cvF2B7tmLBg8bhZV5i0M6jd0MlXizl6pLXmg9nR5cAN6AEA3BxI1C6oqtCGJUpkY13Yr+aaKxwcOxCafv7nCb1PGtVzuEL3zhNfSkK9/9LucnPlav0+GfT6HGnNuFQ8eO2v6N8srC+tpsyinko5VB3/WNJQ/pCwOCIREAQDdHEjULKiq0IYlOn/R6qK7lZVFDcPHfz3mi/k+gREPnj5z9F5mCUmUKq/0GU4XrFNmLc69XcK7XurV9oAXyuz5PurIDkQ8xeVsbFJdabPawd2BRAEAJgESNQuqKjpPl9jLJIFEAQAmARI1C6oqEFuBRAEAJgESNQvqtyERW4FEAQAmARI1C6oqEFuBRAEAJgESNQuqKrQZP8OLyqupmequqOgjPXoOoLz09iB1ryUDiQIATIJFJNry8CGVGUt/aG2XaOGB3YX7d8qdzI2qCm1Iot8s8J8yezHVJ85csMx3PVUuX8yob5colfMWBb7WbwR3jo+7zPXbN3M/HjtTHc3JVJfWL/YP3Lgteu2miOMn47x8fCnSXrXdhYFEAQAmwSISbci9S+Xl8Z+0WvdKNDHhCtcL77U9yIWuO+vaHzgqJErlyEnfcJ+/fzI161a+Oo6r4h0QRGVRbunOfYcOHz/NsgzZHJmcksZ7te0uDyQKADAJFpEoEff2y1RenTlxR88v5H2egKoKB7L/wGm10XqBRAEAJsE6EhVY8koU0QYSBQCYBEjULKiqQGwFEgUAmARI1CyoqkBsBRIFAJgESNQskBgQ+wOJAgDMACRqIkgMiP2RTx8AABgOJAoAAAA4CCQKAAAAOAgkCgAAADgIJAoAAAA4iFMSVT8ziXQS+fQBAADwcCBR44IPlAIAgMWARJ8hfr33OBY+HBIFAACL4TKJVt6vrimvU8VjZ3g0aUxTRVWj/eERIFEAALAYrpGoVM9IzqZKztX8ktxyqqz/eteDhmaqbJq/t6n+wcw3lnIfPkqUuemFVBZmlYhuty/d3bni6Ppvdj9qfiTG76oII26beporJVlVBxddaKx+ENB37+ZxJ46tSOH2LeNjqKR2SBQAAKyNKyV6YM2plZ+u53r4nJ3kvx/7B53bnyp6SseGz472H7+Z61LJkER5c9mI8D2+x8XLdUmki0u/p58BJlnePJVLEl0/8mjcumuQKAAAdB9cI1EyZeSCn84fSBUSpTTUNGZdyeXrzjm9Vk5r1+Gsvyy/k5or+lBlXl9/rmhL7iYkuvwTM0rU/vAIkCgAAFgM10jU4bhkEGOiqtH+8AiQKAAAWIwulmi3CiQKAAAWAxI1LpAoAABYDKckqj4tGbEVSBQAAKyHERI9GvwLtdEM2bx9l9rYeWrLGtRGewKJAgCA9XClROOj/qzdvLC3P1fMINHq0vrY+KQrqelePr6V92u5seDe/eWrgylU33Xg8L2sQqrQJpkyN6eI+/DelcEhVHIjd3vWQKIAAGA9XCnRjITl2k2SaFnuzXrTSJRK74CghX7+olEr0d0HjgiJRu872KFEuYREAQAAMK6UqBS+Eq0qyjeDRDuMA/+cW1feqDbaE0gUAACshxslimgDiQIAgPWARA0KJAoAANbDKYk2VyH2BhIFAADr0TUS3XruWId1Kb/0fk9t9NBAogAAYD1cJtGXfIb5nNiqbRkZ8T2V3+1foxqFxEl7K0rqi4oqVYnygc0ulWhD+cP4hIvX0m57+fjWlTarHdwdSBQAAKyHKyX6dvAEbQu58IWVg09evUj1/IKypsoWbp8SvUxItLDwiUTXxe7nvSRO2nXnXiHXtQM6E5IolfwVF3WvAYFEAQDAerhMomrEBSVl7Favi5m3snOL68qb+6+byRLlXVSPu57258DRvMkSpUpxUZULJdrlgUQBAMB6uFGiiDaQKAAAWA9I1KBAogAAYD2ckqj6bUjEViBRAACwHpCoQYFEAQDAerhRouNneEVFHxk8bhbVX+w1sK68ceDoGa/0GRa+aXdteePilaGTZi1Uj3JTjp+M9QkJWxkcEp+QTJvHTsZSWVVSm5ySJvZyu5ePr3q484FEAQDAerhXoucSr7BEyZ0jJ31DEuVdi1eF9eg5gKIe5b54BwRVldSdPJ2wesOmdZFR3Hjx4jWxl9shUQAAAHbiXolSyab8w7uDh42fo5XoMr/11KIeZdVAogAAYD3cKFFEG0gUAACsByRqUCBRAACwHk5JVP02JGIrkCgAAFiPrpfo8PFfq43WCyQKAADWw40S7TN4IpX795/lzR49B0yZtZgbx039IfZM6qz5PtRIEuWS2u+kt9133h2JOZXoGxK+Kjg0MfFy+2YClfVlzZcvpou93O7l46se7nwgUQAAsB5ulCipkcqmisdi8/DhRG4Ue5vbr0SHfDabKi/3HtLrw7HqOK6Kd0BQfdnD02curNmwef3WHdyYeumm2MvtkCgAAAA7caNEKa/2GX74UNs135/+NoysuX7TvhETnvzjLUv0d+98TBJNPn+TyobyR+oIlgkkCgAA1sO9En2m9PrIjZehXR5IFAAArIeJJGrtQKIAAGA9nJKo+m1IxFYgUQAAsB6GStTj7vOXkZ7NlZXBIR3eU/dozFm1scNAogAAYD3cKNHeH4+nsueHY6gcM3X+6dPJJNEePQd0iUode4oL17fs2G1Lohu3RauNHQYSBQAA6+FGifYbNpnK198fyZusT36oS5fEgae47DpwmCtLAldH7d5fXlQljblqbajUYiuQKAAAWA83SrS+/QloWbfyuc4SPZeY1iVXol0eSBQAAKyHeyWKiECiAABgPZySqPpFDsRWIFEAALAekKhBgUQBAMB6uFGiE2YuFPXLyZl/7D20tuSBuB+9NoPGzFQbS3Kr1Ubns8DXT9QvX0xfvjq4JK8qP7ukIKeUWmiTyoSES40Vj+pKm6nu5ePLjXlZJXxUzKnEjdt2VhU3qIN3EkgUAACsh3slevtGQV1Jm4ouJd3ixt4fTwgJ3zX9m+WVhfVNlS2jJn+3I/o4SXToZ3Nob86t4sFjZ306ZV52RpFrJVp9vzEieu8i/wCtRBvKH7Igw7Zs00r0bGzSijVr68s6liglIHyDNL5uIFEAALAe7pUolWTKmvtNi1aEcSNdiZJWX+o1kDezbrY9+4wkOmLC17m3n1iK703vWonGxiVfS7tNEiVB8iUmZevOfSTIlcEhze2yFL4Uoc2KwjoqaZeQaOjmrUX3Ks6fu6K+SieBRAEAwHq4UaKINpAoAABYD0jUoECiAABgPZySqPptSMRWIFEAALAekKhBgUQBAMB6OCVREgNifyBRAACwGE5JlCAxIPZHPn0AAAA8GWclCgAAAHRbIFEAAADAQSBRAAAAwEEgUQAAAMBBIFEAAADAQSBRAAAAwEEgUQAAAMBBIFEAAADAQSBRAAAAwEEgUQAAAMBBIFEAAADAQSBRAAAAwEEgUQAAAMBBIFEAAADAQSBRAAAAwEEgUQAAAMBBIFEAAADAQSBRAAAAwEEgUQAAAMBBIFEAAADAQSBRAAAAwEEgUQAAAMBBIFEAAADAQSBRAAAAwEEgUQAAAMBBIFEAAADAQSBRAAAAwEEgUQAAAMBBIFEAAADAQSBRAAAAwEH+fxd5WuHSRuD5AAAAAElFTkSuQmCC>