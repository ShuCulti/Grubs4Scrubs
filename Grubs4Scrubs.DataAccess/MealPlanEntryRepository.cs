
using Grubs4Scrubs.Business;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;

namespace Grubs4Scrubs.DataAccess;

public class MealPlanEntryRepository: IMealPlanEntryRepository
{
    private readonly string _connectionString;

    public MealPlanEntryRepository(IConfiguration configuration)
    {
        _connectionString = configuration.GetConnectionString("DefaultConnection")!;
    }

    public List<MealPlanEntry> GetAll()
    {
        var mealPlanEntries = new List<MealPlanEntry>();

        using SqlConnection conn = new(_connectionString);
        conn.Open();

        using SqlCommand cmd = new("SELECT * FROM MealPlanEntries", conn);

        using SqlDataReader reader = cmd.ExecuteReader();

        while (reader.Read())
        {
             mealPlanEntries.Add(MapMealPlanEntries(reader)!);
        }

        return mealPlanEntries;
    }

    public List<MealPlanEntry> GetByUserIdAndDateRange(int UserId, DateTime start, DateTime end)
    {
        var mealPlanEntries = new List<MealPlanEntry>();

        using SqlConnection conn = new(_connectionString);
        conn.Open();

        string sql = @"SELECT * FROM MealPlanEntries 
                        WHERE UserId = @UserId AND Date BETWEEN @Start AND @End";

        using SqlCommand cmd = new(sql, conn);
        cmd.Parameters.AddWithValue("@UserId", UserId);
        cmd.Parameters.AddWithValue("@Start", start);
        cmd.Parameters.AddWithValue("@End", end);

        using SqlDataReader reader = cmd.ExecuteReader();

        while (reader.Read())
        {
            mealPlanEntries.Add(MapMealPlanEntries(reader)!);
        }

        return mealPlanEntries;
    }
    public MealPlanEntry? GetById(int id)
    {   

        using SqlConnection conn = new(_connectionString);
        conn.Open();

        string sql = @"SELECT * FROM MealPlanEntries WHERE Id = @Id";

        using SqlCommand cmd = new(sql,conn);
        cmd.Parameters.AddWithValue("@Id", id);

        using SqlDataReader reader = cmd.ExecuteReader();

        if (reader.Read())
        {
            return MapMealPlanEntries(reader)!;
        }
        else
        {
            return null;
        }
    }

    public void Create(MealPlanEntry mealPlanEntry)
    {
        using SqlConnection conn = new(_connectionString);
        conn.Open();

        string sql = @"INSERT INTO MealPlanEntries  (UserId, RecipeId, Date, MealType, Servings) 
                        VALUES(@UserId, @RecipeId, @Date, @MealType, @Servings)";

        using SqlCommand cmd = new(sql, conn);

        cmd.Parameters.AddWithValue("@UserId", mealPlanEntry.UserId);
        cmd.Parameters.AddWithValue("@RecipeId", mealPlanEntry.RecipeId);
        cmd.Parameters.AddWithValue("@Date", mealPlanEntry.Date);
        cmd.Parameters.AddWithValue("@MealType", mealPlanEntry.MealType);
        cmd.Parameters.AddWithValue("@Servings", mealPlanEntry.Servings);

        cmd.ExecuteNonQuery();
    }
    public void Update(MealPlanEntry mealPlanEntry)
    {
        using SqlConnection conn = new(_connectionString);
        conn.Open();

        string sql = @"UPDATE MealPlanEntries SET UserId = @UserId, RecipeId = @RecipeId, Date = @Date, MealType = @MealType, Servings = @Servings WHERE Id = @Id";

        using SqlCommand cmd = new(sql, conn);

        cmd. Parameters.AddWithValue("@UserId",  mealPlanEntry.UserId);
        cmd.Parameters.AddWithValue("@RecipeId", mealPlanEntry.RecipeId);
        cmd.Parameters.AddWithValue("@Date", mealPlanEntry.Date);
        cmd.Parameters.AddWithValue("@MealType", mealPlanEntry.MealType);
        cmd.Parameters.AddWithValue("@Servings", mealPlanEntry.Servings);

        cmd.ExecuteNonQuery();

    }

    public void Delete(int id)
    {
        using SqlConnection conn = new(_connectionString);
        conn.Open();

        string sql = @"DELETE FROM MealPlanEntries WHERE Id = @Id";

        using SqlCommand cmd = new(sql,conn);

        cmd.Parameters.AddWithValue("@Id", id);

        cmd.ExecuteNonQuery();
    }


    private MealPlanEntry MapMealPlanEntries(SqlDataReader reader)
    {
        return new MealPlanEntry(
            reader.GetInt32(reader.GetOrdinal("Id")),
            reader.GetInt32(reader.GetOrdinal("UserId")),
            reader.GetInt32(reader.GetOrdinal("RecipeId")),
            reader.GetDateTime(reader.GetOrdinal("Date")),
            reader.GetString(reader.GetOrdinal("MealType")),
            reader.GetInt32(reader.GetOrdinal("Servings")),
            reader.GetDateTime(reader.GetOrdinal("CreatedAt"))
        );

    }

}