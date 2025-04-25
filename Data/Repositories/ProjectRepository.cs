using Data.Context;
using Data.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Data.Repositories;

    public class ProjectRepository(DataContext context) : BaseRepository<ProjectEntity>(context)
    {
        public override async Task<IEnumerable<ProjectEntity?>> GetAllAsync()
        {
            return await _dbSet
                .Include(x => x.Status)
                .Include(x => x.Client)
                .Include(x => x.ProjectManager)
                .Include(x => x.Product)
                .ToListAsync();

        }
    

    public override async Task<IEnumerable<ProjectEntity?>> GetAllAsync(Expression<Func<ProjectEntity, bool>> predicate)
    {


        return await _dbSet
           .Include(x => x.Status)
            .Include(x => x.Client)
            .Include(x => x.ProjectManager)
            .Include(x => x.Product)
            .Where(predicate)
            .ToListAsync();

    }
    

        public override async Task<ProjectEntity?> GetAsync(Expression<Func<ProjectEntity, bool>> predicate)
        
        {
            return await _dbSet
                .Include(x => x.Status)
                .Include(x => x.Client)
                .Include(x => x.ProjectManager)
                .Include(x => x.Product)
                .FirstOrDefaultAsync(predicate);
        }
    public override async Task<ProjectEntity?> AddAsync(ProjectEntity entity)
    {
        try
        {
            await _dbSet.AddAsync(entity);
            await _context.SaveChangesAsync();

            return await _dbSet
           .Where(x => x.Id == entity.Id)
           .Include(x => x.Status)
           .Include(x => x.Client)
           .Include(x => x.ProjectManager)
           .Include(x => x.Product)
           .FirstOrDefaultAsync();

            // Reload with navigation properties

        }
        catch (Exception ex)
        {
            // Log the exception
            Console.WriteLine($"Error adding project: {ex.Message}");
            return null;
        }
    }
    public override async Task<ProjectEntity?> UpdateAsync(ProjectEntity entity)
    {
        try
        {
            _dbSet.Update(entity);
            await _context.SaveChangesAsync();

            // Reload with navigation properties
            return await _dbSet
                .Include(x => x.Status)
                .Include(x => x.Client)
                .Include(x => x.ProjectManager)
                .Include(x => x.Product)
                .FirstOrDefaultAsync(x => x.Id == entity.Id);
        }
        catch (Exception ex)
        {
            // Log the exception
            Console.WriteLine($"Error updating project: {ex.Message}");
            return null;
        }
    }

}
