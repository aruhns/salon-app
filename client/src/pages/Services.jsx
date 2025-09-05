// client/src/pages/Services.jsx
import { useEffect, useState } from "react";
import ServiceCard from "../components/ServiceCard";

const API = import.meta.env.VITE_API_URL || "http://localhost:4000";

function CardSkeleton() {
  return (
    <div className="rounded-2xl border border-gray-100 p-5 bg-white animate-pulse">
      <div className="h-5 w-2/3 bg-gray-200 rounded"></div>
      <div className="mt-3 h-4 w-full bg-gray-100 rounded"></div>
      <div className="mt-2 h-4 w-5/6 bg-gray-100 rounded"></div>
      <div className="mt-5 h-7 w-24 bg-gray-200 rounded-full"></div>
    </div>
  );
}

export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState("");

  useEffect(() => {
    fetch(`${API}/api/services`)
      .then(r => (r.ok ? r.json() : Promise.reject(r.statusText)))
      .then(data => setServices(data))
      .catch(() => setError("Could not load services. Please try again."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="max-w-6xl mx-auto px-4 py-10">
      {/* Page header */}
      <header className="mb-8">
        <h1 className="text-3xl font-semibold text-gray-900">Our Services</h1>
        <p className="mt-2 text-gray-600">
          Natural hair & skin care with a warm, community-first vibe.
        </p>
      </header>

      {/* Error notice */}
      {error && (
        <div className="mb-6 rounded-lg bg-rose-50 text-rose-700 px-4 py-3">
          {error}
        </div>
      )}

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => <CardSkeleton key={i} />)}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s) => (
            <ServiceCard key={s.id || s._id} service={s} />
          ))}
        </div>
      )}
    </section>
  );
}



