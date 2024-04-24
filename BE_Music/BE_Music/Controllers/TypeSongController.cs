using BE_Music.Model.TypeSong;
using BE_Music.Services.Type;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;

namespace BE_Music.Controllers
{
    [ApiController]
    [Route("api/typesong")]
    public class TypeSongController : ControllerBase
    {
        private readonly ITypeSong _typeSongService;

        public TypeSongController(ITypeSong typeSongService)
        {
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

        [HttpGet]
        public IActionResult GetAllTypes()
        {
            try
            {
                var types = _typeSongService.GetAllTypes();
                return Ok(types);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
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
        public IActionResult DeleteType(int typeId)
        {
            try
            {
                // Kiểm tra xem loại nhạc có tồn tại không
                var type = _typeSongService.GetTypeById(typeId);
                if (type == null)
                {
                    return NotFound($"Type with ID {typeId} not found");
                }

                // Gọi hàm xóa loại nhạc từ service
                _typeSongService.DeleteType(typeId);

                // Trả về mã NoContent để chỉ ra rằng loại nhạc đã được xóa thành công
                return NoContent();
            }
            catch (Exception ex)
            {
                // Trả về lỗi 500 nếu có lỗi xảy ra trong quá trình xóa loại nhạc
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

    }
}
