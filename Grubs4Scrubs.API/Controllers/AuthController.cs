using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using Grubs4Scrubs.Business;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace Grubs4Scrubs.API;

[ApiController]
[Route("api/[controller]")]

public class AuthController: ControllerBase
{
    private readonly IConfiguration _configuration;
    private readonly IUserRepository _userRepository;

    public AuthController(IConfiguration configuration, IUserRepository userRepository)
    {
        _configuration = configuration;
        _userRepository = userRepository;
    }

    [HttpPost ("register")]

    public IActionResult Register(RegisterDto dto)
    {

        var exists = _userRepository.GetByEmail(dto.Email);

        if (exists != null)
        {
            return BadRequest("User Already Exists");
        }

        var hashedPassword = BCrypt.Net.BCrypt.HashPassword(dto.Password);

        var user = new User
        {
            Email = dto.Email,
            PasswordHash = hashedPassword,
            UserName = dto.UserName
        };
            
        _userRepository.Create(user);

        return Created();
    }

    [HttpPost ("login")]

    public IActionResult Login(LoginDto dto)
    {
        var existingUser = _userRepository.GetByEmail(dto.Email);
        
        if (existingUser == null)
        {
            return BadRequest("Email or Password is Incorrect");
        }

        var Password = dto.Password;

        if (Password == null)
        {
            return BadRequest("Email or Password is Incorrect");
        }

        var verifiedPassword = BCrypt.Net.BCrypt.Verify(Password, existingUser.PasswordHash);

        if (verifiedPassword != true) /* Can also be written as: if (!verifiefiedPassword) */
        {
            return BadRequest("Email or Password is Incorrect");
        }

        var token = GenerateToken(existingUser);

        return Ok(new {token});
    }

    private string GenerateToken(User user)
    {
        var key = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]!)
        );

        var signingCredentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var claims = new Claim[]
        {
          new (ClaimTypes.NameIdentifier, user.Id.ToString()),
          new (ClaimTypes.Email, user.Email),
          new (ClaimTypes.Name, user.UserName)  
        };

        var token = new JwtSecurityToken(
            issuer: _configuration["Jwt:Issuer"],
            audience: _configuration["Jwt:Audience"],
            claims: claims,
            expires: DateTime.UtcNow.AddHours(24),
            signingCredentials: signingCredentials
        );

        return new JwtSecurityTokenHandler().WriteToken(token);

        /* To Remember: Jwt Results as ""header.payload.signature" */

    }

}

