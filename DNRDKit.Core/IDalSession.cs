using System;
using System.Data.Common;
using System.Threading;
using System.Threading.Tasks;

namespace DNRDKit.Core
{
    public interface IDalSession : IDisposable
    {
        Task<DbConnection> GetReadOnlyConnectionAsync(CancellationToken cancellationToken = default);
        IUnitOfWork GetUnitOfWork();
    }
}
