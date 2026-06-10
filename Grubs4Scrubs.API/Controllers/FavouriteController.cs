using System.Security.Claims;
using Grubs4Scrubs.Business;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Gurbs4Scubs.API;

[ApiController]
[Route("api/[controller]")]

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

    [HttpGet ("{id}")]
    public IActionResult GetById(int id)
    {
        var favouriteById = _favouriteService.GetFavouriteById(id);

        return Ok(favouriteById);
    }

    [HttpGet ("user/{UserId}")]

    public IActionResult GetByUserId(int UserId)
    {
        var favouriteByUserId = _favouriteService.GetFavouriteByUserId(UserId);

        return Ok(favouriteByUserId);
    }

    [HttpGet ("recipeId/{RecipeId}")]

    public IActionResult GetByRecipeId(int RecipeId)
    {
        var favouriteByRecipeId = _favouriteService.GetFavouriteByRecipeId(RecipeId);

        return Ok(favouriteByRecipeId);
    }

    [Authorize]
    [HttpPost]

    public IActionResult Create(CreateFavouriteDto dto)
    {   
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        _favouriteService.GetByUserAndRecipe(userId,dto.RecipeId);

        return Created();
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        _favouriteService.DeleteFavourite(id);    

        return NoContent();
    }

}