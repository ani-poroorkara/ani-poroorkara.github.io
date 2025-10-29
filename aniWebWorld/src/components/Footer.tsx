import { 
  FaInstagram, 
  FaGithub, 
  FaLinkedin, 
  FaSpotify 
} from 'react-icons/fa';
import { HiMail } from 'react-icons/hi';
import { MdEmojiPeople } from "react-icons/md";

const Footer = () => {
  return (
    <div className="mt-8 flex flex-col items-center gap-6">
      <div className="backdrop-blur-md bg-white/10 rounded-full px-8 py-4 shadow-lg">
        <ul className="flex items-center justify-center gap-8 text-2xl">
          <li>
            <a 
              href="https://www.instagram.com/aniporoorkara/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white/80 hover:text-white transition-colors flex items-center gap-2"
              title="Instagram"
            >
              <FaInstagram size={24} />
            </a>
          </li>
          <li>
            <a 
              href="mailto:pdani444@gmail.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white/80 hover:text-white transition-colors flex items-center gap-2"
              title="Email"
            >
              <HiMail size={24} />
            </a>
          </li>
          <li>
            <a 
              href="https://github.com/ani-poroorkara" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white/80 hover:text-white transition-colors flex items-center gap-2"
              title="GitHub"
            >
              <FaGithub size={24} />
            </a>
          </li>
          <li>
            <a 
              href="https://www.linkedin.com/in/anirudh-poroorkara/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white/80 hover:text-white transition-colors flex items-center gap-2"
              title="LinkedIn"
            >
              <FaLinkedin size={24} />
            </a>
          </li>
          <li>
            <a 
              href="https://open.spotify.com/user/312vugz3xsllvakm4zvtuapv2fmi" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white/80 hover:text-white transition-colors flex items-center gap-2"
              title="Spotify"
            >
              <FaSpotify size={24} />
            </a>
          </li>
        </ul>
      </div>

      <a 
        href="mailto:pdani444@gmail.com" 
        className="flex backdrop-blur-md bg-white/10 rounded-full px-6 py-3 text-white hover:bg-white/20 transition-all transform hover:scale-105 shadow-lg"
      >
        <MdEmojiPeople size={24} /> Friend Me! 
      </a>
    </div>
  );
};

export default Footer;