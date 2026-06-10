namespace Grubs4Scrubs.Business;

public class FavouriteService
{
    private readonly IFavouriteRepository _favouriteRepository;
    public FavouriteService(IFavouriteRepository favouriteRepository)
    {
        _favouriteRepository = favouriteRepository;
    }

    public List<Favourite> GetAllFavourites()
    {
        return _favouriteRepository.GetAll();
    }

    public Favourite? GetFavouriteById(int id)
    {
        return _favouriteRepository.GetById(id);
    }

    public List<Favourite>? GetFavouriteByUserId(int UserId)
    {
        return _favouriteRepository.GetByUserId(UserId);
    }

    public Favourite? GetFavouriteByRecipeId(int RecipeId)
    {
        var favouriteByRecipeId = _favouriteRepository.GetByRecipeId(RecipeId);

        if ( favouriteByRecipeId == null)
        {
            throw new KeyNotFoundException("This Recipe is not in Favourites");
        }

        return _favouriteRepository.GetByRecipeId(RecipeId);
    }

    public Favourite? GetByUserAndRecipe(int UserId, int RecipeId)
    {   
        var favouriteByRecipeAndUserId = _favouriteRepository.GetByUserAndRecipe(UserId, RecipeId);

        if (favouriteByRecipeAndUserId == null)
        {
            throw new ArgumentException("This Favourite cannot be found because UserId and RecipeId do not match");
        }
        
        return _favouriteRepository.GetByUserAndRecipe(UserId, RecipeId);

    }

    public void CreateFavourite(Favourite favourite)
    {
        _favouriteRepository.Create(favourite);
    }

    public void UpdateFavourite(Favourite favourite)
    {
        _favouriteRepository.Update(favourite);
    }

    public void DeleteFavourite(int id)
    {
        _favouriteRepository.Delete(id);
    }


}