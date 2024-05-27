using BE_Music.Model.Acount;
using Newtonsoft.Json;
using System.IdentityModel.Tokens.Jwt;

namespace BE_Music.Common
{
    public static class RequestJwt
    {
        public static string GetHeader(HttpRequest request)
        {
            try
            {
                Microsoft.Extensions.Primitives.StringValues headerValues;
                request.Headers.TryGetValue("Authorization", out headerValues);
                return headerValues.FirstOrDefault();
            }
            catch (Exception ex)
            {
                return string.Empty;
            }

        }
        public static UserJWT _GetInfoUser(string token)
        {
            var handler = new JwtSecurityTokenHandler();
            try
            {
                token = token.Replace("Bearer ", string.Empty);
                string _bearer_token, _username, _customdata, account_id;
                var tokenS = handler.ReadJwtToken(token) as JwtSecurityToken;
                account_id = tokenS.Claims.Where(x => x.Type == "account_id").FirstOrDefault().Value;
             

                if (string.IsNullOrEmpty(account_id))
                    return null;
              
                UserJWT q = new UserJWT();
                q.acount_id = int.Parse(account_id);
                return q;

            }
            catch (Exception ex)
            {
                return null;
            }

        }
    }
}
