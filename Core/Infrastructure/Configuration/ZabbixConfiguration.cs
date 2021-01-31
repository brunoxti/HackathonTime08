using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.Extensions.Options;

namespace Core.Infrastructure.Configuration
{
    public class ZabbixConfiguration
    {
        public ZabbixConfiguration(IOptions<ZabbixApi> zabbixApi)
        {
            ZabbixApi = zabbixApi.Value;
        }

        public ZabbixApi ZabbixApi { get; set; }
    }

    public class ZabbixApi
    {
        public string BaseUrl { get; set; }

        //public ActionMethod ActionMethod { get; set; }
    }

    public class ActionMethod
    {
        public string create { get; set; }

        public string delete { get; set; }

        public string update { get; set; }

        public string get { get; set; }
    }
}
