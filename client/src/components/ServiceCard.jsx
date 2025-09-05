// client/src/components/ServiceCard.jsx
import { Link } from "react-router-dom";

function chf(amount) {
  try {
    return new Intl.NumberFormat("de-CH", { style: "currency", currency: "CHF" }).format(amount);
  } catch {
    return `CHF ${amount}`;
  }
}

export default function ServiceCard({ service }) {
  const { id, name, description, duration, price } = service;

  return (
    <article className="group bg-white rounded-2xl border border-rose-100 shadow-sm hover:shadow-lg transition-shadow">
      {/* Card body */}
      <div className="p-5">
        <h3 className="text-lg font-semibold text-gray-900">{name}</h3>

        <p className="mt-2 text-sm text-gray-600">
          {description || "Nourishing, gentle care for natural hair."}
        </p>

        {/* Info chips */}
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="inline-flex items-center gap-1 rounded-full bg-rose-50 text-rose-700 text-xs px-3 py-1">
            {/* clock icon */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 1.75A10.25 10.25 0 1 0 22.25 12 10.262 10.262 0 0 0 12 1.75Zm.75 5a.75.75 0 0 0-1.5 0v5a.75.75 0 0 0 .33.62l3.5 2.33a.75.75 0 1 0 .84-1.23L12.75 11.9Z"/>
            </svg>
            {duration} min
          </span>

          <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 text-gray-800 text-xs px-3 py-1">
            {chf(price)}
          </span>
        </div>

        {/* Actions */}
        <div className="mt-6 flex items-center justify-between">
          <Link
            to={`/booking?service=${encodeURIComponent(id || name)}`}
            className="inline-flex items-center justify-center rounded-xl bg-rose-500 text-white px-4 py-2 font-medium hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-rose-400 focus:ring-offset-2"
          >
            Book
          </Link>

          {/* Subtle “details” hint on hover (optional) */}
          <span className="text-sm text-rose-700 opacity-0 group-hover:opacity-100 transition-opacity">
            Details →
          </span>
        </div>
      </div>
    </article>
  );
}
