using BE_Music.Interface_Service;
using BE_Music.Services.Login;
using BE_Music.Services.Type;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.Extensions.FileProviders;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddTransient<ILogin, Login_service>();
builder.Services.AddTransient<ITypeSong, TypeSongService>();

var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.Configure<FormOptions>(o =>
{
    o.ValueLengthLimit = int.MaxValue;
    o.MultipartBodyLengthLimit = int.MaxValue;
    o.MemoryBufferThreshold = int.MaxValue;
});
builder.Services.AddCors(options =>
{
    options.AddPolicy(MyAllowSpecificOrigins,
                         builder => builder.WithOrigins()
                    .AllowAnyHeader()
                    .AllowAnyMethod()
                    .AllowCredentials()
                    .SetIsOriginAllowed((host) => true));
});
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCors(MyAllowSpecificOrigins);
app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(
       Path.Combine(Directory.GetCurrentDirectory(), "UploadSong")),
    RequestPath = "/UploadSong"
});
app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(
       Path.Combine(Directory.GetCurrentDirectory(), "Radio")),
    RequestPath = "/Radio"
});
app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(
       Path.Combine(Directory.GetCurrentDirectory(), "Avatar")),
    RequestPath = "/Avatar"
});

app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(
                 Path.Combine(Directory.GetCurrentDirectory(), "HinhAnh")),
    RequestPath = "/HinhAnh"
});
app.UseAuthorization();

app.MapControllers();

app.Run();


