import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({ name:"", email:"", message:"" });
  const onChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const submit = e => {
    e.preventDefault();
    alert("Thanks! We’ll reply soon.");
    setForm({ name:"", email:"", message:"" });
  };

  return (
    <section className="py-12 max-w-xl">
      <h2 className="font-heading text-3xl mb-6 text-ink">Contact Us</h2>
      <form onSubmit={submit} className="space-y-4">
        <input className="border border-rose-100 rounded-2xl px-4 py-3 w-full" placeholder="Name" name="name" value={form.name} onChange={onChange} required />
        <input className="border border-rose-100 rounded-2xl px-4 py-3 w-full" placeholder="Email" name="email" value={form.email} onChange={onChange} required />
        <textarea className="border border-rose-100 rounded-2xl px-4 py-3 w-full" placeholder="Message" name="message" value={form.message} onChange={onChange} required />
        <button className="bg-rose-500 text-white px-6 py-3 rounded-2xl shadow-soft hover:bg-rose-700 transition">Send</button>
      </form>
    </section>
  );
}
