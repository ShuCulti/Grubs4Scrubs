

namespace Grubs4Scrubs.Business;

//  this is where you'd add things like:
//   - "Budget can't be negative"
//   - "Title can't be empty"
//   - "Only allow 50 recipes per user"
//   - Logging, caching, etc.
public class RecipeService : IRecipeService
{
    private readonly IRecipeRepository _recipeRepository;

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
        //validate before saving
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
