using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class CreateProductDTO
    {
        [Required]
        public string Name { get; set; } = String.Empty;

        [Required]
        public string Description { get; set; } = String.Empty;

        [Range(0.1, double.MaxValue, ErrorMessage = "Price must be greater then 0")]
        public decimal Price { get; set; }

         [Required]
        public string PictureUrl { get; set; } = String.Empty;

         [Required]
        public string Type { get; set; } = String.Empty;

         [Required]
        public string Brand { get; set; } = String.Empty;

        [Range(1, int.MaxValue, ErrorMessage = "Quantity in stock must be at leat 1")]
        public int QuantityInStock { get; set; }
    }
}