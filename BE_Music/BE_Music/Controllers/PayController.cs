using API_Clothes_Shop;
using BE_Music.Common;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BE_Music.Controllers
{
    [Route("api/pay")]
    [ApiController]
    public class PayController : ControllerBase
    {

        private IConfiguration _configuration;

        public PayController(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        [Route("Pay_Vnpay")]
        [HttpPost]
        public object Pay_Vnpay(int tongtien)
        {
            try
            {
                
                string url = _configuration["VNPay:url_vnpay"];
                string returnUrl = _configuration["VNPay:returnUrl"];
                string tmnCode = _configuration["VNPay:tmnCode"];
                string hashSecret = _configuration["VNPay:hashSecret"];

                PayLib pay = new PayLib();

                pay.AddRequestData("vnp_Version", "2.1.0"); //Phiên bản api mà merchant kết nối. Phiên bản hiện tại là 2.1.0
                pay.AddRequestData("vnp_Command", "pay"); //Mã API sử dụng, mã cho giao dịch thanh toán là 'pay'
                pay.AddRequestData("vnp_TmnCode", tmnCode); //Mã website của merchant trên hệ thống của VNPAY (khi đăng ký tài khoản sẽ có trong mail VNPAY gửi về)
                pay.AddRequestData("vnp_Amount", (tongtien*100).ToString()); //số tiền cần thanh toán, công thức: số tiền * 100 - ví dụ 10.000 (mười nghìn đồng) --> 1000000
                pay.AddRequestData("vnp_BankCode", ""); //Mã Ngân hàng thanh toán (tham khảo: https://sandbox.vnpayment.vn/apis/danh-sach-ngan-hang/), có thể để trống, người dùng có thể chọn trên cổng thanh toán VNPAY
                pay.AddRequestData("vnp_CreateDate", DateTime.Now.ToString("yyyyMMddHHmmss")); //ngày thanh toán theo định dạng yyyyMMddHHmmss
                pay.AddRequestData("vnp_CurrCode", "VND"); //Đơn vị tiền tệ sử dụng thanh toán. Hiện tại chỉ hỗ trợ VND
                pay.AddRequestData("vnp_IpAddr", Util.GetIpAddress(HttpContext)); //Địa chỉ IP của khách hàng thực hiện giao dịch
                pay.AddRequestData("vnp_Locale", "vn"); //Ngôn ngữ giao diện hiển thị - Tiếng Việt (vn), Tiếng Anh (en)
                pay.AddRequestData("vnp_OrderInfo", "Thanh toan don hang"); //Thông tin mô tả nội dung thanh toán
                pay.AddRequestData("vnp_OrderType", "billpayment"); //topup: Nạp tiền điện thoại - billpayment: Thanh toán hóa đơn - fashion: Thời trang - other: Thanh toán trực tuyến
                pay.AddRequestData("vnp_ReturnUrl", returnUrl); //URL thông báo kết quả giao dịch khi Khách hàng kết thúc thanh toán
                pay.AddRequestData("vnp_TxnRef", DateTime.Now.Ticks.ToString()); //mã hóa đơn

                string paymentUrl = pay.CreateRequestUrl(url, hashSecret);

                return JsonConvert.SerializeObject(paymentUrl);



            }
            catch (Exception ex)
            {
                return JsonResultCommon.Exception(ex);
            }


        }

        

    }
}
