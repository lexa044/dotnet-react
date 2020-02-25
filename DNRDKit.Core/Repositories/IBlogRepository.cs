using System.Collections.Generic;
using System.Threading.Tasks;

using DNRDKit.Core.Models;

namespace DNRDKit.Core.Repositories
{
    public interface IBlogRepository
    {
        Task<Blog> GetByIdAsync(int id);
        Task<IEnumerable<Blog>> GetAllAsync();
        Task<Blog> AddAsync(Blog model);
        Task<Blog> UpdateAsync(Blog model);
    }
}
