using System.Collections.Generic;
using Grubs4Scrubs.Domain;

namespace Grubs4Scrubs.Tests;

public class FakeRepository : IRecipeRepository
{
    private readonly List<Recipe> _recipes = new List<Recipe>();
    public List<Recipe> GetAll()
    {
        var _recipes = this._recipes;
        
        return _recipes;
    }
    private int _nextId = 1;

    public Recipe? GetById(int id)
    {
        return _recipes.FirstOrDefault(r => r.Id == id);

    }


    public void Create (Recipe recipe)
    {
        recipe.Id = _nextId++;
        _recipes.Add(recipe);
               
    }


    public void Update (Recipe recipe)
    {               
        var index = _recipes.FindIndex((r) => r.Id == recipe.Id);
        if (index != -1)
        {
            _recipes[index]= recipe;
        }

    }

    public void Delete (int id)
    {
        _recipes.RemoveAll(r => r.Id == id);
    
    }
}

