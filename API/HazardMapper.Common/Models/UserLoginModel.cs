using System;
using System.Collections.Generic;
using System.Text;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace HazardMapper.Common.Models
{
    public class UserLoginModel
    {
        [JsonProperty(PropertyName = "username")]
        public string Username { get; set; }
        [JsonProperty(PropertyName = "password")]
        public string Password { get; set; }
    }
}
