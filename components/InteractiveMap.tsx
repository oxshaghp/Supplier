// components/InteractiveMap.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/lib/LanguageContext";

// Define types
interface Business {
  id: number;
  name: string;
  address: string;
  lat: number;
  lng: number;
  type: string;
  category: string;
  phone?: string;
  email?: string;
}

interface MapProps {
  businesses: Business[];
  onBusinessClick: (business: Business) => void;
}

const InteractiveMap = ({ businesses, onBusinessClick }: MapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<any>(null);
  const [markers, setMarkers] = useState<any[]>([]);
  const [isClient, setIsClient] = useState(false);
  const tileLayerRef = useRef<any>(null);
  const { language } = useLanguage();

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient || !mapRef.current || map) return;

    // Dynamic import لـ Leaflet
    const initMap = async () => {
      const L = await import("leaflet");
      // Load MapTiler Leaflet SDK to augment L with maptilerLayer (for vector multilingual tiles)
      await import("@maptiler/leaflet-maptilersdk");

      // إصلاح مشكلة الـ default markers
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
        iconUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
        shadowUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
      });

      // Initialize map - نبدأ بمنطقة السعودية
      const mapInstance = L.map(mapRef.current!).setView([23.8859, 45.0792], 6);

      // Force low z-index for all map panes so it never overlaps other UI
      const panes = mapInstance.getPanes();
      if (panes?.mapPane) panes.mapPane.style.zIndex = "0";
      if (panes?.tilePane) panes.tilePane.style.zIndex = "0";
      if (panes?.overlayPane) panes.overlayPane.style.zIndex = "0";
      if (panes?.shadowPane) panes.shadowPane.style.zIndex = "0";
      if (panes?.markerPane) panes.markerPane.style.zIndex = "0";
      if (panes?.popupPane) panes.popupPane.style.zIndex = "0";
      if ((panes as any) && (panes as any).tooltipPane)
        (panes as any).tooltipPane.style.zIndex = "1";
      const controlContainer = mapInstance
        .getContainer()
        .querySelector(".leaflet-control-container") as HTMLElement | null;
      if (controlContainer) controlContainer.style.zIndex = "0";

      // Choose tile source. Prefer MapTiler SDK for language switching; fallback to OSM.
      const mapTilerKey = process.env.NEXT_PUBLIC_MAPTILER_KEY;
      if (mapTilerKey) {
        const { MaptilerLayer } = await import("@maptiler/leaflet-maptilersdk");
        const layer = new MaptilerLayer({
          apiKey: mapTilerKey,
          style: "streets-v2",
          language: language === "ar" ? "ar" : "en",
        });
        tileLayerRef.current = layer;
        layer.addTo(mapInstance);
      } else {
        const tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
        tileLayerRef.current = L.tileLayer(tileUrl, {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          maxZoom: 18,
          minZoom: 3, // نسمح بالـ zoom out أكثر
        }).addTo(mapInstance);
      }
      // Add custom control to reset to Saudi Arabia
      const ResetControl = L.Control.extend({
        onAdd: function () {
          const div = L.DomUtil.create("div", "reset-control");
          div.innerHTML = `
      <button style="
        background: white; 
        border: 2px solid #3B82F6;
        border-radius: 5px;
        padding: 8px 16px;
        cursor: pointer;
        font-weight: bold;
        color: #3B82F6;
        box-shadow: 0 2px 8px rgba(0,0,0,0.2);
        transition: all 0.2s;
      " 
      onmouseover="this.style.background='#f0f9ff'; this.style.transform='scale(1.05)'"
      onmouseout="this.style.background='white'; this.style.transform='scale(1)'"
      title="Back to Saudi Arabia">
        🇸🇦
      </button>
    `;
          div.onclick = () => {
            mapInstance.setView([23.8859, 45.0792], 6);
          };
          return div;
        },
        options: {
          position: "topright",
        },
      });
      const resetControl = new ResetControl();
      resetControl.addTo(mapInstance);

      setMap(mapInstance);

      return () => {
        mapInstance.remove();
      };
    };

    initMap();
  }, [isClient, map]);

  // Update base tiles when language changes (for MapTiler). If no key, OSM remains unchanged.
  useEffect(() => {
    if (!map || !isClient) return;
    const updateTiles = async () => {
      const L = await import("leaflet");
      await import("@maptiler/leaflet-maptilersdk");
      const mapTilerKey = process.env.NEXT_PUBLIC_MAPTILER_KEY;
      if (!mapTilerKey) return; // OSM doesn't support language switching
      if (tileLayerRef.current) {
        map.removeLayer(tileLayerRef.current);
      }
      const { MaptilerLayer } = await import("@maptiler/leaflet-maptilersdk");
      const layer = new MaptilerLayer({
        apiKey: mapTilerKey,
        style: "bright-v2",
        language: language === "ar" ? "ar" : "en",
      });
      tileLayerRef.current = layer;
      layer.addTo(map);
    };
    updateTiles();
  }, [language, map, isClient]);

  // Update markers when businesses change - هذا هو الـ useEffect الجديد
  useEffect(() => {
    if (!map || !isClient) return;

    const updateMarkers = async () => {
      const L = await import("leaflet");

      // Remove existing markers
      markers.forEach((marker) => marker.removeFrom(map));
      const newMarkers: any[] = [];

      businesses.forEach((business) => {
        const markerColor = getBusinessMarkerColor(business.type);

        // Create custom marker
        const customIcon = L.divIcon({
          className: "custom-marker",
          html: `
            <div style="
              background-color: ${markerColor};
              width: 20px;
              height: 20px;
              border-radius: 50%;
              border: 3px solid white;
              box-shadow: none;
              cursor: pointer;
            "></div>
          `,
          iconSize: [20, 20],
          iconAnchor: [10, 10],
        });

        const marker = L.marker([business.lat, business.lng], {
          icon: customIcon,
          title: business.name,
        }).addTo(map);

        // Build hover tooltip content to show above the dot
        const isRtl = language === "ar";
        const viewDetailsLabel = (window as any).__map_viewDetails || ""; // placeholder if needed
        const directionsLabel = (window as any).__map_getDirections || ""; // placeholder if needed
        const tooltipContent = `
          <div style="background:#fff;border:1px solid #e5e7eb;border-radius:12px;padding:12px 14px;min-width:240px;box-shadow:0 8px 20px rgba(0,0,0,0.12);${
            isRtl ? "direction:rtl;text-align:right;" : ""
          }">
            <div style="font-weight:700;color:#111827;font-size:14px;margin-bottom:6px;">${
              business.name
            }</div>
            <div style="color:#6b7280;font-size:12px;margin-bottom:10px;">${
              business.address
            }</div>
            <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;${
              isRtl ? "flex-direction:row-reverse;" : ""
            }">
              <span style="padding:4px 8px;border-radius:9999px;background:#111827;color:#fff;font-size:11px;font-weight:600;">${
                business.type
              }</span>
              <div style="display:flex;gap:8px;${
                isRtl ? "flex-direction:row-reverse;" : ""
              }">
                <button class="leaflet-btn-view" data-id="${
                  business.id
                }" style="padding:6px 10px;font-size:12px;border-radius:8px;background:#f59e0b;color:#fff;cursor:pointer;border:none;white-space:nowrap;">${
          language === "ar" ? "عرض التفاصيل" : "View Details"
        }</button>
                <button class="leaflet-btn-dir" data-id="${
                  business.id
                }" style="padding:6px 10px;font-size:12px;border-radius:8px;background:#2563eb;color:#fff;cursor:pointer;border:none;white-space:nowrap;">${
          language === "ar" ? "الاتجاهات" : "Directions"
        }</button>
              </div>
            </div>
          </div>
        `;

        marker.bindTooltip(tooltipContent, {
          direction: "top",
          offset: [0, -4],
          opacity: 1,
          permanent: false,
          sticky: true,
          interactive: true,
          className: "leaflet-business-tooltip",
        });

        // Hover behavior: show tooltip and update external selection (for highlight)
        let isTooltipHovered = false;
        marker.on("mouseover", () => {
          marker.openTooltip();
          onBusinessClick(business);
          const tt: any =
            (marker as any).getTooltip && (marker as any).getTooltip();
          const el: HTMLElement | null =
            tt && tt.getElement ? tt.getElement() : null;
          if (el) {
            el.style.pointerEvents = "auto";
            if (!(el as any)._hoverBound) {
              el.addEventListener("mouseenter", () => {
                isTooltipHovered = true;
                marker.openTooltip();
              });
              el.addEventListener("mouseleave", () => {
                isTooltipHovered = false;
              });
              // Attach click handlers for buttons
              const onView = (e: Event) => {
                e.preventDefault();
                e.stopPropagation();
                const id = (e.currentTarget as HTMLElement).getAttribute(
                  "data-id"
                );
                if (id && (window as any).handleMapViewDetails) {
                  (window as any).handleMapViewDetails(Number(id));
                }
              };
              const onDir = (e: Event) => {
                e.preventDefault();
                e.stopPropagation();
                const id = (e.currentTarget as HTMLElement).getAttribute(
                  "data-id"
                );
                if (id && (window as any).handleMapGetDirections) {
                  (window as any).handleMapGetDirections(Number(id));
                }
              };
              const viewBtn = el.querySelector(".leaflet-btn-view");
              const dirBtn = el.querySelector(".leaflet-btn-dir");
              if (viewBtn && !(viewBtn as any)._bound) {
                viewBtn.addEventListener("click", onView);
                (viewBtn as any)._bound = true;
              }
              if (dirBtn && !(dirBtn as any)._bound) {
                dirBtn.addEventListener("click", onDir);
                (dirBtn as any)._bound = true;
              }
              (el as any)._hoverBound = true;
            }
          }
        });
        // Delay close and keep open if pointer moved into the tooltip element
        marker.on("mouseout", () => {
          setTimeout(() => {
            const tt: any =
              (marker as any).getTooltip && (marker as any).getTooltip();
            const el: HTMLElement | null =
              tt && tt.getElement ? tt.getElement() : null;
            const markerEl: HTMLElement | null = (marker as any).getElement
              ? (marker as any).getElement()
              : null;
            const stillOnMarker = !!(markerEl && markerEl.matches(":hover"));
            if (!(el && el.matches(":hover")) && !stillOnMarker) {
              marker.closeTooltip();
            }
          }, 400);
        });

        newMarkers.push(marker);
      });

      setMarkers(newMarkers);

      // Fit map to show all markers if there are any
      if (businesses.length > 0) {
        const group = L.featureGroup(newMarkers);
        map.fitBounds(group.getBounds(), { padding: [20, 20] });
      }
    };

    updateMarkers();
  }, [map, isClient, businesses, onBusinessClick]);

  const getBusinessMarkerColor = (type: string) => {
    const colors: { [key: string]: string } = {
      Electronics: "#3B82F6",
      Automotive: "#EF4444",
      Agriculture: "#10B981",
      Industrial: "#F59E0B",
      Construction: "#EAB308",
      Fashion: "#EC4899",
      Medical: "#14B8A6",
      Food: "#F97316",
      Technology: "#8B5CF6",
      "Oil&Gas": "#000000",
      Marine: "#1D4ED8",
      Mining: "#78716C",
      Tourism: "#F43F5E",
      Textiles: "#D946EF",
      Equipment: "#475569",
      Military: "#166534",
      Logistics: "#1E40AF",
      Port: "#1E3A8A",
      Fishing: "#60A5FA",
      Perfumes: "#7C3AED",
      Petrochemical: "#374151",
    };
    return colors[type] || "#6B7280";
  };

  if (!isClient) {
    return (
      <div className="bg-gray-100 rounded-2xl h-64 sm:h-80 md:h-[28rem] flex items-center justify-center">
        <div className="text-center">
          <i className="ri-map-pin-line text-3xl text-yellow-500 mb-2 animate-pulse"></i>
          <p className="text-gray-600">Loading map...</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="bg-gray-100 rounded-2xl overflow-hidden shadow-xl h-64 sm:h-80 md:h-[28rem] relative z-0"
      style={{ zIndex: 0 }}
    >
      <div
        ref={mapRef}
        className="w-full h-full rounded-2xl z-0"
        style={{ zIndex: 0 }}
      />
    </div>
  );
};

export default InteractiveMap;
