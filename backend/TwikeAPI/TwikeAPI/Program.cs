using Microsoft.EntityFrameworkCore;
using TwikeAPI.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new() { Title = "twikeapi", Version = "v1" });
});

var provider = builder.Services.BuildServiceProvider();
var configuration = provider.GetService<IConfiguration>();
var serverVersion = new MySqlServerVersion(new Version(8, 0, 27));

builder.Services.AddDbContext<TwikeDbContext>(options =>
    options.UseMySql("server=localhost; user=root; password=root12345678; database=TwikeDB;", serverVersion));

builder.Services.AddCors(options =>
{
    var allowHost = configuration.GetValue<string>("AllowedHosts");
    options.AddDefaultPolicy(cors => cors.WithOrigins(allowHost).AllowAnyMethod().AllowAnyHeader());
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "webapi v1"));
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
