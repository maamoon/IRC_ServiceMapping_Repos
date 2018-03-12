using Dapper;
using Microsoft.AspNet.Identity;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Identity.Core.EntityStore
{



    public class ServiceMappingStore
    {
        private string _connection;
        public ServiceMappingStore(string connection)
        {
            _connection = connection;
        }
        public IQueryable<ServiceMapping> ServiceMappingRecords
        {
            get
            {
                try
                {


                    var sql = @"
                            SELECT 
                               SM.*  -- ServiceMapping 
                            FROM ServiceMapping SM";


                    using (var connection = new SqlConnection(_connection))
                    {
                        var result = connection.Query<ServiceMapping>(sql);

                        return result.AsQueryable();
                    }
                }
                catch (Exception ex)
                {

                    throw ex;
                }
            }
        }

        public Dictionary<string, object> GetAllFilters()
        {
            Dictionary<string, object> filterLists = new Dictionary<string, object>();
            var sql = @"Select * From LookUp_Governorate ;
                        Select * From LookUp_District ;
                        Select * From LookUp_SubDistrict ;
                        Select * From LookUp_Village ;
                        --SELECT Distinct Sector From ServiceMapping ;                      
                        --SELECT Distinct SubSector From ServiceMapping ;
                        ";
            using (var connection = new SqlConnection(_connection))
            {
                try
                {
                    var result = connection.QueryMultiple(sql);
                    filterLists.Add("Governorate", result.Read<LookUp_Governorate>().ToList());
                    filterLists.Add("District", result.Read<LookUp_District>().ToList());
                    filterLists.Add("SubDistrict", result.Read<LookUp_SubDistrict>().ToList());
                    filterLists.Add("Village", result.Read<LookUp_Village>().ToList());
                    //filterLists.Add("Sector", result.Read<string>().ToList());
                    //filterLists.Add("SubSector", result.Read<string>().ToList());
                    return filterLists;
                }
                catch (Exception ex)
                {

                    throw ex;
                }
            }
        }
    }
}
