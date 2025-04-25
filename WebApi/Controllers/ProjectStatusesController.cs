using Business.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectStatusesController(StatusService statusService) : ControllerBase
    {
        private readonly StatusService _statusService = statusService;

        [HttpGet]

        public async Task<IActionResult> GetAll()
        { 
        return Ok(await _statusService.GetStatusesAsync());
        }
    }
}
