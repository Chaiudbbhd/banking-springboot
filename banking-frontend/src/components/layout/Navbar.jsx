import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="bg-[#0f172a] text-white shadow-xl border-b border-blue-700">
      <div className="flex flex-col items-center justify-center text-center px-4 pt-3 pb-2">

        {/* Clickable Logo */}
        <div className="flex justify-center">
          <Link to="/login">
            <img
              src="/logo.png"
              alt="PKB Logo"
              style={{
                height: "180px",
                width: "auto",
                objectFit: "contain",
                marginBottom: "0.25rem",
                cursor: "pointer"
              }}
            />
          </Link>
        </div>

        {/* Marquee scrolling text */}
        <div className="w-full overflow-hidden border-t border-blue-700 h-6">
          <div className="whitespace-nowrap animate-marquee text-sm text-[#a5b4fc]">
            Developed by Prasanna Kumar | Frontend: React.js | Backend: Spring Boot | Database: MySQL Server
          </div>
        </div>

      </div>
    </header>
  );
};

export default Navbar;
