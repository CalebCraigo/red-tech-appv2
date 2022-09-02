using Microsoft.AspNetCore.Mvc;

namespace red_tech_appv2.Controllers;

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