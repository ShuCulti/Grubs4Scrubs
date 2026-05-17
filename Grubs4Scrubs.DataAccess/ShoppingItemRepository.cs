using Grubs4Scrubs.Domain;
using Microsoft.Extensions.Configuration;
using Microsoft.Data.SqlClient;

namespace Grubs4Scrubs.DataAccess;

public class ShoppingItemRepository : IShoppingItemRepository
{
    private readonly string _connectionString;

    public ShoppingItemRepository(IConfiguration configuration)
    {
        _connectionString = configuration.GetConnectionString("DefaultConnection");
    }

    public List<ShoppingItem> GetAll()
    {
        var shoppingItems = new List<ShoppingItem>();

        using SqlConnection conn = new(_connectionString);
        conn.Open();

        using SqlCommand cmd = new("SELECT * FROM ShoppingItems", conn);
        using SqlDataReader reader = cmd.ExecuteReader();

        while (reader.Read())
        {
            shoppingItems.Add(MapShoppingItem(reader));
        }

        return shoppingItems;
    }

    public ShoppingItem? GetById(int id)
    {
        using SqlConnection conn = new(_connectionString);
        conn.Open();

        using SqlCommand cmd = new("SELECT * FROM ShoppingItems WHERE Id = @Id", conn);
        cmd.Parameters.AddWithValue("@Id",id);

        using SqlDataReader reader = cmd.ExecuteReader();

        if (reader.Read())
        {
            return MapShoppingItem(reader);
        }

        return null;
        
    }

    public void Create(ShoppingItem shoppingItem)
    {
        using SqlConnection conn = new(_connectionString);
        conn.Open();

        string sql = @"INSERT INTO ShoppingItems (UserId, Id, Name, Quantity, Price, IsChecked)
                        VALUE (@UserId, @Id, @Name, @Quantity, @Price, @IsChecked)";

        using SqlCommand cmd = new(sql, conn);
        cmd.Parameters.AddWithValue("@UserId", shoppingItem.UserId);
        cmd.Parameters.AddWithValue("@Id", shoppingItem.Id);
        cmd.Parameters.AddWithValue("@Name", shoppingItem.Name);
        cmd.Parameters.AddWithValue("@Quantity", shoppingItem.Quantity);
        cmd.Parameters.AddWithValue("@Price", shoppingItem.Price);
        cmd.Parameters.AddWithValue("@IsChecked", shoppingItem.IsChecked);

        cmd.ExecuteNonQuery();

    }

    public void Update(ShoppingItem shoppingItem)
    {
        using SqlConnection conn = new(_connectionString);
        conn.Open();

        using SqlCommand cmd = new("UPDATE ShoppingItems SET Name = @Name, Quantity = @Quantity, Price = @Price, IsChecked = @IsChecked WHERE Id = @Id", conn);

        cmd.Parameters.AddWithValue("@Id", shoppingItem.Id);
        cmd.Parameters.AddWithValue("@Name", shoppingItem.Name);
        cmd.Parameters.AddWithValue("@Quantity", shoppingItem.Quantity);
        cmd.Parameters.AddWithValue("@Price", shoppingItem.Price);
        cmd.Parameters.AddWithValue("@IsChecked", shoppingItem.IsChecked);

        cmd.ExecuteNonQuery();
    }

    public void Delete(int id)
    {
        using SqlConnection conn = new(_connectionString);
        conn.Open();

        using SqlCommand cmd = new("DELETE FROM ShoppingItems WHERE Id = @Id", conn);
        cmd.Parameters.AddWithValue("@Id", id);

        cmd.ExecuteNonQuery();
    }


    private ShoppingItem MapShoppingItem(SqlDataReader reader)
    {
        return new ShoppingItem
        {
            UserId = reader.IsDBNull(reader.GetOrdinal("UserId"))
                ? 0 : reader.GetInt32(reader.GetOrdinal("UserId")),
            Id = reader.GetInt32(reader.GetOrdinal("Id")),
            Name = reader.GetString(reader.GetOrdinal("Name")),
            Quantity = reader.GetString(reader.GetOrdinal("Quantity")),
            Price = reader.GetDecimal(reader.GetOrdinal("Price")),
            IsChecked = reader.GetBoolean(reader.GetOrdinal("IsChecked")),

        };
    }


}