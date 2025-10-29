interface NavbarProps {
  currentPage?: 'art' | 'me' | 'home' | 'career' | 'blog';
}

const Navbar = ({ currentPage = 'home' }: NavbarProps) => {
  return (
    <nav className="flex justify-center w-full">
      <div className="backdrop-blur-md bg-white/10 rounded-full px-4 sm:px-8 py-3 sm:py-4 shadow-lg w-[95%] sm:w-auto">
        <ul className="flex flex-wrap justify-center gap-4 sm:flex-nowrap sm:space-x-12">
          <li>
            <a 
              href="#art" 
              className={`transition-colors ${
                currentPage === 'art' 
                  ? 'text-white font-medium' 
                  : 'text-white/80 hover:text-white'
              }`}
            >
              Art
            </a>
          </li>
          <li>
            <a 
              href="#me" 
              className={`transition-colors ${
                currentPage === 'me' 
                  ? 'text-white font-medium' 
                  : 'text-white/80 hover:text-white'
              }`}
            >
              Me
            </a>
          </li>
          <li>
            <a 
              href="#home" 
              className={`transition-colors ${
                currentPage === 'home' 
                  ? 'text-white font-medium' 
                  : 'text-white/80 hover:text-white'
              }`}
            >
              Home
            </a>
          </li>
          <li>
            <a 
              href="#career" 
              className={`transition-colors ${
                currentPage === 'career' 
                  ? 'text-white font-medium' 
                  : 'text-white/80 hover:text-white'
              }`}
            >
              Career
            </a>
          </li>
          <li>
            <a 
              href="#blog" 
              className={`transition-colors ${
                currentPage === 'blog' 
                  ? 'text-white font-medium' 
                  : 'text-white/80 hover:text-white'
              }`}
            >
              Blog
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;