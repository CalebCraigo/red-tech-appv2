using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace red_tech_appv2.Models
{
    public class Order
    {
        public int Id { get; set; }
        public string Type { get; set; }
        public string CustomerName { get; set; }
        public string CreatedDate { get; set; }
        public string CreatedByUsername { get; set; }
    }
}