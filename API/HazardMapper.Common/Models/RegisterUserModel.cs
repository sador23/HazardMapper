using System;
using System.Collections.Generic;
using System.Text;

namespace HazardMapper.Common.Models
{
    public class RegisterUserModel
    {
        public string UserName { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public string Country { get; set; }
        public string Vocation { get; set; }
    }
}
