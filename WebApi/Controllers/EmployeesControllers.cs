using Business.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebApi.Controllers
{
    [Route("api/employees")]
    [ApiController]
    public class EmployeesControllers(EmployeeService employeeService) : ControllerBase
    {
        private readonly EmployeeService _employeeService = employeeService;
        [HttpGet]

        public async Task<IActionResult> GetAll()
        {
            return Ok(await _employeeService.GetProjectManagersAsync());
        }
    }
}
