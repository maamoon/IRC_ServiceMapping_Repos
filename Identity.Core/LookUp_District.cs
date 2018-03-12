using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Identity.Core
{
  public  class LookUp_District
    {
        public int ID { get; set; }
        public int GovernorateID { get; set; }
        public string GovernorateCode { get; set; }
        public string DistrictName { get; set; }
        public string DistrictCode { get; set; }

    }
}
