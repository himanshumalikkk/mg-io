import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const MGCore3D: React.FC<{ className?: string }> = ({ className = '' }) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 400;
    const height = container.clientHeight || 400;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 7;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Group for mouse parallax
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // Outer wireframe dodecahedron ring
    const cageGeo = new THREE.IcosahedronGeometry(2.2, 1);
    const cageMat = new THREE.MeshBasicMaterial({
      color: 0x00AEEF,
      wireframe: true,
      transparent: true,
      opacity: 0.25,
    });
    const cageMesh = new THREE.Mesh(cageGeo, cageMat);
    mainGroup.add(cageMesh);

    // Inner glowing core sphere
    const coreGeo = new THREE.SphereGeometry(1.2, 32, 32);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x111111,
      metalness: 0.9,
      roughness: 0.1,
      roughnessMap: null,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    mainGroup.add(coreMesh);

    // Accent glass ring
    const ringGeo = new THREE.TorusGeometry(2.8, 0.04, 16, 100);
    const ringMat = new THREE.MeshStandardMaterial({
      color: 0x00AEEF,
      metalness: 0.8,
      roughness: 0.2,
      emissive: 0x00AEEF,
      emissiveIntensity: 0.2,
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = Math.PI / 3;
    mainGroup.add(ringMesh);

    // Floating particles
    const particleCount = 60;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 8;
      positions[i + 1] = (Math.random() - 0.5) * 8;
      positions[i + 2] = (Math.random() - 0.5) * 8;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x111111,
      size: 0.05,
      transparent: true,
      opacity: 0.4,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    mainGroup.add(particles);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x00AEEF, 2.5);
    dirLight1.position.set(5, 5, 5);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x6366F1, 1.5);
    dirLight2.position.set(-5, -5, -2);
    scene.add(dirLight2);

    // Mouse movement tracking for 5-8 deg parallax
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetX = x * 0.12; // ~7 degrees
      targetY = y * 0.12;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Slow organic rotation
      cageMesh.rotation.y = elapsedTime * 0.15;
      cageMesh.rotation.x = elapsedTime * 0.1;
      coreMesh.rotation.y = -elapsedTime * 0.2;
      ringMesh.rotation.z = elapsedTime * 0.25;

      // Parallax easing
      mainGroup.rotation.y += (targetX - mainGroup.rotation.y) * 0.05;
      mainGroup.rotation.x += (-targetY - mainGroup.rotation.x) * 0.05;

      // Pulse ring scale slightly
      const pulse = Math.sin(elapsedTime * 1.5) * 0.05 + 1;
      ringMesh.scale.set(pulse, pulse, pulse);

      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      scene.clear();
      renderer.dispose();
    };
  }, []);

  return (
    <div className={`relative w-full h-full min-h-[380px] flex items-center justify-center ${className}`}>
      <div ref={mountRef} className="w-full h-full absolute inset-0 cursor-grab active:cursor-grabbing" />
      {/* Brand Overlay inside 3D Core */}
      <div className="pointer-events-none z-10 flex flex-col items-center justify-center text-center select-none">
        <span className="font-display font-black text-4xl sm:text-5xl tracking-tighter text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
          MG<span className="text-[#00AEEF]">.IO</span>
        </span>
        <span className="text-[10px] uppercase font-mono font-bold tracking-[0.3em] text-[#111111] mt-1.5 bg-white/90 px-2.5 py-0.5 rounded border border-gray-200 shadow-sm backdrop-blur-sm">
          DIGITAL CORE
        </span>
      </div>
    </div>
  );
};
