using TwikeAPI.Common.Mappings;
using AutoMapper;
using TwikeAPI.Models;
using MediatR;
using TwikeAPI.Controllers.Mediators.Settings;

namespace TwikeAPI.Controllers.Mediators;

public class GetUsersPosts
{
    public class Handler : IRequestHandler<Request, UserDto>
    {
        private readonly TwikeDbContext _context;
        private readonly IMapper _mapper;
        
        public Handler(TwikeDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        
        public async Task<PostDto> Handle(Request request, CancellationToken cancellationToken)
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
            return new PostDto();
        }
    }
    public class PostDto : BaseResponse, IMapFrom<Post>
    {
        public string Content { get; set; }
    
        public string Pseudo { get; set; }
    
        public string AccountName { get; set; }
    
        public DateTime? Date { get; set; }
    }

}