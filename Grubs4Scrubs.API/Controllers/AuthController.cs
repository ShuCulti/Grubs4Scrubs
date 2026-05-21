using Grubs4Scrubs.Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

[ApiController]
[Route("api/[controller]")]
public class AuthController: ControllerBase
{
    private readonly IUserRepository _userRepository;
    private readonly IConfiguration _configuration;
 

    public AuthController(IConfiguration configuration, IUserRepository userRepository)
    {
        _configuration = configuration;
        _userRepository = userRepository;
    }

    [HttpPost("register")]
    public IActionResult Register(RegisterDto dto)
    {
        var existing = _userRepository.GetByEmail(dto.Email);

        if (existing != null)
        {
            return BadRequest("Email already in use");
        }

        var HashedPassword = BCrypt.Net.BCrypt.HashPassword(dto.Password);
        
        var user = new User{
            Email = dto.Email, 
            PasswordHash = HashedPassword, 
            UserName = dto.UserName};

        _userRepository.Create(user);

        return Ok();
        
    }


    [HttpPost("login")]
    public IActionResult Login(LoginDto dto)
    {
        var user = _userRepository.GetByEmail(dto.Email);

        if (user == null)
        {
            return Unauthorized("Invalid email or Passowrd");
        }

        var Verified = BCrypt.Net.BCrypt.Verify(dto.Password, user.PasswordHash);

        if (Verified == false)
        {
            return Unauthorized("Invalid email or Passowrd");
        }

        var token = GenerateToken(user);

        return Ok(new {token});
    }

    private string GenerateToken(User user)
    {
        var key = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]!)
        );

        var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var claims = new[]
        {
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new Claim(ClaimTypes.Email, user.Email),
            new Claim(ClaimTypes.Name, user.UserName)
        };

        var token = new JwtSecurityToken(
            issuer: _configuration["Jwt:Issuer"],
            audience: _configuration["Jwt:Audience"],
            claims: claims,
            expires: DateTime.UtcNow.AddHours(24),
            signingCredentials: credentials
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    
    }

}