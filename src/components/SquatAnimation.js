import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import SportyGirl from "./SportyGirl";

const SquatAnimation = () => {
  const mountRef = useRef(null);
  const animationIdRef = useRef(null);

  useEffect(() => {
    // Scene setup
    const scene = new THREE.Scene();
    scene.background = null; // Transparent background

    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, 2, 0.1, 1000);
    camera.position.z = 5;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ alpha: true }); // Enable transparency
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Lighting
    const light = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(light);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(5, 10, 5).normalize();
    scene.add(directionalLight);

    // Add SportyGirl character
    const sportyGirl = SportyGirl(); // Call the function to create the sporty girl
    scene.add(sportyGirl);

    // Animation variables
    let squatDirection = "down";
    const squatSpeed = 0.02;

    // Animation loop
    const animate = () => {
      if (squatDirection === "down") {
        sportyGirl.position.y -= squatSpeed;
        if (sportyGirl.position.y <= -0.5) {
          squatDirection = "up";
        }
      } else if (squatDirection === "up") {
        sportyGirl.position.y += squatSpeed;
        if (sportyGirl.position.y >= 0) {
          squatDirection = "down";
        }
      }

      renderer.render(scene, camera);
      animationIdRef.current = requestAnimationFrame(animate);
    };

    // Start the animation
    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationIdRef.current); // Cancel the animation
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement); // Remove the canvas
      }
      renderer.dispose(); // Dispose of the renderer
    };
  }, []);

  return <div ref={mountRef} style={{ width: "100%", height: "300px" }} />;
};

export default SquatAnimation;