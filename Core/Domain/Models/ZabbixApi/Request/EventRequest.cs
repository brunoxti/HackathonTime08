namespace Core.Domain.Models.ZabbixApi.Request
{
    public class EventRequest
    {
        public static string get => "event.get";

        public static string acknowledge => "event.acknowledge";
    }

    public enum ActionEvent
    {
        CloseProblem = 1,
        AcknowledgeEvent = 2,
        AddMessage = 4,
        ChangeSeverity = 8,
        UnacknowledgeEvent = 16
    }
}
