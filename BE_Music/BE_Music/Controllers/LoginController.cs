
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Data.Common;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using BE_Music.Models.BaseModel;
using BE_Music.Models;
using BE_Music.Models.Common;
using BE_Music.Common;
using BE_Music.Interface_Service;
using DpsLibs.Data;
using Microsoft.Extensions.Configuration;

namespace BE_Music.Controllers
{
    [Route("api/acount")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly ILogin _login;
        private IConfiguration _configuration;
        public LoginController(ILogin login, IConfiguration configuration)
        {
            _login = login;
            _configuration = configuration;
        }
        [Route("GetAllUser")]
        [HttpPost]
        public BaseModel<object> GetAllUser([FromBody] QueryRequestParams p)
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
                    _sqlQuery = $@"select * from Acount" + " " + _whereCondition + " " + _orderBy + " ";
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
                                    account_id = r["account_id"],
                                    active = r["active"],
                                    address = r["address"],
                                    full_name = r["full_name"],
                                    phone = r["phone"],
                                    user_name = r["user_name"],
                                    email = r["email"],
                                    created_at = r["created_at"],
                                    updated_at = r["updated_at"],
                                    isGoogle = r["isGoogle"],

                                };

                    return JsonResultCommon.ThanhCong(_data, v_panigator);
                }
            }
            catch (Exception ex)
            {
                return JsonResultCommon.Exception(ex);
            }
        }
        [HttpGet]
        [Route("Login")]
        public async Task<object> Login(string username, string pass)
        {
            var data = await _login.Login(username, pass);
            if (data == null)
            {
                return null;
            }
            return data;


        }

        [HttpGet]
        [Route("Register")]
        public async Task<object> Register(string fullname, string username,string pass)
        {


            string ConnectionString = _configuration["AppConfig:ConnectionString"];
            using (DpsConnection cnn = new DpsConnection(ConnectionString))
            {
                SqlConditions Conds = new SqlConditions();
                Conds.Add("user_name", username);

                DataTable checktbl = new DataTable();
                checktbl = cnn.CreateDataTable(@" select * from  Acount where user_name=@user_name", Conds);
                if (checktbl.Rows.Count == 0)
                {

                    Hashtable val = new Hashtable();

                    val.Add("user_name", username);
                    val.Add("password", pass);
                    val.Add("role_code", 2);
                    val.Add("created_at", DateTime.Now);
                    val.Add("isGoogle", false);
                    val.Add("full_name", fullname);
                    

                    if (cnn.Insert(val, "Acount") < 0)
                    {
                        cnn.RollbackTransaction();
                        return JsonResultCommon.ThatBai("Cập nhật thất bại", cnn.LastError);
                    }
                }
                else
                {
                    return JsonResultCommon.ThatBai("Đã tồn tại");
                }
            }


            var data = new
            {
                username = username,
                 password = pass
        };


            return JsonResultCommon.ThanhCong(data);

        }

        [HttpGet]
            [Route("LoginWithGoogle")]
            public async Task<object> LoginWithGoogle(string email, string name)
            {


            string ConnectionString = _configuration["AppConfig:ConnectionString"];
            using (DpsConnection cnn = new DpsConnection(ConnectionString))
            {
                SqlConditions Conds = new SqlConditions();
                Conds.Add("email", email);
                Conds.Add("isGoogle", true);

                DataTable checktbl = new DataTable();
                checktbl = cnn.CreateDataTable(@" select * from  Acount where email=@email and isGoogle=@isGoogle", Conds);
               if(checktbl.Rows.Count==0)
                {

                Hashtable val = new Hashtable();

                val.Add("email", email);
                    val.Add("full_name", name);
                         val.Add("created_at", DateTime.Now);
                    val.Add("role_code", 2);
                    val.Add("isGoogle", true);
                

            if (cnn.Insert(val, "Acount") < 0)
            {
                cnn.RollbackTransaction();
                return JsonResultCommon.ThatBai("Cập nhật thất bại", cnn.LastError);
            }
                }
            else
                {
                    return JsonResultCommon.ThanhCong();
                }    
            }


            return JsonResultCommon.ThanhCong();

        }

        //[Route("AllAcount")]
        //[HttpPost]
        //public IActionResult AllAcount([FromBody] QueryRequestParams query)
        //{

        //    string _keywordSearch = ""; //Keyword tìm kiếm
        //    bool _orderBy_ASC = false;  //Khởi tạo sắp xếp dữ liệu acs hoặc desc khi tìm kiếm
        //    try
        //    {
        //        //Lấy Token, lấy model
        //        //string Token = GeneralController.GetHeader(Request);
        //        //UserJWT loginData = GeneralController._GetInfoUser(Token);
        //        //if (loginData == null)
        //        //    return BadRequest("Authen not found");
        //        BaseModels<AccountModel> model = new BaseModels<AccountModel>();

        //        Func<AccountModel, object> _orderByExpression = x => x.full_name;  //Khởi tạo mặc định sắp xếp dữ liệu
        //        Dictionary<string, Func<AccountModel, object>> _sortableFields = new Dictionary<string, Func<AccountModel, object>>   //Khởi tạo các trường để sắp xếp
        //        {

        //            //{ "ProjectInvestment", x => x.ProjectInvestment },
        //            //{ "CreateName", x => x.CreateUserId },
        //            //{ "CreateTimeDisplay", x => x.CreateTime },
        //            //{ "IsAction", x => x.IsAction },
        //        };

        //        if (query.Sort != null
        //            && !string.IsNullOrEmpty(query.Sort.ColumnName)
        //            && _sortableFields.ContainsKey(query.Sort.ColumnName))
        //        {
        //            _orderBy_ASC = ("desc".Equals(query.Sort.Direction.ToLower()) ? false : true);    //Sắp xếp asc hoặc desc
        //            _orderByExpression = _sortableFields[query.Sort.ColumnName]; //Trường cần sắp xếp
        //        }


        //        //var lstData = _repoBusi._context.Businesses
        //        //                   .Where(c => !c.IsDel)
        //        //                   .ToList();

        //        IQueryable<AccountModel> _data = (from d in _context.Account
        //                                          select new AccountModel
        //                                          {
        //                                              account_id = d.account_id,
        //                                              address = d.address,
        //                                              admin = d.admin,
        //                                              full_name = d.full_name,
        //                                              role_code = d.role_code,
        //                                              phone = d.phone,
        //                                              user_name = d.user_name,
        //                                              email = d.email,
        //                                              created_at = d.created_at,

        //                                          }); ;


        //        if (query.Filter != null && query.Filter.ContainsKey("full_name")
        //            && !string.IsNullOrEmpty(query.Filter["full_name"]))
        //        {
        //            _data = _data.Where(x => x.full_name.ToString() == query.Filter["full_name"]);
        //        }

        //        if (query.SearchValue != null && query.SearchValue != "") //Kiểm tra điều kiện tìm kiếm
        //        {
        //            _keywordSearch = query.SearchValue.Trim().ToLower();
        //            _data = _data.Where(x => x.full_name.ToLower().Contains(_keywordSearch)
        //            //|| x.ProjectName.ToLower().Contains(_keywordSearch)
        //            //|| x.Investors.ToLower().Contains(_keywordSearch)
        //            //|| x.ProjectInvestment.ToString().Contains(_keywordSearch)
        //            );  //Lấy table đã select tìm kiếm theo keyword
        //        }
        //        // model.items = _data.ToList();

        //        int _countRows = _data.Count(); //Đếm số dòng của table đã select được
        //        if (_countRows == 0)    //nếu table = 0 thì trả về không có dữ liệu
        //        {
        //            return BadRequest("Nodata");
        //        }


        //        if (_orderBy_ASC) //Sắp xếp dữ liệu theo acs
        //        {
        //            model.data = _data
        //            .OrderBy(_orderByExpression)
        //            .Skip((query.Panigator.PageIndex - 1) * query.Panigator.PageSize)
        //                .Take(query.Panigator.PageSize)
        //                .ToList();
        //        }
        //        else if (query.Sort != null
        //            && !string.IsNullOrEmpty(query.Sort.ColumnName)
        //            && _sortableFields.ContainsKey(query.Sort.ColumnName)) //Sắp xếp dữ liệu theo desc
        //        {
        //            model.data = _data
        //             .OrderByDescending(_orderByExpression)
        //            .Skip((query.Panigator.PageIndex - 1) * query.Panigator.PageSize)
        //                .Take(query.Panigator.PageSize)
        //                .ToList();
        //        }
        //        else
        //        {
        //            model.data = _data.ToList()
        //               .Skip((query.Panigator.PageIndex - 1) * query.Panigator.PageSize)
        //                   .Take(query.Panigator.PageSize)
        //                   .ToList();

        //        }


        //        ////Đoạn này lấy total đã tối ưu việc call DB nhiều lần
        //        //var listId = model.items.Select(x => x.CateCriteriaId).ToList();
        //        //var listTotal = _repo._context.CateCriteria.Where(x => listId.Contains(x.CateCriteriaId)).Select(x =>
        //        // new CateCriteriaModel
        //        // {
        //        //     CateCriteriaId = x.CateCriteriaId
        //        // }).ToList();
        //        //for (int i = 0; i < model.items.Count(); i++)
        //        //{
        //        //    int tt = listTotal.Where(x => x.CateCriterionId == model.items[i].CateCriterionId).Select(x => x.TotalStore).FirstOrDefault(0);
        //        //    model.items[i].TotalStore = tt;
        //        //}
        //        model.status = 1;
        //        model.total = _countRows;
        //        return Ok(model);
        //    }
        //    catch (Exception ex)
        //    {
        //        return BadRequest(ex);
        //    }
        //}
        //[Route("RemoveACount")]
        //[HttpPost]
        //public async Task<object> RemoveACount(int account_id)
        //{



        //    try
        //    {

        //        var dt = _context.Account.Where(x => x.account_id == account_id).FirstOrDefault();
        //        _context.Remove(dt);
        //        await _context.SaveChangesAsync();




        //        return JsonResultCommon.ThanhCong();
        //    }
        //    catch (Exception ex)
        //    {
        //        return JsonResultCommon.Exception(ex);
        //    }
        //}
        //[Route("UpdateRoles")]
        //[HttpPost]
        //public object UpdateRoles(int account_id, int valueupdate)
        //{



        //    try
        //    {

        //        var dt = _context.Account.Where(x => x.account_id == account_id).FirstOrDefault();

        //        if (valueupdate == 1)
        //        {
        //            dt.admin = true;
        //            dt.role_code = "1";
        //            _context.SaveChanges();


        //        }
        //        else
        //        {
        //            dt.admin = false;
        //            dt.role_code = "2";
        //            _context.SaveChanges();
        //        }

        //        return JsonResultCommon.ThanhCong();
        //    }
        //    catch (Exception ex)
        //    {
        //        return JsonResultCommon.Exception(ex);
        //    }
        //}
        //[Route("Register")]
        //[HttpPost]
        //public object Register(AccountModel ac)
        //{



        //    try
        //    {

        //        var dt = _context.Account.Where(x => x.user_name == ac.user_name).ToList();

        //            if (dt.Count() > 0)
        //            {
        //                return JsonResultCommon.Trung(ac.user_name);
        //            }
        //            else
        //            {

        //            _context.Account.Add(ac);
        //            _context.SaveChangesAsync();



        //        }

        //        return JsonResultCommon.ThanhCong(ac);
        //    }
        //    catch (Exception ex)
        //    {
        //        return JsonResultCommon.Exception(ex);
        //    }
        //}





        [HttpPost]
        [Route("refresh")]
        public IActionResult Refresh(string token, string refresh )
        {
            if (token is null)
                return BadRequest("Invalid client request");
            string accessToken = token;
            string refreshToken = refresh;
            var principal = _login.GetPrincipalFromExpiredToken(accessToken);
            var username = principal.Identity.Name; //this is mapped to the Name claim by default
           // var user = _context.Account.Where(u => u.user_name == username);
           // if (user is null || user.RefreshToken != refreshToken || user.RefreshTokenExpiryTime <= DateTime.Now)
                //    return BadRequest("Invalid client request");
                var newAccessToken = _login.GenerateAccessToken(principal.Claims);
            var newRefreshToken = _login.GenerateRefreshToken();
            //user.RefreshToken = newRefreshToken;
            //_userContext.SaveChanges();
            return Ok(new 
            {
                Token = newAccessToken,
                RefreshToken = newRefreshToken
            });
        }
    }
}
