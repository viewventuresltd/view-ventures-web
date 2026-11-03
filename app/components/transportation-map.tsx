"use client";

import "maplibre-gl/dist/maplibre-gl.css";
import type { Map as MapLibreMap } from "maplibre-gl";
import { useEffect, useRef } from "react";
import { casino, transportRoutes as routes } from "../lib/site-data";

// OpenFreeMap: free vector tiles, no API key or usage limits.
const STYLE_LIGHT = "https://tiles.openfreemap.org/styles/positron";
const STYLE_DARK = "https://tiles.openfreemap.org/styles/dark";

const BLUE = "#1456B4";
const GOLD = "#C49A2E";

const popupHtml = (name: string, phone: string) => `
  <div style="min-width:170px">
    <div style="font-size:11px;font-weight:600;color:${GOLD};letter-spacing:0.02em;margin-bottom:2px">${name} — Reservations</div>
    <div style="font-size:13px;font-family:var(--font-mono)">${phone}</div>
  </div>`;

function dot(size: number, color: string, ring: string, glow: string) {
  const el = document.createElement("div");
  el.style.cssText = `width:${size}px;height:${size}px;background:${color};border:2px solid ${ring};border-radius:50%;box-shadow:0 0 0 4px ${glow};cursor:pointer`;
  return el;
}

type Props = { height?: number; interactive?: boolean };

export default function TransportationMap({ height = 440, interactive = true }: Props) {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapRef.current) return;
    let map: MapLibreMap | undefined;
    let cancelled = false;
    const dark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    import("maplibre-gl").then(({ default: maplibregl }) => {
      if (cancelled || !mapRef.current) return;

      map = new maplibregl.Map({
        container: mapRef.current,
        style: dark ? STYLE_DARK : STYLE_LIGHT,
        center: [22.85, 40.25],
        zoom: 6.6,
        scrollZoom: false,
        interactive,
        attributionControl: { compact: true },
      });
      if (interactive) map.addControl(new maplibregl.NavigationControl({ showCompass: false }), "top-left");
      map.fitBounds([[22.0, 39.2], [23.8, 41.25]], { padding: 40, duration: 0 });

      const ring = dark ? "#000" : "#fff";
      const popups = new Map<string, InstanceType<typeof maplibregl.Popup>>();

      new maplibregl.Marker({ element: dot(16, GOLD, ring, "rgba(196,154,46,0.25)") })
        .setLngLat([casino.lng, casino.lat])
        .setPopup(new maplibregl.Popup({ offset: 12, closeButton: false }).setHTML(`<b style="color:${GOLD};font-size:13px">${casino.name}</b>`))
        .addTo(map)
        .togglePopup();

      routes.forEach((route) => {
        const popup = new maplibregl.Popup({ offset: 10 }).setHTML(popupHtml(route.name, route.phone));
        popups.set(route.id, popup);
        new maplibregl.Marker({ element: dot(11, BLUE, ring, "rgba(20,86,180,0.2)") })
          .setLngLat([route.lng, route.lat])
          .setPopup(popup)
          .addTo(map!);
      });

      map.on("load", () => {
        map!.addSource("routes", {
          type: "geojson",
          promoteId: "id",
          data: {
            type: "FeatureCollection",
            features: routes.map((r) => ({
              type: "Feature",
              properties: { id: r.id },
              geometry: { type: "LineString", coordinates: [[r.lng, r.lat], [casino.lng, casino.lat]] },
            })),
          },
        });
        // Dashed base line, plus a solid gold line revealed on hover.
        map!.addLayer({
          id: "routes-base",
          type: "line",
          source: "routes",
          paint: { "line-color": BLUE, "line-width": 2, "line-opacity": 0.55, "line-dasharray": [3, 2.5] },
        });
        map!.addLayer({
          id: "routes-hover",
          type: "line",
          source: "routes",
          paint: {
            "line-color": GOLD,
            "line-width": 3.5,
            "line-opacity": ["case", ["boolean", ["feature-state", "hover"], false], 0.95, 0],
          },
        });
        // Wide invisible line so thin routes are easy to hover.
        map!.addLayer({ id: "routes-hit", type: "line", source: "routes", paint: { "line-width": 16, "line-opacity": 0 } });

        if (!interactive) return;
        let hovered: string | null = null;
        const clear = () => {
          if (hovered) map!.setFeatureState({ source: "routes", id: hovered }, { hover: false });
          hovered = null;
        };
        map!.on("mousemove", "routes-hit", (e) => {
          const id = e.features?.[0]?.properties?.id as string | undefined;
          if (!id || id === hovered) return;
          clear();
          hovered = id;
          map!.setFeatureState({ source: "routes", id }, { hover: true });
          map!.getCanvas().style.cursor = "pointer";
          const route = routes.find((r) => r.id === id)!;
          popups.forEach((p) => p.remove());
          popups.get(id)!.setLngLat([route.lng, route.lat]).addTo(map!);
        });
        map!.on("mouseleave", "routes-hit", () => {
          clear();
          map!.getCanvas().style.cursor = "";
        });
        map!.on("click", "routes-hit", (e) => {
          const id = e.features?.[0]?.properties?.id as string | undefined;
          const route = routes.find((r) => r.id === id);
          if (route) popups.get(route.id)!.setLngLat([route.lng, route.lat]).addTo(map!);
        });
      });
    });

    return () => {
      cancelled = true;
      map?.remove();
    };
  }, [interactive]);

  return <div ref={mapRef} style={{ height, width: "100%" }} className="overflow-hidden rounded-2xl bg-surface-2" />;
}
