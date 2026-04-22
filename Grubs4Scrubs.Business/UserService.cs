using Grubs4Scrubs.Domain;


namespace Grubs4Scrubs.Business;

// The service IMPLEMENTATION — this is the "business layer".
// It sits between the controller and the repository.
//
// Right now it mostly just passes calls through to the repository,
// but this is where you'd add things like:
//   - "Email must be valid"
//   - "Username can't be empty"
//   - "Don't allow duplicate emails"
//   - Password hashing, logging, etc.
public class UserService : IUserService
{
    private readonly IUserRepository _userRepository;

    // The repository is INJECTED — the service doesn't create it,
    // it receives it. This is called Dependency Injection.
    public UserService(IUserRepository userRepository)
    {
        _userRepository = userRepository;
    }

    public List<User> GetAllUsers()
    {
        return _userRepository.GetAll();
    }

    public User? GetUserById(int id)
    {
        return _userRepository.GetById(id);
    }

    public void CreateUser(User user)
    {
        // BUSINESS LOGIC EXAMPLE: validate before saving
        if (string.IsNullOrWhiteSpace(user.Email))
        {
            throw new ArgumentException("Email cannot be empty");
        }

        if (string.IsNullOrWhiteSpace(user.UserName))
        {
            throw new ArgumentException("Username cannot be empty");
        }

        if (string.IsNullOrWhiteSpace(user.PasswordHash))
        {
            throw new ArgumentException("Password cannot be empty");
        }

        _userRepository.Create(user);
    }

    public void UpdateUser(User user)
    {
        // Check the user exists before updating
        var existing = _userRepository.GetById(user.Id);
        if (existing == null)
        {
            throw new KeyNotFoundException("User not found");
        }

        _userRepository.Update(user);
    }

    public void DeleteUser(int id)
    {
        var existing = _userRepository.GetById(id);
        if (existing == null)
        {
            throw new KeyNotFoundException("User not found");
        }

        _userRepository.Delete(id);
    }
}
