"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { SiteFooter } from "../../components/site-footer";
import { SiteHeader } from "../../components/site-header";

const TransportationMap = dynamic(() => import("../../components/transportation-map"), { ssr: false, loading: () => <div style={{height:"420px"}} className="rounded-xl bg-white/[0.02] animate-pulse" /> });

// Route data: approximate SVG coordinates mapped to a northern Greece viewport
const routes = [
  {
    id: "volos",
    name: "Volos",
    phone: "+30 24210 70330, 70795",
    cx: 320,
    cy: 390,
  },
  {
    id: "larisa",
    name: "Larisa",
    phone: "+30 2410 257100",
    cx: 280,
    cy: 310,
  },
  {
    id: "pieria",
    name: "Pieria",
    phone: "+30 23510 21888",
    cx: 200,
    cy: 270,
  },
  {
    id: "imathia",
    name: "Imathia",
    phone: "+30 23310 27116 | +30 23310 27711",
    cx: 155,
    cy: 210,
  },
  {
    id: "pella",
    name: "Pella",
    phone: "+30 23810 89885",
    cx: 130,
    cy: 165,
  },
  {
    id: "serres",
    name: "Serres",
    phone: "+30 23210 55402",
    cx: 340,
    cy: 110,
  },
];

// Regency Casino Thessaloniki position on the map
const casino = { cx: 210, cy: 155 };

const schedules = [
  {
    title: "Morning — City Route",
    days: "Daily",
    arrival: "11:00",
    departure: "15:10",
    stops: [
      { name: "Monastiriou (Zografou Pharmacy)", time: "11:00" },
      { name: "Egnatia–Kolomvou (Dimitriadis)", time: "11:05" },
      { name: "Aristotelous (Germanos)", time: "11:08–11:10" },
      { name: "Egnatia × Agias Sofias", time: "11:13–11:15" },
      { name: "Kamara (National Bank)", time: "11:18–11:20" },
      { name: "White Tower", time: "11:23–11:25" },
      { name: "Leoforos Stratou", time: "11:28–11:30" },
      { name: "Theagenio Hospital", time: "11:33–11:35" },
      { name: "Municipal Parking", time: "11:38–11:40" },
      { name: "O.A.Σ.Θ. Building (Mpotsari × Papanastasiou)", time: "11:43–11:45" },
      { name: "Aris FC Soccer Field", time: "11:47–11:49" },
      { name: "Trion Ierarxon (Voulgari)", time: "11:51–11:53" },
      { name: "St Eleftherios Church (Voulgari)", time: "11:55–11:57" },
      { name: "Former Express Service (Adrianoupoleos)", time: "11:59–12:01" },
      { name: "Κ.Α.Π.Η. Phinika (Eth. Antistaseos)", time: "12:05–12:08" },
      { name: "Hondos Center – IKEA", time: "12:10–12:12" },
      { name: "Casino", time: "12:15–12:20" },
    ],
  },
  {
    title: "Evening — City Route A",
    days: "Daily",
    arrival: "16:30",
    departure: "23:00",
    stops: [
      { name: "Profitis Ilias (Makrigianni St.)", time: "16:30" },
      { name: "Eleftherias Square (Ilioupoli)", time: "16:31" },
      { name: "Bouboulinas", time: "16:34" },
      { name: "Town Hall (El. Venizelou St.)", time: "16:38–16:39" },
      { name: "Eptalofos Square (El. Venizelou St.)", time: "16:40–16:42" },
      { name: "St. Panteleimonas (El. Venizelou St.)", time: "16:43" },
      { name: "Twelve-Storey Buildings (Lagada St.)", time: "16:47–16:48" },
      { name: "Agiou Dimitriou (Kafantari's Cafe)", time: "16:50–16:51" },
      { name: "Agiou Dimitriou – Y.M.A.Θ.", time: "16:53–16:55" },
      { name: "Agiou Dimitriou × Iasonidou", time: "16:56–16:57" },
      { name: "Gennimatas Hospital (Agiou Dimitriou)", time: "16:59–17:00" },
      { name: "French Institute (Stratou Ave.)", time: "17:10–17:11" },
      { name: "Theagenio Hospital (Papanastasiou)", time: "17:12" },
      { name: "Ippokratio Hospital (Karamanli)", time: "17:13–17:14" },
      { name: "Mpotsari × N.Egnatia (Kiosk)", time: "17:15–17:19" },
      { name: "Martiou × N.Egnatia (ELIN Gas Station)", time: "17:20–17:21" },
      { name: "Trion Ierarxon (Voulgari)", time: "17:22–17:23" },
      { name: "Voulgari × Papadaki", time: "17:24–17:28" },
      { name: "Adrianoupoleos × Aigeou", time: "17:29–17:30" },
      { name: "Agios Panteleimonas (Adrianoupoleos)", time: "17:32–17:34" },
      { name: "Κ.Α.Π.Η. Phinika (Eth. Antistaseos)", time: "17:36–17:38" },
      { name: "Hondos Center – IKEA", time: "17:42–17:43" },
      { name: "Casino", time: "17:45–17:50" },
    ],
  },
  {
    title: "Evening — City Route B",
    days: "Daily",
    arrival: "18:30",
    departure: "00:30 (Fri & Sat: 01:00)",
    stops: [
      { name: "Monastiriou (Zografou Pharmacy)", time: "18:30" },
      { name: "Egnatia–Kolomvou (Dimitriadis)", time: "18:35" },
      { name: "Aristotelous (Germanos)", time: "18:38" },
      { name: "Kamara (National Bank)", time: "18:43–18:45" },
      { name: "Triandria Turn (AB Basilopoulos)", time: "18:50–18:52" },
      { name: "Gr. Lambraki (St. Barbara)", time: "18:53–18:55" },
      { name: "Gr. Lambraki (Papafio Orphanage)", time: "18:56–18:58" },
      { name: "Gr. Lambraki × Perrevou", time: "18:59–19:01" },
      { name: "Casino", time: "19:15–19:20" },
    ],
  },
  {
    title: "Evening — City Route C",
    days: "Daily",
    arrival: "18:45",
    departure: "—",
    stops: [
      { name: "White Tower", time: "18:45" },
      { name: "French Institute (Stratou Ave.)", time: "18:48–18:50" },
      { name: "Theagenio Hospital", time: "18:50–18:52" },
      { name: "Ippokratio Hospital (Karamanli)", time: "18:53–18:55" },
      { name: "Mpotsari × N.Egnatia (Kiosk)", time: "18:56–18:57" },
      { name: "Martiou × N.Egnatia (ELIN Gas Station)", time: "18:59–19:00" },
      { name: "Voulgari (Cosmote)", time: "19:01–19:02" },
      { name: "Casino", time: "19:10–19:20" },
    ],
  },
  {
    title: "Kalamaria Route",
    days: "Daily",
    arrival: "20:15",
    departure: "—",
    stops: [
      { name: "Th. Sofouli (Gas Station Kaoil)", time: "20:15" },
      { name: "Th. Sofouli (Hellenic College)", time: "20:17" },
      { name: "Th. Sofouli (Vervelidis)", time: "20:20" },
      { name: "Kerasountos (Nautical Club)", time: "20:23" },
      { name: "Chilis (Appolon Kalamarias Soccer Field)", time: "20:25" },
      { name: "Marmara (Skra Square)", time: "20:27" },
      { name: "Kountouriotou (Former Bus Station)", time: "20:29" },
      { name: "Kapodistriou (Former Bus Station)", time: "20:31" },
      { name: "Polyviou (St. Paul Bus Station)", time: "20:33" },
      { name: "Bus Station Krinis (Lidl)", time: "20:35" },
      { name: "Casino", time: "20:45" },
    ],
  },
  {
    title: "Night — City Route",
    days: "Daily",
    arrival: "20:30",
    departure: "01:30 (Fri & Sat: 02:00)",
    stops: [
      { name: "Profitis Ilias (Makrigianni St.)", time: "20:30" },
      { name: "Eleftherias Square (Ilioupoli)", time: "20:32" },
      { name: "Bouboulinas", time: "20:34" },
      { name: "Town Hall (El. Venizelou St.)", time: "20:35–20:37" },
      { name: "Eptalofos Square (El. Venizelou St.)", time: "20:40–20:43" },
      { name: "St. Panteleimonas (El. Venizelou St.)", time: "20:45" },
      { name: "Twelve-Storey Buildings (Lagada St.)", time: "20:48–20:49" },
      { name: "Agiou Dimitriou (Kafantari's Cafe)", time: "20:50–20:52" },
      { name: "Agiou Dimitriou – Y.M.A.Θ.", time: "20:53–20:55" },
      { name: "Agiou Dimitriou × Iasonidou", time: "20:59–21:00" },
      { name: "Gennimatas Hospital (Agiou Dimitriou)", time: "21:01–21:02" },
      { name: "Macedonia Palace (Bridge)", time: "21:07–21:10" },
      { name: "Mpotsari × Coastal Ave. (M. Alexandrou)", time: "21:11–21:13" },
      { name: "G.Papandreou × 25th Martiou", time: "21:14–21:15" },
      { name: "Adrianoupoleos × Aigeou", time: "21:16–21:17" },
      { name: "Agios Panteleimonas (Adrianoupoleos)", time: "21:21–21:22" },
      { name: "Κ.Α.Π.Η. Phinika (Eth. Antistaseos)", time: "21:24–21:25" },
      { name: "Hondos Center – IKEA", time: "21:27–21:28" },
      { name: "Casino", time: "21:30–21:35" },
    ],
  },
  {
    title: "Serres Route",
    days: "Mon · Tue · Fri · Sat · Sun",
    arrival: "21:20",
    departure: "01:45",
    stops: [
      { name: "Eleftherias Square", time: "20:00" },
      { name: "Bus Stop Kaftantzi", time: "20:02" },
      { name: "Bus Stop Sklaveniti", time: "20:04" },
      { name: "Bus Stop Apolafsi", time: "20:06" },
      { name: "Bus Stop Americano", time: "20:08" },
      { name: "Bus Stop Lefkona", time: "20:10" },
      { name: "Casino", time: "21:20" },
    ],
  },
  {
    title: "Skydra – Giannitsa – Chalkidona – Gefyra",
    days: "Mon · Wed · Fri",
    arrival: "21:10",
    departure: "02:00",
    stops: [
      { name: "Skydra Town Hall", time: "19:30" },
      { name: "Mavrovouni", time: "19:35" },
      { name: "Giannitsa Maggiou Square", time: "19:50" },
      { name: "Giannitsa Elefthio Clinic", time: "19:57" },
      { name: "Chalkidona", time: "20:22" },
      { name: "Cross Gefyra Traffic Light", time: "20:32" },
      { name: "Casino", time: "21:10" },
    ],
  },
  {
    title: "Naousa – Veroia – Alexandreia",
    days: "Fri & Sat",
    arrival: "Fri 20:30 / Sat 17:40",
    departure: "Fri 01:00 / Sat 23:00",
    stops: [
      { name: "Naousa", time: "Fri 18:20 / Sat 15:30" },
      { name: "Kopanou Crossroad", time: "Fri 18:30 / Sat 15:40" },
      { name: "Veroia Clock", time: "Fri 18:50 / Sat 16:00" },
      { name: "Veroia Elia", time: "Fri 19:00 / Sat 16:10" },
      { name: "Makrochori Crossroad", time: "Fri 19:10 / Sat 16:20" },
      { name: "Stavros Crossroad", time: "Fri 19:15 / Sat 16:25" },
      { name: "Kavasila Crossroad", time: "Fri 19:20 / Sat 16:30" },
      { name: "Alexandreia Manthos Hotel", time: "Fri 19:30 / Sat 16:40" },
      { name: "Casino", time: "Fri 20:30 / Sat 17:40" },
    ],
  },
  {
    title: "Katerini Route",
    days: "Tue & Fri",
    arrival: "Tue 19:20 / Fri 20:20",
    departure: "Tue 23:45 / Fri 01:00",
    stops: [
      { name: "Katerini Central Square", time: "Tue 18:00 / Fri 19:00" },
      { name: "Korinos Olympus Plaza", time: "Tue 18:45 / Fri 19:45" },
      { name: "Casino", time: "Tue 19:20 / Fri 20:20" },
    ],
  },
  {
    title: "Larisa Route",
    days: "Tue & Sun",
    arrival: "Tue 18:00 / Sun 13:30",
    departure: "Tue 22:30 / Sun 19:30",
    stops: [
      { name: "Central Square Buses", time: "Tue 15:30 / Sun 11:00" },
      { name: "Sokratous Kiosk (Super Market Galaxias)", time: "Tue 15:35 / Sun 11:05" },
      { name: "Katerini Filiana", time: "Sun 12:10" },
      { name: "Casino", time: "Tue 18:00 / Sun 13:30" },
    ],
  },
  {
    title: "Volos Route",
    days: "Wed & Sun",
    arrival: "Wed 15:30 / Sun 13:30",
    departure: "Wed 21:00 / Sun 20:00",
    stops: [
      { name: "Volos Town Hall", time: "Wed 12:00 / Sun 10:00" },
      { name: "Café Kathodon", time: "Wed 12:05 / Sun 10:05" },
      { name: "Rizomilos", time: "Wed 12:25 / Sun 10:25" },
      { name: "Stefanovikio Bus Stop", time: "Wed 12:30 / Sun 10:30" },
      { name: "Casino", time: "Wed 15:30 / Sun 13:30" },
    ],
  },
];

export default function TransportationPage() {
  const [hovered, setHovered] = useState<string | null>(null);
  const [tooltip, setTooltip] = useState<{ x: number; y: number } | null>(null);
  const [openSchedule, setOpenSchedule] = useState<number | null>(null);

  const hoveredRoute = routes.find((r) => r.id === hovered);

  return (
    <div className="min-h-screen bg-[#07090F] text-white">
      <SiteHeader />
      <main className="mx-auto w-full max-w-6xl px-5 pb-24 pt-10 sm:px-8">

        {/* HEADER */}
        <p className="font-mono text-[9px] font-light uppercase tracking-[0.3em] text-white/25">Vertical / Transportation</p>
        <h1 className="mt-4 max-w-3xl text-4xl font-extralight leading-tight tracking-tight text-white sm:text-5xl">
          Free transportation to Regency Casino Thessaloniki.
        </h1>
        <p className="mt-5 max-w-2xl text-sm font-light leading-7 text-white/40">
          We operate complimentary bus services from six regional hubs directly to Regency Casino Thessaloniki. Hover over a route on the map to see contact & reservation details.
        </p>

        {/* MAP */}
        <div className="mt-10 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6">
          <p className="font-mono text-[9px] font-light uppercase tracking-[0.22em] text-white/25">Regional Route Map</p>
          <p className="mt-1 text-xs font-light text-white/30">Hover over a route line or city to see reservations contact</p>

          <div className="relative mt-4">
            <TransportationMap />
            

            {/* Mobile fallback cards */}
            <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:hidden">
              {routes.map((route) => (
                <div key={route.id} className="rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3">
                  <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-[#C49A2E]/70">Contact — Reservations</p>
                  <p className="mt-1 text-sm font-light text-white">{route.name}</p>
                  <p className="mt-0.5 font-mono text-[10px] text-white/40">{route.phone}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* BUS SCHEDULE */}
        <div className="mt-8">
          <p className="font-mono text-[9px] font-light uppercase tracking-[0.3em] text-white/25">Bus Schedule</p>
          <h2 className="mt-3 text-2xl font-extralight tracking-tight text-white">Full Timetable</h2>
          <p className="mt-2 text-sm font-light text-white/35">Click a route to expand the full stop list.</p>

          <div className="mt-5 space-y-2">
            {schedules.map((s, i) => (
              <div
                key={i}
                className="rounded-2xl border border-white/[0.06] bg-white/[0.02] overflow-hidden transition-colors hover:border-white/10"
              >
                <button
                  className="w-full px-6 py-4 flex items-center justify-between text-left"
                  onClick={() => setOpenSchedule(openSchedule === i ? null : i)}
                >
                  <div>
                    <p className="text-sm font-light text-white">{s.title}</p>
                    <div className="mt-1 flex flex-wrap gap-3">
                      <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-white/30">{s.days}</span>
                      <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-[#C49A2E]/60">Arrives {s.arrival}</span>
                      <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-white/30">Departs {s.departure}</span>
                    </div>
                  </div>
                  <span className="ml-4 text-white/30 text-lg">{openSchedule === i ? "−" : "+"}</span>
                </button>

                {openSchedule === i && (
                  <div className="border-t border-white/[0.04] px-6 pb-5">
                    <div className="mt-4 space-y-1">
                      {s.stops.map((stop, j) => (
                        <div key={j} className="flex items-baseline justify-between gap-4 py-1.5 border-b border-white/[0.03]">
                          <div className="flex items-center gap-3">
                            <span className="flex-shrink-0 h-1.5 w-1.5 rounded-full bg-[#1456B4] opacity-60" />
                            <span className="text-xs font-light text-white/50">{stop.name}</span>
                          </div>
                          <span className="flex-shrink-0 font-mono text-[10px] text-[#C49A2E]/70">{stop.time}</span>
                        </div>
                      ))}
                      <div className="flex items-baseline justify-between gap-4 pt-2">
                        <div className="flex items-center gap-3">
                          <span className="flex-shrink-0 h-2 w-2 rounded-full bg-[#C49A2E]" />
                          <span className="text-xs font-medium text-white">Regency Casino Thessaloniki</span>
                        </div>
                        <span className="flex-shrink-0 font-mono text-[10px] text-[#C49A2E]">Departs {s.departure}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Legal notice */}
          <p className="mt-4 text-[10px] font-light leading-5 text-white/20">
            Regulating Authority: HGC. Must be 21+ to enter. Frequent gambling may lead to addiction. Help line KETHEA-ALPHA: 210 921 5776. Play responsibly.
          </p>
        </div>

        {/* REGENCY CTA */}
        <div className="mt-10 rounded-2xl border border-[#C49A2E]/20 bg-[rgba(196,154,46,0.03)] p-8 sm:p-10">
          <p className="font-mono text-[9px] font-light uppercase tracking-[0.3em] text-[#C49A2E]/60">Our Client</p>
          <h2 className="mt-4 max-w-xl text-2xl font-extralight leading-tight tracking-tight text-white">
            Regency Casino Thessaloniki
          </h2>
          <p className="mt-3 max-w-lg text-sm font-light leading-7 text-white/35">
            View Ventures operates the complimentary transportation network for Regency Casino Thessaloniki — the premier entertainment destination in Northern Greece. Visit their official page for full service details and reservations.
          </p>
          <a
            href="https://thessaloniki.regencycasinos.gr/en/services-en/free-transportation-en/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-[11px] font-medium uppercase tracking-[0.2em] text-[#07090F] transition-all hover:bg-white/90"
          >
            View Transportation Info
            <span className="text-[10px]">↗</span>
          </a>
        </div>

      </main>
      <SiteFooter />
    </div>
  );
}
