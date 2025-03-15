using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using Core.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace API.Controllers
{
    
    public class BuggyController : BaseApiController
    {
        [HttpGet("unauthorized")]
        public IActionResult GetUnauthorized()
        {
            return Unauthorized();
        }

        [HttpGet("badrequest")]
        public IActionResult GetBadRequest()
        {
            return BadRequest();
        }

        [HttpGet("notfound")]
        public IActionResult GetNotFound()
        {
            return NotFound();
        }

        [HttpPost("validationerror")]
        public IActionResult GetValidationError(CreateProductDTO product)
        {
            return Ok();
        }

        [HttpGet("internalerror")]
        public IActionResult GetInternalError()
        {
            throw new Exception("this is a test exception");
        }
    }
}