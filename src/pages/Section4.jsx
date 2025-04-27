import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const Section4 = () => {
  const sectionRef = useRef(null);
  const itemsRef = useRef([]);
  const canvasRef = useRef(null);
  const [selectedShape, setSelectedShape] = useState(null);
  const rendererRef = useRef(null);
  const sceneRef = useRef(null);
  const shapeRef = useRef(null);
  const controlsRef = useRef(null);

  useEffect(() => {
    if (sectionRef.current) {
      sectionRef.current.classList.add("fade-in");
    }

    itemsRef.current.forEach((item, index) => {
      if (item) {
        item.style.animation = `slideInLeft 0.8s ease-out ${index * 0.2 + 0.5}s forwards`;
      }
    });

    // Initialize Three.js Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    camera.position.z = 3;

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(300, 300);
    rendererRef.current = renderer;

    if (canvasRef.current) {
      canvasRef.current.appendChild(renderer.domElement);
    }

    // OrbitControls for mouse rotation
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controlsRef.current = controls;

    const animate = () => {
      requestAnimationFrame(animate);
      if (shapeRef.current) {
        shapeRef.current.rotation.y += 0.002;
      }
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      renderer.dispose();
      controls.dispose();
      scene.clear();
      if (canvasRef.current) {
        canvasRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  const createParticleShape = (geometry) => {
    const material = new THREE.PointsMaterial({
      color: 0x00ff00, // Green particles
      size: 0.05,
      transparent: true,
      opacity: 0.8,
    });

    const points = new THREE.Points(geometry, material);
    return points;
  };

  const handleClick = (shapeType) => {
    if (!sceneRef.current) return;

    const scene = sceneRef.current;

    if (shapeRef.current) {
      scene.remove(shapeRef.current);
    }

    let geometry;
    switch (shapeType) {
      case "sphere":
        geometry = new THREE.SphereGeometry(1, 32, 32);
        break;
      case "torus":
        geometry = new THREE.TorusGeometry(1, 0.4, 16, 100);
        break;
      case "cube":
        geometry = new THREE.BoxGeometry(1, 1, 1);
        break;
      case "cone":
        geometry = new THREE.ConeGeometry(1, 2, 32);
        break;
      default:
        return;
    }

    const particleShape = createParticleShape(geometry);
    scene.add(particleShape);
    shapeRef.current = particleShape;

    setSelectedShape(shapeType);
  };

  return (
    <>
      <style>
        {`
          .section {
            position: relative;
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100vw;
            height: 100vh;
            padding: 0;
            background: black;
            color: white;
            opacity: 0;
            transform: translateY(50px);
            animation: fadeIn 1s ease-out forwards 0.3s;
            overflow: hidden;
            padding-left: 5rem;
            padding-right: 5rem;
          }

          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(50px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .benefits-container {
            flex: 1;
          }

          .canvas-container {
            width: 300px;
            height: 300px;
            display: flex;
            justify-content: center;
            align-items: center;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 10px;
          }

          .benefit {
            font-size: 1.5rem;
            font-weight: bold;
            margin-bottom: 1rem;
            cursor: pointer;
            transition: color 0.3s ease;
          }

          .benefit:hover {
            color: red;
          }

          .highlight {
            color: red;
          }
        `}
      </style>

      <div className="section" ref={sectionRef}>
        {/* Left Side - Text */}
        <div className="benefits-container">
          <p className="benefit" onClick={() => handleClick("sphere")} ref={(el) => (itemsRef.current[0] = el)}>
            Fully remote work
          </p>
          <p className="benefit" onClick={() => handleClick("torus")} ref={(el) => (itemsRef.current[1] = el)}>
            Salary increases up to four times a year
          </p>
          <p className="benefit highlight" onClick={() => handleClick("cube")} ref={(el) => (itemsRef.current[2] = el)}>
            Gym memberships
          </p>
          <p className="benefit" onClick={() => handleClick("cone")} ref={(el) => (itemsRef.current[3] = el)}>
            Spa memberships
          </p>
        </div>

        {/* Right Side - Three.js Canvas */}
        <div className="canvas-container" ref={canvasRef}></div>
      </div>
    </>
  );
};

export default Section4;
