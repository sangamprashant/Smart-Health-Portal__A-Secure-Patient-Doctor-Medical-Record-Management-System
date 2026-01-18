import { useState } from "react";
import { Link } from "react-router-dom";
import { ScanLine } from "lucide-react";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-blue-900 sticky top-0 z-50">

      <div className="max-w-7xl mx-auto text-white px-5 py-4 flex justify-between items-center">

        {/* LOGO */}
        <Link to="/" className="text-xl font-bold">
          Smart Health Portal
        </Link>

        {/* DESKTOP MENU */}
        <ul className="hidden md:flex items-center gap-8 font-medium">

          <Link to="/" className="hover:text-blue-200">
            Home
          </Link>

          <Link to="/about" className="hover:text-blue-200">
            About
          </Link>

          <Link to="/services" className="hover:text-blue-200">
            Services
          </Link>

          <Link to="/contact" className="hover:text-blue-200">
            Contact
          </Link>

          {/* SCAN BUTTON */}
          <Link
            to="/scan"
            className="flex items-center gap-2 bg-white text-blue-900 px-4 py-2 rounded-md font-semibold hover:bg-blue-100 transition"
          >
            <ScanLine size={18} />
            Scan QR
          </Link>
        </ul>

        {/* MOBILE BUTTON */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-3xl"
        >
          {open ? "✕" : "☰"}
        </button>

      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden bg-blue-950 text-white px-6 pb-6 space-y-4">

          <Link to="/" onClick={() => setOpen(false)} className="block">
            Home
          </Link>

          <Link to="/about" onClick={() => setOpen(false)} className="block">
            About
          </Link>

          <Link to="/services" onClick={() => setOpen(false)} className="block">
            Services
          </Link>

          <Link to="/contact" onClick={() => setOpen(false)} className="block">
            Contact
          </Link>

          {/* MOBILE SCAN BUTTON */}
          <Link
            to="/scan"
            onClick={() => setOpen(false)}
            className="flex items-center justify-center gap-2 bg-white text-blue-900 py-2 rounded-md font-semibold"
          >
            <ScanLine size={18} />
            Scan QR
          </Link>

        </div>
      )}

    </nav>
  );
};

export default Navbar;
