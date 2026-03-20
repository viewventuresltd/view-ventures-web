"use client";

import { useState } from "react";
import { SiteFooter } from "../../components/site-footer";
import { SiteHeader } from "../../components/site-header";

// Route data: coordinates on a simplified northern Greece SVG viewport
// ViewBox: 0 0 500 420 — Thessaloniki is at ~(250, 280)
const CASINO = { x: 250, y: 280, label: "Regency Casino\nThessaloniki" };

const routes = [
  {
    id: "volos",
    label: "Volos",
    x: 310,
    y: 370,
    phone: "+30 24210 70330, 70795",
    color: "#C49A2E",
  },
  {
    id: "serres",
    label: "Serres",
    x: 380,
    y: 180,
    phone: "+30 23210 55402",
    color: "#3A8FD4",
  },
  {
    id: "pella",
    label: "Pella",
    x: 140,
    y: 240,
    phone: "+30 23810 89885",
    color: "#3A8FD4",
  },
  {
    id: "pieria",
    label: "Pieria",
    x: 200,
    y: 360,
    phone: "+30 23510 21888",
    color: "#3A8FD4",
  },
  {
    id: "larisa",
    label: "Larisa",
    x: 270,
    y: 420,
    phone: "+30 2410 257100",
    color: "#C49A2E",
  },
  {
    id: "imathia",
    label: "Imathia",
    x: 140,
    y: 320,
    phone: "+30 23310 27116 · +30 23310 27711",
    color: "#3A8FD4",
  },
];

const schedules = [
  {
    region: "City Routes (Thessaloniki)",
    routes: [
      {
        name: "Morning Route",
        days: "Daily",
        departure: "From Casino 15:10",
        arrival: "Casino arrival 12:15–12:20",
        stops: [
          { stop: "Monastiriou (Zografou Pharmacy)", time: "11:00" },
          { stop: "Egnatia–Kolomvou Bus Stop", time: "11:05" },
          { stop: "Aristotelous (Germanos)", time: "11:08–11:10" },
          { stop: "Egnatia Cross Agias Sofias", time: "11:13–11:15" },
          { stop: "Kamara (National Bank)", time: "11:18–11:20" },
          { stop: "White Tower", time: "11:23–11:25" },
          { stop: "Leoforos Stratou", time: "11:28–11:30" },
          { stop: "Theagenio Hospital", time: "11:33–11:35" },
          { stop: "Municipal Parking", time: "11:38–11:40" },
          { stop: "O.A.Σ.Θ. Building (Mpotsari Cross Papanastasiou)", time: "11:43–11:45" },
          { stop: "Aris FC Soccer Field", time: "11:47–11:49" },
          { stop: "Trion Ierarxon (Voulgari)", time: "11:51–11:53" },
          { stop: "St Eleftherios Church (Voulgari)", time: "11:55–11:57" },
          { stop: "Former Express Service (Adrianoupoleos)", time: "11:59–12:01" },
          { stop: "K.A.Π.H. Phinika (Eth. Antistaseos)", time: "12:05–12:08" },
          { stop: "Hondos Center – I.K.E.A.", time: "12:10–12:12" },
          { stop: "Casino", time: "12:15–12:20" },
        ],
      },
      {
        name: "Evening Route A",
        days: "Daily",
        departure: "From Casino 23:00",
        arrival: "Casino arrival 17:45–17:50",
        stops: [
          { stop: "Profitis Ilias (Makrigianni Street)", time: "16:30" },
          { stop: "Eleftherias Square (Ilioupoli)", time: "16:31" },
          { stop: "Bouboulinas", time: "16:34" },
          { stop: "Town Hall (El. Venizelou Street)", time: "16:38–16:39" },
          { stop: "Eptalofos Square (El. Venizelou Street)", time: "16:40–16:42" },
          { stop: "St. Panteleimonas (El. Venizelou Street)", time: "16:43" },
          { stop: "Twelve-Storeys Buildings (Lagada Street)", time: "16:47–16:48" },
          { stop: "Agiou Dimitriou (Kafantari's Cafe)", time: "16:50–16:51" },
          { stop: "Agiou Dimitriou – Y.M.A.Θ. (Taxi Station)", time: "16:53–16:55" },
          { stop: "Agiou Dimitriou Cross Iasonidou", time: "16:56–16:57" },
          { stop: "Gennimatas Hospital (Agiou Dimitriou)", time: "16:59–17:00" },
          { stop: "French Institute (Leoforos Stratou)", time: "17:10–17:11" },
          { stop: "Theagenio Hospital (Papanastasiou)", time: "17:12" },
          { stop: "Ippokratio Hospital (Karamanli)", time: "17:13–17:14" },
          { stop: "Mpotsari Cross N.Egnatia (Kiosk)", time: "17:15–17:19" },
          { stop: "Martiou Cross N.Egnatia (Gas Station Elin)", time: "17:20–17:21" },
          { stop: "Trion Ierarxon (Voulgari)", time: "17:22–17:23" },
          { stop: "Voulgari Cross Papadaki", time: "17:24–17:28" },
          { stop: "Adrianoupoleos Cross Aigeou", time: "17:29–17:30" },
          { stop: "Agios Panteleimonas (Adrianoupoleos)", time: "17:32–17:34" },
          { stop: "K.A.Π.H. Phinika (Eth. Antistaseos)", time: "17:36–17:38" },
          { stop: "Hondos Center – I.K.E.A.", time: "17:42–17:43" },
          { stop: "Casino", time: "17:45–17:50" },
        ],
      },
      {
        name: "Evening Route B",
        days: "Daily — Dep. 00:30 · Fri & Sat 01:00",
        departure: "From Casino daily 00:30 / Fri & Sat 01:00",
        arrival: "Casino arrival 19:15–19:20",
        stops: [
          { stop: "Monastiriou (Zografou Pharmacy)", time: "18:30" },
          { stop: "Egnatia–Kolomvou Bus Stop", time: "18:35" },
          { stop: "Aristotelous (Germanos)", time: "18:38" },
          { stop: "Kamara (National Bank)", time: "18:43–18:45" },
          { stop: "Triandria Turn (AB Basilopoulos)", time: "18:50–18:52" },
          { stop: "Gr. Lambraki (St. Barbara)", time: "18:53–18:55" },
          { stop: "Gr. Lambraki (Papafio Orphanage)", time: "18:56–18:58" },
          { stop: "Gr. Lambraki Cross Perrevou", time: "18:59–19:01" },
          { stop: "Casino", time: "19:15–19:20" },
        ],
      },
      {
        name: "Evening Route C",
        days: "Daily",
        departure: "—",
        arrival: "Casino arrival 19:10–19:20",
        stops: [
          { stop: "White Tower", time: "18:45" },
          { stop: "French Institute (Stratou Avenue)", time: "18:48–18:50" },
          { stop: "Theagenio Hospital", time: "18:50–18:52" },
          { stop: "Ippokratio Hospital (Karamanli)", time: "18:53–18:55" },
          { stop: "Mpotsari Cross N.Egnatia (Kiosk)", time: "18:56–18:57" },
          { stop: "Martiou Cross N.Egnatia (Gas Station Elin)", time: "18:59–19:00" },
          { stop: "Voulgari (Cosmote)", time: "19:01–19:02" },
          { stop: "Casino", time: "19:10–19:20" },
        ],
      },
      {
        name: "Kalamaria Route",
        days: "Daily",
        departure: "—",
        arrival: "Casino arrival 20:45",
        stops: [
          { stop: "Th. Sofouli (Gas Station Kaoil)", time: "20:15" },
          { stop: "Th. Sofouli (Hellenic College)", time: "20:17" },
          { stop: "Th. Sofouli (Vervelidis)", time: "20:20" },
          { stop: "Kerasountos (Nautical Club)", time: "20:23" },
          { stop: "Chilis (Appolon Kalamarias Soccer Field)", time: "20:25" },
          { stop: "Marmara (Skra Square)", time: "20:27" },
          { stop: "Kountouriotou (Former Bus Station)", time: "20:29" },
          { stop: "Kapodistriou (Former Bus Station)", time: "20:31" },
          { stop: "Polyviou (St. Paul Bus Station)", time: "20:33" },
          { stop: "Bus Station Krinis (Lidl)", time: "20:35" },
          { stop: "Casino", time: "20:45" },
        ],
      },
      {
        name: "Night Route",
        days: "Daily — Dep. 01:30 · Fri & Sat 02:00",
        departure: "From Casino daily 01:30 / Fri & Sat 02:00",
        arrival: "Casino arrival 21:30–21:35",
        stops: [
          { stop: "Profitis Ilias (Makrigianni Street)", time: "20:30" },
          { stop: "Eleftherias Square (Ilioupoli)", time: "20:32" },
          { stop: "Bouboulinas", time: "20:34" },
          { stop: "Town Hall (El. Venizelou Street)", time: "20:35–20:37" },
          { stop: "Eptalofos Square (El. Venizelou Street)", time: "20:40–20:43" },
          { stop: "St. Panteleimonas (El. Venizelou Street)", time: "20:45" },
          { stop: "Twelve-Storeys Buildings (Lagada Street)", time: "20:48–20:49" },
          { stop: "Agiou Dimitriou (Kafantari's Cafe)", time: "20:50–20:52" },
          { stop: "Agiou Dimitriou – Y.M.A.Θ. (Taxi Station)", time: "20:53–20:55" },
          { stop: "Agiou Dimitriou Cross Iasonidou", time: "20:59–21:00" },
          { stop: "Gennimatas Hospital (Agiou Dimitriou)", time: "21:01–21:02" },
          { stop: "Macedonia Palace (Bridge)", time: "21:07–21:10" },
          { stop: "Mpotsari Cross Coastal Avenue (M. Alexandrou)", time: "21:11–21:13" },
          { stop: "G.Papandreou Cross 25th Martiou", time: "21:14–21:15" },
          { stop: "Adrianoupoleos Cross Aigeou", time: "21:16–21:17" },
          { stop: "Agios Panteleimonas (Adrianoupoleos)", time: "21:21–21:22" },
          { stop: "K.A.Π.H. Phinika (Eth. Antistaseos)", time: "21:24–21:25" },
          { stop: "Hondos Center – I.K.E.A.", time: "21:27–21:28" },
          { stop: "Casino", time: "21:30–21:35" },
        ],
      },
    ],
  },
  {
    region: "Serres",
    routes: [
      {
        name: "Serres Route",
        days: "Mon · Tue · Fri · Sat · Sun",
        departure: "From Casino 01:45",
        arrival: "Casino arrival 21:20",
        stops: [
          { stop: "Eleftherias Square", time: "20:00" },
          { stop: "Bus Stop Kaftantzi", time: "20:02" },
          { stop: "Bus Stop Sklaveniti", time: "20:04" },
          { stop: "Bus Stop Apolafsi", time: "20:06" },
          { stop: "Bus Stop Americano", time: "20:08" },
          { stop: "Bus Stop Lefkona", time: "20:10" },
          { stop: "Casino", time: "21:20" },
        ],
      },
    ],
  },
  {
    region: "Pella (Skydra · Giannitsa · Chalkidona · Gefyra)",
    routes: [
      {
        name: "Pella Route",
        days: "Mon · Wed · Fri",
        departure: "From Casino 02:00",
        arrival: "Casino arrival 21:10",
        stops: [
          { stop: "Skydra Town Hall", time: "19:30" },
          { stop: "Mavrovouni", time: "19:35" },
          { stop: "Giannitsa — Maggou Square", time: "19:50" },
          { stop: "Giannitsa — Elefthio Clinic", time: "19:57" },
          { stop: "Chalkidona", time: "20:22" },
          { stop: "Cross Gefyra Traffic Light", time: "20:32" },
          { stop: "Casino", time: "21:10" },
        ],
      },
    ],
  },
  {
    region: "Imathia (Naousa · Veroia · Alexandria)",
    routes: [
      {
        name: "Imathia Route",
        days: "Fri & Sat",
        departure: "Fri: From Casino 01:00 · Sat: From Casino 23:00",
        arrival: "Fri: Casino 20:30 · Sat: Casino 17:40",
        stops: [
          { stop: "Naousa", time: "Fri 18:20 · Sat 15:30" },
          { stop: "Kopanou Crossroad", time: "Fri 18:30 · Sat 15:40" },
          { stop: "Veroia Clock", time: "Fri 18:50 · Sat 16:00" },
          { stop: "Veroia Elia", time: "Fri 19:00 · Sat 16:10" },
          { stop: "Makrochori Crossroad", time: "Fri 19:10 · Sat 16:20" },
          { stop: "Stavros Crossroad", time: "Fri 19:15 · Sat 16:25" },
          { stop: "Kavasila Crossroad", time: "Fri 19:20 · Sat 16:30" },
          { stop: "Alexandreia — Manthos Hotel", time: "Fri 19:30 · Sat 16:40" },
          { stop: "Casino", time: "Fri 20:30 · Sat 17:40" },
        ],
      },
    ],
  },
  {
    region: "Pieria (Katerini)",
    routes: [
      {
        name: "Katerini Route",
        days: "Tue & Fri",
        departure: "Tue: From Casino 23:45 · Fri: From Casino 01:00",
        arrival: "Tue: Casino 19:20 · Fri: Casino 20:20",
        stops: [
          { stop: "Katerini Central Square", time: "Tue 18:00 · Fri 19:00" },
          { stop: "Korinos Olympus Plaza", time: "Tue 18:45 · Fri 19:45" },
          { stop: "Casino", time: "Tue 19:20 · Fri 20:20" },
        ],
      },
    ],
  },
  {
    region: "Larisa",
    routes: [
      {
        name: "Larisa Route",
        days: "Tue & Sun",
        departure: "Tue: From Casino 22:30 · Sun: From Casino 19:30",
        arrival: "Tue: Casino 18:00 · Sun: Casino 13:30",
        stops: [
          { stop: "Central Square Buses", time: "Tue 15:30 · Sun 11:00" },
          { stop: "Sokratous Kiosk / Super Market Galaxias", time: "Tue 15:35 · Sun 11:05" },
          { stop: "Katerini Filiana", time: "Sun 12:10" },
          { stop: "Casino", time: "Tue 18:00 · Sun 13:30" },
        ],
      },
    ],
  },
  {
    region: "Volos",
    routes: [
      {
        name: "Volos Route",
        days: "Wed & Sun",
        departure: "Wed: From Casino 21:00 · Sun: From Casino 20:00",
        arrival: "Wed: Casino 15:30 · Sun: Casino 13:30",
        stops: [
          { stop: "Volos Town Hall", time: "Wed 12:00 · Sun 10:00" },
          { stop: "Café Kathodon", time: "Wed 12:05 · Sun 10:05" },
          { stop: "Rizomilos", time: "Wed 12:25 · Sun 10:25" },
          { stop: "Stefanovikio Bus Stop", time: "Wed 12:30 · Sun 10:30" },
          { stop: "Casino", time: "Wed 15:30 · Sun 13:30" },
        ],
      },
    ],
  },
];

export default function TransportationPage() {
  const [hoveredRoute, setHoveredRoute] = useState<string | null>(null);
  const [activeSchedule, setActiveSchedule] = useState(0);
  const [activeRoute, setActiveRoute] = useState(0);

  const hovered = routes.find((r) => r.id === hoveredRoute);

  return (
    <div className="min-h-screen bg-[#07090F] text-white">
      <SiteHeader />
      <main className="mx-auto w-full max-w-6xl px-5 pb-24 pt-10 sm:px-8">

        {/* HEADER */}
        <p className="font-mono text-[9px] font-light uppercase tracking-[0.3em] text-white/25">Vertical / Transportation</p>
        <h1 className="mt-4 max-w-3xl text-4xl font-extralight leading-tight tracking-tight text-white sm:text-5xl">
          Route intelligence and movement analytics.
        </h1>
        <p className="mt-5 max-w-2xl text-sm font-light leading-7 text-white/40">
          Reliable transport connections from across northern Greece to Regency Casino Thessaloniki. Hover over a route to see contact details.
        </p>

        {/* MAP */}
        <div className="mt-10 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6">
          <p className="font-mono text-[9px] font-light uppercase tracking-[0.22em] text-white/25">Regional Route Map</p>
          <div className="relative mt-5">
            <svg viewBox="0 0 500 450" className="w-full rounded-xl">
              {/* Background */}
              <rect width="500" height="450" fill="#0a0d16" rx="12" />

              {/* Subtle grid */}
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1"/>
                </pattern>
              </defs>
              <rect width="500" height="450" fill="url(#grid)" rx="12" />

              {/* Route lines */}
              {routes.map((r) => (
                <line
                  key={r.id}
                  x1={r.x} y1={r.y}
                  x2={CASINO.x} y2={CASINO.y}
                  stroke={hoveredRoute === r.id ? "#C49A2E" : "rgba(58,143,212,0.35)"}
                  strokeWidth={hoveredRoute === r.id ? 2.5 : 1.5}
                  strokeDasharray={hoveredRoute === r.id ? "none" : "6 4"}
                  className="transition-all duration-200 cursor-pointer"
                  onMouseEnter={() => setHoveredRoute(r.id)}
                  onMouseLeave={() => setHoveredRoute(null)}
                />
              ))}

              {/* Casino destination dot */}
              <circle cx={CASINO.x} cy={CASINO.y} r="10" fill="#C49A2E" opacity="0.9" />
              <circle cx={CASINO.x} cy={CASINO.y} r="16" fill="none" stroke="#C49A2E" strokeWidth="1" opacity="0.4" />
              <text x={CASINO.x} y={CASINO.y - 22} textAnchor="middle" fontSize="10" fill="#C49A2E" fontFamily="monospace" letterSpacing="1">CASINO</text>

              {/* Route origin dots */}
              {routes.map((r) => (
                <g
                  key={r.id}
                  className="cursor-pointer"
                  onMouseEnter={() => setHoveredRoute(r.id)}
                  onMouseLeave={() => setHoveredRoute(null)}
                >
                  <circle
                    cx={r.x} cy={r.y} r="14"
                    fill="transparent"
                  />
                  <circle
                    cx={r.x} cy={r.y} r="6"
                    fill={hoveredRoute === r.id ? "#C49A2E" : "#1456B4"}
                    className="transition-colors duration-200"
                  />
                  <text
                    x={r.x}
                    y={r.y - 12}
                    textAnchor="middle"
                    fontSize="10"
                    fill={hoveredRoute === r.id ? "#C49A2E" : "rgba(255,255,255,0.55)"}
                    fontFamily="monospace"
                    letterSpacing="0.5"
                    className="transition-colors duration-200 uppercase"
                  >
                    {r.label}
                  </text>
                </g>
              ))}
            </svg>

            {/* Hover tooltip */}
            {hovered && (
              <div className="absolute left-4 top-4 rounded-xl border border-[#C49A2E]/30 bg-[#07090F]/95 px-5 py-4 backdrop-blur-sm">
                <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#C49A2E]/70">Contact — Reservations</p>
                <p className="mt-2 text-base font-light text-white">{hovered.label}</p>
                <p className="mt-1 font-mono text-[11px] text-white/50">{hovered.phone}</p>
              </div>
            )}
          </div>
        </div>

        {/* SCHEDULE */}
        <div className="mt-6 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6">
          <p className="font-mono text-[9px] font-light uppercase tracking-[0.22em] text-white/25">Bus Schedule</p>
          <h2 className="mt-3 text-2xl font-extralight text-white">Free Transportation</h2>
          <p className="mt-2 text-sm font-light text-white/35">All routes are complimentary. Must be 21+ to board.</p>

          {/* Region tabs */}
          <div className="mt-5 flex flex-wrap gap-2">
            {schedules.map((s, i) => (
              <button
                key={s.region}
                onClick={() => { setActiveSchedule(i); setActiveRoute(0); }}
                className={`rounded-full border px-4 py-2 font-mono text-[9px] uppercase tracking-[0.16em] transition-all ${
                  activeSchedule === i
                    ? "border-[#C49A2E]/50 bg-[rgba(196,154,46,0.08)] text-[#C49A2E]"
                    : "border-white/[0.08] text-white/35 hover:border-white/20 hover:text-white"
                }`}
              >
                {s.region}
              </button>
            ))}
          </div>

          {/* Route sub-tabs if multiple */}
          {schedules[activeSchedule].routes.length > 1 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {schedules[activeSchedule].routes.map((r, i) => (
                <button
                  key={r.name}
                  onClick={() => setActiveRoute(i)}
                  className={`rounded-full border px-3 py-1.5 font-mono text-[8px] uppercase tracking-[0.14em] transition-all ${
                    activeRoute === i
                      ? "border-[#1456B4]/50 bg-[rgba(20,86,180,0.1)] text-[#3A8FD4]"
                      : "border-white/[0.06] text-white/25 hover:border-white/15 hover:text-white/50"
                  }`}
                >
                  {r.name}
                </button>
              ))}
            </div>
          )}

          {/* Schedule detail */}
          {(() => {
            const route = schedules[activeSchedule].routes[activeRoute] || schedules[activeSchedule].routes[0];
            return (
              <div className="mt-5">
                <div className="mb-4 flex flex-wrap gap-4">
                  <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] px-4 py-2">
                    <p className="font-mono text-[8px] uppercase tracking-[0.14em] text-white/25">Days</p>
                    <p className="mt-1 text-sm font-light text-white">{route.days}</p>
                  </div>
                  <div className="rounded-lg border border-[#C49A2E]/20 bg-[rgba(196,154,46,0.04)] px-4 py-2">
                    <p className="font-mono text-[8px] uppercase tracking-[0.14em] text-[#C49A2E]/60">Return from Casino</p>
                    <p className="mt-1 text-sm font-light text-white">{route.departure}</p>
                  </div>
                </div>
                <div className="space-y-1">
                  {route.stops.map((s, i) => (
                    <div
                      key={i}
                      className={`flex items-center justify-between rounded-lg px-4 py-2.5 ${
                        s.stop === "Casino"
                          ? "border border-[#C49A2E]/20 bg-[rgba(196,154,46,0.05)]"
                          : "border border-white/[0.04] bg-white/[0.01]"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`h-1.5 w-1.5 rounded-full flex-shrink-0 ${s.stop === "Casino" ? "bg-[#C49A2E]" : "bg-[#1456B4]/60"}`} />
                        <span className="text-sm font-light text-white/70">{s.stop}</span>
                      </div>
                      <span className="font-mono text-[10px] text-white/40">{s.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })()}
        </div>

        {/* REGENCY CTA */}
        <div className="mt-6 rounded-2xl border border-[#C49A2E]/20 bg-[rgba(196,154,46,0.03)] p-8">
          <p className="font-mono text-[9px] font-light uppercase tracking-[0.3em] text-[#C49A2E]/60">Our Client</p>
          <h2 className="mt-4 max-w-xl text-2xl font-extralight leading-tight tracking-tight text-white">
            Regency Casino Thessaloniki
          </h2>
          <p className="mt-3 max-w-lg text-sm font-light leading-7 text-white/35">
            View Ventures provides transportation services for Regency Casino Thessaloniki — one of Greece&apos;s premier entertainment destinations. Free bus service available from multiple regions across northern Greece.
          </p>
          <div className="mt-6">
            <a
              href="https://thessaloniki.regencycasinos.gr/en/services-en/free-transportation-en/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-[11px] font-medium uppercase tracking-[0.2em] text-[#07090F] transition-all hover:bg-white/90"
            >
              View Full Transportation Info
              <span className="opacity-50">↗</span>
            </a>
          </div>
          <p className="mt-4 font-mono text-[9px] font-light text-white/20">
            Must be 21+ · Play responsibly · Help line KETHEA-ALPHA: 210 921 5776
          </p>
        </div>

      </main>
      <SiteFooter />
    </div>
  );
}
