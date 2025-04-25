using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Business.Services;
using Business.Models;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectsController(ProjectService projectService) : ControllerBase
    {


        private readonly ProjectService _projectService = projectService;

        [HttpGet]
        public async Task<IActionResult> GetProjects()
        {
            return Ok(await _projectService.GetProjectsAsync());
        }
       
            [HttpGet("{id}")]
            public async Task<IActionResult> GetProject(int id)
            {
            var project = await _projectService.GetProjectAsync(id);
            return project == null ? NotFound() : Ok(project);
               
            }
        [HttpPost]
        public async Task<IActionResult> Create(ProjectRegistration form)
        {
            if (!ModelState.IsValid)
                return BadRequest();
        Console.WriteLine(form);
           var project =  await _projectService.CreateProjectAsync(form);
           Console.WriteLine(project);
            return CreatedAtAction(nameof(GetProject), new { id = project.Id }, project);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id , ProjectUpdate form)
        {
            Console.WriteLine(id);
            if (!ModelState.IsValid)
                return BadRequest();

            var project = await _projectService.UpdateProjectAsync(form);
            return project == null ? NotFound() : Ok(project);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _projectService.DeleteProjectAsync(id);
            return NoContent();
        }
}
}

    
