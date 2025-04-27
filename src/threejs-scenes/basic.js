"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function SimpleScene() {
  const mountRef = useRef(null);
  const isMounted = useRef(false); // Track if component is mounted

  useEffect(() => {
    // Only proceed if the component hasn't been mounted yet
    if (!isMounted.current) {
      isMounted.current = true;

      // === SETUP ===
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        75,
        mountRef.current.clientWidth / mountRef.current.clientHeight,
        0.1,
        1000
      );
      camera.position.z = 3;

      const renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(
        mountRef.current.clientWidth,
        mountRef.current.clientHeight
      );
      mountRef.current.appendChild(renderer.domElement);

      // === GEOMETRY ===
      const geometry = new THREE.BoxGeometry();
      const material = new THREE.MeshNormalMaterial();
      const cube = new THREE.Mesh(geometry, material);
      scene.add(cube);

      // === ANIMATION ===
      const animate = () => {
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        renderer.render(scene, camera);
        requestAnimationFrame(animate);
      };
      animate();

      // === CLEANUP ===
      return () => {
        if (
          mountRef.current &&
          renderer.domElement.parentNode === mountRef.current
        ) {
          mountRef.current.removeChild(renderer.domElement);
        }
        renderer.dispose();
      };
    }
    // The empty dependency array ensures this effect runs only once after the initial render
  }, []);

  return <div ref={mountRef} className="w-full h-full" />;
}
