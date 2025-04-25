
using Business.Factories;
using Business.Models;
using Data.Repositories;

namespace Business.Services;

public class StatusService(StatusRepository rep)
{
    private readonly StatusRepository _rep = rep;


public async Task<IEnumerable<Status>> GetStatusesAsync()
    {
        var entities = await _rep.GetAllAsync();
        return entities.Select(StatusFactory.Map!);
    }

}
