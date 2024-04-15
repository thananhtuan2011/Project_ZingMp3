using BE_Music.Interface_Service;
using DpsLibs.Data;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.Data;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace BE_Music.Services.Login
{
    public class Login_service : ILogin
    {
        private readonly IConfiguration _config;
        public Login_service(IConfiguration config)
        {
            _config = config;


        }
        public ClaimsPrincipal GetPrincipalFromExpiredToken(string token)
        {
            var tokenValidationParameters = new TokenValidationParameters
            {
                ValidateAudience = false, //you might want to validate the audience and issuer depending on your use case
                ValidateIssuer = false,
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["TokenKey"])),
                ValidateLifetime = true //here we are saying that we don't care about the token's expiration date
            };
            var tokenHandler = new JwtSecurityTokenHandler();
            SecurityToken securityToken;
            var principal = tokenHandler.ValidateToken(token, tokenValidationParameters, out securityToken);
            var jwtSecurityToken = securityToken as JwtSecurityToken;
            if (jwtSecurityToken == null)
                throw new SecurityTokenException("Invalid token");
            return principal;
        }
        public string GenerateRefreshToken()
        {
            var randomNumber = new byte[32];
            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(randomNumber);
                return Convert.ToBase64String(randomNumber);
            }
        }
        public string GenerateAccessToken(IEnumerable<Claim> claims)
        {
            var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["TokenKey"]));
            var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
            var tokeOptions = new JwtSecurityToken(
                issuer: "https://localhost:5001",
                audience: "https://localhost:5001",
                claims: claims,
                expires: DateTime.Now.AddDays(20),
                signingCredentials: signinCredentials
            );
            var tokenString = new JwtSecurityTokenHandler().WriteToken(tokeOptions);
            return tokenString;
        }
        public async Task<object> Login(string username, string pass)   
        {
            string ConnectionString = _config["AppConfig:ConnectionString"];
            using (DpsConnection cnn = new DpsConnection(ConnectionString))
            {
                DataTable dt = new DataTable();
                SqlConditions Conds = new SqlConditions();
                Conds.Add("user_name", username);
                     Conds.Add("password", pass);

               dt = cnn.CreateDataTable(@"select * from Acount where user_name=@user_name and password=@password",Conds);

                if (dt.Rows.Count == 0) return null;

                var data =
                                         from user in dt.AsEnumerable()
                                         select new
                                         {
                                             account_id = user["account_id"],
                                             email = user["email"],
                                             full_name = user["full_name"],
                                             phone = user["phone"],
                                             role_code = user["role_code"],
                                             address = user["address"],

                                         };
                var infor = data.FirstOrDefault();


                var claims = new[]
                {
                new Claim("UserName",username),
                 new Claim("address",infor.address.ToString()),
                 new Claim("role_code" ,infor.role_code.ToString() ),
                 new Claim("full_name",infor.full_name.ToString()),
                  new Claim("phone",infor.phone.ToString() ),
                     new Claim("account_id",infor.account_id.ToString()),
                     new Claim("email",infor.email.ToString())

            };

                string key = _config["TokenKey"];
                var _key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["TokenKey"]));
                var creds = new SigningCredentials(_key, SecurityAlgorithms.HmacSha512Signature);

                var token = new JwtSecurityToken
                (
                      issuer: "https://localhost:5001",
                    audience: "https://localhost:5001",
                    claims,
                    expires: DateTime.Now.AddDays(200),
                    signingCredentials: creds

                );
                var tokenHandler = new JwtSecurityTokenHandler();

                // var token = tokenHandler.CreateToken(tokenDescriptor);
                var dt_token = new
                {
                    accessToken = tokenHandler.WriteToken(token),
                    refreshToken = GenerateRefreshToken(),
                    role = infor.role_code.ToString(),
                    User = infor
                };


                return dt_token;

            }
        }
        }
    }
