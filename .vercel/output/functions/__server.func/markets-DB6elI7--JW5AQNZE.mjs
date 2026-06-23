import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const require = createRequire(import.meta.url);
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import {
  require_lucide_react
} from "./chunk-NDUCSHRX.mjs";
import {
  Input
} from "./chunk-KM4Y5GSG.mjs";
import {
  useQuery
} from "./chunk-DH7FIRD7.mjs";
import {
  Button
} from "./chunk-AVRRWDIK.mjs";
import "./chunk-NXBQQK3G.mjs";
import "./chunk-IHLGWONG.mjs";
import {
  supabase
} from "./chunk-PQEYI6K5.mjs";
import "./chunk-Y5N26HX3.mjs";
import {
  Link
} from "./chunk-FO6XWC3V.mjs";
import "./chunk-26CBNBTQ.mjs";
import {
  require_jsx_runtime,
  require_react
} from "./chunk-RTXGIA7H.mjs";
import {
  __toESM
} from "./chunk-G2MDZA75.mjs";

// dist/server/assets/markets-DB6elI7-.js
var import_jsx_runtime = __toESM(require_jsx_runtime(), 1);
var import_react = __toESM(require_react(), 1);
var import_lucide_react = __toESM(require_lucide_react(), 1);
var scriptLoaded = false;
var scriptLoadingPromise = null;
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
  const [q, setQ] = (0, import_react.useState)("");
  const {
    data: markets
  } = useQuery({
    queryKey: ["markets-public"],
    queryFn: async () => (await supabase.from("markets").select("*").eq("is_active", true).order("name")).data ?? []
  });
  const mapRef = (0, import_react.useRef)(null);
  const mapInstance = (0, import_react.useRef)(null);
  const markersRef = (0, import_react.useRef)([]);
  const [mapsLoaded, setMapsLoaded] = (0, import_react.useState)(false);
  (0, import_react.useEffect)(() => {
    const apiKey = "AIzaSyBmvJph4LmrbtW7skeczzpBIyb9WWzFKo4";
    loadGoogleMapsScript(apiKey).then(() => setMapsLoaded(true)).catch((err) => console.error("Failed to load Google Maps script", err));
  }, []);
  (0, import_react.useEffect)(() => {
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
  (0, import_react.useEffect)(() => {
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
  (0, import_react.useEffect)(() => {
    return () => {
      markersRef.current.forEach((marker) => marker.setMap(null));
      markersRef.current = [];
      mapInstance.current = null;
    };
  }, []);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "min-h-screen bg-[var(--color-gray-50)]", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", { className: "border-b border-[var(--color-gray-100)] bg-white", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "mx-auto flex max-w-7xl items-center justify-between px-4 py-4", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, { to: "/", className: "flex items-center gap-2 font-bold", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "inline-flex h-7 w-7 items-center justify-center rounded bg-[var(--color-brand-blue)] text-xs font-black text-white", children: "PC" }),
        "PasarCek"
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, { asChild: true, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, { to: "/auth", children: "Masuk" }) })
    ] }) }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { className: "mx-auto max-w-7xl px-4 py-10", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { className: "text-4xl font-black", children: "Pasar Tradisional Terdekat" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "mt-2 text-[var(--color-gray-500)]", children: "Lihat lokasi, alamat, dan jam operasional pasar di sekitar Anda." }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "mt-6 grid gap-6 lg:grid-cols-[1fr_400px]", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { ref: mapRef, className: "relative z-0 h-[500px] overflow-hidden rounded-lg border border-[var(--color-gray-100)] bg-white shadow-sm" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, { placeholder: "Cari pasar / kota...", value: q, onChange: (e) => setQ(e.target.value) }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mt-4 max-h-[440px] space-y-3 overflow-y-auto pr-2", children: filtered.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, { to: "/markets/$id", params: {
            id: m.id
          }, className: "block rounded-lg border border-[var(--color-gray-100)] bg-white p-4 transition-colors hover:border-[var(--color-brand-blue)]", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "font-bold", children: m.name }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { className: "mt-1 flex items-center gap-1 text-xs text-[var(--color-gray-500)]", children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.MapPin, { className: "h-3 w-3" }),
              m.address,
              ", ",
              m.city
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "mt-2 flex items-center gap-3 text-xs text-[var(--color-gray-500)]", children: [
              m.hours && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "flex items-center gap-1", children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Clock, { className: "h-3 w-3" }),
                m.hours
              ] }),
              m.rating > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "flex items-center gap-1", children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Star, { className: "h-3 w-3 fill-[var(--color-warning)] text-[var(--color-warning)]" }),
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
