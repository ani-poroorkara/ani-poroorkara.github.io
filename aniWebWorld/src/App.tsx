import "./App.css";
import { useState, useEffect } from "react";

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


function App() {
  const [currentGreetingIndex, setCurrentGreetingIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const animationTimer = setInterval(() => {
      setIsAnimating(true);
      // Wait for fade-out animation before changing text
      setTimeout(() => {
        setCurrentGreetingIndex(
          (prevIndex) => (prevIndex + 1) % greetings.length
        );
        setIsAnimating(false);
      }, 300); // Sync with CSS animation timing
    }, 3000);

    return () => clearInterval(animationTimer);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center mx-auto relative">
      <div className="w-full max-w-6xl h-[600px] backdrop-blur-md bg-white/5 rounded-xl p-8 relative overflow-hidden">
        {/* Slanted background */}
        <div className="absolute inset-0 bg-white/10 [clip-path:polygon(75%_0%,100%_0%,75%_100%,50%_100%)]"></div>

        {/* Greeting section */}
        <div className="h-32 items-center justify-center mb-8">
          <div
            key={currentGreetingIndex}
            className="greeting-animation relative"
          >
            <div className="absolute left-0 -top-6 text-xs opacity-70">
              {greetings[currentGreetingIndex].pronunciation}
            </div>
            <div className="absolute right-0 -top-6 text-xs opacity-70">
              {greetings[currentGreetingIndex].language}
            </div>
            <h1 className="text-8xl font-extrabold">
              {greetings[currentGreetingIndex].text}
            </h1>
          </div>
        </div>

        <div className="flex flex-col md:flex-row h-[calc(100%-160px)]">
          {/* Content SECTION */}
          <div className="w-full md:w-1/2 flex flex-col justify-between h-full relative z-10 p-6">
            <div>
              <h2 className="text-4xl font-semibold mb-8">
                I am Anirudh Poroorkara
              </h2>
              {/* Interests list */}
              <div className="space-y-4 text-lg">
                <div className="flex items-center gap-3">
                  <span>⚡</span>
                  <span>Tech Enthusiast</span>
                </div>
                <div className="flex items-center gap-3">
                  <span>🎬</span>
                  <span>Movie Connoisseur</span>
                </div>
                <div className="flex items-center gap-3">
                  <span>🍳</span>
                  <span>Food Fanatic</span>
                </div>
                <div className="flex items-center gap-3">
                  <span>🎨</span>
                  <span>Art Amateur</span>
                </div>
              </div>
            </div>

            {/* Social links */}
            <div className="flex gap-6">
              <a
                href="https://github.com/ani-poroorkara"
                className="flex items-center gap-2 opacity-70 hover:opacity-100 transition-opacity"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>👨‍💻</span>GitHub
              </a>
              <a
                href="https://linkedin.com/in/anirudh-poroorkara"
                className="flex items-center gap-2 opacity-70 hover:opacity-100 transition-opacity"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>💼</span>LinkedIn
              </a>
            </div>
          </div>

          <div className="w-full md:w-1/2 flex flex-col justify-center items-center relative z-10 p-6">
            <div className="h-[400px] w-[400px] flex items-center justify-center relative">
              <div key={currentGreetingIndex} className={`image-slide-enter ${isAnimating ? 'image-slide-exit' : ''}`}>
                <img 
                  src={images[currentGreetingIndex % images.length]} 
                  className="w-[450px] h-[450px] object-contain" 
                  alt="Interest illustration"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
