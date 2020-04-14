using System.Threading.Tasks;
using HazardMapper.Common.Models;

namespace HazardMapper.BL
{
    public interface IHazardMapperService
    {
        Task<string> GenerateElevationProfileAsync(ElevationRequestModel model);
    }
}
