import { useEffect, useState } from "react";

const API = import.meta.env.VITE_API_URL || "http://localhost:4000";

export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState("");

  useEffect(() => {
    fetch(`${API}/api/services`)
      .then(r => r.ok ? r.json() : Promise.reject(r.statusText))
      .then(data => setServices(data))
      .catch(() => setError("Could not load services."))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="py-12">Loading services…</p>;
  if (error)   return <p className="py-12 text-rose-700">{error}</p>;

  return (
    <section className="py-12">
      <h2 className="font-heading text-3xl mb-6 text-ink">Our Services</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((s) => (
          <div key={s.id} className="bg-white rounded-2xl shadow-soft p-5 border border-rose-50">
            <h3 className="font-semibold text-ink">{s.name}</h3>
            <p className="text-ink/70 mt-1">{s.description}</p>
            <div className="mt-4 flex items-center justify-between">
              <span className="font-semibold text-ink">
                {s.duration} min • CHF {s.price}
              </span>
              <a href="/booking" className="text-rose-700 hover:underline">Book</a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

