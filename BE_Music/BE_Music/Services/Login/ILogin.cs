using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace BE_Music.Interface_Service
{
    public interface ILogin
    {
        Task<object> Login(string username, string pass);
        ClaimsPrincipal GetPrincipalFromExpiredToken(string token);
        public string GenerateAccessToken(IEnumerable<Claim> claims);
        public string GenerateRefreshToken();
    }
}
