using Grubs4Scrubs.Domain;

namespace Grubs4Scrubs.DataAccess;

// This is the INTERFACE — it defines WHAT the repository can do,
// but not HOW it does it. The controller and service don't need
// to know whether you're using SQL Server, PostgreSQL, or a text file.
public interface IRecipeRepository
{
    List<Recipe> GetAll();
    Recipe? GetById(int id);
    void Create(Recipe recipe);
    void Update(Recipe recipe);
    void Delete(int id);
}
