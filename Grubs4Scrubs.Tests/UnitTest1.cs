using Grubs4Scrubs.Domain;
using Grubs4Scrubs.Business;

namespace Grubs4Scrubs.Tests;

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