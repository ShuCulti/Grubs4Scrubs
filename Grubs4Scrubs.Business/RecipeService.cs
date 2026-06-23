

namespace Grubs4Scrubs.Business;

// Here is where I define the laws and constraints of my app. What is allowed or not allowed and so forth.
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

        if (recipe.Title.Length > 255)
        {
            throw new ArgumentException("Title Cannot be Longer than 255 characters");
        }

        if (recipe.EstimatedBudget < 0)
        {
            throw new ArgumentException("Budget cannot be negative");
        }

        if (recipe.Servings < 0)
        {
            throw new ArgumentException("Servings cannot be zero");
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
