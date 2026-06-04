
namespace Grubs4Scrubs.Business;

public interface IRecipeService
{
    List<Recipe> GetAllRecipes();
    Recipe? GetRecipeById(int id);
    void CreateRecipe(Recipe recipe);
    void UpdateRecipe(Recipe recipe);
    void DeleteRecipe(int id);
}
