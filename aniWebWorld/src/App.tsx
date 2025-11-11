import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Me from "./components/Me";
import Career from "./components/Career";
import Blog from "./components/Blog";
import Art from "./components/Art";
import Footer from "./components/Footer";

function App() {
  const [currentPage, setCurrentPage] = useState<'art' | 'me' | 'home' | 'career' | 'blog'>('home');

  const handlePageChange = (page: 'art' | 'me' | 'home' | 'career' | 'blog') => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar Section */}
      <div className="pt-4">
        <Navbar currentPage={currentPage} onPageChange={handlePageChange} />
      </div>

      {/* Main Content Section */}
      <div className="flex-grow flex items-center justify-center py-4">
        {currentPage === 'home' && <Home />}
        {currentPage === 'me' && <Me />}
        {currentPage === 'career' && <Career />}
        {/* {currentPage === 'blog' && <Blog />} */}
        {/* {currentPage === 'art' && <Art />} */}
      </div>

      {/* Footer Section */}
      <div className="pb-4">
        <Footer />
      </div>
    </div>
  );
}

export default App;
