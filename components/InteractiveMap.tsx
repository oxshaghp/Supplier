// components/InteractiveMap.tsx
"use client";

import { useEffect, useRef, useState } from "react";

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

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient || !mapRef.current) return;

    // Dynamic import لـ Leaflet
    const initMap = async () => {
      const L = await import("leaflet");

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

      // Add OpenStreetMap tiles
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 18,
        minZoom: 3, // نسمح بالـ zoom out أكثر
      }).addTo(mapInstance);
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
        🇸🇦 العودة للسعودية
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
  }, [isClient]);

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
              box-shadow: 0 2px 6px rgba(0,0,0,0.3);
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

        // Add popup
        const popupContent = `
          <div class="p-3 min-w-48">
            <h4 class="font-bold text-gray-900 text-sm mb-2">${business.name}</h4>
            <p class="text-gray-600 text-xs mb-2">${business.address}</p>
            <div class="flex justify-between items-center">
              <span class="px-2 py-1 rounded-full text-white text-xs" style="background: ${markerColor}">
                ${business.type}
              </span>
              <button onclick="window.handleMapBusinessClick(${business.id})" 
                class="text-blue-500 hover:text-blue-700 text-xs cursor-pointer ml-2">
                View Details
              </button>
            </div>
          </div>
        `;

        marker.bindPopup(popupContent);

        // Add click event
        marker.on("click", () => {
          onBusinessClick(business);
        });

        // Add hover events
        marker.on("mouseover", () => {
          marker.openPopup();
        });

        marker.on("mouseout", () => {
          marker.closePopup();
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
    <div className="bg-gray-100 rounded-2xl overflow-hidden shadow-xl h-64 sm:h-80 md:h-[28rem] relative">
      <div ref={mapRef} className="w-full h-full rounded-2xl" />
    </div>
  );
};

export default InteractiveMap;
