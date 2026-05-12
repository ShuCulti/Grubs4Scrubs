using Grubs4Scrubs.Domain;

namespace Grubs4Scrubs.Business;

public interface IUserService
{
    List<User> GetAllUsers();
    User? GetUserById(int id);
    void CreateUser(User user);
    void UpdateUser(User user);
    void DeleteUser(int id);
}
