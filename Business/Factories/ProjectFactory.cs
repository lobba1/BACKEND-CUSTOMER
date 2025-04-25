using Business.Models;
using Data.Entities;

namespace Business.Factories;

public static class ProjectFactory
{
    public static ProjectEntity Map(ProjectRegistration form) => new ProjectEntity
    {
        Title = form.Title,
        Description = form.Description,
        StartDate = form.StartDate,
        EndDate = form.EndDate,
        StatusId = form.StatusId,
        ClientId = form.ClientId,
        ProjectManagerId = form.ManagerManagerId,
        ProjectId = form.ProjectId
    };
    public static ProjectEntity Map(ProjectUpdate form) => new ProjectEntity
    {
        Id = form.Id,
        Title = form.Title,
        Description = form.Description,
        StartDate = form.StartDate,
        EndDate = form.EndDate,
        StatusId = form.StatusId,
        ClientId = form.ClientId,
        ProjectManagerId = form.ManagerManagerId,
        ProjectId = form.ProjectId
    };

    public static Project Map(ProjectEntity entity)
    {
        if (entity == null)
            return null!;

        return new Project
        {
            Id = entity.Id,
            Title = entity.Title,
            Description = entity.Description,
            StartDate = entity.StartDate,
            EndDate = entity.EndDate,
            Status = entity.Status == null ? null! : StatusFactory.Map(entity.Status),
            Client = entity.Client == null ? null! : ClientFactory.Map(entity.Client),
            ProjectManager = entity.ProjectManager == null ? null! : EmployeeFactory.Map(entity.ProjectManager),
            Product = entity.Product == null ? null : ProductFactory.Map(entity.Product)
        };
    }
}
