namespace BE_Music.Model.Song
{
    public class Song
    {
      
        public string singer_name { get; set; }
               public string song_name { get; set; }
        public string image { get; set; }
        public int type_id { get; set; }
        public  IFormFile file { get; set; }
        public string base64 { get; set; }
        public string filename { get; set; }
    }
}
