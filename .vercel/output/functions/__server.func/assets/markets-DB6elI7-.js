import { jsxs, jsx } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { s as supabase } from "./client-koMOzLtV.js";
import { B as Button } from "./button-BC9oXVxV.js";
import { I as Input } from "./input-C0QjszdI.js";
import { useState, useRef, useEffect } from "react";
import { MapPin, Clock, Star } from "lucide-react";
import "@supabase/supabase-js";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "./utils-H80jjgLf.js";
import "clsx";
import "tailwind-merge";
let scriptLoaded = false;
let scriptLoadingPromise = null;
function loadGoogleMapsScript(apiKey) {
  if (scriptLoaded) return Promise.resolve();
  if (scriptLoadingPromise) return scriptLoadingPromise;
  scriptLoadingPromise = new Promise((resolve, reject) => {
    if (typeof window !== "undefined" && window.google && window.google.maps) {
      scriptLoaded = true;
      resolve();
      return;
    }
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      scriptLoaded = true;
      resolve();
    };
    script.onerror = (err) => {
      scriptLoadingPromise = null;
      reject(err);
    };
    document.head.appendChild(script);
  });
  return scriptLoadingPromise;
}
function MarketsPage() {
  const [q, setQ] = useState("");
  const {
    data: markets
  } = useQuery({
    queryKey: ["markets-public"],
    queryFn: async () => (await supabase.from("markets").select("*").eq("is_active", true).order("name")).data ?? []
  });
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const markersRef = useRef([]);
  const [mapsLoaded, setMapsLoaded] = useState(false);
  useEffect(() => {
    const apiKey = "AIzaSyBmvJph4LmrbtW7skeczzpBIyb9WWzFKo4";
    loadGoogleMapsScript(apiKey).then(() => setMapsLoaded(true)).catch((err) => console.error("Failed to load Google Maps script", err));
  }, []);
  useEffect(() => {
    if (!mapsLoaded || !mapRef.current || mapInstance.current) return;
    mapInstance.current = new google.maps.Map(mapRef.current, {
      center: {
        lat: -6.21,
        lng: 106.84
      },
      zoom: 11,
      fullscreenControl: false,
      streetViewControl: false,
      mapTypeControl: false,
      zoomControl: true,
      zoomControlOptions: {
        position: google.maps.ControlPosition.RIGHT_BOTTOM
      }
    });
  }, [mapsLoaded]);
  const filtered = (markets ?? []).filter((m) => !q || m.name.toLowerCase().includes(q.toLowerCase()) || m.city.toLowerCase().includes(q.toLowerCase()));
  useEffect(() => {
    if (!mapInstance.current || !mapsLoaded) return;
    markersRef.current.forEach((marker) => marker.setMap(null));
    markersRef.current = [];
    const bounds = new google.maps.LatLngBounds();
    let hasCoords = false;
    filtered.forEach((m) => {
      if (m.lat && m.lng) {
        const lat = Number(m.lat);
        const lng = Number(m.lng);
        const position = {
          lat,
          lng
        };
        bounds.extend(position);
        hasCoords = true;
        const marker = new google.maps.Marker({
          position,
          map: mapInstance.current,
          title: m.name,
          icon: {
            path: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z",
            fillColor: "#1e3a8a",
            fillOpacity: 1,
            strokeColor: "#ffffff",
            strokeWeight: 2,
            scale: 1.5,
            anchor: new google.maps.Point(12, 22)
          }
        });
        const infoWindow = new google.maps.InfoWindow({
          content: `
            <div style="padding: 4px; font-family: sans-serif; max-width: 200px;">
              <h3 style="margin: 0 0 4px 0; font-size: 14px; font-weight: bold; color: #1e3a8a;">${m.name}</h3>
              <p style="margin: 0 0 8px 0; font-size: 12px; color: #4b5563;">${m.address}, ${m.city}</p>
              <div style="display: flex; align-items: center; justify-content: space-between; border-top: 1px solid #f3f4f6; padding-top: 8px; gap: 8px;">
                <span style="font-size: 10px; color: #6b7280; font-weight: 600;">${m.hours || ""}</span>
                <a href="/markets/${m.id}" style="font-size: 12px; color: #127a79; font-weight: bold; text-decoration: none; white-space: nowrap;">Lihat Detail &rarr;</a>
              </div>
            </div>
          `
        });
        marker.addListener("click", () => {
          infoWindow.open(mapInstance.current, marker);
        });
        markersRef.current.push(marker);
      }
    });
    if (hasCoords) {
      mapInstance.current.fitBounds(bounds);
      if (filtered.length === 1) {
        const listener = google.maps.event.addListener(mapInstance.current, "idle", () => {
          if (mapInstance.current) {
            mapInstance.current.setZoom(14);
          }
          google.maps.event.removeListener(listener);
        });
      }
    } else {
      mapInstance.current.setCenter({
        lat: -6.21,
        lng: 106.84
      });
      mapInstance.current.setZoom(11);
    }
  }, [filtered, mapsLoaded]);
  useEffect(() => {
    return () => {
      markersRef.current.forEach((marker) => marker.setMap(null));
      markersRef.current = [];
      mapInstance.current = null;
    };
  }, []);
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-[var(--color-gray-50)]", children: [
    /* @__PURE__ */ jsx("header", { className: "border-b border-[var(--color-gray-100)] bg-white", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto flex max-w-7xl items-center justify-between px-4 py-4", children: [
      /* @__PURE__ */ jsxs(Link, { to: "/", className: "flex items-center gap-2 font-bold", children: [
        /* @__PURE__ */ jsx("span", { className: "inline-flex h-7 w-7 items-center justify-center rounded bg-[var(--color-brand-blue)] text-xs font-black text-white", children: "PC" }),
        "PasarCek"
      ] }),
      /* @__PURE__ */ jsx(Button, { asChild: true, children: /* @__PURE__ */ jsx(Link, { to: "/auth", children: "Masuk" }) })
    ] }) }),
    /* @__PURE__ */ jsxs("main", { className: "mx-auto max-w-7xl px-4 py-10", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-4xl font-black", children: "Pasar Tradisional Terdekat" }),
      /* @__PURE__ */ jsx("p", { className: "mt-2 text-[var(--color-gray-500)]", children: "Lihat lokasi, alamat, dan jam operasional pasar di sekitar Anda." }),
      /* @__PURE__ */ jsxs("div", { className: "mt-6 grid gap-6 lg:grid-cols-[1fr_400px]", children: [
        /* @__PURE__ */ jsx("div", { ref: mapRef, className: "relative z-0 h-[500px] overflow-hidden rounded-lg border border-[var(--color-gray-100)] bg-white shadow-sm" }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Input, { placeholder: "Cari pasar / kota...", value: q, onChange: (e) => setQ(e.target.value) }),
          /* @__PURE__ */ jsx("div", { className: "mt-4 max-h-[440px] space-y-3 overflow-y-auto pr-2", children: filtered.map((m) => /* @__PURE__ */ jsxs(Link, { to: "/markets/$id", params: {
            id: m.id
          }, className: "block rounded-lg border border-[var(--color-gray-100)] bg-white p-4 transition-colors hover:border-[var(--color-brand-blue)]", children: [
            /* @__PURE__ */ jsx("p", { className: "font-bold", children: m.name }),
            /* @__PURE__ */ jsxs("p", { className: "mt-1 flex items-center gap-1 text-xs text-[var(--color-gray-500)]", children: [
              /* @__PURE__ */ jsx(MapPin, { className: "h-3 w-3" }),
              m.address,
              ", ",
              m.city
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "mt-2 flex items-center gap-3 text-xs text-[var(--color-gray-500)]", children: [
              m.hours && /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1", children: [
                /* @__PURE__ */ jsx(Clock, { className: "h-3 w-3" }),
                m.hours
              ] }),
              m.rating > 0 && /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1", children: [
                /* @__PURE__ */ jsx(Star, { className: "h-3 w-3 fill-[var(--color-warning)] text-[var(--color-warning)]" }),
                m.rating
              ] })
            ] })
          ] }, m.id)) })
        ] })
      ] })
    ] })
  ] });
}
export {
  MarketsPage as component
};
