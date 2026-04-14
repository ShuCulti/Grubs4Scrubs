using Grubs4Scrubs.Domain;

namespace Grubs4Scrubs.Business;

// The service interface — defines the business operations available.
// Notice it looks similar to the repository, but the service layer
// is where you'd add validation, business rules, and logic that
// doesn't belong in the controller or the database layer.
public interface IRecipeService
{
    List<Recipe> GetAllRecipes();
    Recipe? GetRecipeById(int id);
    void CreateRecipe(Recipe recipe);
    void UpdateRecipe(Recipe recipe);
    void DeleteRecipe(int id);
}
