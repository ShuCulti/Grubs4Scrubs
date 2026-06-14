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

    [Authorize]
    [HttpGet]

    [HttpGet ("{id}")]
    public IActionResult GetById(int id)
    {
        var favouriteById = _favouriteService.GetFavouriteById(id);

        return Ok(favouriteById);
    }

    [Authorize ("AllowReact")]
    [HttpPost]

    public IActionResult Create(CreateFavouriteDto dto)
    {   
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        
        var favourite = new Favourite(
            userId,
            dto.RecipeId
        );

        var favouriteExists = _favouriteService.GetByUserAndRecipe(userId,dto.RecipeId);

        if (favouriteExists != null)
        {
            return Conflict("Can't create new Favourite, Favourite already exists");
        }

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