# Grubs4Scrubs — Session Handoff

Paste this into a new chat to get up to speed fast. Also read `PROJECT_CONTEXT.md` for full stack details.

## How I work (important)
- Teach me Microsoft Learn style: explain the why, the alternatives, and the gotchas up front, so I don't have to ask 5 follow-ups. Concise means no filler, NOT shallow.
- One concept at a time. I write my own code. Review it, point me to fixes, let me apply them.
- Hard rules in all writing (chat and files): never use the word "actually" (find a substitute or delete it), and never use em dashes. Use commas, periods, or parentheses.
- I'm a student learning full-stack. I like trying things and learning by messing with code.

## Stack
React 19 + Vite frontend (custom CSS, lucide-react, React Router, Axios). ASP.NET Core (.NET 10) Web API backend. SQL Server with raw ADO.NET only (no EF Core, hard requirement). JWT auth, BCrypt. xUnit tests with a FakeRepository.

## Architecture change made this session
- Removed the Domain layer entirely. Moved the Models and the repository interfaces INTO the Business layer, organised with folders (Models, Repository Interfaces, Service Interfaces).
- Dropped the IService interfaces for services. Reason: I'm not unit-testing controllers, so I don't need to swap the service out. Controllers now use the concrete service. Cleanest wiring is to register the concrete service in Program.cs (`AddScoped<RecipeService>()`) and inject it directly, letting the container build it from the repo. (Currently some controllers `new` the service by hand, which works but isn't ideal.)
- Layers now: API (controllers) -> Business (services + models + repo interfaces) -> DataAccess (repository implementations). DataAccess implements the repo interfaces that live in Business.

## Built this session
- MealPlanEntry full vertical slice: model (uses `propg` / private setters with TWO constructors, a 7-arg full one for the DB mapper and a 5-arg one for new entries), IMealPlanEntryRepository, MealPlanEntryRepository (ADO.NET CRUD + GetByUserIdAndDateRange + mapper using the 7-arg constructor), and the `MealPlanEntries` SQL table.
- FavouriteRepository (ADO.NET CRUD + GetByUserId returns List, GetByRecipeId should also be a List). Earlier bugs fixed.
- Reworked the conceptual ERD: junction entities MealPlanEntry (Recipe 1-n MealPlanEntry, MealPlan 1-n MealPlanEntry) and Favourite (Person 1-m Favourite, Recipe 1-n Favourite via a "saves" relationship). Conceptual level, so no keys/FKs shown on purpose.
- Two portfolio docs in Grubs4Scrubs.Docs: `LO5_Research_Review_Grubs4Scrubs.md` (5-step DOT research review of my own research) and `DOT_Framework_Guide_and_Template.docx` (explainer of the DOT framework that doubles as a reusable research-doc template).

## Where we left off
Wiring the frontend "favourite" button. The POST had three bugs being fixed: use `recipe.id` not `recipe.title` for RecipeId, use the logged-in user's id from AuthContext (not `recipe.userId`) for UserId, and use `.then(() => api.get(...))` (a function) so the re-fetch runs after the POST instead of firing immediately.

## Still to do (backend)
- MealPlanEntry: build the service layer, the controller, and register it in Program.cs DI. (Model + repo + table are done.)
- Favourite: service + controller + DI, and turn GetByRecipeId into a List.
- Put `[Authorize]` on the controllers (JWT is built but nothing is protected yet) and scope queries to the logged-in user via the NameIdentifier claim.
- Frontend still needs: ProtectedRoute, an Axios interceptor to attach the Bearer token, and token-expiry handling.

## DOT framework quick reference (for portfolio docs)
3 levels: What (domains: application, available work, innovation), Why (trade-offs: fit vs expertise, overview vs certainty, data vs inspiration), How (5 strategies). Strategies + sample methods: Library (literature study, available product analysis, competitive analysis, best good/bad practices), Field (interview, survey, observation, stakeholder analysis, domain modelling), Lab (unit test, system test, usability testing, A/B testing, data analytics), Showroom (peer review, pitch, benchmark test, product review), Workshop (prototyping, brainstorm, co-creation, code review, gap analysis, IT architecture sketching). The main-question / sub-question structure is a Fontys research-doc convention, not part of DOT itself; DOT supplies the method per sub-question.
