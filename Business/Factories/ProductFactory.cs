using Business.Models;
using Data.Entities;

namespace Business.Factories;

public static class ProductFactory
{
    public static Product Map(ProductEntity entity) => new Product
    {
        Id = entity.Id,
        ProductName = entity.ProductName
    };
}
