using Identity.Core;
using Identity.Core.EntityStore;
using Microsoft.AspNet.Identity.Owin;
using System.Web;

namespace Identity.Web.App_Start
{
    public class StoreManeger
    {
        private string _connection;

        public StoreManeger(string connection)
        {
            _connection = connection;
        }

        static readonly StoreManeger _instance = new StoreManeger(HttpContext.Current.GetOwinContext().Get<IdentityConnection>().Connection.ConnectionString);

        public static StoreManeger Instance
        {
            get
            {
                return _instance;
            }
        }
        
        
        ServiceMappingStore _ServiceMappingManager;
        public ServiceMappingStore ServiceMappingManager
        {
            get
            {
                if (_ServiceMappingManager == null)
                    _ServiceMappingManager = new ServiceMappingStore(_connection);
                return _ServiceMappingManager;
            }
        }

    }
}