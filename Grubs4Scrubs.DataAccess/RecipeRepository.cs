using Grubs4Scrubs.Domain;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;

namespace Grubs4Scrubs.DataAccess;

// This is the IMPLEMENTATION — the actual SQL queries live here.
// This is the ONLY place in the entire app that talks to the database.
public class RecipeRepository : IRecipeRepository
{
    private readonly string _connectionString;

    // The connection string is injected through the constructor
    public RecipeRepository(IConfiguration configuration)
    {
        _connectionString = configuration.GetConnectionString("DefaultConnection");
    }

    public List<Recipe> GetAll()
    {
        var recipes = new List<Recipe>();

        using SqlConnection conn = new(_connectionString);
        conn.Open();

        using SqlCommand cmd = new("SELECT * FROM Recipes", conn);
        using SqlDataReader reader = cmd.ExecuteReader();

        while (reader.Read())
        {
            recipes.Add(MapRecipe(reader));
        }

        return recipes;
    }

    public Recipe? GetById(int id)
    {
        using SqlConnection conn = new(_connectionString);
        conn.Open();

        using SqlCommand cmd = new("SELECT * FROM Recipes WHERE Id = @Id", conn);
        cmd.Parameters.AddWithValue("@Id", id);

        using SqlDataReader reader = cmd.ExecuteReader();

        if (reader.Read())
        {
            return MapRecipe(reader);
        }

        return null;
    }

    public void Create(Recipe recipe)
    {
        using SqlConnection conn = new(_connectionString);
        conn.Open();

        string sql = @"INSERT INTO Recipes (Title, Description, Tag, PrepTime, CookTime, Servings, EstimatedBudget, Category, CreatedAt)
                        VALUES (@Title, @Desc, @Tag, @Prep, @Cook, @Serv, @Budget, @Cat, @Created)";

        using SqlCommand cmd = new(sql, conn);
        cmd.Parameters.AddWithValue("@Title", recipe.Title);
        cmd.Parameters.AddWithValue("@Desc", recipe.Description);
        cmd.Parameters.AddWithValue("@Tag", recipe.Tag);
        cmd.Parameters.AddWithValue("@Prep", recipe.PrepTime);
        cmd.Parameters.AddWithValue("@Cook", recipe.CookTime);
        cmd.Parameters.AddWithValue("@Serv", recipe.Servings);
        cmd.Parameters.AddWithValue("@Budget", recipe.EstimatedBudget);
        cmd.Parameters.AddWithValue("@Cat", recipe.Category);
        cmd.Parameters.AddWithValue("@Created", DateTime.UtcNow);

        cmd.ExecuteNonQuery();
    }

    public void Update(Recipe recipe)
    {
        using SqlConnection conn = new(_connectionString);
        conn.Open();

        string sql = @"UPDATE Recipes SET
                        Title = @Title, Description = @Desc, Tag = @Tag,
                        PrepTime = @Prep, CookTime = @Cook, Servings = @Serv,
                        EstimatedBudget = @Budget, Category = @Cat
                        WHERE Id = @Id";

        using SqlCommand cmd = new(sql, conn);
        cmd.Parameters.AddWithValue("@Id", recipe.Id);
        cmd.Parameters.AddWithValue("@Title", recipe.Title);
        cmd.Parameters.AddWithValue("@Desc", recipe.Description);
        cmd.Parameters.AddWithValue("@Tag", recipe.Tag);
        cmd.Parameters.AddWithValue("@Prep", recipe.PrepTime);
        cmd.Parameters.AddWithValue("@Cook", recipe.CookTime);
        cmd.Parameters.AddWithValue("@Serv", recipe.Servings);
        cmd.Parameters.AddWithValue("@Budget", recipe.EstimatedBudget);
        cmd.Parameters.AddWithValue("@Cat", recipe.Category);

        cmd.ExecuteNonQuery();
    }

    public void Delete(int id)
    {
        using SqlConnection conn = new(_connectionString);
        conn.Open();

        using SqlCommand cmd = new("DELETE FROM Recipes WHERE Id = @Id", conn);
        cmd.Parameters.AddWithValue("@Id", id);

        cmd.ExecuteNonQuery();
    }

    // Private helper — maps a database row to a Recipe object.
    // Used by GetAll and GetById so we don't repeat ourselves.
    private Recipe MapRecipe(SqlDataReader reader)
    {
        return new Recipe
        {
            Id = reader.GetInt32(reader.GetOrdinal("Id")),
            Title = reader.GetString(reader.GetOrdinal("Title")),
            Description = reader.GetString(reader.GetOrdinal("Description")),
            Tag = reader.GetString(reader.GetOrdinal("Tag")),
            PrepTime = reader.GetInt32(reader.GetOrdinal("PrepTime")),
            CookTime = reader.GetInt32(reader.GetOrdinal("CookTime")),
            Servings = reader.GetInt32(reader.GetOrdinal("Servings")),
            EstimatedBudget = reader.GetDecimal(reader.GetOrdinal("EstimatedBudget")),
            Category = reader.GetString(reader.GetOrdinal("Category")),
            CreatedAt = reader.GetDateTime(reader.GetOrdinal("CreatedAt"))
        };
    }
}