import { useState } from 'react';

interface ArtWork {
  id: number;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  year: string;
  medium: string;
  dimensions?: string;
  isWide?: boolean;
}

const artworks: ArtWork[] = [
  {
    id: 1,
    title: "Digital Dreamscape",
    description: "An exploration of surreal digital landscapes combining organic forms with technological elements.",
    category: "Digital Art",
    imageUrl: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=800&auto=format&fit=crop&q=60",
    year: "2025",
    medium: "Digital Illustration",
    isWide: true
  },
  {
    id: 2,
    title: "Neural Networks",
    description: "Abstract visualization of artificial neural networks and their interconnections.",
    category: "Generative Art",
    imageUrl: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=800&auto=format&fit=crop&q=60",
    year: "2025",
    medium: "Processing / p5.js"
  },
  {
    id: 3,
    title: "Urban Flow",
    description: "A dynamic representation of city life and data flow in modern urban environments.",
    category: "Motion Design",
    imageUrl: "https://images.unsplash.com/photo-1533577116850-9cc66cad8a9b?w=800&auto=format&fit=crop&q=60",
    year: "2024",
    medium: "After Effects",
    dimensions: "1920x1080px"
  },
  {
    id: 5,
    title: "Digital Echo",
    description: "A series exploring the repetition and transformation of digital signals.",
    category: "Digital Art",
    imageUrl: "https://images.unsplash.com/photo-1633419798683-5d9c69072c71?w=800&auto=format&fit=crop&q=60",
    year: "2024",
    medium: "Digital Illustration"
  },
  {
    id: 4,
    title: "Quantum Patterns",
    description: "Abstract patterns inspired by quantum mechanics and wave functions.",
    category: "Generative Art",
    imageUrl: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=800&auto=format&fit=crop&q=60",
    year: "2025",
    medium: "Processing / p5.js",
    isWide: true
  },
  {
    id: 6,
    title: "Data Flow",
    description: "Visualization of data streams and network connections.",
    category: "Motion Design",
    imageUrl: "https://images.unsplash.com/photo-1545987796-200677ee1011?w=800&auto=format&fit=crop&q=60",
    year: "2024",
    medium: "After Effects",
    dimensions: "1920x1080px"
  }
];

const categories = ["All", ...Array.from(new Set(artworks.map(art => art.category)))];

const Art = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedArtwork, setSelectedArtwork] = useState<ArtWork | null>(null);

  const filteredArtworks = selectedCategory === "All" 
    ? artworks 
    : artworks.filter(art => art.category === selectedCategory);

  return (
    <div className="w-full max-w-7xl mx-auto px-4">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-white mb-4">Creative Portfolio</h1>
        <p className="text-white/80 text-lg mb-8">Exploring the intersection of art and technology</p>
        
        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-white/20 text-white backdrop-blur-sm'
                  : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white/80'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredArtworks.map((artwork) => (
          <div 
            key={artwork.id}
            className={`group relative ${artwork.isWide ? 'md:col-span-2' : ''}`}
            onClick={() => setSelectedArtwork(artwork)}
          >
            {/* Background Gradients */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl transform group-hover:scale-[1.02] transition-all duration-300"></div>
            
            {/* Artwork Card */}
            <div className="relative bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden cursor-pointer">
              {/* Image Container */}
              <div className="aspect-video w-full overflow-hidden">
                <img 
                  src={artwork.imageUrl} 
                  alt={artwork.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              
              {/* Info Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-xl font-semibold text-white mb-2">{artwork.title}</h3>
                    <p className="text-white/80 text-sm mb-2">{artwork.description}</p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2 py-1 bg-white/20 rounded-full text-xs text-white/90">
                        {artwork.category}
                      </span>
                      <span className="px-2 py-1 bg-white/20 rounded-full text-xs text-white/90">
                        {artwork.medium}
                      </span>
                      <span className="px-2 py-1 bg-white/20 rounded-full text-xs text-white/90">
                        {artwork.year}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for selected artwork */}
      {selectedArtwork && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedArtwork(null)}
        >
          <div 
            className="max-w-4xl w-full bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            <div className="relative">
              <img 
                src={selectedArtwork.imageUrl} 
                alt={selectedArtwork.title}
                className="w-full h-full object-contain"
              />
              <button 
                className="absolute top-4 right-4 text-white/80 hover:text-white p-2 bg-black/20 rounded-full"
                onClick={() => setSelectedArtwork(null)}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-bold text-white mb-2">{selectedArtwork.title}</h2>
              <p className="text-white/80 mb-4">{selectedArtwork.description}</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <h4 className="text-white/60 text-sm">Category</h4>
                  <p className="text-white">{selectedArtwork.category}</p>
                </div>
                <div>
                  <h4 className="text-white/60 text-sm">Medium</h4>
                  <p className="text-white">{selectedArtwork.medium}</p>
                </div>
                <div>
                  <h4 className="text-white/60 text-sm">Year</h4>
                  <p className="text-white">{selectedArtwork.year}</p>
                </div>
                {selectedArtwork.dimensions && (
                  <div>
                    <h4 className="text-white/60 text-sm">Dimensions</h4>
                    <p className="text-white">{selectedArtwork.dimensions}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Art;