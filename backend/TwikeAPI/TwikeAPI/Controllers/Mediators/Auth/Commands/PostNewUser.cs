using System.Text;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using TwikeAPI.Common.Mappings;
using AutoMapper;
using TwikeAPI.Models;
using MediatR;
using TwikeAPI.Controllers.Mediators.Settings;

namespace TwikeAPI.Controllers.Mediators.Auth.Commands;

public class PostNewUser
{
    public class Request : IRequest<UserDto>
    {
        public string AccountName { get; set; }
    
        public string Pseudo { get; set; }
    
        public string Email { get; set; }
    
        public string Password { get; set; }
    }

    public class Handler : IRequestHandler<Request, UserDto>
    {
        private readonly TwikeDbContext _context;
        private readonly IMapper _mapper;
        
        public Handler(TwikeDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        
        public async Task<UserDto> Handle(Request request, CancellationToken cancellationToken)
        {
            var userModel = new User
            {
                AccountName = request.AccountName,
                Pseudo = request.Pseudo,
                Email = request.Email,
                Password = GetHash(request.Password),
                Authtoken = Guid.NewGuid().ToString()
            };

            await _context.Users.AddAsync(userModel, cancellationToken);
            await _context.SaveChangesAsync(cancellationToken);
            return _mapper.Map<User, UserDto>(userModel);
        }
        
        private static string GetHash(string password)
        {
            var passHash = KeyDerivation.Pbkdf2(  
                password: password,  
                salt: Encoding.UTF8.GetBytes(password),  
                prf: KeyDerivationPrf.HMACSHA512,  
                iterationCount: 10000,  
                numBytesRequested: 256 / 8);
            return Convert.ToBase64String(passHash);
        }
    }

    public class UserDto : BaseResponse, IMapFrom<User>
    {
        public string AccountName { get; set; }
    
        public string Pseudo { get; set; }
    
        public string Email { get; set; }
    
        public string Password { get; set; }
    }
}