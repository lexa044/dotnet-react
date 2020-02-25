using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Net;
using System.Runtime.Serialization;

namespace DNRDKit.Api.Resources
{
    public interface IMetaResponse
    {
        string ErrorType { get; set; }

        string ErrorMessage { get; set; }
        int Code { get; set; }
    }

    public interface ISingleResponse<TModel>
    {
        IMetaResponse Meta { get; set; }
        TModel Data { get; set; }
    }

    public interface IListResponse<TModel>
    {
        IMetaResponse Meta { get; set; }
        IEnumerable<TModel> Data { get; set; }
    }

    public interface IPagedResponse<TModel> : IListResponse<TModel>
    {
        int ItemsCount { get; set; }

        double PageCount { get; }
    }

    [DataContract]
    public class Response : IMetaResponse
    {
        [DataMember(Name = "error_type")]
        public string ErrorType { get; set; }
        [DataMember(Name = "error_message")]
        public string ErrorMessage { get; set; }
        [DataMember(Name = "code")]
        public int Code { get; set; }
    }

    public class SingleResponse<TModel> : ISingleResponse<TModel>
    {
        public IMetaResponse Meta { get; set; }

        public TModel Data { get; set; }

        public SingleResponse()
        {
            Meta = new Response();
        }
    }

    public class ListResponse<TModel> : IListResponse<TModel>
    {
        public IMetaResponse Meta { get; set; }

        public IEnumerable<TModel> Data { get; set; }
        public ListResponse()
        {
            Meta = new Response();
        }
    }

    public class PagedResponse<TModel> : IPagedResponse<TModel>
    {
        public IMetaResponse Meta { get; set; }

        public IEnumerable<TModel> Data { get; set; }

        public int PageSize { get; set; }

        public int PageNumber { get; set; }

        public int ItemsCount { get; set; }

        public double PageCount
            => ItemsCount < PageSize ? 1 : (int)(((double)ItemsCount / PageSize) + 1);

        public PagedResponse()
        {
            Meta = new Response();
        }
    }

    public static class ResponseExtensions
    {
        public static IActionResult ToHttpResponse<TModel>(this ISingleResponse<TModel> response)
        {
            var status = HttpStatusCode.OK;
            if (response.Meta.Code == -1)
                status = HttpStatusCode.InternalServerError;
            else if (response.Data == null)
                status = HttpStatusCode.NotFound;

            response.Meta.Code = (int)status;

            return new ObjectResult(response)
            {
                StatusCode = (int)status
            };
        }

        public static IActionResult ToHttpCreatedResponse<TModel>(this ISingleResponse<TModel> response)
        {
            var status = HttpStatusCode.Created;

            if (response.Meta.Code == -1)
                status = HttpStatusCode.InternalServerError;
            else if (response.Data == null)
                status = HttpStatusCode.NotFound;
            
            response.Meta.Code = (int)status;

            return new ObjectResult(response)
            {
                StatusCode = (int)status
            };
        }

        public static IActionResult ToHttpResponse<TModel>(this IListResponse<TModel> response)
        {
            var status = HttpStatusCode.OK;

            if (response.Meta.Code == -1)
                status = HttpStatusCode.InternalServerError;
            else if (response.Data == null)
                status = HttpStatusCode.NoContent;

            response.Meta.Code = (int)status;

            return new ObjectResult(response)
            {
                StatusCode = (int)status
            };
        }
    }
}
