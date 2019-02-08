using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.Facebook;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Tuna.AuthMiddleware;

namespace Tuna
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2);
            services.AddDbContext<TunaContext>(options => options.UseSqlServer(Configuration.GetConnectionString("TunaSchoolConnection")));
            services.AddCors();
            services.AddAuthentication("custom_facebook").AddScheme<CustomFacebookAuthenticationOptions, CustomFacebookAuthenticationHandler>("custom_facebook", "facebook", options => { });
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new Swashbuckle.AspNetCore.Swagger.Info { Title = "Big tuna API", Version = "v1" });
                c.DescribeAllEnumsAsStrings();
                c.IncludeXmlComments(Path.Combine(AppContext.BaseDirectory, "TunaDocs.xml"));
            });
        }

        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            //TODO: Fix when production version is live
            app.UseCors(policy =>
            {
                //policy.WithOrigins("*");
                policy.AllowAnyMethod();
                policy.AllowAnyOrigin();
                policy.AllowAnyHeader();
            });

            app.UseSwagger();

            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "Big tuna API v1");
            });

            app.UseHttpsRedirection();

            app.UseAuthentication();

            app.UseMvc();
        }
    }
}
