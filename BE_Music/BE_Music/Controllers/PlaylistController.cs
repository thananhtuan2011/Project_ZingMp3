using BE_Music.Classes;
using BE_Music.Common;
using BE_Music.Model.Acount;
using BE_Music.Model.Playlist;
using BE_Music.Models;
using DpsLibs.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Formatters;
using System.Collections;
using System.Data;

namespace BE_Music.Controllers
{
    [Route("api/list")]
    [ApiController]
    public class PlaylistController : ControllerBase
    {
        private IConfiguration _configuration;

        public PlaylistController(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        [Route("GetPlayList")]
        [HttpGet]
        public BaseModel<object> GetPlayList()
        {

            try
            {
                string token = RequestJwt.GetHeader(Request);
                UserJWT loginData = RequestJwt._GetInfoUser(token);

                string connectionString = _configuration["AppConfig:ConnectionString"];
                using (DpsConnection cnn = new DpsConnection(connectionString))
                   
                {
                    SqlConditions conds = new SqlConditions();
                    conds.Add("account_id", loginData.acount_id);
                    DataTable _datatable = cnn.CreateDataTable($@"SELECT *  FROM Playlist where account_id=@account_id
",conds);
                    DataTable _datatable_acount = cnn.CreateDataTable($@"SELECT *  FROM Acount

");

                    var _data = from r in _datatable.AsEnumerable()
                                select new
                                {
                                    //Id_group = r["ID_GROUP"],
                                    account_id = r["account_id"],
                                    id_playlist = r["id_playlist"],
                                    playlist_name = r["playlist_name"],
                                    Acount = (from acount in _datatable_acount.AsEnumerable()
                                              where r["account_id"].ToString().Equals(acount["account_id"].ToString())
                                              select new
                                              {
                                                  account_id = acount["account_id"],
                                                  full_name = acount["full_name"]
                                              }
                                            ).FirstOrDefault()

                                };

                    return JsonResultCommon.ThanhCong(_data);
                }
            }
            catch (Exception ex)
            {
                return JsonResultCommon.Exception(ex);
            }
        }
        [HttpPost]
        [Route("AddSongInPlaylist")]
        public IActionResult AddSongInPlaylist(int id_song, int id_playlist)
        {
            try
            {
                string connectionString = _configuration["AppConfig:ConnectionString"];
                using (DpsConnection cnn = new DpsConnection(connectionString))
                {
                    Hashtable val = new Hashtable();

                    val.Add("id_song", id_song);
                    val.Add("created_date", DateTime.Now);
                    val.Add("id_playlist", id_playlist);
                    if (cnn.Insert(val, "PlayList_Song") < 0)
                    {
                        cnn.RollbackTransaction();
                        return BadRequest();
                    }
                }

                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpPost]
        [Route("RemoveSong_InPlayList")]
        public IActionResult RemoveSong_InPlayList(int id_song, int id_playlist)
        {
            try
            {
                string connectionString = _configuration["AppConfig:ConnectionString"];
                using (DpsConnection cnn = new DpsConnection(connectionString))
                {
                    SqlConditions Conds = new SqlConditions();

                    Conds.Add("id_song", id_song);
                    Conds.Add("id_playlist", id_playlist);
                    if (cnn.Delete(Conds, "PlayList_Song") < 0)
                    {
                        cnn.RollbackTransaction();
                        return BadRequest();
                    }
                }

                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
        [Route("GetPlayListSong")]
        [HttpGet]
        public BaseModel<object> GetPlayListSong(int play_id)
        {

            try
            {
                string token = RequestJwt.GetHeader(Request);
                UserJWT loginData = RequestJwt._GetInfoUser(token);

                string connectionString = _configuration["AppConfig:ConnectionString"];
                using (DpsConnection cnn = new DpsConnection(connectionString))
                {

                    SqlConditions conds = new SqlConditions();
                    conds.Add("id_playlist", play_id);
                    conds.Add("account_id", loginData.acount_id);
; DataTable _datatable = cnn.CreateDataTable($@"SELECT *  FROM PlayList_Song
where id_playlist=@id_playlist 
", conds);
                    DataTable _datatable_song = cnn.CreateDataTable($@"SELECT *  FROM Song

");
                    DataTable _datatable_typesong = cnn.CreateDataTable($@"SELECT *  FROM TypeSong

");

                    var _data = (from r in _datatable.AsEnumerable()
                                 select new
                                 {
                                     //Id_group = r["ID_GROUP"],
                                     created_date = r["created_date"],
                                     id_playlist = r["id_playlist"],
                                     id_song = r["id_song"],
                                     song = from song in _datatable_song.AsEnumerable()
                                            where r["id_song"].ToString().Equals(song["id_song"].ToString())
                                            select new
                                            {
                                                id_song = song["id_song"],
                                                singer_name = song["singer_name"],
                                                url_song = "https://localhost:5001/" + "UploadSong/" + song["song_name"],
                                                song_name = song["song_name"].ToString().Replace(".mp3", ""),
                                                image = "https://localhost:5001/" + "HinhAnh/" + song["image"],
                                                type_id = song["type_id"],
                                                created_at = song["created_at"],
                                                updated_at = song["updated_at"],
                                                type_song = (from type in _datatable_typesong.AsEnumerable()
                                                             where song["type_id"].ToString().Equals(type["type_id"].ToString())
                                                             select new
                                                             {

                                                                 typename = type["typename"],
                                                             }).FirstOrDefault()


                                            }





                                 }

                                ).FirstOrDefault();

                    return JsonResultCommon.ThanhCong(_data);
                }
            }
            catch (Exception ex)
            {
                return JsonResultCommon.Exception(ex);
            }
        }

        [Route("GetPlayListDetail")]
        [HttpGet]
        public BaseModel<object> GetPlayListDetail(int play_id)
        {

            try
            {
                string token = RequestJwt.GetHeader(Request);
                UserJWT loginData = RequestJwt._GetInfoUser(token);

                string connectionString = _configuration["AppConfig:ConnectionString"];
                using (DpsConnection cnn = new DpsConnection(connectionString))
                {

                    SqlConditions conds = new SqlConditions();
                    conds.Add("id_playlist", play_id);
                         conds.Add("account_id", loginData.acount_id);
                    ;                    DataTable _datatable = cnn.CreateDataTable($@"SELECT *  FROM Playlist
where id_playlist=@id_playlist and account_id=@account_id
", conds);
                    DataTable _datatable_acount = cnn.CreateDataTable($@"SELECT *  FROM Acount

");

                    var _data =( from r in _datatable.AsEnumerable()
                                select new
                                {
                                    //Id_group = r["ID_GROUP"],
                                    account_id = r["account_id"],
                                    id_playlist = r["id_playlist"],
                                    playlist_name = r["playlist_name"],
                                    Acount=(from acount in _datatable_acount.AsEnumerable()
                                            where  r["account_id"].ToString().Equals(acount["account_id"].ToString())
                                            select new
                                            {
                                                account_id = acount["account_id"],
                                                full_name = acount["full_name"]
                                            }
                                            ).FirstOrDefault()


                                }
                                
                                ).FirstOrDefault();

                    return JsonResultCommon.ThanhCong(_data);
                }
            }
            catch (Exception ex)
            {
                return JsonResultCommon.Exception(ex);
            }
        }
        [Route("AddPlaylist")]
        [HttpPost]
        public async Task<object> AddPlaylist(Playlist play)
        {

            try
            {
               
                string connectionString = _configuration["AppConfig:ConnectionString"];
                using (DpsConnection cnn = new DpsConnection(connectionString))
                {
                    // Thực hiện truy vấn thêm mới loại nhạc
                    SqlConditions Conds = new SqlConditions();
                    Hashtable val = new Hashtable(); //  Hashtable này dùng để insert dữ liệu vào db
                    val.Add("account_id", play.account_id); // cái này là điều kiện để update
                    val.Add("playlist_name", play.playlist_name);
                    val.Add("created_date", DateTime.Now);

                    if (cnn.Insert(val, "Playlist") < 0)
                    {
                        cnn.RollbackTransaction();
                        return JsonResultCommon.ThatBai("Cập nhật thất bại", cnn.LastError);
                    }
                    // Sau khi thêm mới, trả về thông tin loại nhạc đã được thêm
                    return JsonResultCommon.ThanhCong(); ;
                    //string ext = Path.GetExtension(postedFile.FileName);
                    //if (!String.IsNullOrEmpty(ext))
                    //{
                    //    filename += ext; ///EX: "namefile.pdf"
                    //    postedFile.SaveAs(dpath + "/" + filename);
                    //}
                }
            }
            catch (Exception)
            {

            }

            return JsonResultCommon.ThanhCong();
        }
    }
}
