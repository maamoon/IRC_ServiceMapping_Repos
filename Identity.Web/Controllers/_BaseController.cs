using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Microsoft.AspNet.Identity;
using Identity.Web.App_Start;

namespace Identity.Web.Controllers
{
    public class BaseController : Controller
    {

        public Guid UserId
        {
            get
            {
                if (User.Identity.IsAuthenticated)
                    return Guid.Parse(User.Identity.GetUserId());

                return Guid.Empty;
            }
        }
       
         
        public class FilterData
        {
            public int ParentKey { get; set; }
            public string ParentValue { get; set; }
            public int Key { get; set; }
            public string Value { get; set; }
        }
        public class ActionOutputCacheAttribute : ActionFilterAttribute
        {
            // This hack is optional; I'll explain it later in the blog post
            List<FilterData> sector;

            List<FilterData> subSector;

            public override void OnActionExecuting(ActionExecutingContext filterContext)
            {
                sector = new List<FilterData>();

                subSector = new List<FilterData>();
                sector.Add(new FilterData { Key = 1, Value = "Basic services" });
                sector.Add(new FilterData { Key = 2, Value = "Cash Distribution" });
                sector.Add(new FilterData { Key = 3, Value = "Child Protection" });
                sector.Add(new FilterData { Key = 4, Value = "Education" });
                sector.Add(new FilterData { Key = 5, Value = "GBV" });
                sector.Add(new FilterData { Key = 6, Value = "General Protection" });
                sector.Add(new FilterData { Key = 7, Value = "Health" });
                sector.Add(new FilterData { Key = 8, Value = "Legal" });
                sector.Add(new FilterData { Key = 9, Value = "Mine Action" });
                sector.Add(new FilterData { Key = 10, Value = "NFI distribution" });
                sector.Add(new FilterData { Key = 12, Value = "Nutrition" });
                sector.Add(new FilterData { Key = 13, Value = "Other Services" });
                sector.Add(new FilterData { Key = 14, Value = "Persons with Disability(PWDs)" });

                //Basic services
                subSector.Add(new FilterData { ParentKey = 1, ParentValue = "Basic services", Value = "Agriculture", Key = 1 });
                subSector.Add(new FilterData { ParentKey = 1, ParentValue = "Basic services", Value = "Building and reconstruction", Key = 2 });
                subSector.Add(new FilterData { ParentKey = 1, ParentValue = "Basic services", Value = "Electricity", Key = 3 });
                subSector.Add(new FilterData { ParentKey = 1, ParentValue = "Basic services", Value = "Food Security", Key = 4 });
                subSector.Add(new FilterData { ParentKey = 1, ParentValue = "Basic services", Value = "Generator Fuel", Key = 5 });
                subSector.Add(new FilterData { ParentKey = 1, ParentValue = "Basic services", Value = "heating", Key = 6 });
                subSector.Add(new FilterData { ParentKey = 1, ParentValue = "Basic services", Value = "Housing", Key = 7 });
                subSector.Add(new FilterData { ParentKey = 1, ParentValue = "Basic services", Value = "other", Key = 8 });
                subSector.Add(new FilterData { ParentKey = 1, ParentValue = "Basic services", Value = "Rehabilitation of sanitation facilities", Key = 9 });
                subSector.Add(new FilterData { ParentKey = 1, ParentValue = "Basic services", Value = "Sewage", Key = 10 });
                subSector.Add(new FilterData { ParentKey = 1, ParentValue = "Basic services", Value = "Tents", Key = 11 });
                subSector.Add(new FilterData { ParentKey = 1, ParentValue = "Basic services", Value = "Water wells", Key = 12 });
                //Cash Distribution                         , ParentValue = "Basic services",
                subSector.Add(new FilterData { ParentKey = 2, ParentValue = "Cash Distribution", Value = "accommodation for the children", Key = 1 });
                subSector.Add(new FilterData { ParentKey = 2, ParentValue = "Cash Distribution", Value = "Cash assistance", Key = 2 });
                subSector.Add(new FilterData { ParentKey = 2, ParentValue = "Cash Distribution", Value = "cash for rent assistance to the family", Key = 3 });
                subSector.Add(new FilterData { ParentKey = 2, ParentValue = "Cash Distribution", Value = "Cash for work", Key = 4 });
                subSector.Add(new FilterData { ParentKey = 2, ParentValue = "Cash Distribution", Value = "Clothes", Key = 5 });
                subSector.Add(new FilterData { ParentKey = 2, ParentValue = "Cash Distribution", Value = "education supplies", Key = 6 });
                subSector.Add(new FilterData { ParentKey = 2, ParentValue = "Cash Distribution", Value = "food baskets", Key = 7 });
                subSector.Add(new FilterData { ParentKey = 2, ParentValue = "Cash Distribution", Value = "Food Security", Key = 8 });
                subSector.Add(new FilterData { ParentKey = 2, ParentValue = "Cash Distribution", Value = "Multiple distribution rounds", Key = 9 });
                subSector.Add(new FilterData { ParentKey = 2, ParentValue = "Cash Distribution", Value = "NFI", Key = 10 });
                subSector.Add(new FilterData { ParentKey = 2, ParentValue = "Cash Distribution", Value = "One time cash distribution", Key = 11 });
                subSector.Add(new FilterData { ParentKey = 2, ParentValue = "Cash Distribution", Value = "Orphan sponsorship", Key = 12 });
                subSector.Add(new FilterData { ParentKey = 2, ParentValue = "Cash Distribution", Value = "other", Key = 13 });
                   //                                         , ParentValue = "Basic services",
                // Child Protection                         , ParentValue = "Basic services",
                subSector.Add(new FilterData { ParentKey = 3, ParentValue = "Child Protection", Value = "Case management for high risk cases", Key = 1 });
                subSector.Add(new FilterData { ParentKey = 3, ParentValue = "Child Protection", Value = "Child Friendly Spaces(CFS)", Key = 2 });
                subSector.Add(new FilterData { ParentKey = 3, ParentValue = "Child Protection", Value = "Family tracing and reunification for unaccompanied and separated children", Key = 3 });
                subSector.Add(new FilterData { ParentKey = 3, ParentValue = "Child Protection", Value = "Information education and communication(IEC) materials on child protection concerns", Key = 4 });
                subSector.Add(new FilterData { ParentKey = 3, ParentValue = "Child Protection", Value = "other", Key = 5 });
                subSector.Add(new FilterData { ParentKey = 3, ParentValue = "Child Protection", Value = "parenting programmes that are structured and sustained(centre - based and mobile)", Key = 6 });
                subSector.Add(new FilterData { ParentKey = 3, ParentValue = "Child Protection", Value = "Psychological first aid for children and parents", Key = 7 });
                subSector.Add(new FilterData { ParentKey = 3, ParentValue = "Child Protection", Value = "Psychosocial support services including structured & mobile PSS services", Key = 8 });
                subSector.Add(new FilterData { ParentKey = 3, ParentValue = "Child Protection", Value = "Recreation and early childhood development kits", Key = 9 });
                subSector.Add(new FilterData { ParentKey = 3, ParentValue = "Child Protection", Value = "Referral to education services(formal and informal)", Key = 10 });
                subSector.Add(new FilterData { ParentKey = 3, ParentValue = "Child Protection", Value = "Referral to livelihood services", Key = 11 });
                subSector.Add(new FilterData { ParentKey = 3, ParentValue = "Child Protection", Value = "Referral to skills acquisition", Key = 12 });
                subSector.Add(new FilterData { ParentKey = 3, ParentValue = "Child Protection", Value = "referral to specialised services(child protection needs only)", Key = 13 });
                subSector.Add(new FilterData { ParentKey = 3, ParentValue = "Child Protection", Value = "youth empowerment", Key = 14 });
                   //                                         , ParentValue = "Basic services",
                // Education                                , ParentValue = "Basic services",
                subSector.Add(new FilterData { ParentKey = 4, ParentValue = "Education", Value = "Awareness Campiagn", Key = 1 });
                subSector.Add(new FilterData { ParentKey = 4, ParentValue = "Education", Value = "Formal Education", Key = 2 });
                subSector.Add(new FilterData { ParentKey = 4, ParentValue = "Education", Value = "InFormal Education / non - Formal Education", Key = 3 });
                subSector.Add(new FilterData { ParentKey = 4, ParentValue = "Education", Value = "other", Key = 4 });
                subSector.Add(new FilterData { ParentKey = 4, ParentValue = "Education", Value = "Preschool(early childhood education)", Key = 5 });
                subSector.Add(new FilterData { ParentKey = 4, ParentValue = "Education", Value = "Primary School", Key = 6 });
                subSector.Add(new FilterData { ParentKey = 4, ParentValue = "Education", Value = "Recreation and early childhood development kits", Key = 7 });
                subSector.Add(new FilterData { ParentKey = 4, ParentValue = "Education", Value = "secondary School", Key = 8 });
                subSector.Add(new FilterData { ParentKey = 4, ParentValue = "Education", Value = "Stationary Support", Key = 9 });
                subSector.Add(new FilterData { ParentKey = 4, ParentValue = "Education", Value = "Vocational training", Key = 10 });
                // GBV                                      , ParentValue = "Basic services",
                subSector.Add(new FilterData { ParentKey = 5, ParentValue = "GBV", Value = "Awareness Campaigns", Key = 1 });
                subSector.Add(new FilterData { ParentKey = 5, ParentValue = "GBV", Value = "case management for survivors", Key = 2 });
                subSector.Add(new FilterData { ParentKey = 5, ParentValue = "GBV", Value = "cmr and otherhealth services for survivors", Key = 3 });
                subSector.Add(new FilterData { ParentKey = 5, ParentValue = "GBV", Value = "Dignity Kits", Key = 4 });
                subSector.Add(new FilterData { ParentKey = 5, ParentValue = "GBV", Value = "legal services for survivors", Key = 5 });
                subSector.Add(new FilterData { ParentKey = 5, ParentValue = "GBV", Value = "other", Key = 6 });
                subSector.Add(new FilterData { ParentKey = 5, ParentValue = "GBV", Value = "other referrals of gbv survivors", Key = 7 });
                subSector.Add(new FilterData { ParentKey = 5, ParentValue = "GBV", Value = "PFA", Key = 8 });
                subSector.Add(new FilterData { ParentKey = 5, ParentValue = "GBV", Value = "Prevention and empowerment activities", Key = 9 });
                subSector.Add(new FilterData { ParentKey = 5, ParentValue = "GBV", Value = "referral to legal services", Key = 10 });
                subSector.Add(new FilterData { ParentKey = 5, ParentValue = "GBV", Value = "referral to medical services", Key = 11 });
                subSector.Add(new FilterData { ParentKey = 5, ParentValue = "GBV", Value = "referral to specialized psychosocial support", Key = 12 });
                subSector.Add(new FilterData { ParentKey = 5, ParentValue = "GBV", Value = "specialized psychosocial support(PSS) for survivors", Key = 13 });
                  //                                          , ParentValue = "Basic services",
                //General Protection                        , ParentValue = "Basic services",
                subSector.Add(new FilterData { ParentKey = 6, ParentValue = "General Protection", Value = "Ambulance", Key = 1 });
                subSector.Add(new FilterData { ParentKey = 6, ParentValue = "General Protection", Value = "Awareness Campiagn", Key = 2 });
                subSector.Add(new FilterData { ParentKey = 6, ParentValue = "General Protection", Value = "Group PSS counselling sessions", Key = 3 });
                subSector.Add(new FilterData { ParentKey = 6, ParentValue = "General Protection", Value = "integrated/comprehensive case management", Key = 4 });
                subSector.Add(new FilterData { ParentKey = 6, ParentValue = "General Protection", Value = "Needs Assessment", Key = 5 });
                subSector.Add(new FilterData { ParentKey = 6, ParentValue = "General Protection", Value = "other", Key = 6 });
                subSector.Add(new FilterData { ParentKey = 6, ParentValue = "General Protection", Value = "PFA", Key = 7 });
                subSector.Add(new FilterData { ParentKey = 6, ParentValue = "General Protection", Value = "referral to other services", Key = 8 });
                subSector.Add(new FilterData { ParentKey = 6, ParentValue = "General Protection", Value = "Rehabilitation material - provision of medical equipment including for persons with disabilities", Key = 9 });
                subSector.Add(new FilterData { ParentKey = 6, ParentValue = "General Protection", Value = "rescue and evacuation services", Key = 10 });
                subSector.Add(new FilterData { ParentKey = 6, ParentValue = "General Protection", Value = "structured group PSS counseling", Key = 11 });
                 //                                           , ParentValue = "Basic services",
                // Health                                   , ParentValue = "Basic services",
                subSector.Add(new FilterData { ParentKey = 7, ParentValue = "Health", Value = "Ambulances", Key = 1 });
                subSector.Add(new FilterData { ParentKey = 7, ParentValue = "Health", Value = "Artificial Limb", Key = 2 });
                subSector.Add(new FilterData { ParentKey = 7, ParentValue = "Health", Value = "Drugs and medical supply", Key = 3 });
                subSector.Add(new FilterData { ParentKey = 7, ParentValue = "Health", Value = "First Aids", Key = 4 });
                subSector.Add(new FilterData { ParentKey = 7, ParentValue = "Health", Value = "Fuel and Ambulances", Key = 5 });
                subSector.Add(new FilterData { ParentKey = 7, ParentValue = "Health", Value = "Health Educ/Promotion", Key = 6 });
                subSector.Add(new FilterData { ParentKey = 7, ParentValue = "Health", Value = "Maternal/Newborn Health", Key = 7 });
                subSector.Add(new FilterData { ParentKey = 7, ParentValue = "Health", Value = "Medical Campaign", Key = 8 });
                subSector.Add(new FilterData { ParentKey = 7, ParentValue = "Health", Value = "Medical Cash Payment", Key = 9 });
                subSector.Add(new FilterData { ParentKey = 7, ParentValue = "Health", Value = "Medical Labrotary", Key = 10 });
                subSector.Add(new FilterData { ParentKey = 7, ParentValue = "Health", Value = "MHPSS", Key = 11 });
                subSector.Add(new FilterData { ParentKey = 7, ParentValue = "Health", Value = "Mobile Clinic", Key = 12 });
                subSector.Add(new FilterData { ParentKey = 7, ParentValue = "Health", Value = "nutrition", Key = 13 });
                subSector.Add(new FilterData { ParentKey = 7, ParentValue = "Health", Value = "other", Key = 14 });
                subSector.Add(new FilterData { ParentKey = 7, ParentValue = "Health", Value = "Physical Therapy service", Key = 15 });
                subSector.Add(new FilterData { ParentKey = 7, ParentValue = "Health", Value = "Primary health services", Key = 16 });
                subSector.Add(new FilterData { ParentKey = 7, ParentValue = "Health", Value = "provision of medical equipment", Key = 17 });
                subSector.Add(new FilterData { ParentKey = 7, ParentValue = "Health", Value = "rehabilitation material-provision of medical equipment", Key = 18 });
                subSector.Add(new FilterData { ParentKey = 7, ParentValue = "Health", Value = "Routine Immunization", Key = 19 });
                subSector.Add(new FilterData { ParentKey = 7, ParentValue = "Health", Value = "secondary health services", Key = 20 });
                subSector.Add(new FilterData { ParentKey = 7, ParentValue = "Health", Value = "SGBV", Key = 21 });
                subSector.Add(new FilterData { ParentKey = 7, ParentValue = "Health", Value = "Staffing Family Planning", Key = 22 });
                subSector.Add(new FilterData { ParentKey = 7, ParentValue = "Health", Value = "Support for Persons with Disability(PWDs)", Key = 23 });
                   //                                         , ParentValue = "Basic services",
                //Legal                                     , ParentValue = "Basic services",
                subSector.Add(new FilterData { ParentKey = 8, ParentValue = "Legal", Value = "Civil documentation", Key = 1 });
                subSector.Add(new FilterData { ParentKey = 8, ParentValue = "Legal", Value = "conflict resolution", Key = 2 });
                subSector.Add(new FilterData { ParentKey = 8, ParentValue = "Legal", Value = "housing land and property", Key = 3 });
                subSector.Add(new FilterData { ParentKey = 8, ParentValue = "Legal", Value = "Human Rights", Key = 4 });
                subSector.Add(new FilterData { ParentKey = 8, ParentValue = "Legal", Value = "Legal advice", Key = 5 });
                subSector.Add(new FilterData { ParentKey = 8, ParentValue = "Legal", Value = "Legal Advice on HLP", Key = 6 });
                subSector.Add(new FilterData { ParentKey = 8, ParentValue = "Legal", Value = "Legal advice / counselling(Other)", Key = 7 });
                subSector.Add(new FilterData { ParentKey = 8, ParentValue = "Legal", Value = "legal awarness sessions", Key = 8 });
                subSector.Add(new FilterData { ParentKey = 8, ParentValue = "Legal", Value = "legal intervention / representation / accompaniment(civil documentation)", Key = 9 });
                subSector.Add(new FilterData { ParentKey = 8, ParentValue = "Legal", Value = "legal intervention/ representation / accompaniment(HLP)", Key = 10 });
                subSector.Add(new FilterData { ParentKey = 8, ParentValue = "Legal", Value = "other", Key = 11 });
                subSector.Add(new FilterData { ParentKey = 8, ParentValue = "Legal", Value = "Refarrals To Judicial Authorities", Key = 12 });
                  //                                          , ParentValue = "Basic services",
                // Mine Action                              , ParentValue = "Basic services",
                subSector.Add(new FilterData { ParentKey = 9, ParentValue = "Mine Action", Value = "Mine Clearing activities", Key = 1 });
                subSector.Add(new FilterData { ParentKey = 9, ParentValue = "Mine Action", Value = "Mine Risk awareness education", Key = 2 });
                subSector.Add(new FilterData { ParentKey = 9, ParentValue = "Mine Action", Value = "other", Key = 3 });
                subSector.Add(new FilterData { ParentKey = 9, ParentValue = "Mine Action", Value = "Victim assistance", Key = 4 });

                // NFI distribution
                subSector.Add(new FilterData { ParentKey = 10, ParentValue = "NFI distribution", Value = "Clothes and blankets", Key = 1 });
                subSector.Add(new FilterData { ParentKey = 10, ParentValue = "NFI distribution", Value = "Cooking and eating utensils", Key = 2 });
                subSector.Add(new FilterData { ParentKey = 10, ParentValue = "NFI distribution", Value = "Dignity Kits", Key = 3 });
                subSector.Add(new FilterData { ParentKey = 10, ParentValue = "NFI distribution", Value = "Gas cylinders portable stoves and fuel", Key = 4 });
                subSector.Add(new FilterData { ParentKey = 10, ParentValue = "NFI distribution", Value = "Hygiene Kits", Key = 5 });
                subSector.Add(new FilterData { ParentKey = 10, ParentValue = "NFI distribution", Value = "other", Key = 6 });
                subSector.Add(new FilterData { ParentKey = 10, ParentValue = "NFI distribution", Value = "Stationary Support", Key = 7 });
                subSector.Add(new FilterData { ParentKey = 10, ParentValue = "NFI distribution", Value = "Winterization kits", Key = 8 });
                //Nutrition                                 
                subSector.Add(new FilterData { ParentKey = 11, ParentValue = "Nutrition", Value = "Food distribution", Key = 1 });
                subSector.Add(new FilterData { ParentKey = 11, ParentValue = "Nutrition", Value = "Specialized nutrition (baby formula)", Key = 2 });
                //Other Services            
                subSector.Add(new FilterData { ParentKey = 12, ParentValue = "Other Services", Value = "othersevices", Key = 1 });
                //Persons with Disability(PWDs)
                subSector.Add(new FilterData { ParentKey = 13, ParentValue = "Persons with Disability(PWDs)", Value = "Physiotherapy", Key = 1 });
                subSector.Add(new FilterData { ParentKey = 13, ParentValue = "Persons with Disability(PWDs)", Value = "Physiotherapy Provision of Rehabilitation and mobility aid", Key = 2 });
                subSector.Add(new FilterData { ParentKey = 13, ParentValue = "Persons with Disability(PWDs)", Value = "Provision of Rehabilitation and mobility aid", Key = 3 });
                subSector.Add(new FilterData { ParentKey = 13, ParentValue = "Persons with Disability(PWDs)", Value = "Rehabilitation and mobility aid", Key = 4 });
                //WASH                                      
                subSector.Add(new FilterData { ParentKey = 14, ParentValue = "WASH", Value = "Drainage", Key = 1 });
                subSector.Add(new FilterData { ParentKey = 14, ParentValue = "WASH", Value = "Rehabilitation of sanitation facilities", Key = 2 });
                subSector.Add(new FilterData { ParentKey = 14, ParentValue = "WASH", Value = "Water supply", Key = 3 });
                subSector.Add(new FilterData { ParentKey = 14, ParentValue = "WASH", Value = "Water waste management", Key = 4 });

                filterContext.HttpContext.Cache.Remove("filterLists");
                Dictionary<string, object> filterLists = new Dictionary<string, object>();
                if ((filterLists = (filterContext.HttpContext.Cache.Get("filterLists") as Dictionary<string, object>)) == null)
                {
                    filterLists = StoreManeger.Instance.ServiceMappingManager.GetAllFilters();
                    filterLists.Add("Sector", sector);
                    filterLists.Add("SubSector", subSector);
                    filterContext.HttpContext.Cache.Insert("filterLists", filterLists);
                }
                filterContext.Controller.ViewBag.filterLists = filterLists;
                base.OnActionExecuting(filterContext);
            }


        }
    }
}