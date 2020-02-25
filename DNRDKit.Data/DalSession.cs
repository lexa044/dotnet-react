using System.Data.Common;
using System.Threading;
using System.Threading.Tasks;

using MySql.Data.MySqlClient;

using DNRDKit.Core;

namespace DNRDKit.Data
{
    public sealed class DalSession : IDalSession
    {
        private readonly string _readConnectionString;
        private readonly IUnitOfWork _uom;
        private MySqlConnection _connection;

        public DalSession(string readConnectionString, string writeConnectionString)
        {
            _readConnectionString = readConnectionString;
            _uom = new UnitOfWork(writeConnectionString);
        }

        public void Dispose()
        {
            if (null != _connection)
                _connection.Dispose();

            if (null != _uom)
                _uom.Dispose();

            _connection = null;
        }

        public async Task<DbConnection> GetReadOnlyConnectionAsync(CancellationToken cancellationToken = default)
        {
            if (_connection != null)
            {
                return _connection;
            }

            _connection = new MySqlConnection(_readConnectionString);
            await _connection.OpenAsync(cancellationToken);
            return _connection;
        }

        public IUnitOfWork GetUnitOfWork()
        {
            return _uom;
        }
    }
}
