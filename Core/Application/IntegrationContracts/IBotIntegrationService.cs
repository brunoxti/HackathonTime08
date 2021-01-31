﻿using Core.Domain.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Core.Application.IntegrationContracts
{
    public interface IBotIntegrationService
    {
        Task NotifyAsync(Result alert, IEnumerable<SyntheticTestResult> enumerable);
    }
}
