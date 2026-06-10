namespace Grubs4Scrubs.Business;

public interface IFavouriteService
{
    List<Favourite> GetAllFavourites();
    Favourite? GetFavouriteById(int id);
    List<Favourite>? GetFavouriteByUserId(int UserId);
    Favourite? GetFavouriteByRecipeId(int RecipeId);
    Favourite? GetByUserAndRecipe(int UserId, int RecipeId);
    void CreateFavourite(Favourite favourite);
    void UpdateFavourite(Favourite favourite);
    void DeleteFavourite(int id);
}