using Application.Activities;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    // [ApiController]
    // [Route("[controller]")]
    public class ActivitiesController : BaseApiController
    {
        [HttpGet] //api/activities
        public async Task<ActionResult<List<Activity>>>GetActivities()
        {
            return await Mediator.Send(new List.Query());

        }
        [HttpGet("{id}")] //api/activities/someId
        public async Task<ActionResult<Activity>>GetActivity(Guid id)
        {
            return await Mediator.Send(new Details.Query{Id=id});
            // return await _context.Activities.FindAsync(id);
        }
        [HttpPost]
        public async Task<IActionResult> CreateActivity(Activity activity)
        {
            return Ok(await Mediator.Send(new Create.Command {Activity = activity}));
            // return await _context.Activities.FindAsync(id);
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> EditActivity(Guid id,Activity activity)
        {
            activity.Id=id;
            return Ok(await Mediator.Send(new Edit.Command{Activity = activity}));
            // return await _context.Activities.FindAsync(id);
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteActivity(Guid id)
        {
            //activity.Id=id;
            return Ok(await Mediator.Send(new Delete.Command{Id = id}));
            // return await _context.Activities.FindAsync(id);
        }
    }
}