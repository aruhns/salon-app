import { useEffect, useState } from "react";
const API = import.meta.env.VITE_API_URL || "http://localhost:4000";

export default function Booking() {
  const [services, setServices] = useState([]);
  const [form, setForm] = useState({ name:"", contact:"", service:"", date:"", time:"", notes:"" });
  const [msg, setMsg] = useState("");
  const [sending, setSending] = useState(false);

  useEffect(() => {
    fetch(`${API}/api/services`)
      .then(r => r.json())
      .then(setServices)
      .catch(() => setServices([]));
  }, []);

  const onChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setMsg("");
    setSending(true);
    try {
      const res = await fetch(`${API}/api/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      if (!res.ok) throw new Error("Failed");
      const data = await res.json();
      setMsg("Booking sent! We’ll confirm soon.");
      setForm({ name:"", contact:"", service:"", date:"", time:"", notes:"" });
      console.log("Server response:", data);
    } catch {
      setMsg("Could not submit booking. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <section className="py-12 max-w-xl">
      <h2 className="font-heading text-3xl mb-6 text-ink">Book an Appointment</h2>
      {msg && <div className="mb-4 text-rose-700">{msg}</div>}
      <form onSubmit={submit} className="space-y-4">
        <input className="border border-rose-100 rounded-2xl px-4 py-3 w-full"
               placeholder="Your name" name="name" value={form.name} onChange={onChange} required />
        <input className="border border-rose-100 rounded-2xl px-4 py-3 w-full"
               placeholder="Phone or email" name="contact" value={form.contact} onChange={onChange} required />

        <select name="service" value={form.service} onChange={onChange}
                className="border border-rose-100 rounded-2xl px-4 py-3 w-full" required>
          <option value="">Choose a service</option>
          {services.map(s => (
            <option key={s.id} value={s.id}>{s.name} — CHF {s.price}</option>
          ))}
        </select>

        <div className="grid grid-cols-2 gap-3">
          <input type="date" name="date" value={form.date}
                 onChange={onChange}
                 className="border border-rose-100 rounded-2xl px-4 py-3" required />
          <input type="time" name="time" value={form.time}
                 onChange={onChange}
                 className="border border-rose-100 rounded-2xl px-4 py-3" required />
        </div>

        <textarea name="notes" value={form.notes}
                  onChange={onChange}
                  className="border border-rose-100 rounded-2xl px-4 py-3 w-full"
                  placeholder="Notes (hair type, goals, sensitivities)…" />

        <button disabled={sending}
                className="bg-rose-500 text-white px-6 py-3 rounded-2xl shadow-soft hover:bg-rose-700 transition">
          {sending ? "Sending..." : "Submit"}
        </button>
      </form>
    </section>
  );
}

