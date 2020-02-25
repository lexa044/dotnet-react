using System.Collections.Generic;
using System.Threading.Tasks;

using DNRDKit.Core.DTOs;

namespace DNRDKit.Core.Services
{
    public interface IBlogService
    {
        Task<BlogDTO> GetByIdAsync(int id);
        Task<IEnumerable<BlogDTO>> GetAllAsync();
        Task<BlogDTO> AddAsync(NewBlogDTO newDTO);
        Task<BlogDTO> UpdateAsync(BlogDTO dto);
    }
}
