import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useQuery } from "../_libs/tanstack__react-query.mjs";
import { s as supabase } from "./client-B2Ztv5jM.mjs";
import { B as Button } from "./button-BC9oXVxV.mjs";
import { I as Input } from "./input-C0QjszdI.mjs";
import { b as MapPin, c as Clock, d as Star } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "./utils-H80jjgLf.mjs";
import "../_libs/tailwind-merge.mjs";
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
  const [q, setQ] = reactExports.useState("");
  const {
    data: markets
  } = useQuery({
    queryKey: ["markets-public"],
    queryFn: async () => (await supabase.from("markets").select("*").eq("is_active", true).order("name")).data ?? []
  });
  const mapRef = reactExports.useRef(null);
  const mapInstance = reactExports.useRef(null);
  const markersRef = reactExports.useRef([]);
  const [mapsLoaded, setMapsLoaded] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const apiKey = "AIzaSyBmvJph4LmrbtW7skeczzpBIyb9WWzFKo4";
    loadGoogleMapsScript(apiKey).then(() => setMapsLoaded(true)).catch((err) => console.error("Failed to load Google Maps script", err));
  }, []);
  reactExports.useEffect(() => {
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
  reactExports.useEffect(() => {
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
  reactExports.useEffect(() => {
    return () => {
      markersRef.current.forEach((marker) => marker.setMap(null));
      markersRef.current = [];
      mapInstance.current = null;
    };
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-[var(--color-gray-50)]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "border-b border-[var(--color-gray-100)] bg-white", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto flex max-w-7xl items-center justify-between px-4 py-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "flex items-center gap-2 font-bold", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex h-7 w-7 items-center justify-center rounded bg-[var(--color-brand-blue)] text-xs font-black text-white", children: "PC" }),
        "PasarCek"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/auth", children: "Masuk" }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "mx-auto max-w-7xl px-4 py-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl font-black", children: "Pasar Tradisional Terdekat" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-[var(--color-gray-500)]", children: "Lihat lokasi, alamat, dan jam operasional pasar di sekitar Anda." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 grid gap-6 lg:grid-cols-[1fr_400px]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: mapRef, className: "relative z-0 h-[500px] overflow-hidden rounded-lg border border-[var(--color-gray-100)] bg-white shadow-sm" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { placeholder: "Cari pasar / kota...", value: q, onChange: (e) => setQ(e.target.value) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 max-h-[440px] space-y-3 overflow-y-auto pr-2", children: filtered.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/markets/$id", params: {
            id: m.id
          }, className: "block rounded-lg border border-[var(--color-gray-100)] bg-white p-4 transition-colors hover:border-[var(--color-brand-blue)]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold", children: m.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 flex items-center gap-1 text-xs text-[var(--color-gray-500)]", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-3 w-3" }),
              m.address,
              ", ",
              m.city
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 flex items-center gap-3 text-xs text-[var(--color-gray-500)]", children: [
              m.hours && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-3 w-3" }),
                m.hours
              ] }),
              m.rating > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "h-3 w-3 fill-[var(--color-warning)] text-[var(--color-warning)]" }),
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
