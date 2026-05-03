using Grubs4Scrubs.Domain;
using Grubs4Scrubs.Business;

public class FakeRecipeRepository : IRecipeRepository
{
    private readonly List<Recipe> _recipes = new();
    private int _nextId = 1;

    public List<Recipe> GetAll() => _recipes;

    public Recipe? GetById(int id) => _recipes.FirstOrDefault(r => r.Id == id);

    public void Create(Recipe recipe)
    {
        recipe.Id = _nextId++;
        _recipes.Add(recipe);
    }

    public void Update(Recipe recipe)
    {
        var index = _recipes.FindIndex(r => r.Id == recipe.Id);
        if (index >= 0) _recipes[index] = recipe;
    }

    public void Delete(int id)
    {
        _recipes.RemoveAll(r => r.Id == id);
    }
}
