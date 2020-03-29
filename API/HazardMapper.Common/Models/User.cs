using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.AspNetCore.Identity;

namespace HazardMapper.Common.Models
{
    public class User : IdentityUser
    {
        public string Country { get; set; }
        public string Vocation { get; set; }
    }
}
