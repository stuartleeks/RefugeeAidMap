using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(RefugeeAidMap.Web.Startup))]
namespace RefugeeAidMap.Web
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
