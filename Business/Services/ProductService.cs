
using Business.Factories;
using Business.Models;
using Data.Repositories;

namespace Business.Services;

public class ProductService(ProductRepository rep)
{
    private readonly ProductRepository _rep = rep;


    public async Task<IEnumerable<Product>> GetProductsAsync()
    {
        var entities = await _rep.GetAllAsync();
        return entities.Select(ProductFactory.Map!);
    }

}