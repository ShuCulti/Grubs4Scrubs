namespace Grubs4Scrubs.Business;

public interface IRecipeRepository
{
    List<Recipe> GetAll();
    Recipe? GetById(int id);
    void Create(Recipe recipe);
    void Update(Recipe recipe);
    void Delete(int id);
}
