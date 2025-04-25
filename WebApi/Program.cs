using Business.Services;
using Data.Context;
using Data.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Cors;

var builder = WebApplication.CreateBuilder(args);

// Add CORS services
builder.Services.AddControllers();
builder.Services.AddOpenApi();
builder.Services.AddDbContext<DataContext>(x => x.UseSqlServer(builder.Configuration.GetConnectionString("LocalDB")));
builder.Services.AddScoped<ClientRepository>();
builder.Services.AddScoped<EmployeeRepository>();
builder.Services.AddScoped<ProjectRepository>();
builder.Services.AddScoped<ProductRepository>();
builder.Services.AddScoped<StatusRepository>();
builder.Services.AddScoped<ClientService>();
builder.Services.AddScoped<EmployeeService>();
builder.Services.AddScoped<ProjectService>();
builder.Services.AddScoped<ProductService>();
builder.Services.AddScoped<StatusService>();

// CORS configuration
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp",
        builder => builder
            .WithOrigins(
                "http://localhost:5173",  // Vite default
                "https://localhost:7061",
                "http://localhost:5174",
                "http://localhost:5175",
                "http://localhost:5110"
            )
            .AllowAnyMethod()
            .AllowAnyHeader());
});
var app = builder.Build();

app.MapOpenApi();
app.UseHttpsRedirection();

// Add this line to use the CORS policy
app.UseCors("AllowReactApp");

app.UseAuthorization();
app.MapControllers();

app.Run();