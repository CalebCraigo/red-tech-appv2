using Microsoft.AspNetCore.Mvc;

namespace integrate_dotnet_core_create_react_app.Controllers;

[ApiController]
[Route("[controller]")]
public class HomeController : Controller
{
  public IActionResult Index()
  {
    var vm = new CreateReactAppViewModel(HttpContext);
 
    return View(vm);
  }
}