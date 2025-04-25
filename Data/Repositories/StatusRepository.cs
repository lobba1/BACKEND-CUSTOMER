﻿using Data.Context;
using Data.Entities;

namespace Data.Repositories
{
    public class StatusRepository(DataContext context) : BaseRepository<StatusEntity>(context)
    {
    }
}
