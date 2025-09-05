import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom"; // ✅

const API = import.meta.env.VITE_API_URL || "http://localhost:4000";

export default function Booking() {
  const [services, setServices] = useState([]);
  const [form, setForm] = useState({ name:"", contact:"", service:"", date:"", time:"", notes:"" });
  const [msg, setMsg] = useState("");
  const [sending, setSending] = useState(false);
  const [params] = useSearchParams();                // ✅

  useEffect(() => {
    fetch(`${API}/api/services`)
      .then(r => r.json())
      .then(setServices)
      .catch(() => setServices([]));
  }, []);

  // ✅ Pre-select service from ?service=<id or name>
  useEffect(() => {
    const pre = params.get("service");
    if (pre) setForm(f => ({ ...f, service: pre }));
  }, [params]);

  const onChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setMsg(""); setSending(true);
    try {
      const res = await fetch(`${API}/api/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      if (!res.ok) throw new Error("Failed");
      await res.json();
      setMsg("Booking sent! We’ll confirm soon.");
      setForm({ name:"", contact:"", service:"", date:"", time:"", notes:"" });
    } catch {
      setMsg("Could not submit booking. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <section className="py-12 max-w-xl">
      {/* ...your existing JSX... just be sure the <select name="service"> uses form.service */}
    </section>
  );
}


