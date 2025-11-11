interface NavbarProps {
  currentPage: 'art' | 'me' | 'home' | 'career' | 'blog';
  onPageChange: (page: 'art' | 'me' | 'home' | 'career' | 'blog') => void;
}

const Navbar = ({ currentPage, onPageChange }: NavbarProps) => {
  return (
    <nav className="flex justify-center w-full">
      <div className="backdrop-blur-md bg-white/10 rounded-full px-4 sm:px-8 py-3 sm:py-4 shadow-lg w-[95%] sm:w-auto">
        <ul className="flex flex-wrap justify-center gap-4 sm:flex-nowrap sm:space-x-12">
          {/* <li>
            <button 
              onClick={() => onPageChange('art')}
              className={`transition-colors ${
                currentPage === 'art' 
                  ? 'text-white font-medium' 
                  : 'text-white/80 hover:text-white'
              }`}
            >
              Art
            </button>
          </li> */}
          <li>
            <button 
              onClick={() => onPageChange('me')}
              className={`transition-colors ${
                currentPage === 'me' 
                  ? 'text-white font-medium' 
                  : 'text-white/80 hover:text-white'
              }`}
            >
              Me
            </button>
          </li>
          <li>
            <button 
              onClick={() => onPageChange('home')}
              className={`transition-colors ${
                currentPage === 'home' 
                  ? 'text-white font-medium' 
                  : 'text-white/80 hover:text-white'
              }`}
            >
              Home
            </button>
          </li>
          <li>
            <button 
              onClick={() => onPageChange('career')}
              className={`transition-colors ${
                currentPage === 'career' 
                  ? 'text-white font-medium' 
                  : 'text-white/80 hover:text-white'
              }`}
            >
              Career
            </button>
          </li>
          {/* <li>
            <button 
              onClick={() => onPageChange('blog')}
              className={`transition-colors ${
                currentPage === 'blog' 
                  ? 'text-white font-medium' 
                  : 'text-white/80 hover:text-white'
              }`}
            >
              Blog
            </button>
          </li> */}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;