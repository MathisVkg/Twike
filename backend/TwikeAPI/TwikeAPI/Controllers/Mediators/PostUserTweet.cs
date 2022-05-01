using TwikeAPI.Common.Mappings;
using AutoMapper;
using TwikeAPI.Models;
using MediatR;
using TwikeAPI.Controllers.Mediators.Settings;

namespace TwikeAPI.Controllers.Mediators;

public class PostUserTweet
{
    public class Request : IRequest<PostDto>
    {
        public string AccountName { get; set; }
    
        public string Pseudo { get; set; }
    
        public string Content { get; set; }
        
        public DateTime Date { get; set; }
    }

    public class Handler : IRequestHandler<Request, PostDto>
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
            var postModel = new Post
            {
                AccountName = request.AccountName,
                Pseudo = request.Pseudo,
                Content = request.Content,
                Date = request.Date,
            };

            await _context.Posts.AddAsync(postModel, cancellationToken);
            await _context.SaveChangesAsync(cancellationToken);
            return new PostDto();
        }
    }
    public class PostDto : BaseResponse, IMapFrom<Post>
    {
        public int Id { get; set; }
    }
}