using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class BuggyController : BaseApiController
    {
        // Error: 404
        [HttpGet("not-found")]
        public ActionResult GetNotFound()
        {
            return NotFound();
        }

        //Error: 400
        [HttpGet("bad-request")]
        public ActionResult GetBadRequest()
        {
            return BadRequest(new ProblemDetails { Title = "This is a bad request" });
        }

        //Error: 401
        [HttpGet("unauthorised")]
        public ActionResult GetUnauthorised()
        {
            return Unauthorized();
        }

        [HttpGet("validation-error")]
        public ActionResult GetValidationError()
        {
            ModelState.AddModelError("Problem with validation", "This is the first error");
            ModelState.AddModelError("Problem with validation", "This is the second error");
            return ValidationProblem();
        }

        //Error: 500
        [HttpGet("server-error")]
        public ActionResult GetServerEroor()
        {
            throw new Exception("This is a server error");
        }
    }
}