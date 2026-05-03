using Microsoft.Data.SqlClient;

namespace Grubs4Scrubs.DataAccess;

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
            INSERT INTO Recipes (Title, Description, Tag, PrepTime, CookTime, Servings, EstimatedBudget, Category, CreatedAt, ImageUrl, Tip, Calories, Protein, Fats, Carbs, Ingredients, Instructions)
            VALUES
            ('Midnight Exam Ramen',
             'A steaming bowl of gourmet instant ramen with soft boiled egg and green onions. The ultimate late-night study fuel.',
             'Dinner,Asian Fusion', 5, 10, 1, 2.20, 'Dinner', GETUTCDATE(),
             '/midnightexamramen.png',
             'Add a slice of American cheese on top and let it melt into the broth for a creamy, restaurant-style finish on a student budget.',
             '480 kcal', '14g', '18g', '62g',
             '[""1 pack instant ramen"",""1 fresh egg"",""Chopped green onions"",""Sriracha (to taste)"",""1 tsp unsalted butter""]',
             '[{""title"":""Boil the Base"",""desc"":""Boil 500ml of water in a small pot. For extra flavor, you can use 400ml water and 100ml chicken stock if available.""},{""title"":""Noodle Fusion"",""desc"":""Add the instant noodles and the seasoning packet. Stir gently to break up the noodles. Let them cook for about 1 minute until they start to soften.""},{""title"":""The Perfect Poach"",""desc"":""Lower the heat. Carefully crack an egg into the center of the pot. Do not stir! Let it poach in the hot broth for exactly 2 minutes for a runny yolk.""},{""title"":""Final Flourish"",""desc"":""Pour the ramen into a bowl. Top with a generous amount of chopped green onions, a pat of butter, and a beautiful spiral of Sriracha.""}]'),
            ('University Power Bowl',
             'A hearty breakfast bowl packed with oats, fruits, and protein to fuel your morning lectures.',
             'Breakfast,Healthy', 5, 15, 1, 3.50, 'Breakfast', GETUTCDATE(),
             '/unipowerbowl.png',
             'Prep overnight oats the night before in a mason jar for a zero-effort morning.',
             '420 kcal', '12g', '14g', '65g',
             '[""1/2 cup rolled oats"",""1 banana (sliced)"",""1 tbsp peanut butter"",""1 tbsp honey"",""Handful of blueberries"",""Splash of oat milk""]',
             '[{""title"":""Cook the Oats"",""desc"":""Cook rolled oats with water or milk according to packet directions. Aim for a thick, creamy consistency.""},{""title"":""Build Your Bowl"",""desc"":""Transfer oats to a bowl. Arrange sliced banana and blueberries on top in neat sections.""},{""title"":""Add the Goods"",""desc"":""Drizzle peanut butter and honey over the top. Add a splash of cold oat milk around the edges for contrast.""}]'),
            ('Finals Week Stir-Fry',
             'A quick and budget-friendly veggie stir-fry that''s ready in under 20 minutes.',
             'Dinner,Quick', 10, 20, 2, 4.50, 'Dinner', GETUTCDATE(),
             '/FWstirfry.png',
             'Leftover stir-fry reheats great. Pack it for lunch tomorrow and save yourself another meal''s budget.',
             '380 kcal', '10g', '12g', '58g',
             '[""1 pack stir-fry noodles"",""1 bell pepper (sliced)"",""1 carrot (julienned)"",""2 cloves garlic (minced)"",""2 tbsp soy sauce"",""1 tbsp sesame oil"",""Handful of beansprouts""]',
             '[{""title"":""Prep the Veg"",""desc"":""Slice the bell pepper, julienne the carrot, and mince the garlic. Have everything ready before you start cooking.""},{""title"":""Heat and Sear"",""desc"":""Heat sesame oil in a wok or large pan over high heat. Add garlic and stir for 30 seconds until fragrant.""},{""title"":""Stir-Fry"",""desc"":""Add the vegetables and toss constantly for 3-4 minutes. They should be bright and still have a bite.""},{""title"":""Noodle Up"",""desc"":""Add the noodles and soy sauce. Toss everything together for 2 minutes. Top with beansprouts and serve immediately.""}]');
        ";

        using SqlCommand insertCmd = new(sql, conn);
        insertCmd.ExecuteNonQuery();
    }
}
