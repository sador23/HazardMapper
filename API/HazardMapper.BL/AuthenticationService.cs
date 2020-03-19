using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using HazardMapper.Common.Models;
using Microsoft.IdentityModel.Tokens;

namespace HazardMapper.BL
{
    public class AuthenticationService
    {
        public JwtSecurityToken CreateToken(UserLoginModel user)
        {
            var authClaims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Username),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

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
