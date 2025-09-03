export default function Home() {
  return (
    <div className="grid md:grid-cols-2 gap-10 items-center py-12">
      <div>
        <h1 className="font-heading text-5xl sm:text-6xl leading-tight text-ink">
          Celebrate Your <span className="text-rose-500">Natural Beauty</span>
        </h1>
        <p className="mt-4 text-ink/80">
          Gentle care for curls, coils, and skin—rooted in community and wellness.
        </p>
        <div className="mt-6 flex gap-3">
          <a href="/booking" className="inline-block bg-rose-500 text-white px-6 py-3 rounded-2xl shadow-soft hover:bg-rose-700 transition">
            Book an Appointment
          </a>
          <a href="/services" className="inline-block border border-rose-300 text-rose-700 px-6 py-3 rounded-2xl bg-white hover:bg-rose-50 transition">
            Explore Services
          </a>
        </div>
      </div>
      <img
        className="rounded-3xl shadow-soft"
        src="https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=1200"
        alt="Natural hair care"
      />
    </div>
  );
}
