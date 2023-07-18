using MongoDB.Driver;
using UsersSpace.Controllers;

namespace UsersSpace
{
  public class Startup
  {
    public IConfiguration Configuration { get; }

    public Startup(IConfiguration configuration)
    {
      Configuration = configuration;
    }

    public void ConfigureServices(IServiceCollection services)
    {
      services.AddCors(options =>
      {
        options.AddDefaultPolicy(builder =>
              {
            builder.AllowAnyOrigin()
                      .AllowAnyHeader()
                      .AllowAnyMethod();
          });
      });

      services.AddControllers();

      services.AddSingleton<IMongoClient>(sp =>
      {
        var connectionString = Configuration.GetConnectionString("MongoDB");
        return new MongoClient(connectionString);
      });

      services.AddScoped<IMongoDatabase>(sp =>
      {
        var client = sp.GetRequiredService<IMongoClient>();
        var databaseName = "ortP";
        return client.GetDatabase(databaseName);
      });

      services.AddScoped<ClientsController>();
    }

    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
      if (env.IsDevelopment())
      {
        app.UseDeveloperExceptionPage();
      }
      app.UseRouting();
      app.UseCors();
      app.UseEndpoints(endpoints =>
      {
        endpoints.MapControllers();
      });
    }
  }
}
