using System;
using Core.Entities;
using Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    private readonly StoreContext _context;

    public ProductsController(StoreContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Product>>> GetProducts()
    {
        return await _context.Products.ToListAsync();

    }

    [HttpGet("{id:int}")]//api/Product/2
    public async Task<ActionResult<Product>>GetProduct(int id)
    {
        var product = await _context.Products.FindAsync(id);

        if(product == null) return NotFound();

        return product;
    }

    [HttpPost]
    public async Task<ActionResult<Product>> CreateProducts(Product product)
    {
        _context.Products.Add(product);

        await _context.SaveChangesAsync();

        return product;
    }

    [HttpPut("{id:int}")]
    public async Task<ActionResult>UpdateProduct(int id, Product product)
    {
        if(product.Id != id || !ProductIsExists(id)) 
            return BadRequest("Cannot update this product");

        _context.Entry(product).State = EntityState.Modified;

        await _context.SaveChangesAsync();

        return Ok(1);


    }

    [HttpDelete("id:int")]
    public async Task<ActionResult>DeleteProduct(int id)
    {
        var product = await _context.Products.FindAsync(id);

        if(product == null) 
            return NotFound();
        
        _context.Products.Remove(product);
        
        await _context.SaveChangesAsync();
        
        return Ok(1);

    }

    private bool ProductIsExists(int id)
    {
        return _context.Products.Any(e => e.Id == id);
    }

}
