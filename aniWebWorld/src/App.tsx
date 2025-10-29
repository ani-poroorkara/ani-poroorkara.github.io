import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar Section */}
      <div className="pt-4">
        <Navbar currentPage="home" />
      </div>

      {/* Main Content Section */}
      <div className="flex-grow flex items-center justify-center py-4">
        <Home />
      </div>

      {/* Footer Section */}
      <div className="pb-4">
        <Footer />
      </div>
    </div>
  );
}

export default App;
