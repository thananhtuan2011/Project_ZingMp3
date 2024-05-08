using BE_Music.Classes;
using BE_Music.Common;
using BE_Music.Model.Playlist;
using BE_Music.Models;
using DpsLibs.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
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

                string connectionString = _configuration["AppConfig:ConnectionString"];
                using (DpsConnection cnn = new DpsConnection(connectionString))
                {

                    DataTable _datatable = cnn.CreateDataTable($@"SELECT *  FROM Playlist
");


                    var _data = from r in _datatable.AsEnumerable()
                                select new
                                {
                                    //Id_group = r["ID_GROUP"],
                                    account_id = r["account_id"],
                                    id_playlist = r["id_playlist"],
                                    playlist_name = r["playlist_name"],
                                   

                                };

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
