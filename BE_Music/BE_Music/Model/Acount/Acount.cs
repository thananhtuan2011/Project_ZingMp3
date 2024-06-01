using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BE_Music.Model.Acount
{
    public class Acount
    {
        public string address { get; set; }
        public bool admin { get; set; }
        public  string full_name  { get; set; }
        public string base64 { get; set; }
        public string filename { get; set; }
        public string password { get; set; }
        public string role_code { get; set; }
        public string user_name { get; set; }
        public string email { get; set; }
        public string phone { get; set; }
        public DateTime created_at { get; set; }
        public DateTime updated_at { get; set; }
        public DateTime deleted_at { get; set; }
        public bool active { get; set; }
    }
    public class Acount_Update
    {
        public string address { get; set; }
        public string full_name { get; set; }
        public string phone {get; set; }
        public string base64 { get; set; }
        public string email { get; set; }
        
        public string filename { get; set; }
    }
        public class UserJWT
    {
        public int  acount_id { get; set; }
    }

}
