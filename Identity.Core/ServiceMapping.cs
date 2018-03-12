using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Identity.Core.EntityStore
{
    public class ServiceMapping
    {
        public string Index { get; set; }
        public string ServiceProviderName_English { get; set; }
        public string ServiceProviderName_Arabic { get; set; }
        public string ServicesProviderType { get; set; }
        public string Sector { get; set; }
        public string SubSector { get; set; }
        public string ServicesEnglish { get; set; }
        public string ServicesInArabic { get; set; }
        public string GovernoratePCode { get; set; }
        public string Governorate { get; set; }
        public string DistrictPCode { get; set; }
        public string District { get; set; }
        public string SubDistrictPCode { get; set; }
        public string SubDistrict { get; set; }
        public string VillagePCode { get; set; }
        public string Village { get; set; }
        public string GovernorateCoverage { get; set; }
        public string Coverage_Arabic { get; set; }
        public string NameContact_Amman { get; set; }
        public string NameContact { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
        public string Skype { get; set; }
        public string LocationType { get; set; }
        public string OpeningHours { get; set; }
        public string ClosingHour { get; set; }
        public string Hotline { get; set; }
        public string RequireFees { get; set; }
        public string FeesYes { get; set; }
        public string RequireWaitingPeriod { get; set; }
        public string WaitingPeriodHowLong { get; set; }
        public string TargetGroup { get; set; }
        public string RequireID { get; set; }
        public string IDTypesAccepted { get; set; }
        public string ContinueServicein6months { get; set; }
        public string IntakeCriteria { get; set; }
        public string AcceptReferrals { get; set; }
        public string ReferralContact { get; set; }
        public string ReferralName { get; set; }
        public string ReferralNumber { get; set; }
        public string ReferralEmail { get; set; }
        public string ReferralConditions { get; set; }
        public string ReferralConditionsYes { get; set; }
        public string ReferralFollow_Up { get; set; }
        public string CenterDisabilityFriendly { get; set; }
        public string CenterDisabilityFriendlyHow { get; set; }
        public string RiskAccessingCenter { get; set; }
        public string RiskAccessingCenteryes_Reason { get; set; }
        public string RoadSafe { get; set; }
        public string RoadnotSafe_Reason { get; set; }
        public string BeneficiariesFeedback { get; set; }
        public string ShareInformationwithBeneficiary { get; set; }
        public string SharewithinIRC { get; set; }
        public string SharewithOtherNGOs { get; set; }
    }
}
