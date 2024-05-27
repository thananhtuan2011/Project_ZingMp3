using BE_Music.Common;
using BE_Music.Model.TypeSong;
using BE_Music.Models;
using BE_Music.Models.BaseModel;
using BE_Music.Models.Common;
using BE_Music.Services.Type;
using DpsLibs.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Data;

namespace BE_Music.Controllers
{
    [ApiController]
    [Route("api/typesong")]
    public class TypeSongController : ControllerBase
    {
        private readonly ITypeSong _typeSongService;
        private IConfiguration _configuration;

        public TypeSongController(ITypeSong typeSongService, IConfiguration configuration)
        {
            _configuration = configuration;
            _typeSongService = typeSongService;
        }

        [HttpPost]
        public IActionResult CreateType(TypeSong type)
        {
            try
            {
                var createdType = _typeSongService.CreateType(type);
                return Ok(createdType);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [Route("GetTypeSong_ForId")]
        [HttpGet]
        public BaseModel<object> GetTypeSong_ForId(int type_id)
        {

            try
            {

                string connectionString = _configuration["AppConfig:ConnectionString"];
                using (DpsConnection cnn = new DpsConnection(connectionString))
                {
                    SqlConditions Conds = new SqlConditions();

                    Conds.Add("type_id", type_id);
                    DataTable _datatable = cnn.CreateDataTable($@"SELECT  *  FROM TypeSong
where type_id=@type_id", Conds);

                    var _data = (from r in _datatable.AsEnumerable()
                                 select new
                                 {
                                     img = "https://localhost:5001/" + "HinhAnh/" + r["img"],
                                     type_id = r["type_id"],
                                     typename = r["typename"],
                                     type_description = r["type_description"],
                                     created_at = r["created_at"],
                                     updated_at = r["updated_at"],



                                 }).FirstOrDefault() ;

                    return JsonResultCommon.ThanhCong(_data);
                }
            }
            catch (Exception ex)
            {
                return JsonResultCommon.Exception(ex);
            }
        }
        [Route("GetRanDomTypeSong")]
        [HttpGet]
        public BaseModel<object> GetRanDomTypeSong()
        {

            try
            {

                string connectionString = _configuration["AppConfig:ConnectionString"];
                using (DpsConnection cnn = new DpsConnection(connectionString))
                {

                    DataTable _datatable = cnn.CreateDataTable($@"SELECT TOP 5 *  FROM TypeSong
ORDER BY NEWID()");

                    var _data = from r in _datatable.AsEnumerable()
                                select new
                                {
                                    img = "https://localhost:5001/" + "HinhAnh/" + r["img"],
                                    type_id = r["type_id"],
                                    typename = r["typename"],
                                    type_description = r["type_description"],
                                    created_at = r["created_at"],
                                    updated_at = r["updated_at"],



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
        [Route("CreateTypeNew")]
        public IActionResult CreateTypeNew(TypeSong type)
        {
            try
            {
                var createdType = _typeSongService.CreateTypeNew(type);
                return Ok(createdType);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpPost]
        [Route("UpdateTypeSong")]
        public IActionResult UpdateTypeSong(int type_id,TypeSong type)
        {
            try
            {
                var createdType = _typeSongService.UpdateTypeSong(type_id, type);
                return Ok(createdType);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpGet("{typeId}")]
        public IActionResult GetTypeById(int typeId)
        {
            try
            {
                var type = _typeSongService.GetTypeById(typeId);
                if (type == null)
                {
                    return NotFound($"Type with ID {typeId} not found");
                }
                return Ok(type);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

      

        [Route("GetAllType")]
        [HttpPost]
        public BaseModel<object> GetAllType([FromBody] QueryRequestParams p)
        {
     
            try
            {

                string connectionString = _configuration["AppConfig:ConnectionString"];
                using (DpsConnection cnn = new DpsConnection(connectionString))
                {

                    Dictionary<string, string> _sortableFields = new Dictionary<string, string>
                    {
                        { "typename", "typename" },
                        //{ "DonViTinh", "DonViTinh" }
                    };
                    Panigator v_panigator = null;
                    IDictionary<string, string> v_dic_keyFilter = new Dictionary<string, string>
                    {
                       { "typename", "typename" },
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
                                        _whereCondition += " where " + v_dic_keyFilter[_filter] +" LIKE N'%";
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
                                  img = "https://localhost:5001/" + "HinhAnh/" + r["img"],
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
        [HttpPut("{typeId}")]
        public IActionResult UpdateType(int typeId, TypeSong updatedType)
        {
            try
            {
                var type = _typeSongService.GetTypeById(typeId);
                if (type == null)
                {
                    return NotFound($"Type with ID {typeId} not found");
                }

                var result = _typeSongService.UpdateType(typeId, updatedType);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // TypeSongController.cs
        [HttpDelete("{typeId}")]
        public BaseModel<object> DeleteType(int typeId)
        {
            try
            {
                string connectionString = _configuration["AppConfig:ConnectionString"];
                using (DpsConnection cnn = new DpsConnection(connectionString))
                {

                    SqlConditions Conds = new SqlConditions();
                    Conds.Add("type_id", typeId);
                    if (cnn.Delete( Conds, "TypeSong") < 0)
                    {
                        cnn.RollbackTransaction();
                        return JsonResultCommon.ThatBai("Cập nhật thất bại", cnn.LastError);
                    }

                    return JsonResultCommon.ThanhCong();

                }

                    // Kiểm tra xem loại nhạc có tồn tại không

                }
            catch (Exception ex)
            {
                // Trả về lỗi 500 nếu có lỗi xảy ra trong quá trình xóa loại nhạc
                return JsonResultCommon.Exception(ex);
            }
        }

    }
}
