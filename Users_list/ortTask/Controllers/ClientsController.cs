using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using UsersSpace.Models;
using MongoDB.Bson;

namespace UsersSpace.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class ClientsController : ControllerBase
  {
    private readonly IMongoCollection<Client> _clientsCollection;

    public ClientsController(IMongoDatabase database)
    {
      _clientsCollection = database.GetCollection<Client>("users");
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Client>>> GetClients()
    {
      var clients = await _clientsCollection.Find(Builders<Client>.Filter.Empty).ToListAsync();
      return Ok(clients);
    }

    

    [HttpGet("{id}")]
    public async Task<ActionResult<Client>> GetClient(string id)
    {
      var client = await _clientsCollection.Find(c => c._id.Equals(new ObjectId(id))).FirstOrDefaultAsync();
      if (client == null)
      {
        return NotFound();
      }
      return Ok(client);
    }

    [HttpGet("searchBy")]
    public async Task<ActionResult<IEnumerable<Client>>> SearchClients([FromQuery] ClientSearchParameters parameters)
    {
      var filterBuilder = Builders<Client>.Filter;
      var filter = filterBuilder.Empty;

      if (!string.IsNullOrEmpty(parameters.FullName))
      {
        filter = filterBuilder.Eq(c => c.fullName, parameters.FullName);
      }
      else if (!string.IsNullOrEmpty(parameters.Id))
      {
        filter = filterBuilder.Eq(c => c.id, parameters.Id);
      }
      else if (!string.IsNullOrEmpty(parameters.IpAddress))
      {
        filter = filterBuilder.Eq(c => c.ipAddress, parameters.IpAddress);
      }
      else if (!string.IsNullOrEmpty(parameters.PhoneNumber))
      {
        filter = filterBuilder.Eq(c => c.phoneNumber, parameters.PhoneNumber);
      }

      var clients = await _clientsCollection.Find(filter).ToListAsync();
      return Ok(clients);
    }

    [HttpGet("search")]
    public async Task<ActionResult<IEnumerable<Client>>> SearchClients([FromQuery] string s)
    {
      var filterBuilder = Builders<Client>.Filter;
      var filter = filterBuilder.Or(
          filterBuilder.Regex(c => c.fullName, new BsonRegularExpression(s, "i")),
          filterBuilder.Regex(c => c.ipAddress, new BsonRegularExpression(s, "i")),
           filterBuilder.Regex(c => c.id, new BsonRegularExpression(s, "i")),
          filterBuilder.Regex(c => c.phoneNumber, new BsonRegularExpression(s, "i"))
      );

      var clients = await _clientsCollection.Find(filter).ToListAsync();
      return Ok(clients);
    }

    [HttpPost]
    public async Task<ActionResult<Client>> AddClient(Client client)
    {
      client._id = ObjectId.GenerateNewId();
      await _clientsCollection.InsertOneAsync(client);

      // Retrieve the inserted client from the database
      var insertedClient = await _clientsCollection.Find(x => x._id == client._id).FirstOrDefaultAsync();

      return CreatedAtAction(nameof(GetClients), insertedClient);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> RemoveClient(string id)
    {
      var deleteResult = await _clientsCollection.DeleteOneAsync(c => c.id.Equals(id));
      if (deleteResult.DeletedCount > 0)
      {
        return NoContent();
      }
      return NotFound();
    }
  }
}
