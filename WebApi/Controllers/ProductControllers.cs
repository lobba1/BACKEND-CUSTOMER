using Business.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductControllers(ProductService productService) : ControllerBase
    {
        private readonly ProductService _productService = productService;
        [HttpGet]

        public async Task<IActionResult> GetAll()
        {
            return Ok(await _productService.GetProductsAsync());
        }
    }


}
