using Data.Context;
using Data.Entities;

namespace Data.Repositories
{
    public class EmployeeRepository(DataContext context) : BaseRepository<EmployeEntity>(context)
    {
    }
}
