"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";

// Custom Hotspot function to create a permanent text tooltip below the arrow
const customHotspot = (hotSpotDiv: HTMLDivElement, args: string) => {
  hotSpotDiv.classList.add('custom-tooltip');
  const span = document.createElement('span');
  span.innerHTML = args;
  span.className = 'custom-hotspot-text';
  hotSpotDiv.appendChild(span);
};

export default function VirtualTour() {
  const viewerRef = useRef<PannellumViewer | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Function to calculate HFOV to fit height
  const calculateHfov = () => {
    if (typeof window === "undefined") return 75;
    const vaov = 80;
    const aspect = window.innerWidth / window.innerHeight;
    const hfov = 2 * Math.atan(Math.tan((vaov / 2) * (Math.PI / 180)) * aspect) * (180 / Math.PI);
    return Math.max(10, Math.min(hfov, 120));
  };

  useEffect(() => {
    const initViewer = () => {
      if (window.pannellum && containerRef.current && !viewerRef.current) {
        const initialHfov = calculateHfov();

        const scenesConfig: any = {
          "main_gate": {
            "title": "Main Gate",
            "panorama": "main_gate.jpeg",
            "hotSpots": [
              { "pitch": -5, "yaw": 60, "type": "scene", "text": "Go to Admin Block", "sceneId": "admin_block" }
            ]
          },
          "admin_block": {
            "title": "Admin Block",
            "panorama": "admin_block.jpeg",
            "hotSpots": [
              { "pitch": -5, "yaw": 160, "type": "scene", "text": "Go back to Main Gate", "sceneId": "main_gate" },
              { "pitch": -5, "yaw": -55, "type": "scene", "text": "Go inside Admin Block", "sceneId": "admin_inside" }
            ]
          },
          "admin_inside": {
            "title": "Admin Block Inside",
            "panorama": "admin_inside.jpeg",
            "hotSpots": [
              { "pitch": -5, "yaw": 60, "type": "scene", "text": "Go back outside Admin Block", "sceneId": "main_gate" },
              { "pitch": -5, "yaw": -150, "type": "scene", "text": "Go to KRC", "sceneId": "krc" },
              { "pitch": -5, "yaw": -138, "type": "scene", "text": "Go to Central Library", "sceneId": "central_library" }
            ]
          },
          "krc": {
            "title": "KRC",
            "panorama": "krc.jpeg",
            "hotSpots": [
              { "pitch": -5, "yaw": -75, "type": "scene", "text": "Go to UIT", "sceneId": "uit" },
              { "pitch": -5, "yaw": 40, "type": "scene", "text": "Go back to Admin Block", "sceneId": "admin_inside" }
            ]
          },
          "central_library": {
            "title": "Central Library",
            "panorama": "central_lib.jpeg",
            "hotSpots": [
              { "pitch": -5, "yaw": 150, "type": "scene", "text": "Go back to Admin Block", "sceneId": "admin_inside" },
              { "pitch": -5, "yaw": -145, "type": "scene", "text": "Go to UIT", "sceneId": "uit" }
            ]
          },
          "uit": {
            "title": "UIT",
            "panorama": "uit.jpeg",
            "hotSpots": [
              { "pitch": -5, "yaw": 160, "type": "scene", "text": "Go to KRC", "sceneId": "krc" },
              { "pitch": -5, "yaw": -45, "type": "scene", "text": "Go to ECE Department", "sceneId": "ece_dept" },
              { "pitch": -5, "yaw": 120, "type": "scene", "text": "Go back to Library", "sceneId": "central_library" }
            ]
          },
          "ece_dept": {
            "title": "ECE Department",
            "panorama": "ece_dept.jpeg",
            "hotSpots": [
              { "pitch": -10, "yaw": 118, "type": "scene", "text": "Go to UIT", "sceneId": "uit" },
              { "pitch": -5, "yaw": -112, "type": "scene", "text": "Go to Civil Department", "sceneId": "civil_dept" }
            ]
          },
          "civil_dept": {
            "title": "Civil Department",
            "panorama": "civil_dept.jpeg",
            "hotSpots": [
              { "pitch": 0, "yaw": -103, "type": "scene", "text": "Go to SoIT", "sceneId": "soit_main" },
              { "pitch": -5, "yaw": 130, "type": "scene", "text": "Go to ECE Department", "sceneId": "ece_dept" }
            ]
          },
          "soit_main": {
            "title": "SOIT Main",
            "panorama": "SOIT_main.jpeg",
            "hotSpots": [
              { "pitch": -25, "yaw": 17, "type": "scene", "text": "Go to Ground Floor", "sceneId": "ground_floor" },
              { "pitch": -25, "yaw": 125, "type": "scene", "text": "Go back to Civil Department", "sceneId": "civil_dept" }
            ]
          },
          "ground_floor": {
            "title": "Ground Floor",
            "panorama": "Ground_floor.jpeg",
            "hotSpots": [
              { "pitch": 0, "yaw": 70, "type": "scene", "text": "Exit SoIT", "sceneId": "soit_main" },
              { "pitch": 0, "yaw": -145, "type": "scene", "text": "To Stairs (1st Floor)", "sceneId": "stairs_1st" }
            ]
          },
          "stairs_1st": {
            "title": "Stairs to 1st Floor",
            "panorama": "Stairs_to_1st_Floor.jpeg",
            "hotSpots": [
              { "pitch": -10, "yaw": 170, "type": "scene", "text": "Back to Ground Floor", "sceneId": "ground_floor" },
              { "pitch": 10, "yaw": -140, "type": "scene", "text": "Up to 1st Floor", "sceneId": "first_floor" }
            ]
          },
          "first_floor": {
            "title": "First Floor",
            "panorama": "First floor.jpeg",
            "hotSpots": [
              { "pitch": -10, "yaw": 160, "type": "scene", "text": "Down Stairs", "sceneId": "stairs_1st" },
              { "pitch": 0, "yaw": -110, "type": "scene", "text": "Cyber Lab", "sceneId": "cyber_lab" },
              { "pitch": 0, "yaw": -170, "type": "scene", "text": "Washroom", "sceneId": "washroom" },
              { "pitch": 0, "yaw": 45, "type": "scene", "text": "Office", "sceneId": "office" },
              { "pitch": 0, "yaw": 120, "type": "scene", "text": "Way to 2nd Floor", "sceneId": "way_2nd" }
            ]
          },
          "cyber_lab": {
            "title": "Cyber Lab",
            "panorama": "Cyber_Lab.jpeg",
            "hotSpots": [{ "pitch": 0, "yaw": 120, "type": "scene", "text": "Back to 1st Floor", "sceneId": "first_floor" }]
          },
          "washroom": {
            "title": "Washroom",
            "panorama": "Washroom.jpeg",
            "hotSpots": [
              { "pitch": 0, "yaw": 20, "type": "scene", "text": "Back to 1st Floor", "sceneId": "first_floor" },
              { "pitch": 0, "yaw": -146, "type": "scene", "text": "To BS 1st", "sceneId": "bs_1st" }
            ]
          },
          "bs_1st": {
            "title": "BS 1st",
            "panorama": "BS_1st.jpeg",
            "hotSpots": [
              { "pitch": 0, "yaw": 20, "type": "scene", "text": "Back to Washroom", "sceneId": "washroom" },
              { "pitch": 0, "yaw": -100, "type": "scene", "text": "To BS 2nd", "sceneId": "bs_2nd" }
            ]
          },
          "bs_2nd": {
            "title": "BS 2nd",
            "panorama": "BS_2nd.jpeg",
            "hotSpots": [
              { "pitch": 0, "yaw": 36, "type": "scene", "text": "Back to BS 1st", "sceneId": "bs_1st" },
              { "pitch": 0, "yaw": -35, "type": "scene", "text": "DS Lab", "sceneId": "ds_lab" }
            ]
          },
          "ds_lab": {
            "title": "DS Lab",
            "panorama": "DS_Lab.jpeg",
            "hotSpots": [{ "pitch": 0, "yaw": 80, "type": "scene", "text": "Back to BS 2nd", "sceneId": "bs_2nd" }]
          },
          "office": {
            "title": "Office",
            "panorama": "Office.jpeg",
            "hotSpots": [
              { "pitch": 0, "yaw": 82, "type": "scene", "text": "Back to 1st Floor", "sceneId": "first_floor" },
              { "pitch": 0, "yaw": 170, "type": "scene", "text": "Conference Hall", "sceneId": "conf_hall" },
              { "pitch": 0, "yaw": -18, "type": "scene", "text": "Staff Room", "sceneId": "staff_room" }
            ]
          },
          "conf_hall": {
            "title": "Conference Hall",
            "panorama": "Conference_Hall.jpeg",
            "hotSpots": [{ "pitch": 0, "yaw": -60, "type": "scene", "text": "Back to Office", "sceneId": "office" }]
          },
          "staff_room": {
            "title": "Staff Room",
            "panorama": "Staff room.jpeg",
            "hotSpots": [{ "pitch": 0, "yaw": -140, "type": "scene", "text": "Back to Office", "sceneId": "office" }]
          },
          "way_2nd": {
            "title": "Way to 2nd Floor",
            "panorama": "Way_2nd_Floor.jpeg",
            "hotSpots": [
              { "pitch": -10, "yaw": 140, "type": "scene", "text": "Back to 1st Floor", "sceneId": "first_floor" },
              { "pitch": 10, "yaw": 0, "type": "scene", "text": "Up to 2nd Floor", "sceneId": "corr_2nd" }
            ]
          },
          "corr_2nd": {
            "title": "2nd Floor Corridor",
            "panorama": "2nd_Floor_Corridoor.jpeg",
            "hotSpots": [
              { "pitch": -10, "yaw": 80, "type": "scene", "text": "Down to Way 2nd Floor", "sceneId": "way_2nd" },
              { "pitch": 0, "yaw": 128, "type": "scene", "text": "Terrace", "sceneId": "terrace" },
              { "pitch": 0, "yaw": -15, "type": "scene", "text": "AIML Class", "sceneId": "aiml_class" }
            ]
          },
          "terrace": {
            "title": "Terrace",
            "panorama": "Terrace.jpeg",
            "hotSpots": [{ "pitch": 0, "yaw": 180, "type": "scene", "text": "Back to 2nd Floor", "sceneId": "corr_2nd" }]
          },
          "aiml_class": {
            "title": "AIML Class",
            "panorama": "AIML_Class.jpeg",
            "hotSpots": [{ "pitch": 0, "yaw": 90, "type": "scene", "text": "Back to 2nd Floor", "sceneId": "corr_2nd" }]
          }
        };

        // Inject tooltips and clean transition logic
        Object.keys(scenesConfig).forEach(sceneKey => {
          const scene = scenesConfig[sceneKey];
          if (scene.hotSpots) {
            scene.hotSpots.forEach((hotSpot: any) => {
              if (hotSpot.text) {
                hotSpot.createTooltipFunc = customHotspot;
                hotSpot.createTooltipArgs = hotSpot.text;
              }

              if (hotSpot.type === "scene") {
                hotSpot.type = "info"; // Keep it info to trigger custom look-at
                hotSpot.clickHandlerFunc = (event: any, args: any) => {
                  const v = viewerRef.current;
                  if (!v) return;

                  // Smoothly turn to face the door (300ms)
                  v.setPitch(hotSpot.pitch, 300);
                  v.setYaw(hotSpot.yaw, 300);

                  // Wait for the turn, then instantly load the new scene with no zoom applied
                  setTimeout(() => {
                    v.loadScene(args.sceneId, undefined, undefined, calculateHfov());
                    // v.loadScene(args.sceneId, "same", "same", calculateHfov());
                  }, 350);
                };
                hotSpot.clickHandlerArgs = { sceneId: hotSpot.sceneId };
              }
            });
          }
        });

        viewerRef.current = window.pannellum.viewer(containerRef.current, {
          "default": {
            "firstScene": "main_gate",
            "sceneFadeDuration": 1000, // Reverted to standard fade
            "autoLoad": true,
            "type": "equirectangular",
            "haov": 360,
            "vaov": 80,
            "minPitch": -35,
            "maxPitch": 35,
            "vOffset": 0,
            "minHfov": 10,
            "hfov": initialHfov,
            "autoRotate": 2,
            "autoRotateInactivityDelay": 3000,
            "basePath": "/panoramas/",
            "friction": 0.06      // Kept the momentum physics
          },
          "scenes": scenesConfig
        });

        const handleResize = () => {
          if (viewerRef.current) {
            viewerRef.current.setHfov(calculateHfov());
          }
        };
        window.addEventListener('resize', handleResize);

        if (containerRef.current) {
          containerRef.current.addEventListener('mousedown', (e: MouseEvent) => {
            if (viewerRef.current) {
              const coords = viewerRef.current.mouseEventToCoords(e);
              console.log("Pitch: " + coords[0].toFixed(2) + ", Yaw: " + coords[1].toFixed(2));
            }
          });
        }

        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }
    };

    const checkPannellum = setInterval(() => {
      if (typeof window !== "undefined" && window.pannellum) {
        const cleanup = initViewer();
        clearInterval(checkPannellum);
        return cleanup;
      }
    }, 100);

    return () => {
      clearInterval(checkPannellum);
      if (viewerRef.current) {
        viewerRef.current.destroy();
      }
    };
  }, []);

  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build/pannellum.css"
      />

      <Script
        src="https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build/pannellum.js"
        strategy="lazyOnload"
      />

      <main className="w-full h-screen m-0 p-0 overflow-hidden bg-black flex items-center justify-center">
        <div ref={containerRef} className="w-full h-full" />
      </main>

      <style>{`
        .pnlm-scene {
          transform: scale(1.5);
        }
        
        .custom-hotspot-text {
          position: absolute;
          top: 30px; 
          left: 50%;
          transform: translateX(-50%);
          background: rgba(0, 0, 0, 0.7);
          color: white;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 10px; 
          font-weight: 500;
          white-space: nowrap;
          pointer-events: none; 
          text-align: center;
          font-family: inherit;
        }

        .pnlm-tooltip {
          display: none !important;
        }
      `}</style>
    </>
  );
}