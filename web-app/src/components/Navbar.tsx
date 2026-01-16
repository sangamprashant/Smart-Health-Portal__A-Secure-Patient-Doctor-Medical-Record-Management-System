import { useState } from "react";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-blue-900 sticky top-0 z-50">

      <div className="max-w-7xl mx-auto text-white px-5 py-4 flex justify-between items-center">

        {/* LOGO */}
        <h1 className="text-xl font-bold">
          SmartHealth
        </h1>

        {/* DESKTOP MENU */}
        <ul className="hidden md:flex gap-8 font-medium">
          <li className="hover:text-blue-200 cursor-pointer">Home</li>
          <li className="hover:text-blue-200 cursor-pointer">About</li>
          <li className="hover:text-blue-200 cursor-pointer">Services</li>
          <li className="hover:text-blue-200 cursor-pointer">Doctors</li>
          <li className="hover:text-blue-200 cursor-pointer">Contact</li>
        </ul>

        {/* MOBILE BUTTON */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-3xl focus:outline-none"
        >
          {open ? "✕" : "☰"}
        </button>

      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden bg-blue-950 text-white px-6 pb-6 space-y-4">
          <p className="hover:text-blue-200 cursor-pointer">Home</p>
          <p className="hover:text-blue-200 cursor-pointer">About</p>
          <p className="hover:text-blue-200 cursor-pointer">Services</p>
          <p className="hover:text-blue-200 cursor-pointer">Doctors</p>
          <p className="hover:text-blue-200 cursor-pointer">Contact</p>
        </div>
      )}

    </nav>
  );
};

export default Navbar;
