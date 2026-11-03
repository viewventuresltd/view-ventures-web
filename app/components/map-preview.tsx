"use client";

import dynamic from "next/dynamic";

const TransportationMap = dynamic(() => import("./transportation-map"), {
  ssr: false,
  loading: () => <div style={{ height: 360 }} className="animate-pulse rounded-2xl bg-surface-2" />,
});

export function MapPreview() {
  return <TransportationMap height={360} interactive={false} />;
}
