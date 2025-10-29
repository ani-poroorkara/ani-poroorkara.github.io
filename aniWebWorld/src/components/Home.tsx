import { useState, useEffect } from "react";
import { 
  HiOutlinePhotograph,
  HiOutlineFilm,
  HiOutlineCode
} from "react-icons/hi";
import { IoFastFood } from "react-icons/io5";

const greetings = [
  { text: "Hello!", language: "English", pronunciation: "heh·low" },
  { text: "Bonjour!", language: "French", pronunciation: "bohn·zhoor" },
  { text: "你好!", language: "Chinese", pronunciation: "nǐ hǎo" },
  { text: "¡Hola!", language: "Spanish", pronunciation: "oh·laa" },
  { text: "こんにちは!", language: "Japanese", pronunciation: "kon·ni·chi·wa" },
  { text: "Ciao!", language: "Italian", pronunciation: "chow" },
  { text: "Namaste!", language: "Hindi", pronunciation: "nuh·muh·stey" },
  {
    text: "안녕하세요!",
    language: "Korean",
    pronunciation: "ann·yeong·ha·se·yo",
  },
];

const images = [
  "/art.svg",
  "/cooking.svg",
  "/movies.svg",
  "/tech.svg",
];

const Home = () => {
  const [currentGreetingIndex, setCurrentGreetingIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const animationTimer = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentGreetingIndex(
          (prevIndex) => (prevIndex + 1) % greetings.length
        );
        setIsAnimating(false);
      }, 300);
    }, 3000);

    return () => clearInterval(animationTimer);
  }, []);

  return (
    <div className="w-[95%] sm:w-full max-w-7xl min-h-[600px] sm:h-[600px] backdrop-blur-md bg-white/5 rounded-xl p-4 sm:p-8 relative overflow-hidden">
      {/* Slanted background */}
      <div className="absolute inset-0 bg-white/10 [clip-path:polygon(75%_0%,100%_0%,75%_100%,50%_100%)] hidden sm:block"></div>

      {/* Greeting section */}
      <div className="min-h-[120px] sm:min-h-[140px] items-center justify-center mb-4 sm:mb-8 pt-8">
        <div
          key={currentGreetingIndex}
          className="greeting-animation relative"
        >
          <div className="absolute left-0 top-0 text-xs opacity-70 transform -translate-y-full pt-2">
            {greetings[currentGreetingIndex].pronunciation}
          </div>
          <div className="absolute right-0 top-0 text-xs opacity-70 transform -translate-y-full pt-2">
            {greetings[currentGreetingIndex].language}
          </div>
          <h1 className="text-5xl sm:text-8xl font-extrabold">
            {greetings[currentGreetingIndex].text}
          </h1>
        </div>
      </div>

      <div className="flex flex-col md:flex-row h-[calc(100%-160px)]">
        {/* Content SECTION */}
        <div className="w-full md:w-1/2 flex flex-col justify-between h-full relative z-10 p-6">
          <div>
            <h2 className="text-2xl sm:text-4xl font-semibold mb-4 sm:mb-8">
              I am Anirudh Poroorkara
            </h2>
            {/* Interests list */}
            <div className="space-y-3 sm:space-y-4 text-base sm:text-lg">
              <div className="flex items-center gap-3">
                <HiOutlineCode size={20} />
                <span>Tech Enthusiast</span>
              </div>
              <div className="flex items-center gap-3">
                <HiOutlineFilm size={20} />
                <span>Movie Connoisseur</span>
              </div>
              <div className="flex items-center gap-3">
                <IoFastFood size={20} />
                <span>Food Fanatic</span>
              </div>
              <div className="flex items-center gap-3">
                <HiOutlinePhotograph size={20} />
                <span>Art Amateur</span>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/2 flex flex-col justify-center items-center relative z-10 p-3 sm:p-6">
          <div className="h-[250px] w-[250px] sm:h-[400px] sm:w-[400px] flex items-center justify-center relative">
            <div key={currentGreetingIndex} className={`image-slide-enter ${isAnimating ? 'image-slide-exit' : ''}`}>
              <img 
                src={images[currentGreetingIndex % images.length]} 
                className="w-[300px] h-[300px] sm:w-[450px] sm:h-[450px] object-contain" 
                alt="Interest illustration"
              />
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Home;