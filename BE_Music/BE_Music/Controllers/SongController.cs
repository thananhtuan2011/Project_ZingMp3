using BE_Music.Common;
using BE_Music.Model.Song;
using BE_Music.Models;
using BE_Music.Models.BaseModel;
using BE_Music.Services.Type;
using DpsLibs.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections;
using System;
using System.Data;
using System.IO;
using System.Web;
using BE_Music.Classes;
using BE_Music.Model.Acount;
using Newtonsoft.Json.Linq;

namespace BE_Music.Controllers
{
    [Route("api/song")]
    [ApiController]
    public class SongController : ControllerBase
    {
        private IConfiguration _configuration;

        public SongController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [Route("GetDetailsong")]
        [HttpGet]
        public BaseModel<object> GetDetailsong(int id_song)
        {

            try
            {

                string connectionString = _configuration["AppConfig:ConnectionString"];
                using (DpsConnection cnn = new DpsConnection(connectionString))
                {
                    SqlConditions Conds = new SqlConditions();
                    Conds.Add("id_song", id_song);

                    DataTable _datatable = cnn.CreateDataTable(@"select * from Song where id_song=@id_song ", Conds);
                 

                    var _data = (from r in _datatable.AsEnumerable()
                                select new
                                {
                                    //Id_group = r["ID_GROUP"],
                                    id_song = r["id_song"],
                                    singer_name = r["singer_name"],
                                    lyrics = r["lyrics"],
                                    vip = r["vip"],
                                    url_song = "https://localhost:5001/" + "UploadSong/" + r["song_name"],
                                    song_name = r["song_name"].ToString().Replace(".mp3", ""),
                                    image = "https://localhost:5001/" + "HinhAnh/" + r["image"],
                                    type_id = r["type_id"],
                                    created_at = r["created_at"],
                                    updated_at = r["updated_at"],
                                   

                                }).FirstOrDefault();

                    return JsonResultCommon.ThanhCong(_data);
                }
            }
            catch (Exception ex)
            {
                return JsonResultCommon.Exception(ex);
            }
        }

        [Route("UpdateSong")]
        [HttpPost, DisableRequestSizeLimit]
        public async Task<object> UpdateSong()
        {

            try
            {
                string path = "";
                var formCollection = await Request.ReadFormAsync();
                if(formCollection.Files.Count>0)
                {

                var file = formCollection.Files.First();
                //var httpPostedFile = Request.Form.Files;
                //Path to save file


                path = Path.GetFullPath(Path.Combine(Environment.CurrentDirectory, "UploadSong"));
                if (!Directory.Exists(path))
                {
                    Directory.CreateDirectory(path);
                }
                using (var fileStream = new FileStream(Path.Combine(path, file.FileName), FileMode.Create))
                {
                    await file.CopyToAsync(fileStream);
                }
                }

                string connectionString = _configuration["AppConfig:ConnectionString"];
                using (DpsConnection cnn = new DpsConnection(connectionString))
                {
                    var img = UploadHelper.UploadImage(formCollection["base64"], formCollection["file_name_image"], "HinhAnh", "HinhAnh", true);
                    // Thực hiện truy vấn thêm mới loại nhạc
                    SqlConditions Conds = new SqlConditions();
                    Conds.Add("id_song", int.Parse(formCollection["id_song"].ToString()));
                    Hashtable val = new Hashtable(); //  Hashtable này dùng để insert dữ liệu vào db
                    val.Add("singer_name", formCollection["singer_name"].ToString()); // cái này là điều kiện để update
                    val.Add("song_name", formCollection["song_name"].ToString());
                    if (img != null)
                    {
                        val.Add("image", img);
                    }
                    val.Add("updated_at",DateTime.Now);
                    val.Add("lyrics", formCollection["lyrics"].ToString());
                    val.Add("vip", int.Parse(formCollection["vip"].ToString()));
                    val.Add("type_id", int.Parse(formCollection["type_id"].ToString()));
                    val.Add("created_at", DateTime.Now);


                    if (cnn.Update(val, Conds, "Song") < 0)
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
            catch (Exception ex)
            {
                return JsonResultCommon.ThatBai(ex.ToString());
            }

            return JsonResultCommon.ThanhCong();
        }
        [Route("AddSong")]
        [HttpPost, DisableRequestSizeLimit]
        public async Task<object> AddSong()
        {
          
            try
            {
                string path = "";
                var formCollection = await Request.ReadFormAsync();
                var file = formCollection.Files.First();
                //var httpPostedFile = Request.Form.Files;
                //Path to save file


                path = Path.GetFullPath(Path.Combine(Environment.CurrentDirectory, "UploadSong"));
                    if (!Directory.Exists(path))
                    {
                        Directory.CreateDirectory(path);
                    }
                    using (var fileStream = new FileStream(Path.Combine(path, file.FileName), FileMode.Create))
                    {
                    await file.CopyToAsync(fileStream);
                    }
                string connectionString = _configuration["AppConfig:ConnectionString"];
                using (DpsConnection cnn = new DpsConnection(connectionString))
                {
                    var img = UploadHelper.UploadImage(formCollection["base64"], formCollection["file_name_image"], "HinhAnh", "HinhAnh", true);
                   // Thực hiện truy vấn thêm mới loại nhạc
                    SqlConditions Conds = new SqlConditions();
                    Hashtable val = new Hashtable(); //  Hashtable này dùng để insert dữ liệu vào db
                    val.Add("singer_name", formCollection["singer_name"].ToString()); // cái này là điều kiện để update
                    val.Add("song_name", formCollection["song_name"].ToString());
                    val.Add("image", img);
                    val.Add("lyrics", formCollection["lyrics"].ToString());
                    
                    val.Add("vip", int.Parse(formCollection["vip"].ToString()));
                    val.Add("type_id",int.Parse( formCollection["type_id"].ToString()));
                    val.Add("created_at", DateTime.Now);


                    if (cnn.Insert(val, "Song") < 0)
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

        [Route("DeleteSong")]
        [HttpPost]
        public async Task<object> DeleteSong(int id_song)
        {

            try
            {

                string connectionString = _configuration["AppConfig:ConnectionString"];
                using (DpsConnection cnn = new DpsConnection(connectionString))
                {
                    // Thực hiện truy vấn thêm mới loại nhạc
                    SqlConditions Conds = new SqlConditions();
                    Hashtable val = new Hashtable(); //  Hashtable này dùng để insert dữ liệu vào db
                    Conds.Add("id_song", id_song);

                    if (cnn.Delete(Conds, "Song") < 0)
                    {
                        cnn.RollbackTransaction();
                        return JsonResultCommon.ThatBai("Cập nhật thất bại", cnn.LastError);
                    }
                    // Sau khi thêm mới, trả về thông tin loại nhạc đã được thêm
                    return JsonResultCommon.ThanhCong();
                }
            }

            catch (Exception ex)
            {
                return JsonResultCommon.Exception(ex);
            }

        }

        [Route("UpdateCountPlay")]
        [HttpPost]
        public async Task<object> UpdateCountPlay(int id_song)
        {

            try
            {

                string connectionString = _configuration["AppConfig:ConnectionString"];
                using (DpsConnection cnn = new DpsConnection(connectionString))
                {
                    // Thực hiện truy vấn thêm mới loại nhạc
                    SqlConditions Conds = new SqlConditions();
                    Hashtable val = new Hashtable(); //  Hashtable này dùng để insert dữ liệu vào db
                    Conds.Add("id_song", id_song);
                    DataTable dt = new DataTable();
                    dt = cnn.CreateDataTable(@"select * from  Song where id_song=@id_song", Conds);

                    long count = dt.Rows[0]["count_play"]== DBNull.Value ? 0:(long)dt.Rows[0]["count_play"];

                    val.Add("count_play", count+1);
                    
                    if (cnn.Update(val,Conds, "Song") < 0)
                    {
                        cnn.RollbackTransaction();
                        return JsonResultCommon.ThatBai("Cập nhật thất bại", cnn.LastError);
                    }
                    // Sau khi thêm mới, trả về thông tin loại nhạc đã được thêm
                    return JsonResultCommon.ThanhCong();
                }
            }

            catch (Exception ex)
            {
                return JsonResultCommon.Exception(ex);
            }

        }

        [Route("AddLike")]
        [HttpPost]
        public async Task<object> AddLike(int id_song,int acount_id)
        {
            try
            {

                string connectionString = _configuration["AppConfig:ConnectionString"];
                using (DpsConnection cnn = new DpsConnection(connectionString))
                {
                    // Thực hiện truy vấn thêm mới loại nhạc
                    SqlConditions Conds = new SqlConditions();
                    Hashtable val = new Hashtable(); //  Hashtable này dùng để insert dữ liệu vào db
                    Conds.Add("id_song", id_song);
                    Conds.Add("acount_id", acount_id);
                    DataTable dt = new DataTable();
                    dt = cnn.CreateDataTable(@"select * from  Like_Song where id_song=@id_song and acount_id=@acount_id", Conds);
                    if(dt.Rows.Count>0)
                    {
                        if (cnn.Delete( Conds, "Like_Song") < 0)
                        {
                            cnn.RollbackTransaction();
                            return JsonResultCommon.ThatBai("Cập nhật thất bại", cnn.LastError);
                        }
                    } 
                    else
                    {


                    val.Add("id_song", id_song);
                        val.Add("acount_id", acount_id);

                        if (cnn.Insert(val, "Like_Song") < 0)
                    {
                        cnn.RollbackTransaction();
                        return JsonResultCommon.ThatBai("Cập nhật thất bại", cnn.LastError);
                    }
                    }

                    // Sau khi thêm mới, trả về thông tin loại nhạc đã được thêm
                    return JsonResultCommon.ThanhCong();
                }
            }

            catch (Exception ex)
            {
                return JsonResultCommon.Exception(ex);
            }

        }



        [Route("GetRanDom10Music")]
        [HttpGet]
        public BaseModel<object> GetRanDom10Music()
        {

            try
            {
                string token = RequestJwt.GetHeader(Request);
                UserJWT loginData = RequestJwt._GetInfoUser(token);

                string connectionString = _configuration["AppConfig:ConnectionString"];
                using (DpsConnection cnn = new DpsConnection(connectionString))
                {
                    SqlConditions Conds = new SqlConditions();
                    Conds.Add("acount_id", loginData.acount_id);
                    DataTable _datatable_like_song = cnn.CreateDataTable($@"SELECT *  FROM Like_Song where acount_id=@acount_id
", Conds);
                    DataTable _datatable = cnn.CreateDataTable($@"SELECT TOP 10 *  FROM Song
ORDER BY NEWID()");


                    var _data = from r in _datatable.AsEnumerable()
                                select new
                                {
                                    //Id_group = r["ID_GROUP"],
                                    id_song = r["id_song"],
                                    vip = r["vip"],
                                    singer_name = r["singer_name"],
                                    song_name = r["song_name"].ToString().Replace(".mp3", ""),
                                    url_song = "https://localhost:5001/" + "UploadSong/" + r["song_name"],
                                    image = "https://localhost:5001/" + "HinhAnh/" + r["image"],
                                    type_id = r["type_id"],
                                    created_at = r["created_at"],
                                    updated_at = r["updated_at"],
                                    like_song = (from like in _datatable_like_song.AsEnumerable()
                                                 where r["id_song"].ToString().Equals(like["id_song"].ToString())
                                                 select new
                                                 {
                                                     id_song = like["id_song"]
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
        [Route("GetRanDomMusic")]
        [HttpGet]
        public BaseModel<object> GetRanDomMusic()
        {

            try
            {
                string token = RequestJwt.GetHeader(Request);
                UserJWT loginData = RequestJwt._GetInfoUser(token);

                string connectionString = _configuration["AppConfig:ConnectionString"];
                using (DpsConnection cnn = new DpsConnection(connectionString))
                {
                    SqlConditions Conds = new SqlConditions();
                    Conds.Add("acount_id", loginData.acount_id);
                  
                    DataTable _datatable = cnn.CreateDataTable($@"SELECT TOP 4 *  FROM Song
ORDER BY NEWID()");
                    DataTable _datatable_like_song = cnn.CreateDataTable($@"SELECT *  FROM Like_Song where acount_id=@acount_id
", Conds);


                    var _data = from r in _datatable.AsEnumerable()
                                select new
                                {
                                    //Id_group = r["ID_GROUP"],
                                    id_song = r["id_song"],
                                    singer_name = r["singer_name"],
                                     vip = r["vip"],
                                    song_name = r["song_name"].ToString().Replace(".mp3",""),
                                    url_song= "https://localhost:5001/" + "UploadSong/" + r["song_name"],
                                    image = "https://localhost:5001/" + "HinhAnh/" + r["image"],
                                    type_id = r["type_id"],
                                    created_at = r["created_at"],
                                    updated_at = r["updated_at"],
                                    like_song= (from like in _datatable_like_song.AsEnumerable()
                                                where r["id_song"].ToString().Equals(like["id_song"].ToString())
                                                select new {
                                                    id_song= like["id_song"]
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

        [Route("GetTop3Music")]
        [HttpGet]
        public BaseModel<object> GetTop3Music()
        {

            try
            {
                string token = RequestJwt.GetHeader(Request);
                UserJWT loginData = RequestJwt._GetInfoUser(token);

                string connectionString = _configuration["AppConfig:ConnectionString"];
                using (DpsConnection cnn = new DpsConnection(connectionString))
                {
                    SqlConditions Conds = new SqlConditions();
                    Conds.Add("acount_id", loginData.acount_id);
                    DataTable _datatable = cnn.CreateDataTable($@"select top 3 * from Song order by count_play desc");

                    DataTable _datatable_like_song = cnn.CreateDataTable($@"SELECT *  FROM Like_Song where acount_id=@acount_id
", Conds);


                    var _data = from r in _datatable.AsEnumerable()
                                select new
                                {
                                    //Id_group = r["ID_GROUP"],
                                    id_song = r["id_song"],
                                    singer_name = r["singer_name"],
                                    vip = r["vip"],
                                    song_name = r["song_name"].ToString().Replace(".mp3", ""),
                                    url_song = "https://localhost:5001/" + "UploadSong/" + r["song_name"],
                                    image = "https://localhost:5001/" + "HinhAnh/" + r["image"],
                                    type_id = r["type_id"],
                                    created_at = r["created_at"],
                                    updated_at = r["updated_at"],
                                    like_song = (from like in _datatable_like_song.AsEnumerable()
                                                 where r["id_song"].ToString().Equals(like["id_song"].ToString())
                                                 select new
                                                 {
                                                     id_song = like["id_song"]
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

        [Route("GetMusicFortype")]
        [HttpGet]
        public BaseModel<object> GetMusicFortype(int type_id)
        {

            try
            {
                string token = RequestJwt.GetHeader(Request);
                UserJWT loginData = RequestJwt._GetInfoUser(token);

                string connectionString = _configuration["AppConfig:ConnectionString"];
                using (DpsConnection cnn = new DpsConnection(connectionString))
                {
                    SqlConditions Conds = new SqlConditions();
                    Conds.Add("type_id", type_id);
                    Conds.Add("acount_id", loginData.acount_id);
                    DataTable _datatable = cnn.CreateDataTable($@"SELECT  *  FROM Song
where type_id=@type_id",Conds);

                    DataTable _datatable_like_song = cnn.CreateDataTable($@"SELECT *  FROM Like_Song where acount_id=@acount_id
", Conds);


                    var _data = from r in _datatable.AsEnumerable()
                                select new
                                {
                                    //Id_group = r["ID_GROUP"],
                                    id_song = r["id_song"],
                                    singer_name = r["singer_name"],
                                    vip = r["vip"],
                                    song_name = r["song_name"].ToString().Replace(".mp3", ""),
                                    url_song = "https://localhost:5001/" + "UploadSong/" + r["song_name"],
                                    image = "https://localhost:5001/" + "HinhAnh/" + r["image"],
                                    type_id = r["type_id"],
                                    created_at = r["created_at"],
                                    updated_at = r["updated_at"],
                                    like_song = (from like in _datatable_like_song.AsEnumerable()
                                                 where r["id_song"].ToString().Equals(like["id_song"].ToString())
                                                 select new
                                                 {
                                                     id_song = like["id_song"]
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
        [Route("GetAllSong")]
        [HttpPost]
        public BaseModel<object> GetAllSong([FromBody] QueryRequestParams p)
        {

            try
            {

                string connectionString = _configuration["AppConfig:ConnectionString"];
                using (DpsConnection cnn = new DpsConnection(connectionString))
                {

                    Dictionary<string, string> _sortableFields = new Dictionary<string, string>
                    {
                        { "FullName", "FullName" },
                        //{ "DonViTinh", "DonViTinh" }
                    };
                    Panigator v_panigator = null;
                    IDictionary<string, string> v_dic_keyFilter = new Dictionary<string, string>
                    {
                       { "song_name", "song_name" },
                        //{ "DonViTinh", "DonViTinh"},
                    };

                    string _select = "", _sqlQuery = "", v_str_paginate = "", _orderBy = "", _whereCondition = "";
                    SqlConditions Conds = new SqlConditions();
                    #region Filter, sort, paganitor
                    //filter request have to right and enough , same in code
                    if (p.Filter != null)
                    {
                        if (p.Filter.Count > 0)
                        {
                            var listKeySearch = p.Filter.Where(x => !v_dic_keyFilter.ContainsKey(x.Key)).Select(q => q.Key).ToList();
                            if (listKeySearch != null && listKeySearch.Count > 0)
                            {
                                return JsonResultCommon.NotData();
                            }

                            foreach (string _filter in p.Filter.Keys)
                            {
                                if (!string.IsNullOrEmpty(p.Filter[_filter]))
                                {
                                    foreach (string vl in p.Filter.Values)
                                    {
                                        //_whereCondition += " AND " + v_dic_keyFilter[_filter] + " = @" + _filter;
                                        _whereCondition += " where " + v_dic_keyFilter[_filter] + " LIKE N'%";
                                        _whereCondition += vl;
                                        _whereCondition += "%'";
                                        Conds.Add(_filter, p.Filter[_filter]);
                                    }
                                }
                            }

                        }
                    }

                    //sort column in datatable
                    if (p.Sort != null)
                    {
                        if (!string.IsNullOrEmpty(p.Sort.ColumnName) && v_dic_keyFilter.ContainsKey(p.Sort.ColumnName))
                        {
                            _orderBy = "order by" + " " + v_dic_keyFilter[p.Sort.ColumnName] + " " + (p.Sort.Direction.ToLower().Equals("asc") ? "asc" : "desc");
                        }
                    }

                    int page_index = 0;
                    //set up panigator for datatable
                    if (p.Panigator != null)
                    {
                        //v_str_paginate = $@" OFFSET @PageSize * (@PageNumber - 1) ROWS FETCH NEXT @PageSize ROWS ONLY;";
                        //// offset fetch là các tùy chọn của mệnh đề order by
                        //_cond.Add("PageSize", p.Panigator.PageSize);
                        //_cond.Add("PageNumber", p.Panigator.PageIndex);

                        page_index = p.Panigator.PageIndex;
                    }
                    #endregion
                    _sqlQuery = $@"select * from Song" + " " + _whereCondition + " " + _orderBy + " ";
                    DataTable _datatable = cnn.CreateDataTable(_sqlQuery, Conds);
                    DataTable _datatable_category = cnn.CreateDataTable(@"select * from TypeSong");
                    int _countRows = _datatable.Rows.Count;
                    if (cnn.LastError != null || _datatable == null)
                        return JsonResultCommon.NotData();

                    if (_datatable.Rows.Count == 0)
                        return JsonResultCommon.NotData();
                    else
                    {
                        if (page_index == 0)
                        {
                            p.Panigator.PageSize = _countRows;
                        }
                        v_panigator = new Panigator(p.Panigator.PageIndex, p.Panigator.PageSize, _datatable.Rows.Count);
                    }



                    var _data = from r in _datatable.AsEnumerable().Skip((p.Panigator.PageIndex - 1) * p.Panigator.PageSize).Take(p.Panigator.PageSize).ToList()
                                select new
                                {
                                    //Id_group = r["ID_GROUP"],
                                    id_song = r["id_song"],
                                    singer_name = r["singer_name"],
                                    vip = r["vip"],
                                    lyrics = r["lyrics"],
                                    song_name = r["song_name"].ToString().Replace(".mp3", ""),
                                    image = "https://localhost:5001/" + "HinhAnh/" + r["image"],
                                    type_id = r["type_id"],
                                    created_at = r["created_at"],
                                    updated_at = r["updated_at"],
                                    category = (from ca in _datatable_category.AsEnumerable()
                                                where ca["type_id"].ToString().Equals(r["type_id"].ToString())
                                                select new
                                                {
                                                    typename = ca["typename"]
                                                }).FirstOrDefault()



                                };

                    return JsonResultCommon.ThanhCong(_data, v_panigator);
                }
            }
            catch (Exception ex)
            {
                return JsonResultCommon.Exception(ex);
            }
        }
    }
}
