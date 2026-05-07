# Unit Testing in Grubs4Scrubs

**LO mapped:** LO4 Managing (Testing, Iterative Process to Improve Code Quality)

## Why I started writing tests

I'll be honest, testing wasn't the first thing on my mind when I started building Grubs4Scrubs. I was way more focused on getting the API endpoints working and the React frontend rendering properly. But once the business layer started growing, I realized I kept manually checking the same things over and over. Did `CreateRecipe` still reject empty titles after I refactored? Did `DeleteRecipe` still throw when the ID doesn't exist? I was wasting time re-testing by hand. So I set up a proper test project with xUnit and started automating the checks I was already doing in my head.

The goal wasn't to hit some magic coverage number. It was to stop second-guessing myself every time I changed something in `RecipeService`.

## The setup

I created a separate project called `Grubs4Scrubs.Tests` using xUnit as the testing framework. The test project references three other projects in the solution: `Grubs4Scrubs.Business`, `Grubs4Scrubs.Domain`, and `Grubs4Scrubs.DataAccess`. That way the tests can access the service classes, the domain models, and the repository interfaces all at once.

Here's what the `.csproj` looks like:

```xml
<Project Sdk="Microsoft.NET.Sdk">
  <PropertyGroup>
    <TargetFramework>net10.0</TargetFramework>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>enable</Nullable>
    <IsPackable>false</IsPackable>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="coverlet.collector" Version="6.0.4" />
    <PackageReference Include="Microsoft.NET.Test.Sdk" Version="17.14.1" />
    <PackageReference Include="xunit" Version="2.9.3" />
    <PackageReference Include="xunit.runner.visualstudio" Version="3.1.4" />
  </ItemGroup>

  <ItemGroup>
    <Using Include="Xunit" />
  </ItemGroup>

  <ItemGroup>
    <ProjectReference Include="..\Grubs4Scrubs.Business\Grubs4Scrubs.Business.csproj" />
    <ProjectReference Include="..\Grubs4Scrubs.Domain\Grubs4Scrubs.Domain.csproj" />
    <ProjectReference Include="..\Grubs4Scrubs.DataAccess\Grubs4Scrubs.DataAccess.csproj" />
  </ItemGroup>
</Project>
```

![Screenshot of the test project structure in the Solution Explorer](screenshots/test-project-structure.png)

[NOTE: Insert a screenshot of your Solution Explorer showing the Grubs4Scrubs.Tests project with its files visible. Should show UnitTest1.cs and FakeRepository.cs at minimum.]

## Fake repositories instead of a real database

This was probably the biggest learning moment for me. I couldn't just call `RecipeService` in a test and have it talk to SQL Server, that would make every test slow and dependent on a running database. So I needed a way to swap out the real `RecipeRepository` (which uses ADO.NET and SQL Server) with something lightweight that just holds data in memory.

That's where the `IRecipeRepository` interface paid off. Because `RecipeService` depends on the interface and not the concrete class, I could write a `FakeRecipeRepository` that implements the same interface but stores everything in a plain `List<Recipe>`. No database, no connection strings, no Docker. Just a list.

```csharp
public class FakeRecipeRepository : IRecipeRepository
{
    private readonly List<Recipe> _recipes = new();
    private int _nextId = 1;

    public List<Recipe> GetAll() => _recipes;

    public Recipe? GetById(int id) => _recipes.FirstOrDefault(r => r.Id == id);

    public void Create(Recipe recipe)
    {
        recipe.Id = _nextId++;
        _recipes.Add(recipe);
    }

    public void Update(Recipe recipe)
    {
        var index = _recipes.FindIndex(r => r.Id == recipe.Id);
        if (index >= 0) _recipes[index] = recipe;
    }

    public void Delete(int id)
    {
        _recipes.RemoveAll(r => r.Id == id);
    }
}
```

![Screenshot of the FakeRecipeRepository file in your IDE](screenshots/fake-repository-code.png)

[NOTE: Insert a screenshot of FakeRepository.cs open in your IDE (Rider or VS). Highlight that it implements IRecipeRepository.]

This is Dependency Injection in action. The service doesn't know or care that the repository behind it is fake. It just calls `GetById`, `Create`, `Delete` the same way it always does. In production, the real `RecipeRepository` with ADO.NET handles those calls. In tests, this fake handles them. Same interface, different implementation. That's the whole point of programming against interfaces.

## What I actually tested

I focused my tests on `RecipeService` because that's where the business logic lives. The service sits between the API controllers and the repositories, and it's the layer that validates input before anything touches the database. If the validation is broken, bad data gets through. So that's what I tested.

Here's the full test class:

```csharp
public class RecipeServiceTests
{
    private RecipeService CreateService(FakeRecipeRepository repo)
    {
        return new RecipeService(repo);
    }

    [Fact]
    public void CreateRecipe_ValidRecipe_AddsToRepository()
    {
        var repo = new FakeRecipeRepository();
        var service = CreateService(repo);
        var recipe = new Recipe { Title = "Test Recipe", EstimatedBudget = 5.00m };

        service.CreateRecipe(recipe);

        Assert.Single(repo.GetAll());
        Assert.Equal("Test Recipe", repo.GetAll()[0].Title);
    }

    [Fact]
    public void CreateRecipe_EmptyTitle_ThrowsArgumentException()
    {
        var repo = new FakeRecipeRepository();
        var service = CreateService(repo);
        var recipe = new Recipe { Title = "", EstimatedBudget = 5.00m };

        Assert.Throws<ArgumentException>(() => service.CreateRecipe(recipe));
    }

    [Fact]
    public void CreateRecipe_NegativeBudget_ThrowsArgumentException()
    {
        var repo = new FakeRecipeRepository();
        var service = CreateService(repo);
        var recipe = new Recipe { Title = "Test", EstimatedBudget = -1.00m };

        Assert.Throws<ArgumentException>(() => service.CreateRecipe(recipe));
    }

    [Fact]
    public void GetRecipeById_ExistingId_ReturnsRecipe()
    {
        var repo = new FakeRecipeRepository();
        var service = CreateService(repo);
        service.CreateRecipe(new Recipe { Title = "Ramen", EstimatedBudget = 2.20m });

        var result = service.GetRecipeById(1);

        Assert.NotNull(result);
        Assert.Equal("Ramen", result.Title);
    }

    [Fact]
    public void GetRecipeById_NonExistingId_ReturnsNull()
    {
        var repo = new FakeRecipeRepository();
        var service = CreateService(repo);

        var result = service.GetRecipeById(99);

        Assert.Null(result);
    }

    [Fact]
    public void DeleteRecipe_NonExistingId_ThrowsKeyNotFoundException()
    {
        var repo = new FakeRecipeRepository();
        var service = CreateService(repo);

        Assert.Throws<KeyNotFoundException>(() => service.DeleteRecipe(99));
    }

    [Fact]
    public void UpdateRecipe_NonExistingId_ThrowsKeyNotFoundException()
    {
        var repo = new FakeRecipeRepository();
        var service = CreateService(repo);
        var recipe = new Recipe { Id = 99, Title = "Ghost Recipe" };

        Assert.Throws<KeyNotFoundException>(() => service.UpdateRecipe(recipe));
    }
}
```

![Screenshot of all tests passing in your test runner](screenshots/test-results-passing.png)

[NOTE: Insert a screenshot of your test runner (the Test Explorer in Rider or VS, or the terminal output from `dotnet test`) showing all 7 tests passing with green checkmarks.]

## Breaking down what each test does

I followed the Arrange-Act-Assert pattern for every test, even though nobody taught me to call it that initially. It just made sense: set up the thing, do the thing, check the thing.

### Happy path tests

`CreateRecipe_ValidRecipe_AddsToRepository` is the most basic one. Give it a normal recipe with a title and a budget, call `CreateRecipe`, then check the repository actually has it. If this test breaks, something fundamental is wrong.

`GetRecipeById_ExistingId_ReturnsRecipe` creates a recipe first, then tries to retrieve it by ID. I check that the result isn't null and that the title matches. Simple, but it caught a bug once where I accidentally returned the wrong property.

### Validation tests

`CreateRecipe_EmptyTitle_ThrowsArgumentException` and `CreateRecipe_NegativeBudget_ThrowsArgumentException` are where the business logic gets tested directly. The `RecipeService` has explicit checks:

```csharp
if (string.IsNullOrWhiteSpace(recipe.Title))
{
    throw new ArgumentException("Recipe title cannot be empty");
}

if (recipe.EstimatedBudget < 0)
{
    throw new ArgumentException("Budget cannot be negative");
}
```

![Screenshot of the validation logic inside RecipeService.cs](screenshots/recipe-service-validation.png)

[NOTE: Insert a screenshot of RecipeService.cs with the CreateRecipe method visible, showing the validation checks highlighted.]

These tests prove that the validation actually works. If someone removes one of those `if` statements by accident, the test fails immediately. That's the whole point.

### Error handling tests

`GetRecipeById_NonExistingId_ReturnsNull` checks the "not found" path. The service returns null when the ID doesn't match anything, and the controller can then turn that into a 404. Without this test, I wouldn't know if the service was throwing an exception instead of returning null (which would cause a 500 error in the API).

`DeleteRecipe_NonExistingId_ThrowsKeyNotFoundException` and `UpdateRecipe_NonExistingId_ThrowsKeyNotFoundException` verify that the service throws a specific exception when you try to modify something that doesn't exist. The service checks with `GetById` first:

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

I'm using `Assert.Throws<KeyNotFoundException>` here, which is xUnit's way of saying "this code should blow up with exactly this exception type." If it throws a different exception or doesn't throw at all, the test fails.

## The naming convention

I stuck with the `MethodName_Scenario_ExpectedResult` pattern for test names. Something like `CreateRecipe_EmptyTitle_ThrowsArgumentException` tells you three things without even reading the test body: what method is being tested, what input is being given, and what should happen. I picked this up from a Microsoft Learn article on unit testing best practices, and it's honestly one of those small things that made my tests way more readable.

![Screenshot showing test names in the Test Explorer](screenshots/test-naming-explorer.png)

[NOTE: Insert a screenshot of the Test Explorer panel showing the list of test names. The naming pattern should be visible.]

## What I learned

### Interfaces aren't just theory

Before this, I understood interfaces as a concept from Codecademy but didn't really feel *why* they mattered. Writing the `FakeRecipeRepository` made it click. The entire testing approach only works because `RecipeService` depends on `IRecipeRepository` instead of the concrete `RecipeRepository`. If I'd hardcoded the dependency, I would've been stuck testing against a real database. Interfaces give you the ability to swap implementations, and testing is the most obvious place where that pays off.

### Tests catch regressions I wouldn't notice

There was a moment where I refactored how `CreateRecipe` handles the budget check, and I accidentally broke the empty-title validation in the process. Didn't notice at all. Ran the tests, two went red, and I found the issue in about thirty seconds. Without the tests, I would've pushed that to the repo and only found out later when the API started accepting garbage data.

[NOTE: If you have a specific memory of a test catching a real bug, write it here instead of my example. Real stories are stronger than hypothetical ones.]

### The Arrange-Act-Assert pattern keeps things clean

Every test I wrote follows the same shape: create the fake repo and the service (Arrange), call the method (Act), check the result (Assert). Once I got into that rhythm, writing new tests became almost mechanical. I didn't have to think about structure, just about what scenario I wanted to cover.

### Testing the business layer is the sweet spot

I tested the service layer, not the controllers and not the repositories. The controllers are thin (they mostly just call the service and return HTTP responses), and the repositories are just ADO.NET plumbing. The service layer is where the actual decisions happen: validation, existence checks, business rules. That's where bugs have the highest impact, so that's where tests give the most value.

## What I'd do differently

If I started over, I'd write the `FakeUserRepository` and `UserServiceTests` from the beginning too. Right now I only have tests for `RecipeService`, and `UserService` has the same validation patterns (empty email, empty username, empty password) but zero test coverage. That's a gap I'm aware of.

I'd also look into a mocking library like Moq instead of writing fake repositories by hand. The `FakeRecipeRepository` works fine, but if I had ten repositories it would get tedious to maintain a fake for each one. Moq lets you set up fake behavior inline in the test without writing a whole class. I didn't use it here because I wanted to understand the concept manually first, and I think that was the right call for learning. But for a bigger project, I'd switch.

[NOTE: Add any other honest reflections about what you'd improve. Maybe something about test coverage tools, or about testing edge cases you missed.]

## Running the tests

All tests are run with `dotnet test` from the solution root or through the IDE's built-in test runner. The output looks something like this:

```bash
dotnet test
  Determining projects to restore...
  All projects are up-to-date for restore.
  Grubs4Scrubs.Domain -> bin/Debug/net10.0/Grubs4Scrubs.Domain.dll
  Grubs4Scrubs.Business -> bin/Debug/net10.0/Grubs4Scrubs.Business.dll
  Grubs4Scrubs.Tests -> bin/Debug/net10.0/Grubs4Scrubs.Tests.dll
Test run for Grubs4Scrubs.Tests.dll
  Passed! - Failed: 0, Passed: 7, Skipped: 0, Total: 7
```

![Screenshot of dotnet test output in the terminal](screenshots/dotnet-test-terminal.png)

[NOTE: Insert a screenshot of your actual terminal output after running `dotnet test`. The "Passed: 7" line is the money shot.]
