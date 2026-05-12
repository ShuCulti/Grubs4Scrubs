using Grubs4Scrubs.Domain;
using Grubs4Scrubs.Business;

namespace Grubs4Scrubs.Tests;

public class RecipeServiceTests
{
    // TESTED METHOD: Create 
    [Fact]
    public void CreateRecipe_ValidRecipe_AddsToRepo()
    {
        //Arrange
        var repo = new FakeRepository();
        var service = new RecipeService(repo);

        //Act

        service.CreateRecipe(recipe: new Recipe
        {
            Title = "Test Recipe",
            EstimatedBudget = 10.0m
        });

        //Assert
        Assert.Single(repo.GetAll());
        Assert.Equal("Test Recipe", repo.GetAll()[0].Title);

    }

    [Fact]
    public void CreateRecipe_InvalidRecipe_DoesNotAddToRepo()
    {
        //Arrange
        var repo = new FakeRepository();
        var service = new RecipeService(repo);

        //Assert & Assert // When Throwing Errors Act and Assert happen at the same lines
        Assert.Throws<ArgumentException>(()=> service.CreateRecipe(recipe: new Recipe
        {
            Title = "",
            EstimatedBudget = 10.0m

        }));
    }

    [Fact]
    public void CreateRecipe_NegativeBudget_DoesNotAddToRepo()
    {
        //Arrange
        var repo = new FakeRepository();
        var service = new RecipeService(repo);

        //Act & Assert
        Assert.Throws<ArgumentException>(()=> service.CreateRecipe(recipe: new Recipe
        {
            Title = "Test Recipe",
            EstimatedBudget = -5.0m
        }));


    }

    // TESTED METHOD: GetById

    [Fact]
    public void GetById_ExistingRecipe_ReturnsRecipe()
    {
        //Arrange
        var repo = new FakeRepository();
        var service = new RecipeService(repo);
        service.CreateRecipe(new Recipe { Title = "GetById Test Recipe", EstimatedBudget = 15.0m });

        //Act
        var result = service.GetRecipeById(1);

        //Assert
        Assert.NotNull(result);
        Assert.Equal("GetById Test Recipe", result.Title);
    }

    [Fact]
    public void GetById_NonExistingRecipe_ReturnsNull()
    {
        //Arrange
        var repo = new FakeRepository();
        var service = new RecipeService(repo);

        //Act
        var result = service.GetRecipeById(99);

        //Assert
        Assert.Null(result);
    }

    // TESTED METHOD: Delete

    [Fact]
    public void DeleteRecipe_ExistingRecipe_RemovesFromRepo()
    {
        //Arrange
        var repo = new FakeRepository();
        var service = new RecipeService(repo);
        service.CreateRecipe(new Recipe { Title = "Delete Me", EstimatedBudget = 5.0m });

        //Act
        service.DeleteRecipe(1);

        //Assert
        Assert.Empty(repo.GetAll());
    }

    [Fact]
    public void DeleteRecipe_NonExistingRecipe_ThrowsKeyNotFoundException()
    {
        //Arrange
        var repo = new FakeRepository();
        var service = new RecipeService(repo);

        //Act & Assert
        Assert.Throws<KeyNotFoundException>(() => service.DeleteRecipe(99));
    }

    // TESTED METHOD: Update

    [Fact]
    public void UpdateRecipe_ExistingRecipe_UpdatesInRepo()
    {
        //Arrange
        var repo = new FakeRepository();
        var service = new RecipeService(repo);
        service.CreateRecipe(new Recipe { Title = "Old Title", EstimatedBudget = 5.0m });

        //Act
        service.UpdateRecipe(new Recipe { Id = 1, Title = "New Title", EstimatedBudget = 7.0m });

        //Assert
        var updated = repo.GetById(1);
        Assert.NotNull(updated);
        Assert.Equal("New Title", updated.Title);
        Assert.Equal(7.0m, updated.EstimatedBudget);
    }

    [Fact]
    public void UpdateRecipe_NonExistingRecipe_ThrowsKeyNotFoundException()
    {
        //Arrange
        var repo = new FakeRepository();
        var service = new RecipeService(repo);

        //Act & Assert
        Assert.Throws<KeyNotFoundException>(() => service.UpdateRecipe(new Recipe { Id = 99, Title = "Ghost Recipe" }));
    }
}