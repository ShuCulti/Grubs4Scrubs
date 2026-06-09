using Grubs4Scrubs.Business;
using Microsoft.AspNetCore.Mvc;

namespace Gurbs4Scubs.API;

[ApiController]
[Route("/api[controller]")]

public class FavouriteController: ControllerBase
{
    private readonly FavouriteService _favouriteService;
    public FavouriteController(IFavouriteRepository favouriteRepository)
    {
        _favouriteService = new FavouriteService(favouriteRepository);
    }

    [HttpGet]

    public IActionResult GetAll()
    {
        var allFavourites = _favouriteService.GetAllFavourites();
        return Ok(allFavourites);
    }

    [HttpGet]
    public IActionResult GetById(int id)
    {
        var favouriteById = _favouriteService.GetFavouriteById(id);

        return Ok(favouriteById);
    }

    [HttpGet]

    public IActionResult GetByUserId(int UserId)
    {
        var favouriteByUserId = _favouriteService.GetFavouriteByUserId(UserId);

        return Ok(favouriteByUserId);
    }

    [HttpGet]

    public IActionResult GetByRecipeId(int RecipeId)
    {
        var favouriteByRecipeId = _favouriteService.GetFavouriteByRecipeId(RecipeId);

        return Ok(favouriteByRecipeId);
    }

    [HttpPost]

    public IActionResult Create(Favourite favourite)
    {   
        _favouriteService.CreateFavourite(favourite);

        return Created();
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        _favouriteService.DeleteFavourite(id);    

        return NoContent();
    }

}