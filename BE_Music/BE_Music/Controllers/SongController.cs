﻿using BE_Music.Common;
using BE_Music.Models;
using BE_Music.Models.BaseModel;
using BE_Music.Services.Type;
using DpsLibs.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.IO;
using System.Web;
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
        [Route("UpFile")]
        [HttpPost]
        public async Task<object> UpFile(IFormFile file)
        {
          
            try
            {
                string path = "";
               

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
                    //string ext = Path.GetExtension(postedFile.FileName);
                    //if (!String.IsNullOrEmpty(ext))
                    //{
                    //    filename += ext; ///EX: "namefile.pdf"
                    //    postedFile.SaveAs(dpath + "/" + filename);
                    //}
            }
            catch (Exception)
            {
               
            }

            return JsonResultCommon.ThanhCong();
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
                       { "FullName", "FullName" },
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
                                        _whereCondition += " AND " + v_dic_keyFilter[_filter] + " LIKE'%";
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
                    _sqlQuery = $@"select * from TypeSong" + " " + _whereCondition + " " + _orderBy + " ";
                    DataTable _datatable = cnn.CreateDataTable(_sqlQuery, Conds);
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
                                    type_id = r["type_id"],
                                    typename = r["typename"],
                                    type_description = r["type_description"],
                                    created_at = r["created_at"],
                                    updated_at = r["updated_at"],



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
