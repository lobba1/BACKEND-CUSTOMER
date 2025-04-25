using Data.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Models;

public class Project
{
    public int Id { get; set; }
    public string? Title { get; set; }
    public string? Description { get; set; }

    public DateTime StartDate { get; set; }

    public DateTime? EndDate { get; set; }


    public Client Client { get; set; } = null!;
    public Employee ProjectManager { get; set; } = null!;
    public Status Status { get; set; } = null!;
    public Product? Product { get; set; } = null!;
}
