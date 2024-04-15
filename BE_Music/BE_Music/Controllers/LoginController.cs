
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

namespace BE_Music.Controllers
{
    [Route("api/acount")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly ILogin _login;
        public LoginController(ILogin login )
        {
            _login = login;
        }
        [HttpGet]
        [Route("Login")]
        public async Task<object> Login(string username, string pass)
        {
            var data = await _login.Login(username, pass);
            if (data == null)
            {
                return BadRequest("no token");
            }
            return data;



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
