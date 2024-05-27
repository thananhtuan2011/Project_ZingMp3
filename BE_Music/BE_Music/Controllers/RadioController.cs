using BE_Music.Classes;
using BE_Music.Common;
using BE_Music.Models.BaseModel;
using BE_Music.Models;
using DpsLibs.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections;
using System.Data;

namespace BE_Music.Controllers
{
    [Route("api/radio")]
    [ApiController]
    public class RadioController : ControllerBase
    {

        private IConfiguration _configuration;

        public RadioController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [Route("AddRadio")]
        [HttpPost, DisableRequestSizeLimit]
        public async Task<object> AddRadio()
        {

            try
            {
                string path = "";
                var formCollection = await Request.ReadFormAsync();
                var file = formCollection.Files.First();
                //var httpPostedFile = Request.Form.Files;
                //Path to save file


                path = Path.GetFullPath(Path.Combine(Environment.CurrentDirectory, "Radio"));
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
                    // Thực hiện truy vấn thêm mới loại nhạc
                    SqlConditions Conds = new SqlConditions();
                    Hashtable val = new Hashtable(); //  Hashtable này dùng để insert dữ liệu vào db
                    val.Add("cast_name", formCollection["cast_name"].ToString()); // cái này là điều kiện để update
                    val.Add("created_date", DateTime.Now);
                    val.Add("radio_name", formCollection["radio_name"].ToString());
                    

                    if (cnn.Insert(val, "Radio") < 0)
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
        [Route("GetAllRadio")]
        [HttpPost]
        public BaseModel<object> GetAllRadio([FromBody] QueryRequestParams p)
        {

            try
            {

                string connectionString = _configuration["AppConfig:ConnectionString"];
                using (DpsConnection cnn = new DpsConnection(connectionString))
                {

                    Dictionary<string, string> _sortableFields = new Dictionary<string, string>
                    {
                        { "radio_name", "radio_name" },
                        //{ "DonViTinh", "DonViTinh" }
                    };
                    Panigator v_panigator = null;
                    IDictionary<string, string> v_dic_keyFilter = new Dictionary<string, string>
                    {
                       { "radio_name", "radio_name" },
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
                    _sqlQuery = $@"select * from Radio" + " " + _whereCondition + " " + _orderBy + " ";
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
                                    id_radio = r["id_radio"],
                                    cast_name = r["cast_name"],
                                    created_date = r["created_date"],
                                    radio_name = r["radio_name"].ToString().Replace(".mp4", ""),
                                    url = "https://localhost:5001/" + "Radio/" + r["radio_name"],
                                   


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
