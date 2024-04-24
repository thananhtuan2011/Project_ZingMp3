using BE_Music.Model.TypeSong;
using System.Collections.Generic;

namespace BE_Music.Services.Type
{
    public interface ITypeSong
    {
        // Tạo một loại nhạc mới
        TypeSong CreateType(TypeSong type);

        // Lấy thông tin của một loại nhạc dựa trên type_id
        TypeSong GetTypeById(int typeId);

        // Lấy danh sách tất cả các loại nhạc
        IEnumerable<TypeSong> GetAllTypes();

        // Cập nhật thông tin của một loại nhạc
        TypeSong UpdateType(int typeId, TypeSong updatedType);

        // Xóa một loại nhạc dựa trên type_id
        void DeleteType(int typeId);
    }
}
