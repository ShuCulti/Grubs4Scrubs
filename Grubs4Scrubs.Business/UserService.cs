using Grubs4Scrubs.Domain;


namespace Grubs4Scrubs.Business;

public class UserService : IUserService
{
    private readonly IUserRepository _userRepository;

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
