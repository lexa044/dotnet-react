using System;
using System.Data;
using System.Data.Common;
using System.Threading;
using System.Threading.Tasks;

using MySql.Data.MySqlClient;

using DNRDKit.Core;

namespace DNRDKit.Data
{
    public class UnitOfWork : IUnitOfWork
    {
        private MySqlConnection _connection;
        private MySqlTransaction _transaction;
        private readonly string _connectionString;
        private bool _disposed;

        public UnitOfWork(string connectionString)
        {
            _connectionString = connectionString;
        }

        public DbConnection GetConnection()
        {
            if (_connection != null)
            {
                return _connection;
            }

            _connection = new MySqlConnection(_connectionString);
            _connection.Open();
            _transaction = _connection.BeginTransaction();
            return _connection;
        }

        public async Task<DbConnection> GetConnectionAsync(bool transactional = false, IsolationLevel isolationLevel = IsolationLevel.ReadCommitted, CancellationToken cancellationToken = default)
        {
            if (_connection != null)
            {
                return _connection;
            }

            _connection = new MySqlConnection(_connectionString);
            await _connection.OpenAsync(cancellationToken);
            _transaction = _connection.BeginTransaction();
            return _connection;
        }

        public DbTransaction GetTransaction()
        {
            return this._transaction;
        }

        public void CommitChanges()
        {
            try
            {
                _transaction.Commit();
            }
            catch
            {
                _transaction.Rollback();
            }
            finally
            {
                _transaction.Dispose();
                _connection.Close();
            }
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        ~UnitOfWork()
            => Dispose(false);

        protected virtual void Dispose(bool disposing)
        {
            if (_disposed)
                return;
            if (disposing)
            {
                _transaction?.Dispose();
                _connection?.Dispose();
            }

            _transaction = null;
            _connection = null;

            _disposed = true;
        }
    }
}
