using Identity.Web.App_Start;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Identity.Web.Controllers
{
   

    [Authorize]
    public class HomeController : BaseController
    {
        public ActionResult Index()
        {

            return View();
        }
        public ActionResult Dashboard()
        {
            return View();
        }
        public ActionResult Coverage()
        {
            return View();
        }
        public ActionResult AddUpdate()
        { return View(); }
        public ActionResult DataSharingProtocol()
        { return View(); }
        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }
        [ActionOutputCache]
        public ActionResult GetLookUpData()
        {
            return Json(new { data = ViewBag.filterLists as Dictionary<string, object> }, JsonRequestBehavior.AllowGet);

        }
        [ActionOutputCache]
        public ActionResult ServiceDirectory()
        {


            Dictionary<string, object> filterLists = ViewBag.filterLists as Dictionary<string, object>;
            //Dictionary<string, object> filterLists = HttpContext.Cache.Get("filterLists") as Dictionary<string, object>;
            

            ViewBag.Governorate = filterLists["Governorate"];
            ViewBag.District = filterLists["District"];
            ViewBag.SubDistrict = filterLists["SubDistrict"];
            ViewBag.Village = filterLists["Village"];
            ViewBag.Sector = filterLists["Sector"];
            ViewBag.SubSector = filterLists["SubSector"];


           // ViewBag.DistrictStr = convertLookUpToString(filterLists["Sector"], "Sector");
            //ViewBag.SubDistrictStr = convertLookUpToString(filterLists["SubDistrict"], "LookUp_SubDistrict");
            //ViewBag.VillageStr = convertLookUpToString(filterLists["Village"], "LookUp_Village");

            return View();
        }

        public ActionResult ServiceDirectoryGird()

        {
            try
            {


                var ServiceMappingList = StoreManeger.Instance.ServiceMappingManager.ServiceMappingRecords;
                var jsonData = new
                {
                    total = ServiceMappingList.Count(),
                    page = 1,
                    records = ServiceMappingList.Count(),
                    rows = ServiceMappingList.ToArray(),

                };
                JsonResult js = new JsonResult();
                js.Data = jsonData;//.Insert(0, "rows:");
                js.MaxJsonLength = int.MaxValue;
                js.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
                return js;
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
        [ActionOutputCache]
        private string convertLookUpToString(object LookUpData, string listType)
        {
            string List = "";

            switch (listType)
            {
                case "Sector":
                    foreach (var item in LookUpData as List<string>)
                    {
                        List += item + ":" + item + ";";
                    }
                    break;
                    //case "LookUp_District":
                    //    foreach (var item in LookUpData as List<string>)
                    //    {
                    //        List += item.ID + ":" + item.DistrictName.Replace("'", "") + ";";
                    //    }
                    //    break;
                    //case "LookUp_Governorate":
                    //    foreach (var item in LookUpData as List<string>)
                    //    {
                    //        List += item.ID + ":" + item.GovernorateName.Replace("'", "") + ";";
                    //    }
                    //    break;
                    //case "LookUp_QuestionGroup":
                    //    foreach (var item in LookUpData as List<string>)
                    //    {
                    //        List += item.ID + ":" + item.QuestionGroupShortName.Replace("'", "") + ";";
                    //    }
                    //    break;
                    //case "LookUp_SubDistrict":
                    //    foreach (var item in LookUpData as List<string>)
                    //    {
                    //        List += item.ID + ":" + item.SubdistrictName.Replace("'", "") + ";";
                    //    }
                    //    break;
                    //case "LookUp_Village":
                    //    foreach (var item in LookUpData as List<string>)
                    //    {
                    //        List += item.ID + ":" + item.VillageName.Replace("'", "") + ";";
                    //    }
                    //    break;
                    //case "Excel_Questions":
                    //    foreach (var item in LookUpData as List<string>)
                    //    {
                    //        List += item.ID + ":" + item.Question.Replace("'", "") + ";";
                    //    }
                    //    break;
            }

            if (List.Length > 1)
            {
                List = List.Substring(0, List.LastIndexOf(';'));
            }
            return List;
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
    }
}