using Grubs4Scrubs.Domain;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;

namespace Grubs4Scrubs.DataAccess;

public class UserRepository : IUserRepository
{
    private readonly string _connectionString;
    public UserRepository(IConfiguration configuration)
    {
        _connectionString = configuration.GetConnectionString("DefaultConnection");
    }

    public List<User> GetAll()
    {
        var users = new List<User>();

        using SqlConnection conn = new(_connectionString);
        conn.Open();

        using SqlCommand cmd = new("SELECT * FROM Users", conn);
        using SqlDataReader reader = cmd.ExecuteReader();

        while (reader.Read())
        {
            users.Add(MapUser(reader));
        }

    return users;
}

    public User? GetById(int id)
    {
        using SqlConnection conn = new(_connectionString);
        conn.Open();

        using SqlCommand cmd = new("SELECT * FROM Users WHERE Id = @Id", conn);
        cmd.Parameters.AddWithValue("@Id", id);

        using SqlDataReader reader = cmd.ExecuteReader();

        if (reader.Read())
        {
            return MapUser(reader);
        }

        return null;
    }

    public void Create(User user)
    {
        using SqlConnection conn = new(_connectionString);
        conn.Open();

        string sql = @"INSERT INTO Users (Email, PasswordHash, UserName, GoogleId, CreatedAt)
                        VALUES (@Email, @PasswordHash, @UserName, @GoogleId, @Created)";

        using SqlCommand cmd = new(sql, conn);
        cmd.Parameters.AddWithValue("@Email", user.Email);
        cmd.Parameters.AddWithValue("@PasswordHash", user.PasswordHash);
        cmd.Parameters.AddWithValue("@UserName", user.UserName);
        cmd.Parameters.AddWithValue("@GoogleId", (object?)user.GoogleId ?? DBNull.Value);
        cmd.Parameters.AddWithValue("@Created", DateTime.UtcNow);

        cmd.ExecuteNonQuery();
    }

    public void Update(User user)
    {
        using SqlConnection conn = new(_connectionString);
        conn.Open();

        string sql = @"UPDATE Users SET
                        Email = @Email, PasswordHash = @PasswordHash,
                        UserName = @UserName, GoogleId = @GoogleId
                        WHERE Id = @Id";

        using SqlCommand cmd = new(sql, conn);
        cmd.Parameters.AddWithValue("@Id", user.Id);
        cmd.Parameters.AddWithValue("@Email", user.Email);
        cmd.Parameters.AddWithValue("@PasswordHash", user.PasswordHash);
        cmd.Parameters.AddWithValue("@UserName", user.UserName);
        cmd.Parameters.AddWithValue("@GoogleId", (object?)user.GoogleId ?? DBNull.Value);

        cmd.ExecuteNonQuery();
    }

    public void Delete(int id)
    {
        using SqlConnection conn = new(_connectionString);
        conn.Open();

        using SqlCommand cmd = new("DELETE FROM Users WHERE Id = @Id", conn);
        cmd.Parameters.AddWithValue("@Id", id);

        cmd.ExecuteNonQuery();
    }

    private User MapUser(SqlDataReader reader)
    {
        return new User
        {
            Id = reader.GetInt32(reader.GetOrdinal("Id")),
            Email = reader.GetString(reader.GetOrdinal("Email")),
            PasswordHash = reader.GetString(reader.GetOrdinal("PasswordHash")),
            UserName = reader.GetString(reader.GetOrdinal("UserName")),
            GoogleId = reader.IsDBNull(reader.GetOrdinal("GoogleId"))
                ? null
                : reader.GetString(reader.GetOrdinal("GoogleId")),
            CreatedAt = reader.GetDateTime(reader.GetOrdinal("CreatedAt"))
        };
    }
    }