using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HazardMapper.BL;
using HazardMapper.Common.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace HazardMapper.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HazardMapperController : ControllerBase
    {
        private readonly IHazardMapperService _hazardMapperService;

        public HazardMapperController(IHazardMapperService hazardMapperService)
        {
            _hazardMapperService = hazardMapperService;
        }

        [HttpPost]
        [Route("getElevation")]
        public async Task<IActionResult> GetElevationAsync([FromBody] ElevationRequestModel model)
        {
            var result = await _hazardMapperService.GenerateElevationProfileAsync(model);
            return Ok(result);
        }
    }
}