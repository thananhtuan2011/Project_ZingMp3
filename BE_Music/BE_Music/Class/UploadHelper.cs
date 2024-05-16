
using BE_Music.Common;
using BE_Music.Models;
using DpsLibs.Common;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Drawing.Imaging;
using System.IO;
using System.Net.Http;
using System.Threading.Tasks;



namespace BE_Music.Classes
{
    /// <summary>
    /// Upload vào thư mục chung /dulieu
    /// </summary>
    public class UploadHelper
    {
        public UploadHelper( IHttpContextAccessor accessor)
        {
            //logHelper = new LogHelper(configLogin.Value, accessor, 11);
        }
        public static ResizeResult Resize(Stream Input, int MaxWidth, int MaxHeight, string FilePath, string FileName, out string outFilename, ImageFormat Format, bool CropImage)
        {
            outFilename = FileName;
            Image image = null;
            try
            {
                image = Image.FromStream(Input);
            }
            catch
            {
                return ResizeResult.NotImage;
            }

            FileName = SProcess.SanitizeFileName(FileName);
            string text = Path.GetExtension(FileName);
            string fileNameWithoutExtension = Path.GetFileNameWithoutExtension(FileName);
            int num = image.Width;
            int num2 = image.Height;
            if ((num <= MaxWidth || MaxWidth <= 0) && (num2 <= MaxHeight || MaxHeight <= 0))
            {
                FileStream fileStream = new FileStream(outFilename, FileMode.Create);
                try
                {
                    byte[] buffer = new byte[1024];
                    int num3 = -1;
                    Input.Seek(0L, SeekOrigin.Begin);
                    for (num3 = Input.Read(buffer, 0, 1024); num3 > 0; num3 = Input.Read(buffer, 0, 1024))
                    {
                        fileStream.Write(buffer, 0, num3);
                    }

                    fileStream.Flush();
                }
                finally
                {
                    fileStream.Close();
                }

                return ResizeResult.Nochange;
            }

            if (Format != null)
            {
                text = "." + Format.ToString().ToLower();
            }

            float x = 0f;
            float y = 0f;
            if (!CropImage)
            {
                if (num > MaxWidth && MaxWidth > 0)
                {
                    num = MaxWidth;
                    num2 = MaxWidth * image.Height / image.Width;
                }

                if (num2 > MaxHeight && MaxHeight > 0)
                {
                    num2 = MaxHeight;
                    num = MaxHeight * image.Width / image.Height;
                }
            }
            else if (MaxWidth / MaxHeight > num / num2)
            {
                num = MaxWidth;
                num2 = MaxWidth * image.Height / image.Width;
                y = (MaxHeight - num2) / 2;
            }
            else
            {
                num2 = MaxHeight;
                num = MaxHeight * image.Width / image.Height;
                x = (MaxWidth - num) / 2;
            }

            try
            {
                using Bitmap bitmap = new Bitmap(CropImage ? MaxWidth : num, CropImage ? MaxHeight : num2);
                Graphics graphics = Graphics.FromImage(bitmap);
                graphics.SmoothingMode = SmoothingMode.AntiAlias;
                graphics.CompositingQuality = CompositingQuality.HighQuality;
                graphics.InterpolationMode = InterpolationMode.HighQualityBicubic;
                graphics.PixelOffsetMode = PixelOffsetMode.HighQuality;
                graphics.DrawImage(image, x, y, num, num2);
                if (Format == null)
                {
                    bitmap.Save(outFilename, image.RawFormat);
                }
                else
                {
                    bitmap.Save(outFilename, Format);
                }
            }
            catch
            {
                return ResizeResult.Failure;
            }

            return ResizeResult.Success;
        }

        public static ResizeResult Resize(Stream Input, int MaxWidth, int MaxHeight, string FilePath, string FileName, out string outFilename)
        {
            return Resize(Input, MaxWidth, MaxHeight, FilePath, FileName, out outFilename, null, CropImage: false);
        }

        public static string error = "";
        public static System.Drawing.Image Base64ToImage(string base64String)
        {
            byte[] imageBytes = Convert.FromBase64String(base64String);
            Bitmap tempBmp;
            using (MemoryStream ms = new MemoryStream(imageBytes, 0, imageBytes.Length))
            {
                ms.Write(imageBytes, 0, imageBytes.Length);
                using (System.Drawing.Image image = System.Drawing.Image.FromStream(ms, true))
                {
                    tempBmp = new Bitmap(image.Width, image.Height);
                    Graphics g = Graphics.FromImage(tempBmp);
                    g.DrawImage(image, 0, 0, image.Width, image.Height);
                }
            }
            return tempBmp;
        }
        public static string ImageToBase64(System.Drawing.Image image, ImageFormat format)
        {
            string base64String;
            using (MemoryStream ms = new MemoryStream())
            {
                // Convert Image to byte[]
                image.Save(ms, format);
                ms.Position = 0;
                byte[] imageBytes = ms.ToArray();

                // Convert byte[] to Base64 String
                base64String = Convert.ToBase64String(imageBytes);
            }
            return base64String;
        }

        public static ImageFormat GetExtensionImage(string postedFile)
        {
            ImageFormat extension = ImageFormat.Png;
            if (postedFile == "image/jpg")
                extension = ImageFormat.Jpeg;
            if (postedFile == "image/jpeg")
                extension = ImageFormat.Jpeg;
            if (postedFile == "image/gif")
                extension = ImageFormat.Gif;
            if (postedFile == "image/x-png")
                extension = ImageFormat.Png;
            return extension;
        }
        /// <summary>
        /// upload hình ảnh giữ nguyên size hoặc scale 512
        /// </summary>
        /// <param name="strBase64"></param>
        /// <param name="filename">filename bao gồm .extension</param>
        /// <param name="folder">Thư mục trong rootupload chứa file phân cấp bằng dấu /</param>
        /// <param name="ContentRootPath">_hostingEnvironment.ContentRootPath</param>
        /// <param name="filepath">file path sau khi upload trả về</param>
        /// <param name="keepSize"></param>
        /// <returns></returns>
        /// 
        public static object UploadImageAvatar(string strBase64, string filename, string folder, string ContentRootPath, ref string filepath, bool keepSize = true)
        {
            error = "";
            if (string.IsNullOrEmpty(strBase64))
            {
                error = "Không có file dữ liệu";
                return false;
            }
            try
            {
                byte[] imageBytes = Convert.FromBase64String(strBase64);
                if (imageBytes.Length > Constant.MaxSize)
                {
                    error = "File hình không được lớn hơn " + Constant.MaxSize / 1000 + "MB";
                    return false;
                }
                string path = Constant.RootAvatar + folder;
                string Base_Path = Path.Combine(ContentRootPath, path);
                if (!Directory.Exists(Base_Path)) //tạo thư mục nếu chưa có
                    Directory.CreateDirectory(Base_Path);
                filename = checkFilename(filename, path);
                System.Drawing.Image img = Base64ToImage(strBase64);
                if (keepSize)
                {
                    img.Save(Base_Path + filename);
                }
                else
                {
                    int maxsize = img.Height > img.Width ? img.Width : img.Height;
                    if (maxsize < 64)
                    {
                        error = "Kích thước hình ảnh quá nhỏ";
                        return false;
                    }
                    maxsize = maxsize > 512 ? 512 : maxsize;
                    using (MemoryStream sr = new MemoryStream())
                    {
                        MemoryStream d = new MemoryStream(imageBytes);
                        if (!Directory.Exists(Base_Path)) //tạo thư mục nếu chưa có
                            Directory.CreateDirectory(Base_Path);
                        var rs = DpsLibs.Common.IProcess.Resize(d, maxsize, maxsize, Base_Path, filename, out filename, System.Drawing.Imaging.ImageFormat.Png, false);//nén hình và lưu file
                        if (rs != DpsLibs.Common.ResizeResult.Success && rs != DpsLibs.Common.ResizeResult.Nochange)
                        {
                            error = "Upload hình ảnh thất bại";
                            return false;
                        }
                    }
                }
                //string s_name = Path.GetFileName(filename);
                filepath = folder + "/" + filename;
                return filename;
            }
            catch (Exception ex)
            {
                error = "Có gì đó không đúng, vui lòng thử lại sau";
                return JsonResultCommon.ThatBai(error);
            }
        }
        public static object SaveStreamAsFile(string filePath, MemoryStream inputStream, string fileName, string folder, string ContentRootPath)
        {
            string path = folder;
            string Base_Path = Path.Combine(ContentRootPath, path);
            DirectoryInfo info = new DirectoryInfo(Base_Path);
            if (!info.Exists)
            {
                info.Create();
            }

            string pathlaster = Path.Combine(filePath, fileName);
            using (FileStream outputFileStream = new FileStream(pathlaster, FileMode.Create, FileAccess.ReadWrite))
            {
                inputStream.WriteTo(outputFileStream);
            }
             return "http://localhost:5001/"+folder+"/" + fileName;
        }

        public static object UploadImage(string strBase64, string filename, string folder, string ContentRootPath, bool keepSize = true)
        {
            error = "";
            if (string.IsNullOrEmpty(strBase64))
            {
                error = "Không có file dữ liệu";
                return null;
            }
            try
            {
              string   path = Path.GetFullPath(Path.Combine(Environment.CurrentDirectory, folder));

                //Check if directory exist
                if (!System.IO.Directory.Exists(path))
                {
                    System.IO.Directory.CreateDirectory(path); //Create directory if it doesn't exist
                }

                string imageName = filename ;

                //set the image path
                string imgPath = Path.Combine(path, imageName);

                byte[] imageBytes = Convert.FromBase64String(strBase64);

                File.WriteAllBytes(imgPath, imageBytes);

                return  filename;
            }
            catch (Exception ex)
            {
                error = "Có gì đó không đúng, vui lòng thử lại sau";
                return JsonResultCommon.ThatBai(error);
            }
        }

        internal static bool DeleteFile(string signedPath)
        {
            try
            {
                if (File.Exists(signedPath))
                {
                    // If file found, delete it    
                    File.Delete(signedPath);
                    return true;
                }
                return false;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        /// <summary>
        /// upload file
        /// </summary>
        /// <param name="strBase64"></param>
        /// <param name="filename">filename bao gồm .extension</param>
        /// <param name="folder">Thư mục trong rootupload chứa file phân cấp bằng dấu /</param>
        /// <param name="ContentRootPath">_hostingEnvironment.ContentRootPath</param>
        /// <param name="filepath">file path sau khi upload trả về</param>
        /// <returns></returns>
        public static bool UploadFile(string strBase64, string filename, string folder, string ContentRootPath, ref string filepath)
        {
            error = "";
            if (string.IsNullOrEmpty(strBase64))
            {
                error = "Không có file dữ liệu";
                return false;
            }
            try
            {
                byte[] bytes = Convert.FromBase64String(strBase64);
                if (bytes.Length > Constant.MaxSize)
                {
                    error = "File hình không được lớn hơn " + Constant.MaxSize / 1000 + "MB";
                    return false;
                }
                string path = Constant.RootPost + folder;
                string Base_Path = Path.Combine(ContentRootPath, path);
                if (!Directory.Exists(Base_Path)) //tạo thư mục nếu chưa có
                    Directory.CreateDirectory(Base_Path);
                filename = checkFilename(filename, path);
                path += filename;
                File.WriteAllBytes(path, bytes);
                //string s_name = Path.GetFileName(filename);
                filepath = folder + filename;
                return true;
            }
            catch (Exception ex)
            {
                error = "Có gì đó không đúng, vui lòng thử lại sau";
                return false;
            }
        }

        /// <summary>
        /// Kiem tra file ton tai? =>đánh số thêm (n)
        /// </summary>
        /// <param name="filename"></param>
        /// <param name="path"></param>
        /// <returns></returns>
        private static string checkFilename(string filename, string path)
        {
            int i = 1;
            var arr = filename.Split(".");
            string _filename = "";
            for (int ii = 0; ii < arr.Length - 1; ii++)
            {
                _filename += (_filename == "" ? "" : ".") + arr[ii];
            }
            string _extension = "." + arr[arr.Length - 1];
            string filename_new = _filename;
            string pathFile = _filename + _extension;
            while (File.Exists(path + pathFile))
            {
                filename_new = _filename + " (" + i + ")";
                pathFile = filename_new + _extension;
                i = i + 1;
            }

            return pathFile;
        }

        public static string GetFileName(string hrefLink)
        {
            string[] parts = hrefLink.Split('/');
            string fileName = "";

            if (parts.Length > 0)
                fileName = parts[parts.Length - 1];
            else
                fileName = hrefLink;

            return fileName;
        }

        public static string GetContentType(string path)
        {
            var types = GetMimeTypes();
            var ext = Path.GetExtension(path).ToLowerInvariant();
            if (types.ContainsKey(ext))
                return types[ext];
            return "";
        }

        private static Dictionary<string, string> GetMimeTypes()
        {
            return new Dictionary<string, string>
            {
                {".txt", "text/plain"},
                {".pdf", "application/pdf"},
                {".doc", "application/vnd.ms-word"},
                {".docx", "application/vnd.ms-word"},
                {".ppt", "	application/vnd.ms-powerpoint"},
                {".pptx","	application/vnd.openxmlformats-officedocument.presentationml.presentation" },
                {".xls", "application/vnd.ms-excel"},
                {".xlsx", "application/vnd.openxmlformatsofficedocument.spreadsheetml.sheet"},
                {".png", "image/png"},
                {".heic", "image/png"},
                {".jpg", "image/jpeg"},
                {".jpeg", "image/jpeg"},
                {".mp4", "video"},
                {".gif", "image/gif"},
                {".csv", "text/csv"},
                {".rar","application/vnd.rar" },
                {".zip","application/zip" },
                {".7z","application/x-7z-compressed" }
            };
        }
        private static Dictionary<string, string> GetIcon()
        {
            return new Dictionary<string, string>
            {
                {"application/pdf", "pdf.png"},
                {"application/vnd.ms-word","word.png"},
                {"application/vnd.ms-powerpoint","ppt.png"},
                {"application/vnd.openxmlformats-officedocument.presentationml.presentation","ppt.png" },
                {"application/vnd.ms-excel","excel.png"},
                {"application/vnd.openxmlformatsofficedocument.spreadsheetml.sheet","excel.png"},
                {"image/png","png.png"},
                {"image/jpeg","jpg.png"},
                {"image/gif","gif.png"},
                {"text/csv","csv.png"}
            };
        }
        public static string GetIcon(string type)
        {
            var types = GetIcon();
            if (types.ContainsKey(type))
                return "assets/media/mime/" + types[type];
            return "assets/media/mime/text2.png";
        }
        public static string GetType(string type)
        {
            string titletype = "";
            if(type== "application/pdf")
            {
                titletype = "PDF";
            }else if(type == "application/vnd.ms-word")
            {
                titletype = "DOCX";
            }  else if(type== "application/vnd.ms-powerpoint")
            {
                titletype = "PPT";
            }   else if(type== "application/vnd.ms-excel")
            {
                titletype = "Excel";
            } else if(type== "application/vnd.openxmlformatsofficedocument.spreadsheetml.sheet")
            {
                titletype = "Excel";
            } 
            else
            {
                titletype = "TXT";
            }
            return titletype;




        }
            public static bool IsImage(string type)
        {
            return type.StartsWith("image");
        }
    }
}
