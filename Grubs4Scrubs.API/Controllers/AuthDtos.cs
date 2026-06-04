using Grubs4Scrubs.Business;

namespace Grubs4Scrubs.API;

public class RegisterDto
{
    public string UserName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
}

public class LoginDto
{
    public string Email {get; set;} = string.Empty;
    public string Password { get; set; } = string.Empty;
}