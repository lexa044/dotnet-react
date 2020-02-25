using System.Data;
using System.Data.Common;
using System.Threading;
using System.Threading.Tasks;

using MySql.Data.MySqlClient;

using DNRDKit.Core;

namespace DNRDKit.Data
{
    public sealed class UnitOfWork : IUnitOfWork
    {
        private MySqlConnection _connection;
        private MySqlTransaction _transaction;
        private readonly string _connectionString;

        public UnitOfWork(string connectionString)
        {
            _connectionString = connectionString;
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
            return _transaction;
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
            if (null != _transaction)
                _transaction.Dispose();

            if (null != _connection)
                _connection.Dispose();

            _transaction = null;
            _connection = null;
        }
    }
}
