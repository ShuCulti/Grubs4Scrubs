namespace Grubs4Scrubs.Business;

public interface IUserRepository
{
    List<User> GetAll();
    User? GetById(int id);
    User? GetByEmail(string email);
    void Create(User user);
    void Update(User user);
    void Delete(int id);
}