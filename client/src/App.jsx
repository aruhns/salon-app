import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Services from "./pages/Services.jsx";
import Booking from "./pages/Booking.jsx";
import Contact from "./pages/Contact.jsx";

export default function App() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      {/* Navbar */}
      <nav className="sticky top-0 bg-paper/80 backdrop-blur border-b border-rose-100">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="text-2xl font-heading text-rose-700">Glow & Co.</Link>
          <div className="flex gap-4">
            <Link to="/services" className="hover:text-rose-700">Services</Link>
            <Link to="/booking"  className="hover:text-rose-700">Booking</Link>
            <Link to="/contact"  className="hover:text-rose-700">Contact</Link>
          </div>
        </div>
      </nav>

      {/* Page container */}
      <main className="max-w-6xl mx-auto px-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>

      {/* Footer */}
      <footer className="border-t border-rose-100 mt-10">
        <div className="max-w-6xl mx-auto px-4 py-8 text-sm text-ink/70">
          © {new Date().getFullYear()} Glow & Co. Natural Hair & Skin Care — Community first.
        </div>
      </footer>
    </div>
  );
}


