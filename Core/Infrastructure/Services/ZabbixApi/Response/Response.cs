using System.Collections.Generic;

namespace Core.Domain.Models.ZabbixApi.Response
{
    public class Response
    {
        public string jsonrpc { get; set; }
        public string result { get; set; }
        public int id { get; set; }
    }

    public class Url
    {
        public string url { get; set; }
        public string name { get; set; }
    }

    public class Result
    {
        public string eventid { get; set; }
        public string source { get; set; }
        public string @object { get; set; }
        public string objectid { get; set; }
        public string clock { get; set; }
        public string value { get; set; }
        public string acknowledged { get; set; }
        public string ns { get; set; }
        public string name { get; set; }
        public string severity { get; set; }
        public string r_eventid { get; set; }
        public string c_eventid { get; set; }
        public string correlationid { get; set; }
        public string userid { get; set; }
        public string opdata { get; set; }
        public string suppressed { get; set; }
        public List<Url> urls { get; set; }
    }

    public class EventResponse
    {
        public string jsonrpc { get; set; }
        public List<Result> result { get; set; }
        public int id { get; set; }
    }

    public class AckResult
    {
        public List<int> eventids { get; set; }
    }

    public class AckResponse
    {
        public string jsonrpc { get; set; }
        public AckResult result { get; set; }
        public int id { get; set; }
    }
}
