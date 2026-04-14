using Grubs4Scrubs.Domain;
using Grubs4Scrubs.Business;
using Microsoft.AspNetCore.Mvc;

namespace Grubs4Scrubs.Controllers;

// The controller is now THIN — it only handles HTTP stuff.
// No SQL, no business logic. It just:
//   1. Receives the request
//   2. Calls the service
//   3. Returns the response

[ApiController]
[Route("api/[controller]")]
public class RecipeController : ControllerBase
{
    private readonly IRecipeService _recipeService;

    // The SERVICE is injected — not the connection string anymore
    public RecipeController(IRecipeService recipeService)
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
        _recipeService.CreateRecipe(recipe);
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
