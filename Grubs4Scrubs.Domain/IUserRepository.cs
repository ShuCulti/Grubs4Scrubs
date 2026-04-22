namespace Grubs4Scrubs.Domain;

public interface IUserRepository
{
    List<User> GetAll();
    User? GetById(int id);
    void Create(User user);
    void Update(User user);
    void Delete(int id);
}