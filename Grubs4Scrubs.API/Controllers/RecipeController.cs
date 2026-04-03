using Grubs4Scrubs.Models;
using Grubs4Scrubs.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;

[ApiController]
[Route("[controller]")]
public class RecipeController : ControllerBase
{

    private readonly string _connectionString;

    public RecipeController(IConfiguration configuration)
    {
        _connectionString = configuration.GetConnectionString("DefaultConnection");
    }
    // GET all action
    [HttpGet]
    public IActionResult GetAll()
    {
        var recipes = new List<Recipe>();
        
        using SqlConnection conn = new(_connectionString);
        conn.Open();

        using SqlCommand cmd = new("SELECT * FROM Recipes", conn);
        using SqlDataReader reader = cmd.ExecuteReader();

        while (reader.Read())
        {
            recipes.Add(new Recipe
            {
                Id = reader.GetInt32(reader.GetOrdinal("Id")),
                Title = reader.GetString(reader.GetOrdinal("Title")),
                Description = reader.GetString(reader.GetOrdinal("Description")),
                PrepTime = reader.GetInt32(reader.GetOrdinal("PrepTime")),
                CookTime = reader.GetInt32(reader.GetOrdinal("CookTime")),
                Servings = reader.GetInt32(reader.GetOrdinal("Servings")),
                EstimatedBudget = reader.GetDecimal(reader.GetOrdinal("Estimated Budget")),
                Category = reader.GetString(reader.GetOrdinal("Category")),
                CreatedAt = reader.GetDateTime(reader.GetOrdinal("CreatedAt"))
            });
        }
        return Ok(recipes);
    }

    // POST action
    [HttpPost]
    public IActionResult Create(Recipe recipe)
    {
        using SqlConnection conn = new(_connectionString);
        conn.Open();

        string sql = @"INSERT INTO Recipes (Title, Description, PrepTime, CookTine, Servings, EstimatedBudget, Category, CreatedAt)
                        VALUES (@Title, @Desc, @Prep, @Cook, @Serv, @Budget, @Cat, @Created)";

        using SqlCommand cmd = new(sql, conn);
        cmd.Parameters.AddWithValue("@Title", recipe.Title);
        cmd.Parameters.AddWithValue("@Desc", recipe.Description);
        cmd.Parameters.AddWithValue("@Prep", recipe.PrepTime);
        cmd.Parameters.AddWithValue("@Cook", recipe.CookTime);
        cmd.Parameters.AddWithValue("@Serv", recipe.Servings);
        cmd.Parameters.AddWithValue("@Budget", recipe.EstimatedBudget);
        cmd.Parameters.AddWithValue("@Cat", recipe.Category);
        cmd.Parameters.AddWithValue("@Created", DateTime.UtcNow);

        cmd.ExecuteNonQuery();

        return Created();
    }
    // PUT action

    // DELETE action
}


