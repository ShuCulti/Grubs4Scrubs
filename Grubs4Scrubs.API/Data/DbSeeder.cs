using Microsoft.Data.SqlClient;

namespace Grubs4Scrubs.Data;

public static class DbSeeder
{
    public static void Seed(string connectionString)
    {
        using SqlConnection conn = new(connectionString);
        conn.Open();

        // Check if there are already recipes in the table
        using SqlCommand checkCmd = new("SELECT COUNT(*) FROM Recipes", conn);
        int count = (int)checkCmd.ExecuteScalar();

        if (count > 0) return; // Already has data, skip seeding

        string sql = @"
            INSERT INTO Recipes (Title, Description, Tag, PrepTime, CookTime, Servings, EstimatedBudget, Category, CreatedAt)
            VALUES
            ('Spaghetti Bolognese', 'Classic Italian pasta with a rich meat sauce', Italian, 15, 30, 4, 12.50, 'Dinner', GETUTCDATE()),
            ('Chicken Stir Fry', 'Quick and healthy stir fry with vegetables', Chinese, 10, 15, 2, 9.00, 'Dinner', GETUTCDATE()),
            ('Pancakes', 'Fluffy buttermilk pancakes for breakfast', American, 5, 10, 3, 5.00, 'Breakfast', GETUTCDATE());
        ";

        using SqlCommand insertCmd = new(sql, conn);
        insertCmd.ExecuteNonQuery();
    }
}
