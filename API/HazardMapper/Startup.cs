using System;
using System.Collections.Generic;
using System.Text;
using HazardMapper.BL;
using HazardMapper.Common.Helpers;
using HazardMapper.Common.Models;
using HazardMapper.Database;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json.Serialization;

namespace HazardMapper
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc()
                .SetCompatibilityVersion(CompatibilityVersion.Version_3_0);
                //.AddJsonOptions(options =>
                //    options.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver());

            services.AddControllers().AddNewtonsoftJson(options =>
            {
                // Use the default property (Pascal) casing
                options.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
            });

            services.AddCors(options =>
            {
                options.AddPolicy("AllowAny",
                    builder =>
                    {
                        builder.WithOrigins("http://localhost:3000")
                            .AllowAnyHeader()
                            .AllowAnyMethod();
                    });

            });

            services.AddDbContext<UserDbContext>(options =>
                options.UseSqlServer(Configuration.GetValue<string>("DefaultConnection")));

            services.AddIdentity<User, IdentityRole>()
                .AddEntityFrameworkStores<UserDbContext>()
                .AddDefaultTokenProviders();

            services.AddHttpsRedirection(options =>
            {
                options.RedirectStatusCode = StatusCodes.Status307TemporaryRedirect;
                options.HttpsPort = 5001;
            });

            services.AddAuthentication(options =>
                {
                    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
                })

                .AddJwtBearer(options =>
                {
                    options.SaveToken = true;
                    options.RequireHttpsMetadata = false;
                    options.TokenValidationParameters = new TokenValidationParameters()
                    {
                        ValidateIssuer = true,
                        ValidateAudience = true,
                        ValidAudience = "http://localhost:5000/",
                        ValidIssuer = "http://localhost:5000/",
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("WillBeReplacedByActualKeyThatIsNotStaticHere"))
                    };
                });

            RegisterServices(services);
            ConfigureSettings();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            app.UseHsts();
            app.UseCors("AllowAny");
            app.UseAuthentication();
            app.UseHttpsRedirection();

            app.UseRouting();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute("Main", "api/{controller}/{action=Get}/{id?}");
            });

            var provider = app.ApplicationServices.GetRequiredService<IServiceScopeFactory>().CreateScope().ServiceProvider;
            Initialize(provider);
        }

        private void RegisterServices(IServiceCollection services)
        {
            
            services.AddTransient<AuthenticationService>();
            services.AddTransient<HttpClientWrapper>();
            services.AddHttpClient<HttpClientWrapper>();
            services.AddTransient<IHazardMapperService, HazardMapperService>();
        }

        private void ConfigureSettings()
        {
            Configuration.Get<HazardMapperSettings>();
        }

        //TODO remove this when DB init is properly implemented
        public static void Initialize(IServiceProvider serviceProvider)
        {
            var context = serviceProvider.GetRequiredService<UserDbContext>();
            var userManager = serviceProvider.GetRequiredService<UserManager<User>>();
            var roleManager = serviceProvider.GetRequiredService<RoleManager<IdentityRole>>();

            if (!context.Roles.Any())
            {
                var role = new IdentityRole("User");
                roleManager.CreateAsync(role).Wait();
                role = new IdentityRole("Admin");
                roleManager.CreateAsync(role).Wait();
            }

            if (!context.Users.Any())
            {
                var user = new User()
                {
                    Email = "test@test.com",
                    SecurityStamp = Guid.NewGuid().ToString(),
                    UserName = "Test"
                };

                var result = userManager.CreateAsync(user, "Test12@a").Result;
                userManager.AddToRoleAsync(user, "Admin");
            }


        }
    }
}
