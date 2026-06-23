import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const require = createRequire(import.meta.url);
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
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
import "./chunk-Y5N26HX3.mjs";
import {
  supabase
} from "./chunk-PQEYI6K5.mjs";
import {
  require_lucide_react
} from "./chunk-NDUCSHRX.mjs";
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

// dist/server/assets/markets-CHHJ-jK8.js
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
  const googleMapRef = (0, import_react.useRef)(null);
  const leafletMapRef = (0, import_react.useRef)(null);
  const mapInstance = (0, import_react.useRef)(null);
  const markersRef = (0, import_react.useRef)([]);
  const [mapsLoaded, setMapsLoaded] = (0, import_react.useState)(false);
  const [useLeafletFallback, setUseLeafletFallback] = (0, import_react.useState)(false);
  const leafletMapInstance = (0, import_react.useRef)(null);
  const leafletMarkersGroupRef = (0, import_react.useRef)(null);
  (0, import_react.useEffect)(() => {
    window.gm_authFailure = () => {
      console.warn("Google Maps authentication failed (e.g. invalid key or domain restrictions). Falling back to Leaflet.");
      setUseLeafletFallback(true);
    };
    typeof window !== "undefined" && (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1" || window.location.hostname.includes("192.168."));
    const apiKey = "AIzaSyBmvJph4LmrbtW7skeczzpBIyb9WWzFKo4";
    loadGoogleMapsScript(apiKey).then(() => {
      if (!useLeafletFallback) {
        setMapsLoaded(true);
      }
    }).catch((err) => {
      console.error("Failed to load Google Maps script", err);
      setUseLeafletFallback(true);
    });
    return () => {
      delete window.gm_authFailure;
    };
  }, [useLeafletFallback]);
  (0, import_react.useEffect)(() => {
    if (useLeafletFallback) {
      if (markersRef.current) {
        markersRef.current.forEach((marker) => marker.setMap(null));
        markersRef.current = [];
      }
      mapInstance.current = null;
    }
  }, [useLeafletFallback]);
  (0, import_react.useEffect)(() => {
    if (useLeafletFallback) return;
    if (!mapsLoaded || !googleMapRef.current || mapInstance.current) return;
    mapInstance.current = new google.maps.Map(googleMapRef.current, {
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
  }, [mapsLoaded, useLeafletFallback]);
  (0, import_react.useEffect)(() => {
    if (useLeafletFallback || !googleMapRef.current || !mapsLoaded) return;
    const findInShadowDOM = (root, selector) => {
      const found = root.querySelector(selector);
      if (found) return found;
      const elements = root.querySelectorAll("*");
      for (const el of Array.from(elements)) {
        if (el.shadowRoot) {
          const res = findInShadowDOM(el.shadowRoot, selector);
          if (res) return res;
        }
      }
      return null;
    };
    const findTextInShadowDOM = (root, text) => {
      if (root.textContent && root.textContent.includes(text)) {
        return true;
      }
      const elements = root.querySelectorAll("*");
      for (const el of Array.from(elements)) {
        if (el.shadowRoot) {
          if (findTextInShadowDOM(el.shadowRoot, text)) {
            return true;
          }
        }
      }
      return false;
    };
    const checkForGmapsError = () => {
      if (googleMapRef.current) {
        const hasErrorLink = findInShadowDOM(googleMapRef.current, 'a[href*="error-messages"]') || findInShadowDOM(googleMapRef.current, 'a[href*="staticmaperror"]') || findInShadowDOM(googleMapRef.current, 'a[href*="developers.google.com/maps"]');
        const hasErrorText = findTextInShadowDOM(googleMapRef.current, "Oops!") || findTextInShadowDOM(googleMapRef.current, "Something went wrong") || findTextInShadowDOM(googleMapRef.current, "Maaf!") || findTextInShadowDOM(googleMapRef.current, "Terjadi kesalahan") || findTextInShadowDOM(googleMapRef.current, "tidak memuat Google Maps dengan benar");
        const hasErrorClass = findInShadowDOM(googleMapRef.current, ".gm-err-container") || findInShadowDOM(googleMapRef.current, ".gm-err-content");
        if (hasErrorLink || hasErrorText || hasErrorClass) {
          console.warn("Google Maps error detected via DOM/Shadow DOM scanning. Triggering Leaflet fallback.");
          setUseLeafletFallback(true);
          return true;
        }
      }
      return false;
    };
    const interval = setInterval(() => {
      if (checkForGmapsError()) {
        clearInterval(interval);
      }
    }, 500);
    const timeout = setTimeout(() => {
      clearInterval(interval);
    }, 6e3);
    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [mapsLoaded, useLeafletFallback]);
  const filtered = (markets ?? []).filter((m) => !q || m.name.toLowerCase().includes(q.toLowerCase()) || m.city.toLowerCase().includes(q.toLowerCase()));
  (0, import_react.useEffect)(() => {
    if (useLeafletFallback || !mapInstance.current || !mapsLoaded) return;
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
  }, [filtered, mapsLoaded, useLeafletFallback]);
  (0, import_react.useEffect)(() => {
    if (!useLeafletFallback || !leafletMapRef.current) return;
    Promise.all([
      import("./leaflet-src-TASTLXSQ.mjs"),
      // @ts-ignore
      Promise.resolve({})
    ]).then(([leafletModule]) => {
      const L = leafletModule.default || leafletModule;
      if (!leafletMapRef.current) return;
      if (!leafletMapInstance.current) {
        leafletMapInstance.current = L.map(leafletMapRef.current, {
          center: [-6.21, 106.84],
          zoom: 11,
          zoomControl: false
        });
        L.control.zoom({
          position: "bottomright"
        }).addTo(leafletMapInstance.current);
        L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png", {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
          subdomains: "abcd",
          maxZoom: 20
        }).addTo(leafletMapInstance.current);
        leafletMarkersGroupRef.current = L.layerGroup().addTo(leafletMapInstance.current);
      }
      if (leafletMarkersGroupRef.current) {
        leafletMarkersGroupRef.current.clearLayers();
      }
      const customIcon = L.divIcon({
        className: "custom-leaflet-icon",
        html: `
          <div class="flex items-center justify-center w-8 h-8 rounded-full bg-[#1e3a8a] text-white shadow-lg border-2 border-white transform transition-transform hover:scale-110 hover:bg-[#127a79]">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4 text-white">
              <path fill-rule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" />
            </svg>
          </div>
        `,
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32]
      });
      const coords = [];
      filtered.forEach((m) => {
        if (m.lat && m.lng) {
          const lat = Number(m.lat);
          const lng = Number(m.lng);
          coords.push([lat, lng]);
          const marker = L.marker([lat, lng], {
            icon: customIcon
          });
          const popupContent = `
            <div class="p-1 font-sans">
              <h3 class="font-bold text-sm text-[#1e3a8a]">${m.name}</h3>
              <p class="text-xs text-gray-600 mt-1">${m.address}, ${m.city}</p>
              <div class="mt-2 flex items-center justify-between border-t border-gray-100 pt-2 gap-4">
                <span class="text-[10px] text-gray-500 font-semibold">${m.hours || ""}</span>
                <a href="/markets/${m.id}" class="text-xs text-[#127a79] font-bold hover:underline whitespace-nowrap">Lihat Detail &rarr;</a>
              </div>
            </div>
          `;
          marker.bindPopup(popupContent, {
            maxWidth: 220,
            className: "custom-leaflet-popup"
          });
          leafletMarkersGroupRef.current?.addLayer(marker);
        }
      });
      if (coords.length > 0 && leafletMapInstance.current) {
        const bounds = L.latLngBounds(coords);
        leafletMapInstance.current.fitBounds(bounds, {
          padding: [50, 50],
          maxZoom: 14
        });
      } else if (leafletMapInstance.current) {
        leafletMapInstance.current.setView([-6.21, 106.84], 11);
      }
    }).catch((err) => {
      console.error("Failed to load leaflet modules dynamically", err);
    });
  }, [useLeafletFallback, filtered]);
  (0, import_react.useEffect)(() => {
    return () => {
      if (leafletMapInstance.current) {
        leafletMapInstance.current.remove();
        leafletMapInstance.current = null;
      }
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
        useLeafletFallback ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { ref: leafletMapRef, className: "relative z-0 h-[500px] overflow-hidden rounded-lg border border-[var(--color-gray-100)] bg-white shadow-sm" }, "leaflet-container") : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { ref: googleMapRef, className: "relative z-0 h-[500px] overflow-hidden rounded-lg border border-[var(--color-gray-100)] bg-white shadow-sm" }, "google-container"),
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
