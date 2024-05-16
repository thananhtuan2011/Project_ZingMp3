using BE_Music.Model.TypeSong;
using System.Collections.Generic;

namespace BE_Music.Services.Type
{
    public interface ITypeSong
    {
        // Tạo một loại nhạc mới
        TypeSong CreateType(TypeSong type);
        object CreateTypeNew(TypeSong type);
        object DeleteTypeNew(int typeId);
        object UpdateTypeSong(int typeId, TypeSong updatedType);
        // Lấy thông tin của một loại nhạc dựa trên type_id
        TypeSong GetTypeById(int typeId);

      

        // Cập nhật thông tin của một loại nhạc
        TypeSong UpdateType(int typeId, TypeSong updatedType);

        // Xóa một loại nhạc dựa trên type_id
        void DeleteType(int typeId);
    }
}
