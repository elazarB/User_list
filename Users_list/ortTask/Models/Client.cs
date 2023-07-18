using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.ComponentModel.DataAnnotations;

namespace UsersSpace.Models
{
    public class Client
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public ObjectId? _id { get; set; }

        [BsonElement("fullName")]
        public string fullName { get; set; }

        [RegularExpression("^[A-Z0-9]+$", ErrorMessage = "The id field must contain only numbers.")]
        [BsonElement("id")]
        public string id { get; set; }

        [RegularExpression(@"^(25[0-5]|2[0-4][0-9]|[0-1]?[0-9]{1,2})(\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9]{1,2})){3}$",
            ErrorMessage = "The ipAddress field must be a valid IP address.")]
        [BsonElement("ipAddress")]
        public string ipAddress { get; set; }

        [RegularExpression(@"^[+]?[0-9-]+$",
            ErrorMessage = "The phoneNumber field must be a valid phone number.")]
        [BsonElement("phoneNumber")]
        public string phoneNumber { get; set; }
    }
}
