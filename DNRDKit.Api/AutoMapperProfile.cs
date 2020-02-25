using AutoMapper;

using DNRDKit.Core.DTOs;
using DNRDKit.Core.Models;

namespace DNRDKit.Api
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<NewBlogDTO, Blog>();
            CreateMap<BlogDTO, Blog>();
            CreateMap<Blog, BlogDTO>();
        }
    }
}
