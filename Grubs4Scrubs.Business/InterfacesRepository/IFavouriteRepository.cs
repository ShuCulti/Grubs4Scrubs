namespace Grubs4Scrubs.Business;

public interface IFavouriteRepository
{
    List<Favourite> GetAll();
    Favourite? GetById(int id);
    List<Favourite> GetByUserId(int UserId);
    Favourite? GetByRecipeId(int RecipeId);
    void Create(Favourite favourite);
    void Update(Favourite favourite);
    void Delete(int id);

}