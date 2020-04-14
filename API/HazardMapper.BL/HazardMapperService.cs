using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using System.Web;
using Esri.ArcGISRuntime.Geometry;
using Esri.ArcGISRuntime.Tasks.Geoprocessing;
using HazardMapper.Common.Helpers;
using HazardMapper.Common.Models;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using SpatialReference = HazardMapper.Common.Models.SpatialReference;

namespace HazardMapper.BL
{
    public class HazardMapperService : IHazardMapperService
    {
        private HttpClientWrapper httpClientWrapper;

        public HazardMapperService(HttpClientWrapper httpClientWrapper)
        {
            this.httpClientWrapper = httpClientWrapper;
        }

        public async Task<string> GenerateElevationProfileAsync(ElevationRequestModel model)
        {
            throw new NotImplementedException();
        }

    }
}
