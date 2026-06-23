
using Grubs4Scrubs.Business;
using Microsoft.AspNetCore.Mvc;

namespace Grubs4Scrubs.Controllers;

[ApiController]
[Route("api/[controller]")]
public class RecipeController : ControllerBase
{
    private readonly RecipeService _recipeService;

    public RecipeController(RecipeService recipeService)
    {
        _recipeService = recipeService;
    }

    // GET api/recipe
    [HttpGet]
    public IActionResult GetAll()
    {
        var recipes = _recipeService.GetAllRecipes();
        return Ok(recipes);
    }

    // GET api/recipe/5
    [HttpGet("{id}")]
    public IActionResult GetById(int id)
    {
        var recipe = _recipeService.GetRecipeById(id);

        if (recipe == null)
        {
            return NotFound();
        }

        return Ok(recipe);
    }

    // POST api/recipe
    [HttpPost]
    public IActionResult Create(Recipe recipe)
    {
        try
        {
            _recipeService.CreateRecipe(recipe);
        }

        catch(RecipeForeignKeyNotFoundException)
        {
            return NotFound("Recipe Not Found");
        }

        return Created();
    }

    // PUT api/recipe/5
    [HttpPut("{id}")]
    public IActionResult Update(int id, Recipe recipe)
    {
        recipe.Id = id;
        _recipeService.UpdateRecipe(recipe);
        return NoContent();
    }

    // DELETE api/recipe/5
    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        _recipeService.DeleteRecipe(id);
        return NoContent();
    }
}
