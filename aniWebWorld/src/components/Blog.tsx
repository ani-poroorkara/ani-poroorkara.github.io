interface BlogPost {
  id: number;
  title: string;
  summary: string;
  date: string;
  category: string;
  readTime: string;
  imageUrl?: string;
  tags: string[];
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "The Future of AI in Software Development",
    summary: "Exploring how artificial intelligence is reshaping the landscape of software development and what it means for developers.",
    date: "2025-10-25",
    category: "Technology",
    readTime: "5 min",
    imageUrl: "/path/to/ai-image.jpg",
    tags: ["AI", "Software Development", "Future Tech"]
  },
  {
    id: 2,
    title: "Building Reactive UIs with Modern Frameworks",
    summary: "A deep dive into creating responsive and interactive user interfaces using the latest web technologies.",
    date: "2025-10-20",
    category: "Web Development",
    readTime: "7 min",
    tags: ["React", "UI/UX", "Web Development"]
  },
  {
    id: 3,
    title: "Machine Learning in Computer Vision",
    summary: "Insights from my research in computer vision and the implementation of deep learning models.",
    date: "2025-10-15",
    category: "Machine Learning",
    readTime: "8 min",
    imageUrl: "/path/to/ml-image.jpg",
    tags: ["Machine Learning", "Computer Vision", "Research"]
  }
];

const Blog = () => {
  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-white mb-4">Tech Insights & Reflections</h1>
        <p className="text-white/80 text-lg">Exploring the intersection of AI, development, and innovation</p>
      </div>

      {/* Featured Post */}
      <div className="mb-16">
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl transform group-hover:scale-[1.02] transition-all duration-300"></div>
          <div className="relative bg-white/10 backdrop-blur-md rounded-2xl p-8 transform group-hover:scale-[1.02] transition-all duration-300">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Content */}
              <div className="flex-1">
                <span className="inline-block px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm mb-4">
                  {blogPosts[0].category}
                </span>
                <h2 className="text-2xl font-bold text-white mb-4">{blogPosts[0].title}</h2>
                <p className="text-white/80 mb-6">{blogPosts[0].summary}</p>
                <div className="flex items-center gap-4 text-sm text-white/60">
                  <span>{new Date(blogPosts[0].date).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}</span>
                  <span>•</span>
                  <span>{blogPosts[0].readTime} read</span>
                </div>
              </div>
              {/* Image */}
              {blogPosts[0].imageUrl && (
                <div className="w-full md:w-1/3 aspect-video rounded-lg overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-blue-500/30 to-purple-500/30" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Blog Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {blogPosts.slice(1).map(post => (
          <div key={post.id} className="group relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl transform group-hover:scale-[1.02] transition-all duration-300"></div>
            <div className="relative bg-white/5 backdrop-blur-sm rounded-xl p-6 h-full transform group-hover:scale-[1.02] transition-all duration-300">
              <div className="flex flex-col h-full">
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 bg-white/10 text-white/80 rounded-full text-sm">
                    {post.category}
                  </span>
                  <span className="text-white/60 text-sm">{post.readTime} read</span>
                </div>
                
                <h3 className="text-xl font-semibold text-white mb-3">{post.title}</h3>
                <p className="text-white/70 mb-4 flex-grow">{post.summary}</p>
                
                <div className="mt-auto">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag, index) => (
                      <span 
                        key={index}
                        className="px-2 py-1 bg-white/5 text-white/60 text-xs rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="text-sm text-white/60">
                    {new Date(post.date).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Newsletter Section */}
      <div className="mt-16 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-blue-500/20 rounded-2xl transform hover:scale-[1.02] transition-all duration-300"></div>
        <div className="relative bg-white/5 backdrop-blur-md rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">Stay Updated</h3>
          <p className="text-white/80 mb-6">Get notified about the latest tech insights and blog posts.</p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-grow px-4 py-2 bg-white/10 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            />
            <button className="px-6 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg text-white font-medium transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;