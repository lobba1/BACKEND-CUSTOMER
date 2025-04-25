
using Business.Factories;
using Business.Models;
using Data.Repositories;
using System.Security.Cryptography;

namespace Business.Services;

public class ProjectService(ProjectRepository repo)
{
    private readonly ProjectRepository _repo = repo;

    public async Task<Project> CreateProjectAsync(ProjectRegistration form)
    {
        Console.WriteLine(form);
        var entity = ProjectFactory.Map(form);
        Console.WriteLine(entity);
        var createdEntity = await _repo.AddAsync(entity);
        Console.WriteLine(createdEntity);
        return ProjectFactory.Map(createdEntity!);
    }

    public async Task<Project> UpdateProjectAsync(ProjectUpdate form)
    {
        var entity = ProjectFactory.Map(form);
        var updatedEntity = await _repo.UpdateAsync(entity);
        return ProjectFactory.Map(updatedEntity!);
    }


    public async Task<IEnumerable<Project>> GetProjectsAsync()
    {
        var entities = await _repo.GetAllAsync();
        return entities.Select(ProjectFactory.Map!);
    }
    public async Task<Project?> GetProjectAsync(int id)
    {
        var entity = await _repo.GetAsync(i => i.Id == id);
        return entity == null ? null : ProjectFactory.Map(entity);
    }

    public async Task DeleteProjectAsync(int id)
    {
        var entity = await _repo.GetAsync(i => i.Id == id);
        Console.WriteLine(entity);
        await _repo.RemoveAsync(entity!);
    }

}