using BE_Music.Classes;
using BE_Music.Common;
using BE_Music.Interface_Service;
using BE_Music.Model.TypeSong;
using BE_Music.Models.BaseModel;
using DpsLibs.Data;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Data;

namespace BE_Music.Services.Type
{
    public class TypeSongService : ITypeSong
    {
        private readonly IConfiguration _config;

        public TypeSongService(IConfiguration config)
        {
            _config = config;
        }

        public TypeSong CreateType(TypeSong type)
        {
            string connectionString = _config["AppConfig:ConnectionString"];
            using (DpsConnection cnn = new DpsConnection(connectionString))
            {
                // Thực hiện truy vấn thêm mới loại nhạc
                cnn.ExecuteNonQuery("INSERT INTO TypeSong (typename, type_description, created_at, updated_at) VALUES (@typename, @type_description, @created_at, @updated_at)",
                    new SqlConditions
                    {
                { "typename", type.typename },
                { "type_description", type.type_description },
                { "created_at", DateTime.Now },
                { "updated_at", DateTime.Now }
                    });

                // Sau khi thêm mới, trả về thông tin loại nhạc đã được thêm
                return type;
            }
        }
        public object CreateTypeNew(TypeSong type)
        {
            string connectionString = _config["AppConfig:ConnectionString"];
            using (DpsConnection cnn = new DpsConnection(connectionString))
            {
                var img = UploadHelper.UploadImage(type.base64, type.file_name, "HinhAnh", "HinhAnh", true);
                // Thực hiện truy vấn thêm mới loại nhạc
                Hashtable val = new Hashtable(); //  Hashtable này dùng để insert dữ liệu vào db

                val.Add("img", img);
                val.Add("typename", type.typename);
                val.Add("type_description", type.type_description);
                val.Add("created_at", DateTime.Now);
                val.Add("updated_at", DBNull.Value);

                if (cnn.Insert(val, "TypeSong") < 0)
                {
                    cnn.RollbackTransaction();
                    return JsonResultCommon.ThatBai("Cập nhật thất bại", cnn.LastError);
                }
                // Sau khi thêm mới, trả về thông tin loại nhạc đã được thêm
                return JsonResultCommon.ThanhCong(); ;
            }
        }



      

        public TypeSong GetTypeById(int typeId)
        {
            string connectionString = _config["AppConfig:ConnectionString"];
            using (DpsConnection cnn = new DpsConnection(connectionString))
            {
                // Thực hiện truy vấn để lấy thông tin loại nhạc theo typeId
                DataTable dt = cnn.CreateDataTable("SELECT * FROM TypeSong WHERE type_id = @typeId",
                    new SqlConditions { { "typeId", typeId } });

                // Nếu không tìm thấy loại nhạc, trả về null
                if (dt.Rows.Count == 0)
                {
                    return null;
                }

                // Lấy thông tin loại nhạc từ dòng đầu tiên của kết quả truy vấn
                DataRow row = dt.Rows[0];
                TypeSong type = new TypeSong
                {
                    type_id = Convert.ToInt32(row["type_id"]),
                    typename = row["typename"] != DBNull.Value ? row["typename"].ToString() : null,
                    type_description = row["type_description"] != DBNull.Value ? row["type_description"].ToString() : null,
                    created_at = row["created_at"] != DBNull.Value ? Convert.ToDateTime(row["created_at"]) : default(DateTime),
                    updated_at = row["updated_at"] != DBNull.Value ? Convert.ToDateTime(row["updated_at"]) : default(DateTime),
                };

                return type;
            }
        }


        public object UpdateTypeNew(int typeId, TypeSong updatedType)
        {
            string connectionString = _config["AppConfig:ConnectionString"];
            using (DpsConnection cnn = new DpsConnection(connectionString))
            {
                // Thực hiện truy vấn thêm mới loại nhạc
                SqlConditions Conds = new SqlConditions();
                Hashtable val = new Hashtable(); //  Hashtable này dùng để insert dữ liệu vào db
                Conds.Add("typeId", typeId); // cái này là điều kiện để update
                val.Add("typename", updatedType.typename);
                val.Add("type_description", updatedType.type_description);
                val.Add("updated_at", DateTime.Now);
           

                if (cnn.Update(val, Conds, "TypeSong") < 0)
                {
                    cnn.RollbackTransaction();
                    return JsonResultCommon.ThatBai("Cập nhật thất bại", cnn.LastError);
                }
                // Sau khi thêm mới, trả về thông tin loại nhạc đã được thêm
                return JsonResultCommon.ThanhCong();
            }
        }



        public TypeSong UpdateType(int typeId, TypeSong updatedType)
        {
            string connectionString = _config["AppConfig:ConnectionString"];
            using (DpsConnection cnn = new DpsConnection(connectionString))
            {
                // Thực hiện truy vấn cập nhật thông tin loại nhạc
                cnn.ExecuteNonQuery("UPDATE TypeSong SET typename = @typename, type_description = @type_description, updated_at = @updated_at WHERE type_id = @typeId",
                    new SqlConditions
                    {
                { "typename", updatedType.typename },
                { "type_description", updatedType.type_description },
                { "updated_at", DateTime.Now },
                { "typeId", typeId }
                    });

                // Sau khi cập nhật, trả về thông tin loại nhạc đã được cập nhật
                updatedType.type_id = typeId;
                return updatedType;
            }
        }

        // TypeSongService.cs
        public object DeleteTypeNew(int typeId)
        {
            string connectionString = _config["AppConfig:ConnectionString"];
            using (DpsConnection cnn = new DpsConnection(connectionString))
            {
                // Thực hiện truy vấn thêm mới loại nhạc
                SqlConditions Conds = new SqlConditions();
                Hashtable val = new Hashtable(); //  Hashtable này dùng để insert dữ liệu vào db
                Conds.Add("typeId", typeId); // cái này là điều kiện để update
                if (cnn.Delete( Conds, "TypeSong") < 0)
                {
                    cnn.RollbackTransaction();
                    return JsonResultCommon.ThatBai("Cập nhật thất bại", cnn.LastError);
                }
                // Sau khi thêm mới, trả về thông tin loại nhạc đã được thêm
                return JsonResultCommon.ThanhCong(); ;
            }
        }
        public void DeleteType(int typeId)
        {
            try
            {
                // Kết nối đến cơ sở dữ liệu và thực hiện truy vấn để xóa loại nhạc dựa trên typeId
                string connectionString = _config["AppConfig:ConnectionString"];
                using (DpsConnection cnn = new DpsConnection(connectionString))
                {
                    // Thực hiện truy vấn để xóa loại nhạc
                    cnn.ExecuteNonQuery("DELETE FROM TypeSong WHERE type_id = @typeId",
                        new SqlConditions { { "typeId", typeId } });
                }
            }
            catch (Exception ex)
            {
                // Xử lý ngoại lệ nếu có bất kỳ lỗi nào xảy ra trong quá trình xóa loại nhạc
                throw new Exception("Error deleting type: " + ex.Message);
            }
        }

    }
}
