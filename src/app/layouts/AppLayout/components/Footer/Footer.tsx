import { Link } from "react-router";
import { Facebook, Instagram, Xrp } from "iconsax-reactjs";

export const Footer = () => {
  return (
    <footer className="w-full bg-black border-t border-white/10 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Copyright */}
          <p className="text-white/40 text-sm">© 2025 Crowdflix</p>

          {/* Links */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm">
            <Link to="#" className="text-white/60 hover:text-white transition-colors">
              Terms
            </Link>
            <Link to="#" className="text-white/60 hover:text-white transition-colors">
              Privacy
            </Link>
            <Link to="#" className="text-white/60 hover:text-white transition-colors">
              Cookies
            </Link>
            <Link to="#" className="text-white/60 hover:text-white transition-colors">
              About
            </Link>
            <Link to="#" className="text-white/60 hover:text-white transition-colors">
              FAQ
            </Link>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-4">
            <a href="#" className="text-white/60 hover:text-[#2AA2FD] transition-colors">
              <Instagram size={20} />
            </a>
            <a href="#" className="text-white/60 hover:text-[#2AA2FD] transition-colors">
              <Facebook size={20} />
            </a>
            <a href="#" className="text-white/60 hover:text-[#2AA2FD] transition-colors">
              <Xrp size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
