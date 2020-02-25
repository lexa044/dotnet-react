using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

using DNRDKit.Core.DTOs;
using DNRDKit.Core.Services;
using DNRDKit.Api.Resources;

namespace DNRDKit.Api.Controllers.V1
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class BlogsController : ControllerBase
    {
        private readonly IBlogService _service;
        protected static readonly log4net.ILog _logger = log4net.LogManager.GetLogger(typeof(BlogsController));

        public BlogsController(IBlogService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetLatest()
        {
            var response = new ListResponse<BlogDTO>();
            try
            {
                response.Data = await _service.GetAllAsync();
            }
            catch (Exception ex)
            {
                response.Meta.Code = -1;
                response.Meta.ErrorMessage = "Internal server error.";

                _logger.Error("There was an error on 'GetLatest' invocation.", ex);
            }

            return response.ToHttpResponse();
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetOne(int id)
        {
            var response = new SingleResponse<BlogDTO>();
            try
            {
                response.Data = await _service.GetByIdAsync(id);
            }
            catch (Exception ex)
            {
                response.Meta.Code = -1;
                response.Meta.ErrorMessage = "Internal server error.";

                _logger.Error("There was an error on 'GetByIdAsync' invocation.", ex);
            }

            return response.ToHttpResponse();
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody]NewBlogDTO resource)
        {
            var response = new SingleResponse<BlogDTO>();
            try
            {
                response.Data = await _service.AddAsync(resource);
            }
            catch (Exception ex)
            {
                response.Meta.Code = -1;
                response.Meta.ErrorMessage = "Internal server error.";

                _logger.Error("There was an error on 'AddAsync' invocation.", ex);
            }

            return response.ToHttpResponse();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutOne(int id, [FromBody]BlogDTO resource)
        {
            var response = new SingleResponse<BlogDTO>();
            resource.Id = id;
            try
            {
                response.Data = await _service.UpdateAsync(resource);
            }
            catch (Exception ex)
            {
                response.Meta.Code = -1;
                response.Meta.ErrorMessage = "Internal server error.";

                _logger.Error("There was an error on 'UpdateAsync' invocation.", ex);
            }

            return response.ToHttpResponse();
        }
    }
}