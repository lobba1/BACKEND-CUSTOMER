using Business.Models;
using Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Business.Factories;

namespace Business.Factories;

public static class StatusFactory
{
    public static Status Map(StatusEntity entity) => new Status
    {
        Id = entity.Id,
        StatusName  = entity.StatusName
    };
}
