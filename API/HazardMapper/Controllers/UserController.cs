using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Threading.Tasks;
using HazardMapper.BL;
using HazardMapper.Common.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace HazardMapper.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
            private UserManager<User> _userManager;
            private AuthenticationService _authService;
            private RoleManager<IdentityRole> _roleManager;

            public UserController(UserManager<User> userManager, AuthenticationService authService, RoleManager<IdentityRole> roleManager)
            {
                _userManager = userManager;
                _authService = authService;
                _roleManager = roleManager;
            }

            [HttpPost]
            [Route("login")]
            public async Task<IActionResult> Login([FromBody] UserLoginModel model)
            {
                var user = await _userManager.FindByNameAsync(model.Username);
                if (user != null && await _userManager.CheckPasswordAsync(user, model.Password))
                {
                    var token = await _authService.CreateToken(user);

                    return Ok(new
                    {
                        token = new JwtSecurityTokenHandler().WriteToken(token),
                        expiration = token.ValidTo
                    });
                }

                return Unauthorized();
            }

            [HttpPost]
            [Route("register")]
            public async Task<IActionResult> Register([FromBody] RegisterUserModel model)
            {
                var user = new User()
                {
                    Email = model.Email,
                    UserName = model.UserName,
                    Country = model.Country,
                    Vocation = model.Vocation
                };

                
                var createdUser = await _userManager.CreateAsync(user,model.Password);
                if (!createdUser.Succeeded)
                {
                    return new ForbidResult(string.Join(',', createdUser.Errors));
                }


                var result = await _userManager.AddToRoleAsync(user, "User");
                if (!result.Succeeded)
                {
                    return new ForbidResult(string.Join(',', result.Errors));
                }

                return Ok();
            }
    }
}