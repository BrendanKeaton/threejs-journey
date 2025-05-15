"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function FirstThreeJSProject() {
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

        // Scene
        const scene = new THREE.Scene();

        // Object
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);

        // Camera

        const camera = new THREE.PerspectiveCamera(
          75,
          container.clientWidth / container.clientHeight
        );
        camera.position.z = 3;
        camera.position.y = 0.7;
        scene.add(camera);

        renderer.render(scene, camera);

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
