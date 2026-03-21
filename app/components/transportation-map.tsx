"use client";

import { useEffect, useRef, useState } from "react";

const routes = [
  { id: "volos",   name: "Volos",   phone: "+30 24210 70330, 70795",            lat: 39.3621, lng: 22.9427 },
  { id: "larisa",  name: "Larisa",  phone: "+30 2410 257100",                   lat: 39.6390, lng: 22.4191 },
  { id: "pieria",  name: "Pieria",  phone: "+30 23510 21888",                   lat: 40.2247, lng: 22.4958 },
  { id: "imathia", name: "Imathia", phone: "+30 23310 27116 | +30 23310 27711", lat: 40.5335, lng: 22.2043 },
  { id: "pella",   name: "Pella",   phone: "+30 23810 89885",                   lat: 40.7629, lng: 22.5237 },
  { id: "serres",  name: "Serres",  phone: "+30 23210 55402",                   lat: 41.0894, lng: 23.5484 },
];

const casino = { lat: 40.6196, lng: 22.9444, name: "Regency Casino Thessaloniki" };

export default function TransportationMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    import("leaflet").then((L) => {
      // Fix default icon paths
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
        iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
        shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
      });

      const map = L.map(mapRef.current!, {
        center: [40.4, 22.9],
        zoom: 7,
        zoomControl: true,
        scrollWheelZoom: false,
      });

      mapInstanceRef.current = map;

      // Dark map tiles from CartoDB
      L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> © <a href="https://carto.com/">CARTO</a>',
        maxZoom: 19,
      }).addTo(map);

      // Casino marker (gold)
      const casinoIcon = L.divIcon({
        html: `<div style="width:14px;height:14px;background:#C49A2E;border:2px solid #fff;border-radius:50%;box-shadow:0 0 10px rgba(196,154,46,0.8)"></div>`,
        iconSize: [14, 14],
        iconAnchor: [7, 7],
        className: "",
      });

      L.marker([casino.lat, casino.lng], { icon: casinoIcon })
        .addTo(map)
        .bindPopup(`<b style="color:#C49A2E">${casino.name}</b>`)
        .openPopup();

      // Route markers and lines
      routes.forEach((route) => {
        const cityIcon = L.divIcon({
          html: `<div style="width:10px;height:10px;background:#1456B4;border:2px solid rgba(255,255,255,0.5);border-radius:50%;box-shadow:0 0 6px rgba(20,86,180,0.7)"></div>`,
          iconSize: [10, 10],
          iconAnchor: [5, 5],
          className: "",
        });

        const marker = L.marker([route.lat, route.lng], { icon: cityIcon }).addTo(map);

        marker.bindPopup(`
          <div style="font-family:monospace;min-width:180px">
            <div style="font-size:11px;font-weight:bold;color:#C49A2E;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:4px">
              ${route.name} — Reservations
            </div>
            <div style="font-size:10px;color:#555">${route.phone}</div>
          </div>
        `);

        // Dashed line to casino
        const line = L.polyline(
          [[route.lat, route.lng], [casino.lat, casino.lng]],
          { color: "#1456B4", weight: 2, opacity: 0.5, dashArray: "6 5" }
        ).addTo(map);

        line.on("mouseover", function () {
          (this as any).setStyle({ color: "#C49A2E", weight: 3, opacity: 0.9, dashArray: "" });
          marker.openPopup();
        });
        line.on("mouseout", function () {
          (this as any).setStyle({ color: "#1456B4", weight: 2, opacity: 0.5, dashArray: "6 5" });
        });
        line.bindPopup(`
          <div style="font-family:monospace;min-width:180px">
            <div style="font-size:11px;font-weight:bold;color:#C49A2E;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:4px">
              ${route.name} — Reservations
            </div>
            <div style="font-size:10px;color:#555">${route.phone}</div>
          </div>
        `);
      });
    });

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css"
      />
      <div
        ref={mapRef}
        style={{ height: "420px", width: "100%", borderRadius: "12px", overflow: "hidden" }}
      />
    </>
  );
}
