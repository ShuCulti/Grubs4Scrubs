using Grubs4Scrubs.Business;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;

namespace Grubs4Scrubs.DataAccess;

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
        else
        {
            return null;
        }

    }

    public void Create(Recipe recipe)
    {
        try {
        using SqlConnection conn = new(_connectionString);
        conn.Open();

        string sql = @"INSERT INTO Recipes (Title, Description, Tag, PrepTime, CookTime, Servings, EstimatedBudget, Category, CreatedAt, ImageUrl, Ingredients, Instructions, UserId, Tips, Calories, Protein, Carbs, Fats)
                        VALUES (@Title, @Desc, @Tag, @Prep, @Cook, @Serv, @Budget, @Cat, @Created,@ImageUrl, @Ingredients, @Instructions, @UserId, @Tips, @Calories, @Protein, @Carbs, @Fats)";

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
        cmd.Parameters.AddWithValue("@ImageUrl", recipe.ImageUrl);
        cmd.Parameters.AddWithValue("@Ingredients", recipe.Ingredients);    
        cmd.Parameters.AddWithValue("@Instructions", recipe.Instructions);
        cmd.Parameters.AddWithValue("@UserId", recipe.UserId ?? (object)DBNull.Value);
        cmd.Parameters.AddWithValue("@Tips", recipe.Tips);
        cmd.Parameters.AddWithValue("@Calories", recipe.Calories);
        cmd.Parameters.AddWithValue("@Protein", recipe.Protein);
        cmd.Parameters.AddWithValue("@Carbs", recipe.Carbs);
        cmd.Parameters.AddWithValue("@Fats", recipe.Fats);

        cmd.ExecuteNonQuery();

        }
        catch(SqlException ex) when (ex.Number == SqlErrorCodes.ForeignKeyViolation)
        {
            throw new RecipeForeignKeyNotFoundException(message: "Recipe's Foreign Key Not Found Or Missing", ex);
        }


    }

    public void Update(Recipe recipe)
    {
        using SqlConnection conn = new(_connectionString);
        conn.Open();

        string sql = @"UPDATE Recipes SET
                        Title = @Title, Description = @Desc, Tag = @Tag, ImageUrl = @ImageUrl,
                        PrepTime = @Prep, CookTime = @Cook, Servings = @Serv, 
                        EstimatedBudget = @Budget, Category = @Cat, Ingredients = @Ingredients,
                        Instructions = @Instructions, Tips = @Tips, Calories = @Calories,
                        Protein = @Protein, Carbs = @Carbs, Fats = @Fats
                        WHERE Id = @Id";

        using SqlCommand cmd = new(sql, conn);
        cmd.Parameters.AddWithValue("@Id", recipe.Id);
        cmd.Parameters.AddWithValue("@Title", recipe.Title);
        cmd.Parameters.AddWithValue("@Desc", recipe.Description);
        cmd.Parameters.AddWithValue("@Tag", recipe.Tag);
        cmd.Parameters.AddWithValue("@ImageUrl", recipe.ImageUrl);
        cmd.Parameters.AddWithValue("@Prep", recipe.PrepTime);
        cmd.Parameters.AddWithValue("@Cook", recipe.CookTime);
        cmd.Parameters.AddWithValue("@Serv", recipe.Servings);
        cmd.Parameters.AddWithValue("@Budget", recipe.EstimatedBudget);
        cmd.Parameters.AddWithValue("@Cat", recipe.Category);
        cmd.Parameters.AddWithValue("@Ingredients", recipe.Ingredients);    
        cmd.Parameters.AddWithValue("@Instructions", recipe.Instructions);
        cmd.Parameters.AddWithValue("@Tips", recipe.Tips);
        cmd.Parameters.AddWithValue("@Calories", recipe.Calories);
        cmd.Parameters.AddWithValue("@Protein", recipe.Protein);
        cmd.Parameters.AddWithValue("@Carbs", recipe.Carbs);
        cmd.Parameters.AddWithValue("@Fats", recipe.Fats);

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
            CreatedAt = reader.GetDateTime(reader.GetOrdinal("CreatedAt")),
            ImageUrl = reader.IsDBNull(reader.GetOrdinal("ImageUrl"))
            ? String.Empty : reader.GetString(reader.GetOrdinal("ImageUrl")),
            Ingredients = reader.GetString(reader.GetOrdinal("Ingredients")),
            Instructions = reader.GetString(reader.GetOrdinal("Instructions")),
            UserId = reader.IsDBNull(reader.GetOrdinal("UserId"))
            ? 0 : reader.GetInt32(reader.GetOrdinal("UserId")),
            Tips = reader.GetString(reader.GetOrdinal("Tips")),
            Fats = reader.GetInt32(reader.GetOrdinal("Fats")),
            Carbs = reader.GetInt32(reader.GetOrdinal("Carbs")),
            Protein = reader.GetInt32(reader.GetOrdinal("Protein")),
            Calories = reader.GetInt32(reader.GetOrdinal("Calories"))
        };
    }
}