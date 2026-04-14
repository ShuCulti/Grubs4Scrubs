using Grubs4Scrubs.Domain;
using Grubs4Scrubs.DataAccess;

namespace Grubs4Scrubs.Business;

// The service IMPLEMENTATION — this is the "business layer".
// It sits between the controller and the repository.
//
// Right now it mostly just passes calls through to the repository,
// but this is where you'd add things like:
//   - "Budget can't be negative"
//   - "Title can't be empty"
//   - "Only allow 50 recipes per user"
//   - Logging, caching, etc.
public class RecipeService : IRecipeService
{
    private readonly IRecipeRepository _recipeRepository;

    // The repository is INJECTED — the service doesn't create it,
    // it receives it. This is called Dependency Injection.
    public RecipeService(IRecipeRepository recipeRepository)
    {
        _recipeRepository = recipeRepository;
    }

    public List<Recipe> GetAllRecipes()
    {
        return _recipeRepository.GetAll();
    }

    public Recipe? GetRecipeById(int id)
    {
        return _recipeRepository.GetById(id);
    }

    public void CreateRecipe(Recipe recipe)
    {
        // BUSINESS LOGIC EXAMPLE: validate before saving
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

    public void UpdateRecipe(Recipe recipe)
    {
        // Check the recipe exists before updating
        var existing = _recipeRepository.GetById(recipe.Id);
        if (existing == null)
        {
            throw new KeyNotFoundException("Recipe not found");
        }

        _recipeRepository.Update(recipe);
    }

    public void DeleteRecipe(int id)
    {
        var existing = _recipeRepository.GetById(id);
        if (existing == null)
        {
            throw new KeyNotFoundException("Recipe not found");
        }

        _recipeRepository.Delete(id);
    }
}
