
using Business.Factories;
using Business.Models;
using Data.Repositories;

namespace Business.Services;

public class ClientService(ClientRepository repo)
{
    private readonly ClientRepository _repo = repo;


    public async Task<IEnumerable<Client>> GetClientsAsync()
    {
        var entities = await _repo.GetAllAsync();
        return entities.Select(ClientFactory.Map!);
    }

}
