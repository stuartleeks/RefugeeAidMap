using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace RefugeeAidMap.Web.Controllers
{
    public class HomeController : Controller
    {
        [Route("", Name = RouteNames.HomePage)]
        public ActionResult Index()
        {
            return View();
        }

        [Route("donate-money", Name = RouteNames.DonateMoney)]
        public ActionResult DonateMoney()
        {
            return View();
        }
        [Route("donate-items", Name = RouteNames.DonateItems)]
        public ActionResult DonateItems()
        {
            return View();
        }
        [Route("register", Name = RouteNames.OrganiserRegister)]
        public ActionResult Register()
        {
            return View();
        }
        [Route("get-involved", Name = RouteNames.GetInvolved)]
        public ActionResult GetInvolved()
        {
            return View();
        }



        [Route("about")]
        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
    }
}