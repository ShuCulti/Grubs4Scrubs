# Backend Architecture Design — Grubs4Scrubs

**LO mapped:** LO2 Designing (Software and Database Designs, Maintainable and Secure)

## What this system is

Grubs4Scrubs is a meal planning web app built for Dutch students who want to eat better without blowing their budget. The backend is an ASP.NET Core Web API running on .NET 10, and it serves a React 19 frontend over HTTPS. All data lives in a SQL Server database, and every query goes through raw ADO.NET because using an ORM wasn't allowed for this project.

The whole point of the backend is to expose a clean REST API that the React frontend can call with Axios. The API handles recipes, users, and (eventually) meal plans. It doesn't serve HTML or render views. It just takes JSON in and sends JSON out.

## The layered architecture

I split the backend into four separate .NET projects inside one solution. Each project has a single job, and they only reference each other in one direction. The controller never talks to the database directly, and the database layer doesn't know anything about HTTP.

```
GrubHub-app.sln
├── Grubs4Scrubs.API          → Controllers, Program.cs, CORS, DI wiring
├── Grubs4Scrubs.Business     → Service classes, business logic, validation
├── Grubs4Scrubs.Domain       → Models (Recipe, User), interfaces (IRecipeRepository, IUserRepository)
├── Grubs4Scrubs.DataAccess   → Repository implementations, raw ADO.NET, DbSeeder
└── Grubs4Scrubs.Tests        → xUnit tests, fake repositories
```

![Screenshot of the solution structure in your IDE](screenshots/solution-explorer-projects.png)

[NOTE: Insert a screenshot of your Solution Explorer showing all five projects in the solution. Rider or Visual Studio, either works.]

The dependency flow goes like this:

```
API → Business → Domain ← DataAccess
```

The API project references Business and Domain. Business references Domain. DataAccess references Domain. Nobody references API. Nobody references DataAccess except through the interface defined in Domain. That last part is the key, the DataAccess layer implements interfaces that live in the Domain layer, so the Business layer never has to know whether it's talking to SQL Server, PostgreSQL, or a fake list in a test.

## How the layers connect

### The request lifecycle

When the React frontend sends a request (say, `GET /api/recipe/5`), here's what actually happens:

```
React (Axios)
    │
    ▼  HTTP GET /api/recipe/5
┌─────────────────────────────────┐
│  RecipeController.GetById(5)    │  ← API layer: receives HTTP, returns HTTP
│  calls _recipeService           │
└────────────┬────────────────────┘
             │
             ▼
┌─────────────────────────────────┐
│  RecipeService.GetRecipeById(5) │  ← Business layer: validation, logic
│  calls _recipeRepository        │
└────────────┬────────────────────┘
             │
             ▼
┌─────────────────────────────────┐
│  RecipeRepository.GetById(5)    │  ← DataAccess layer: raw SQL
│  SELECT * FROM Recipes          │
│  WHERE Id = @Id                 │
└────────────┬────────────────────┘
             │
             ▼
┌─────────────────────────────────┐
│  SQL Server (Docker)            │  ← Database
└─────────────────────────────────┘
```

Every layer only knows about the one directly below it, and only through an interface. The controller doesn't know SQL exists. The repository doesn't know HTTP exists. That's the whole design philosophy.

### Dependency Injection in Program.cs

The wiring happens in one place: `Program.cs`. This is where .NET's built-in DI container gets told which concrete class to use for each interface.

```csharp
// "Scoped" means one instance per HTTP request.
// When a controller asks for IRecipeService, .NET gives it a RecipeService.
// When RecipeService asks for IRecipeRepository, .NET gives it a RecipeRepository.
builder.Services.AddScoped<IRecipeRepository, RecipeRepository>();
builder.Services.AddScoped<IRecipeService, RecipeService>();
```

![Screenshot of Program.cs with the DI registration visible](screenshots/program-cs-di-wiring.png)

[NOTE: Insert a screenshot of your Program.cs file. The AddScoped lines and the CORS config should both be visible.]

I used `AddScoped` instead of `AddSingleton` or `AddTransient` because scoped means one instance per HTTP request. That's the right lifetime for anything that opens a database connection, you don't want a single connection shared across all requests (singleton), and you don't want a new connection for every single method call either (transient).

## The API layer

The controllers are intentionally thin. They handle HTTP concerns (routing, status codes, request/response shapes) and nothing else. All actual logic lives in the service layer.

Here's the `RecipeController` as an example:

```csharp
[ApiController]
[Route("api/[controller]")]
public class RecipeController : ControllerBase
{
    private readonly IRecipeService _recipeService;

    public RecipeController(IRecipeService recipeService)
    {
        _recipeService = recipeService;
    }

    [HttpGet]
    public IActionResult GetAll()
    {
        var recipes = _recipeService.GetAllRecipes();
        return Ok(recipes);
    }

    [HttpGet("{id}")]
    public IActionResult GetById(int id)
    {
        var recipe = _recipeService.GetRecipeById(id);
        if (recipe == null) return NotFound();
        return Ok(recipe);
    }

    [HttpPost]
    public IActionResult Create(Recipe recipe)
    {
        _recipeService.CreateRecipe(recipe);
        return Created();
    }

    [HttpPut("{id}")]
    public IActionResult Update(int id, Recipe recipe)
    {
        recipe.Id = id;
        _recipeService.UpdateRecipe(recipe);
        return NoContent();
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        _recipeService.DeleteRecipe(id);
        return NoContent();
    }
}
```

![Screenshot of RecipeController.cs in the IDE](screenshots/recipe-controller-code.png)

[NOTE: Insert a screenshot of RecipeController.cs open in the IDE.]

The pattern is the same for `UserController`. Receive the request, call the service, return the appropriate HTTP status code. No SQL, no validation, no business rules. If I need to add a new entity (like MealPlan), I create a new controller following the exact same shape.

### CORS configuration

Because the React frontend runs on `localhost:5173` (Vite's dev server) and the API runs on a different port, browsers block the requests by default. The CORS policy in `Program.cs` explicitly allows the React origin:

```csharp
builder.Services.AddCors(policy =>
{
    policy.AddPolicy("AllowReact", policy =>
    {
        policy.WithOrigins("http://localhost:5173")
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});
```

This is scoped to a specific origin on purpose. I didn't use `AllowAnyOrigin()` because that's a security risk in any real deployment. Even for a student project, it's worth doing it right.

## The Business layer

This is where validation and business rules live. Right now the services are fairly thin (most methods just pass through to the repository), but the validation that does exist lives here and nowhere else.

```csharp
public void CreateRecipe(Recipe recipe)
{
    if (string.IsNullOrWhiteSpace(recipe.Title))
    {
        throw new ArgumentException("Recipe title cannot be empty");
    }

    if (recipe.EstimatedBudget < 0)
    {
        throw new ArgumentException("Budget cannot be negative");
    }

    _recipeRepository.Create(recipe);
}
```

The service also checks whether a record exists before updating or deleting it:

```csharp
public void DeleteRecipe(int id)
{
    var existing = _recipeRepository.GetById(id);
    if (existing == null)
    {
        throw new KeyNotFoundException("Recipe not found");
    }

    _recipeRepository.Delete(id);
}
```

This is the layer that unit tests target. The controllers are too thin to bother testing, and the repositories just run SQL. The service layer is where things can actually go wrong in interesting ways.

### Interfaces

Both services implement interfaces (`IRecipeService`, `IUserService`) defined in the Business project. The controllers depend on these interfaces, not the concrete classes. This means the controller doesn't care whether it's talking to a real service or a mock in a test.

```csharp
public interface IRecipeService
{
    List<Recipe> GetAllRecipes();
    Recipe? GetRecipeById(int id);
    void CreateRecipe(Recipe recipe);
    void UpdateRecipe(Recipe recipe);
    void DeleteRecipe(int id);
}
```

## The Domain layer

This is the simplest project. It holds two things: the model classes and the repository interfaces.

### Models

```csharp
public class Recipe
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public int PrepTime { get; set; }
    public int CookTime { get; set; }
    public int Servings { get; set; }
    public string Tag { get; set; } = string.Empty;
    public string ImageUrl { get; set; } = string.Empty;
    public decimal EstimatedBudget { get; set; }
    public string Category { get; set; } = string.Empty;
    public string Ingredients { get; set; } = string.Empty;
    public string Instructions { get; set; } = string.Empty;
    public int? UserId { get; set; }
    public string Tips { get; set; } = string.Empty;
    public string Nutrition { get; set; } = string.Empty;
    public int Calories { get; set; }
    public int Protein { get; set; }
    public int Carbs { get; set; }
    public int Fats { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
```

`Ingredients` and `Instructions` are stored as JSON strings. I went with that approach instead of creating separate `Ingredient` and `Instruction` tables because the data is always loaded and saved as a complete list with the recipe. It keeps the SQL simpler and the mapping straightforward.

### Repository interfaces

```csharp
public interface IRecipeRepository
{
    List<Recipe> GetAll();
    Recipe? GetById(int id);
    void Create(Recipe recipe);
    void Update(Recipe recipe);
    void Delete(int id);
}
```

These interfaces live in Domain (not in DataAccess) on purpose. That way the Business layer can reference Domain without ever needing to know about DataAccess. The Dependency Inversion Principle in action: high-level modules define the abstraction, low-level modules implement it.

## The Data Access layer

This is where all the actual SQL lives. Every repository opens its own `SqlConnection`, runs parameterized queries, maps the results to domain objects, and disposes the connection when done.

Here's a typical query pattern from `RecipeRepository`:

```csharp
public Recipe? GetById(int id)
{
    using SqlConnection conn = new(_connectionString);
    conn.Open();

    using SqlCommand cmd = new("SELECT * FROM Recipes WHERE Id = @Id", conn);
    cmd.Parameters.AddWithValue("@Id", id);

    using SqlDataReader reader = cmd.ExecuteReader();

    if (reader.Read())
    {
        return MapRecipe(reader);
    }

    return null;
}
```

![Screenshot of RecipeRepository.cs showing a query method](screenshots/recipe-repository-query.png)

[NOTE: Insert a screenshot of RecipeRepository.cs with one of the query methods visible.]

A few things worth calling out about this pattern:

**Parameterized queries everywhere.** Every single value that goes into a SQL command uses `@parameters`, never string concatenation. `cmd.Parameters.AddWithValue("@Id", id)` means SQL injection is impossible through the repositories. This was non-negotiable from day one.

**`using` statements for disposal.** The `SqlConnection`, `SqlCommand`, and `SqlDataReader` all get wrapped in `using` so they're disposed properly even if an exception gets thrown. No connection leaks.

**`GetOrdinal` in the mapper.** The private `MapRecipe` method reads columns by name using `reader.GetOrdinal("Title")` instead of hardcoded index numbers like `reader.GetString(1)`. If someone reorders the columns in the database, the code doesn't silently break.

```csharp
private Recipe MapRecipe(SqlDataReader reader)
{
    return new Recipe
    {
        Id = reader.GetInt32(reader.GetOrdinal("Id")),
        Title = reader.GetString(reader.GetOrdinal("Title")),
        Description = reader.GetString(reader.GetOrdinal("Description")),
        // ... (full mapping for all columns)
    };
}
```

### Database seeding

The `DbSeeder` class runs at startup and inserts three starter recipes if the `Recipes` table is empty. It checks the count first so it doesn't duplicate data on every restart. The seed data is real recipe data (Midnight Exam Ramen, University Power Bowl, Finals Week Stir-Fry) with actual ingredients, instructions stored as JSON arrays, and nutritional info.

```csharp
public static void Seed(string connectionString)
{
    using SqlConnection conn = new(connectionString);
    conn.Open();

    using SqlCommand checkCmd = new("SELECT COUNT(*) FROM Recipes", conn);
    int count = (int)checkCmd.ExecuteScalar();

    if (count > 0) return; // Already has data, skip seeding

    // ... INSERT statements for starter recipes
}
```

## Security considerations

**SQL injection prevention.** Every database query uses parameterized commands. There's no string interpolation or concatenation anywhere near a SQL statement. This is the single most important security decision in the data access layer.

**CORS restricted to known origins.** The API only accepts requests from `http://localhost:5173`. No wildcard origins.

**HTTPS enforced.** `app.UseHttpsRedirection()` is called in the middleware pipeline so HTTP requests get redirected to HTTPS.

**BCrypt for password hashing.** The `BCrypt.Net-Next` package is in the project dependencies for hashing user passwords before storage. The raw password is never stored or returned.

[NOTE: If BCrypt hashing isn't fully wired into UserService yet, mention that it's installed and planned but not integrated into the flow. Don't claim it works if it doesn't.]

**JWT authentication packages installed.** `Microsoft.AspNetCore.Authentication.JwtBearer` and `Microsoft.AspNetCore.Authentication.Google` are in the API project's dependencies. The middleware isn't configured in `Program.cs` yet, so auth is planned but not enforced on endpoints.

[NOTE: Update this section once JWT auth is actually wired into the middleware pipeline. Right now `Program.cs` calls `app.UseAuthorization()` but there's no authentication scheme configured.]

**No secrets in code.** The connection string comes from `appsettings.json` via `IConfiguration`, not hardcoded in the repository classes.

## Design decisions and why

### Why raw ADO.NET instead of Entity Framework

This was a project constraint, not a choice. The assignment required raw ADO.NET with no ORM. But honestly, it was a good learning experience. I now understand what EF Core is actually doing under the hood: opening connections, building SQL strings, mapping columns to properties, managing disposal. Writing it by hand made those concepts real instead of abstract.

The downside is obvious: the `Create` method in `RecipeRepository` has 18 parameter lines. That's a lot of boilerplate. If I could use EF Core, the same operation would be one line.

### Why JSON strings for Ingredients and Instructions

Recipes always load and save their ingredients and instructions as a complete list. There's no use case where I need "give me all recipes that contain eggs" at the database level (that would need a normalized join table). Storing them as JSON keeps the schema simpler and makes the API response shape straightforward. The frontend parses the JSON directly.

If ingredient-level querying ever became a requirement, I'd normalize it into a `RecipeIngredient` join table. But for the current scope, JSON strings are the pragmatic choice.

### Why Scoped lifetime for DI

`AddScoped` creates one instance per HTTP request. That's the right fit for repositories that hold a connection string and open/close connections per query. Singleton would share state across requests (dangerous). Transient would create a new instance for every injection point in the same request (wasteful, and can cause issues if you need to share state within a request).

### Why thin controllers

The controller's job is to translate between HTTP and the business layer. That's it. Keeping them thin means the business logic is testable without spinning up a web server. The `RecipeService` tests use a `FakeRecipeRepository` and never touch HTTP or the controller at all.

## The full system diagram

```
┌────────────────────────┐
│     React 19 (Vite)    │
│  Axios + JWT in memory │
│  Tailwind v4, Router 7 │
└───────────┬────────────┘
            │ HTTP/HTTPS (JSON)
            │ CORS: localhost:5173
            ▼
┌────────────────────────┐
│   ASP.NET Core Web API │
│   (.NET 10)            │
│                        │
│  ┌──────────────────┐  │
│  │   Controllers    │  │  ← HTTP routing, status codes
│  │  Recipe / User   │  │
│  └────────┬─────────┘  │
│           │ IRecipeService / IUserService
│  ┌────────▼─────────┐  │
│  │    Services       │  │  ← Validation, business rules
│  │  Recipe / User    │  │
│  └────────┬─────────┘  │
│           │ IRecipeRepository / IUserRepository
│  ┌────────▼─────────┐  │
│  │  Repositories     │  │  ← Raw ADO.NET, parameterized SQL
│  │  Recipe / User    │  │
│  └────────┬─────────┘  │
└───────────┼────────────┘
            │ SqlConnection (Microsoft.Data.SqlClient)
            ▼
┌────────────────────────┐
│   SQL Server (Docker)  │
│  Tables: Recipes, Users│
└────────────────────────┘
```

## What this doesn't cover yet

I'm being honest about what's not built or not fully wired:

- **JWT authentication middleware** is not configured in `Program.cs` yet. The packages are installed (JwtBearer, Google Auth) but the middleware pipeline doesn't enforce auth on any endpoints. All endpoints are currently open.
- **Error handling middleware.** There's no global exception handler. If a service throws a `KeyNotFoundException`, it currently bubbles up as a 500 instead of a clean 404. I'd need `app.UseExceptionHandler` or a custom middleware to map exception types to HTTP status codes.
- **Logging.** No structured logging is set up. In a real deployment I'd want Serilog or at least the built-in `ILogger` writing to a file or a logging service.
- **MealPlan endpoints.** The domain model and database might have a MealPlan table eventually, but there's no controller, service, or repository for it yet.
- **User registration DI.** `UserRepository` and `UserService` exist but aren't registered in `Program.cs` with `AddScoped` yet. The `UserController` won't resolve until those lines are added.

[NOTE: Check if you've since added the UserService/UserRepository DI registration to Program.cs. If yes, remove that bullet point. Also update any other bullets that are no longer accurate.]
