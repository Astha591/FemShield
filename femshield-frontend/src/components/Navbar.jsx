import React from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../assets/images/logo.svg";

export const Navbar = () => {
  const links = [
    { label: "Home", href: "/" },
    { label: "About FemShield", href: "/about" },
    { label: "Tools", href: "/tools" },
    { label: "Connect", href: "/telehealth" }, //  Connect goes to Telehealth
  ];

  return (
    <nav className="bg-white border-b border-gray-200 p-4 flex justify-between items-center">
      <div className="flex items-center space-x-3">
        <img src={logo} alt="Logo" className="w-5 h-5" />
        <span className="font-bold text-lg">FemShield</span>
      </div>

      <div className="hidden md:flex space-x-6">
        {links.map((link, idx) => (
          <NavLink
            key={idx}
            to={link.href}
            className={({ isActive }) =>
              `font-medium hover:text-pink-600 ${isActive ? "text-[#ef427c]" : "text-gray-800"}`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </div>

      <Link
        to="/cycle-tracker"
        className="bg-[#ef427c] hover:bg-[#d93a6e] text-white font-bold rounded-xl px-4 py-2"
      >
        Cycle Tracking
      </Link>
    </nav>
  );
};
