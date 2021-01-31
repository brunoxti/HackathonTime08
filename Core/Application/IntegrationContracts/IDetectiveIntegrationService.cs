using Core.Application.Dto;
using System;
using System.Threading.Tasks;

namespace Core.Application.IntegrationContracts
{
    public interface IDetectiveIntegrationService
    {
        Task<DetectiveResponseDto> ExecuteSyntheticTest(Guid testId);
    }
}
