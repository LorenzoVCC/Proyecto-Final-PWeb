using Microsoft.EntityFrameworkCore;
using Proyecto_Final_ProgramacionWEB.Data;
using Proyecto_Final_ProgramacionWEB.Repositories.Implementations;
using Proyecto_Final_ProgramacionWEB.Services;
using Proyecto_Final_ProgramacionWEB.Services.Implementations;
using Proyecto_Final_ProgramacionWEB.Services.Interfaces;

namespace Proyecto_Final_ProgramacionWEB
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            builder.Services.AddDbContext<AppDBContext>(options =>
               options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

            builder.Services.AddScoped<IRestaurantRepository, RestaurantRepository>();
            builder.Services.AddScoped<IRestaurantService, RestaurantService>();


            builder.Services.AddControllers();
            builder.Services.AddOpenApi();

            var app = builder.Build();
            if (app.Environment.IsDevelopment())
            {
                app.MapOpenApi();
            }

            app.UseHttpsRedirection();
            app.UseAuthorization();
            app.MapControllers();
            app.Run();
        }
    }
}
