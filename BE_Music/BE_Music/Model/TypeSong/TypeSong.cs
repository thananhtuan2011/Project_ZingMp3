using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace BE_Music.Model.TypeSong
{
    public class TypeSong
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int type_id { get; set; }
        public string typename { get; set; }
        public  string type_description { get; set; }
        public DateTime created_at { get; set; }
        public DateTime updated_at { get; set; }
    }   
}
