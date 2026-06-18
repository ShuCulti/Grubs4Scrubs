using System.Runtime.InteropServices;
using Grubs4Scrubs.Business;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;

namespace Grubs4Scrubs.DataAccess;

public class FavouriteRepository: IFavouriteRepository
{
    //Sql Exceptions errors numbers stored by a variabe SO THAT I don't forget their meanings
    private readonly int UniqueIndexViolation = 2601;
    private readonly int ForeignKeyViolation = 547;

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
            favourites.Add(MapFavourite(reader));
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

        using SqlDataReader reader = cmd.ExecuteReader();
        

        if (reader.Read())
        {
            return MapFavourite(reader);
        }
        
        return null;
    }

    public List<Favourite> GetByUserId(int UserId)
    {
        var favouritesByUserId = new List<Favourite>();

        using SqlConnection conn = new(_connectionString);
        conn.Open();

        string sql = @"SELECT * FROM Favourites WHERE UserId = @UserId";

        using SqlCommand cmd = new(sql,conn);
        cmd.Parameters.AddWithValue("@UserId", UserId);

        using SqlDataReader reader = cmd.ExecuteReader();

        while (reader.Read())
        {
            favouritesByUserId.Add(MapFavourite(reader));
        }
        return favouritesByUserId;

    }

    public Favourite? GetByRecipeId(int RecipeId)
    {
        using SqlConnection conn = new(_connectionString);
        conn.Open();

        string sql = @"SELECT * FROM Favourites WHERE RecipeId = @RecipeId";

        using SqlCommand cmd = new(sql, conn);
        cmd.Parameters.AddWithValue("@RecipeId", RecipeId);

        using SqlDataReader reader  = cmd.ExecuteReader();

        if (reader.Read())
        {
            return MapFavourite(reader);                                                                                       
        }

        return null;

    }

    public Favourite? GetByUserAndRecipe(int UserId, int RecipeId)
    {
        SqlConnection conn = new(_connectionString);
        conn.Open();

        string sql = @"SELECT * FROM Favourites WHERE UserId = @UserId AND RecipeId = @RecipeId";

        SqlCommand cmd = new(sql, conn);
        cmd.Parameters.AddWithValue("@UserId", UserId);
        cmd.Parameters.AddWithValue("@RecipeId", RecipeId);

        SqlDataReader reader = cmd.ExecuteReader();

        if (reader.Read())
        {
            return MapFavourite(reader);
        }

        return null;
    }

    public void Create(Favourite favourite)
    {
        using SqlConnection conn = new(_connectionString);
        conn.Open();

        string sql = @"INSERT INTO Favourites( UserId, RecipeId )
                        VALUES( @UserId, @RecipeId )";

        using SqlCommand cmd = new(sql, conn);
        cmd.Parameters.AddWithValue("@UserId", favourite.UserId);
        cmd.Parameters.AddWithValue("@RecipeId", favourite.RecipeId);

        cmd.ExecuteNonQuery();
    }

    public void Update(Favourite favourite)
    {

        try
        {
        using SqlConnection conn = new(_connectionString);
        conn.Open();

        string sql = @"UPDATE Favourites SET UserId = @UserId, RecipeId = @RecipeId WHERE Id = @Id";

        using SqlCommand cmd = new(sql, conn);
        cmd.Parameters.AddWithValue("@UserId", favourite.UserId);
        cmd.Parameters.AddWithValue("@RecipeId", favourite.RecipeId);
        cmd.Parameters.AddWithValue("@Id", favourite.Id);

        cmd.ExecuteNonQuery();

        }
        catch (SqlException ex) when (ex.Number == 2627 || ex.Number == 2601)
        {
            throw new DuplicateFavouriteException(ex.Message, ex);
        }
    }

    public void Delete(int id)
    {
        using SqlConnection conn = new(_connectionString);
        conn.Open();

        string sql = @"DELETE FROM Favourites WHERE Id = @Id";

        using SqlCommand cmd = new(sql, conn);
        cmd.Parameters.AddWithValue("@Id",id);

        cmd.ExecuteNonQuery();
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