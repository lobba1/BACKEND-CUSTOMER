﻿namespace Business.Models;

public class ProjectUpdate
{
    public int Id { get; set; }
    public string Title { get; set; } = null!;
    public string? Description { get; set; }

    public DateTime StartDate { get; set; }

    public DateTime EndDate { get; set; }
    public int StatusId { get; set; }
    public int ClientId { get; set; }
    public int ManagerManagerId { get; set; }
    public int? ProjectId { get; set; }
}

