using Microsoft.Net.Http;
using Grubs4Scrubs.Business;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics.Tracing;

namespace Grubs4Scrubs.API;

[ApiController]
[Route("api/[controller]")]

public class MealPlanEntryController: ControllerBase
{
    private readonly MealPlanEntryService _mealPlanEntryService;
    public MealPlanEntryController(MealPlanEntryService mealPlanEntryService)
    {
        _mealPlanEntryService = mealPlanEntryService;
    }
    [HttpGet]

    public IActionResult GetAll()
    {
        var mealPlanEntries = _mealPlanEntryService.GetAllMealPlanEntries();

        return Ok(mealPlanEntries);
    }

    [HttpGet ("{id}")]
    public IActionResult GetById(int id)
    {
        var mealPlanEntry = _mealPlanEntryService.GetMealPlanEntryById(id);

        return Ok(mealPlanEntry);

    }

    [HttpPost]
    public IActionResult Create(MealPlanEntry mealPlanEntry)
    {
        _mealPlanEntryService.CreateMealPlanEntry(mealPlanEntry);
        return Created();
    }

    [HttpPut("{id}")]
    public IActionResult Update(int id, MealPlanEntry mealPlanEntry)
    {
        if (mealPlanEntry.Id == id)
        {
            _mealPlanEntryService.CreateMealPlanEntry(mealPlanEntry);
        }
        if (mealPlanEntry.Id != id)
        {
            throw new ArgumentException("");
        }
        
        return NoContent();
    }

    [HttpDelete ("{id}")]
    public IActionResult Delete(int id)
    {
        _mealPlanEntryService.DeleteMealPlanEntry(id);
        return NoContent();
    }

}