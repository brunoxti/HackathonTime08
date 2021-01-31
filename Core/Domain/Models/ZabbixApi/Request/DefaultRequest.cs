using System;
using System.Collections.Generic;
using System.Text;
using Newtonsoft.Json;

namespace Core.Domain.Models.ZabbixApi.Request
{
    public class DefaultRequest
    {
        [JsonProperty("jsonrpc")]
        public string jsonrpc => "2.0";

        [JsonProperty("method")]
        public string method { get; set; }

        [JsonProperty("params")]
        public object @params { get; set; }

        [JsonProperty("id")]
        public int id => 1;

        [JsonProperty("auth")]
        public string auth { get; set; }
    }
}
