﻿using System.Collections.Generic;
using System.Threading.Tasks;

using Dapper;

using DNRDKit.Core;
using DNRDKit.Core.Models;
using DNRDKit.Core.Repositories;

namespace DNRDKit.Data.Repositories
{
    public class BlogRepository : IBlogRepository
    {
        private readonly IDalSession _session;

        public BlogRepository(IDalSession session)
        {
            _session = session;
        }

        public async Task<Blog> AddAsync(Blog model)
        {
            var uom = _session.GetUnitOfWork();
            var connection = await uom.GetConnectionAsync();
            string sql = @"INSERT INTO `BlogPost` (`Title`, `Content`) VALUES (@title, @content);
                        select LAST_INSERT_ID();";

            model.Id = await connection.ExecuteScalarAsync<int>(sql, new
            {
                title = model.Title,
                content = model.Content
            }, uom.GetTransaction());

            return model;
        }

        public async Task<IEnumerable<Blog>> GetAllAsync()
        {
            var connection = await _session.GetReadOnlyConnectionAsync();
            string sql = @"SELECT `Id`, `Title`, `Content` FROM `BlogPost` ORDER BY `Id` DESC LIMIT 10;";
            return await connection.QueryAsync<Blog>(sql);
        }

        public async Task<Blog> GetByIdAsync(int id)
        {
            var connection = await _session.GetReadOnlyConnectionAsync();
            string sql = @"SELECT `Id`, `Title`, `Content` FROM `BlogPost` WHERE `Id` = @id;";
            return await connection.QueryFirstOrDefaultAsync<Blog>(sql, new { id });
        }

        public async Task<Blog> UpdateAsync(Blog model)
        {
            var uom = _session.GetUnitOfWork();
            var connection = await uom.GetConnectionAsync();
            string sql = @"UPDATE `BlogPost` SET `Title` = @title, `Content` = @content WHERE `Id` = @id;";

            await connection.ExecuteAsync(sql, new
            {
                id = model.Id,
                title = model.Title,
                content = model.Content
            }, uom.GetTransaction());

            return model;
        }
    }
}
