using System.Collections.Generic;
using Newtonsoft.Json;

namespace Core.Domain.Models.ZabbixApi.Request
{
    public class LoginRequest
    {
        public string user { get; set; }

        public string password { get; set; }

        public static string login => "user.login";
    }

    public static class ActionMethod
    {
        public static string create => "action.create";
        public static string delete => "action.delete";
        public static string update => "action.update";
        public static string get => "action.get";
    }
}
