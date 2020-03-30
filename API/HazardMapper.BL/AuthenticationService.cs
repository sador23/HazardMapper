using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using HazardMapper.Common.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;

namespace HazardMapper.BL
{
    public class AuthenticationService
    {
        private UserManager<User> _userManager;
        private RoleManager<IdentityRole> _roleManager;

        public AuthenticationService(UserManager<User> userManager, RoleManager<IdentityRole> roleManager)
        {
            _userManager = userManager;
            _roleManager = roleManager;
        }

        public async Task<JwtSecurityToken> CreateToken(User user)
        {
            IdentityOptions _options = new IdentityOptions();
            var authClaims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.UserName),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(_options.ClaimsIdentity.UserNameClaimType, user.UserName)
            };

            var userClaims = await _userManager.GetClaimsAsync(user);
            var roles = await _userManager.GetRolesAsync(user);

            authClaims.AddRange(userClaims);
            foreach (var role in roles)
            {
                authClaims.Add(new Claim(ClaimTypes.Role, role));
            }

            var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("WillBeReplacedByActualKeyThatIsNotStaticHere"));

            var token = new JwtSecurityToken(
                issuer: "http://localhost:5000/",
                audience: "http://localhost:5000/",
                expires: DateTime.Now.AddMinutes(30),
                claims: authClaims,
                signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
            );

            return token;
        }
    }
}
