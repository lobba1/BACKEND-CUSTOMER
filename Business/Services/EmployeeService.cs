
using Business.Factories;
using Business.Models;
using Data.Repositories;

namespace Business.Services;

public class EmployeeService(EmployeeRepository rep)
{
    private readonly EmployeeRepository _rep = rep;


    public async Task<IEnumerable<Employee>> GetProjectManagersAsync()
    {
        var entities = await _rep.GetAllAsync();
        return entities.Select(EmployeeFactory.Map!);
    }

}
