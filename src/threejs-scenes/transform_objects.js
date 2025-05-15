"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function TTransformObject() {
  const mountRef = useRef(null);
  const isMounted = useRef(false);

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;

      const renderer = new THREE.WebGLRenderer({ antialias: true });
      const container = mountRef.current;
      if (container) {
        renderer.setSize(container.clientWidth, container.clientHeight);
        container.appendChild(renderer.domElement);

        // add your Three.js Here

        // CLEANUP LOGIC FOR AUTOMATIC / MANUAL LOADS
        return () => {
          if (container && renderer.domElement.parentNode === container) {
            container.removeChild(renderer.domElement);
          }
          renderer.dispose();
        };
      }
    }
  }, []);

  return <div ref={mountRef} className="w-full h-full" />;
}
