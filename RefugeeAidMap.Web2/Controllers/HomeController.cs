using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Mvc;

namespace RefugeeAidMap.Web2.Controllers
{
    public class HomeController : Controller
    {
        [Route("", Name = RouteNames.HomePage)]
        public IActionResult Index() => View();

        [Route("donate-money", Name = RouteNames.DonateMoney)]
        public IActionResult DonateMoney() => View();

        [Route("donate-items", Name = RouteNames.DonateItems)]
        public IActionResult DonateItems() => View();

        [Route("register", Name = RouteNames.OrganiserRegister)]
        public IActionResult Register() => View();

        [Route("get-involved", Name = RouteNames.GetInvolved)]
        public IActionResult GetInvolved() => View();

        public IActionResult About()
        {
            ViewData["Message"] = "Your application description page.";

            return View();
        }

        public IActionResult Contact()
        {
            ViewData["Message"] = "Your contact page.";

            return View();
        }

        public IActionResult Error()
        {
            return View("~/Views/Shared/Error.cshtml");
        }
    }
}
