using System.Runtime.InteropServices;
using Grubs4Scrubs.Business;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;

namespace Grubs4Scrubs.DataAccess;

public class FavouriteRepository: IFavouriteRepository
{
    private readonly string _connectionString;
    public FavouriteRepository(IConfiguration configuration)
    {
        _connectionString = configuration.GetConnectionString("DefaultConnection")!;
    }

    public List<Favourite> GetAll()
    {
        var favourites = new List<Favourite>();

        using SqlConnection conn = new(_connectionString);
        conn.Open();

        string sql = @"SELECT * FROM Favourites";

        using SqlCommand cmd = new(sql,conn);

        using SqlDataReader reader = cmd.ExecuteReader();

        while (reader.Read())
        {
            MapFavourite(reader);
        }
        return favourites;
    }

    public Favourite? GetById(int id)
    {
        using SqlConnection conn = new(_connectionString);
        conn.Open();

        string sql = @"SELECT * FROM Favourites WHERE Id = @Id";
    
        using SqlCommand cmd = new(sql, conn);
        cmd.Parameters.AddWithValue("@Id", id);

        SqlDataReader reader = cmd.ExecuteReader();
        

        if (reader.Read())
        {
            return MapFavourite(reader);
        }
        
        return null;
    }

    public Favourite? GetByUserId(int UserId)
    {
        SqlConnection conn = new(_connectionString);
        conn.Open();

        string sql = @"SELECT * FROM Favourites WHERE UserId = @UserId";

        SqlCommand cmd = new(sql,conn);
        cmd.Parameters.AddWithValue("@UserId", UserId);

        SqlDataReader reader = cmd.ExecuteReader();

        if (reader.Read())
        {
            return MapFavourite(reader);
        }
        return null;

    }

    public Favourite? GetByRecipeId(int RecipeId)
    {
        using SqlConnection conn = new(_connectionString);
        conn.Open();

        string sql = @"SELECT * FROM Favourites WHERE RecipeId = @RecipeId";

        using SqlCommand cmd = new(sql, conn);
        cmd.Parameters.AddWithValue("RecipeId", RecipeId);

        using SqlDataReader reader  = cmd.ExecuteReader();

        if (reader.Read())
        {
            MapFavourite(reader);                                                                                       
        }

        return null;

    }

    public void Create(Favourite favourite)
    {
        
    }

    public void Update(Favourite favourite)
    {
        
    }

    public void Delete(int id)
    {
        
    }

    public Favourite MapFavourite(SqlDataReader reader)
    {
        return new Favourite(
            reader.GetInt32(reader.GetOrdinal("Id")),
            reader.GetInt32(reader.GetOrdinal("UserId")),
            reader.GetInt32(reader.GetOrdinal("RecipeId")),
            reader.GetDateTime(reader.GetOrdinal("CreatedAt"))
        );
    }
}