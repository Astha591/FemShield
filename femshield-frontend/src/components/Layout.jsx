import React from "react";
import { Navbar } from "./Navbar"; // Adjust path if needed
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col w-11/12 mx-auto">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
