using Core.Application.Dto;
using System;
using System.Threading.Tasks;

namespace Core.Application.IntegrationContracts
{
    public interface IDetectiveIntegrationService
    {
        Task<DetectiveResponseDto> ExecuteSyntheticTest(string testId);
    }
}
