"use client";

interface Country {
  code: string;
  name: string;
  flag: string;
  region: string;
}

interface CustomerMapProps {
  kicker: string;
  title: string;
  subtitle: string;
  countries: Record<string, string>;
}

// Country flag emojis derived from ISO-3166-1 alpha-2 codes
function flagEmoji(code: string): string {
  return code
    .toUpperCase()
    .split("")
    .map((c) => String.fromCodePoint(0x1f1e6 + c.charCodeAt(0) - 65))
    .join("");
}

const COUNTRY_CODES = [
  // Europe
  "GB", "DE", "FR", "BE", "ES", "PL", "RO", "SE",
  // CIS / Central Asia
  "RU", "BY", "UA", "KZ", "UZ", "KG", "TM", "TJ",
  // Caucasus / Mideast
  "GE", "AM", "AZ", "TR",
  // Africa
  "DZ", "LY",
  // Other
  "AR", "MN",
];

const REGION_GROUPS: { key: string; label: string; codes: string[] }[] = [
  { key: "europe", label: "Europe", codes: ["GB", "DE", "FR", "BE", "ES", "PL", "RO", "SE"] },
  { key: "cis", label: "CIS / Central Asia", codes: ["RU", "BY", "UA", "KZ", "UZ", "KG", "TM", "TJ"] },
  { key: "mideast", label: "Caucasus & Middle East", codes: ["GE", "AM", "AZ", "TR"] },
  { key: "africa", label: "Africa", codes: ["DZ", "LY"] },
  { key: "other", label: "Americas & Asia", codes: ["AR", "MN"] },
];

export default function CustomerMap({ kicker, title, subtitle, countries }: CustomerMapProps) {
  return (
    <section className="bg-[#FFF7ED] text-[#1E293B] py-24 px-6 lg:px-14 overflow-hidden">
      {/* Header */}
      <div className="max-w-4xl mb-14">
        <p className="text-[var(--jd-red)] uppercase tracking-[0.3em] font-extrabold text-sm mb-5">{kicker}</p>
        <h2 className="text-4xl lg:text-6xl font-black leading-tight tracking-tight">{title}</h2>
        <p className="mt-5 text-[#64748B] text-lg leading-relaxed max-w-2xl">{subtitle}</p>
      </div>

      {/* Stylised world-map dot grid — pure CSS, no library */}
      <div
        className="relative w-full rounded-2xl overflow-hidden border border-[#F1E7DC] shadow-[0_8px_40px_rgba(30,41,59,0.07)] mb-12"
        style={{ minHeight: 220 }}
      >
        {/* Dot-grid background */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle, #EA580C22 1px, transparent 1px)",
            backgroundSize: "22px 22px",
            backgroundPosition: "0 0",
          }}
        />
        {/* Warm gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/70 via-[#FFF7ED]/60 to-[#FFF7ED]/80" />

        {/* Central stat + region labels */}
        <div className="relative z-10 flex flex-col items-center justify-center py-16 px-6 text-center gap-6">
          {/* Big number */}
          <div className="flex items-baseline gap-3">
            <span className="text-8xl lg:text-9xl font-black text-[var(--jd-red)] leading-none select-none">24</span>
            <span className="text-2xl lg:text-3xl font-black text-[#1E293B]/40 leading-none">+</span>
          </div>
          <p className="text-[#1E293B]/60 text-lg font-semibold uppercase tracking-widest">
            Export Markets
          </p>

          {/* Region pills */}
          <div className="flex flex-wrap justify-center gap-3 mt-2">
            {REGION_GROUPS.map((rg) => (
              <span
                key={rg.key}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white border border-[#F1E7DC] text-sm font-semibold text-[#1E293B]/70 shadow-sm"
              >
                <span className="w-2 h-2 rounded-full bg-[var(--jd-red)] shrink-0" />
                {rg.label}
                <span className="ml-1 text-[var(--jd-red)] font-black">{rg.codes.length}</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Flag grid — all 24 countries */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
        {COUNTRY_CODES.map((code) => (
          <div
            key={code}
            className="group flex flex-col items-center gap-2 p-3 rounded-xl bg-white border border-[#F1E7DC] shadow-[0_2px_8px_rgba(30,41,59,0.04)] hover:border-[var(--jd-red)]/40 hover:shadow-[0_4px_20px_rgba(234,88,12,0.12)] transition-all duration-200 cursor-default"
          >
            <span className="text-3xl leading-none select-none">{flagEmoji(code)}</span>
            <span className="text-xs font-semibold text-[#64748B] text-center leading-tight group-hover:text-[var(--jd-red)] transition-colors line-clamp-2">
              {countries[code] ?? code}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
