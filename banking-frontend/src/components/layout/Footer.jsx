import React from "react";
import { FaGithub, FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#0f172a] text-[#cbd5e1] py-6 text-center border-t border-blue-800 shadow-inner mt-10">
      <p className="text-sm mb-2">
        &copy; {new Date().getFullYear()}{" "}
        <span className="text-[#00ffe5] font-semibold">PKB</span>. All rights reserved.
        <br />
        Developed by <span className="text-[#ffd700] font-bold">Lakshmi Prasanna Kumar</span>
      </p>

      {/* Social Icons */}
      <div className="flex justify-center gap-6 mt-3 text-xl">
        <a href="https://github.com/Chaiudbbhd" target="_blank" rel="noopener noreferrer">
          <FaGithub className="hover:text-[#00ffe5] transition duration-200" />
        </a>
        <a href="https://www.facebook.com/chaitu.chaitinya.3" target="_blank" rel="noopener noreferrer">
          <FaFacebook className="hover:text-[#00ffe5] transition duration-200" />
        </a>
        <a href="https://www.instagram.com/_lpk_in.4k/?igsh=ZmFrb3ZwOTB5bGl2#" target="_blank" rel="noopener noreferrer">
          <FaInstagram className="hover:text-[#00ffe5] transition duration-200" />
        </a>
        <a href="https://www.linkedin.com/in/prasanna-kumar-g-3377a825a/" target="_blank" rel="noopener noreferrer">
          <FaLinkedin className="hover:text-[#00ffe5] transition duration-200" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
