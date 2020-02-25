using System.Collections.Generic;
using System.Threading.Tasks;

using AutoMapper;

using DNRDKit.Core;
using DNRDKit.Core.DTOs;
using DNRDKit.Core.Models;
using DNRDKit.Core.Repositories;
using DNRDKit.Core.Services;

namespace DNRDKit.Services
{
    public class BlogService : IBlogService
    {
        private readonly IUnitOfWork _uow;
        private readonly IBlogRepository _repository;
        private readonly IMapper _mapper;

        public BlogService(IUnitOfWork work, IBlogRepository repository, IMapper mapper)
        {
            _uow = work;
            _repository = repository;
            _mapper = mapper;
        }

        public async Task<BlogDTO> AddAsync(NewBlogDTO newDTO)
        {
            var model = _mapper.Map<Blog>(newDTO);
            var newModel = await _repository.AddAsync(model);
            // Call the second repository method here.

            // Commit the database changes from both repositories.
            this._uow.CommitChanges();
            return _mapper.Map<BlogDTO>(newModel);
        }

        public async Task<IEnumerable<BlogDTO>> GetAllAsync()
        {
            var models = await _repository.GetAllAsync();

            return _mapper.Map<List<BlogDTO>>(models);
        }

        public async Task<BlogDTO> GetByIdAsync(int id)
        {
            var model = await _repository.GetByIdAsync(id);

            return _mapper.Map<BlogDTO>(model);
        }

        public async Task<BlogDTO> UpdateAsync(BlogDTO dto)
        {
            var model = _mapper.Map<Blog>(dto);
            var updatedModel = await _repository.UpdateAsync(model);
            // Call the second repository method here.

            // Commit the database changes from both repositories.
            this._uow.CommitChanges();
            return _mapper.Map<BlogDTO>(updatedModel);
        }
    }
}
