import { useEffect, useRef } from "react";
import * as THREE from "three";

const Section2 = () => {
  const sectionRef = useRef(null);
  const particlesRef = useRef(null);
  const rendererRef = useRef(null);
  const materialRef = useRef(null); // Reference to material for color change

  useEffect(() => {
    if (!sectionRef.current || !particlesRef.current) return;

    const section = sectionRef.current;
    const width = section.offsetWidth;
    const height = section.offsetHeight;

    // Create Scene, Camera, and Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 1, 3000);
    camera.position.z = 1000;

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(width, height);
    rendererRef.current = renderer;
    particlesRef.current.appendChild(renderer.domElement);

    // Particle System
    const particleCount = 60000;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i++) {
      positions[i] = (Math.random() * 2000) - 1000;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      color: 0xff0000, // 🔥 Start as red
      size: 2,
      transparent: true,
      opacity: 0.8,
    });

    materialRef.current = material; // Save reference to material

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Mouse Movement Effect
    let mouseX = 0,
      mouseY = 0,
      targetX = 0,
      targetY = 0;

    const onMouseMove = (event) => {
      const rect = section.getBoundingClientRect();
      mouseX = ((event.clientX - rect.left) / rect.width);
      mouseY = ((event.clientY - rect.top) / rect.height);

      // 🔥 Interpolate between red and silver
      const r = Math.round(255 - mouseX * 55);  // Decrease red
      const g = Math.round(mouseX * 192);       // Increase towards silver
      const b = Math.round(mouseX * 192);       // Increase towards silver

      materialRef.current.color.setRGB(r / 255, g / 255, b / 255);
    };

    section.addEventListener("mousemove", onMouseMove);

    // Animation Loop
    const animate = () => {
      requestAnimationFrame(animate);
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;
      camera.position.x = targetX * 500;
      camera.position.y = targetY * 500;
      camera.lookAt(scene.position);
      particles.rotation.y += 0.0005;
      renderer.render(scene, camera);
    };
    animate();

    // Resize Handling
    const resizeCanvas = () => {
      const width = section.offsetWidth;
      const height = section.offsetHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    new ResizeObserver(resizeCanvas).observe(section);

    // Cleanup
    return () => {
      section.removeEventListener("mousemove", onMouseMove);
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
      particlesRef.current.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <>
      <style>
        {`
          .section {
            position: relative;
            display: flex;
            flex-direction: column;
            justify-content: center; /* ✅ Centers content vertically */
            align-items: flex-start; /* ✅ Aligns text to the left */
            width: 100vw;
            height: 100vh;
            color: white;
            overflow: hidden;
            padding: 5rem; /* ✅ Ensures text is inside the section */
          }

          /* 🔥 Ensures Particles Stay Behind Text */
          .particles-container {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -1; /* ✅ Keeps particles in the background */
            pointer-events: none; /* ✅ Ensures particles don't block text */
          }

          h2 {
            font-size: 1rem;
            font-weight: normal;
            margin-bottom: 0.5rem;
          }

          h1 {
            font-size: 2.5rem;
            font-weight: bold;
            max-width: 600px;
            line-height: 1.2;
            margin: 0;
          }
        `}
      </style>

      <div className="section" ref={sectionRef}>
        {/* Three.js Particle Background */}
        <div className="particles-container" ref={particlesRef}></div>

        {/* Content */}
        <h2>Why RICRYM?</h2>
        <h1>high-performance environment</h1>
      </div>
    </>
  );
};

export default Section2;
