import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ServiceVisual3DProps {
  type: 'browser' | 'chatbot' | 'voice' | 'automation' | 'seo' | 'geo' | 'leadgen' | 'customai';
  className?: string;
}

export const ServiceVisual3D: React.FC<ServiceVisual3DProps> = ({ type, className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 360;
    const height = container.clientHeight || 300;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 6;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    // Build specific 3D geometries according to service type
    if (type === 'browser') {
      // 3D Browser Window Representation
      const frameGeo = new THREE.BoxGeometry(3.6, 2.2, 0.1);
      const frameMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.2, metalness: 0.1 });
      const frameMesh = new THREE.Mesh(frameGeo, frameMat);
      group.add(frameMesh);

      const screenGeo = new THREE.PlaneGeometry(3.4, 1.8);
      const screenMat = new THREE.MeshBasicMaterial({ color: 0xf7f7f5 });
      const screenMesh = new THREE.Mesh(screenGeo, screenMat);
      screenMesh.position.z = 0.06;
      group.add(screenMesh);
    } else if (type === 'chatbot') {
      // Conversational Spheres / Node Cluster
      const s1 = new THREE.Mesh(new THREE.SphereGeometry(0.8, 32, 32), new THREE.MeshStandardMaterial({ color: 0x00AEEF, roughness: 0.2 }));
      const s2 = new THREE.Mesh(new THREE.SphereGeometry(0.5, 32, 32), new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.3 }));
      s1.position.set(-0.6, 0.2, 0);
      s2.position.set(0.8, -0.3, 0.4);
      group.add(s1, s2);
    } else if (type === 'voice') {
      // Soundwave Rings
      for (let i = 0; i < 5; i++) {
        const ringGeo = new THREE.TorusGeometry(0.5 + i * 0.4, 0.03, 16, 50);
        const ringMat = new THREE.MeshBasicMaterial({ color: 0x00AEEF, transparent: true, opacity: 0.8 - i * 0.15 });
        const ring = new THREE.Mesh(ringGeo, ringMat);
        group.add(ring);
      }
    } else if (type === 'automation') {
      // Connected Nodes (Workflow graph)
      const geo = new THREE.BufferGeometry();
      const points = [
        new THREE.Vector3(-1.5, 0, 0),
        new THREE.Vector3(0, 1, 0),
        new THREE.Vector3(0, -1, 0),
        new THREE.Vector3(1.5, 0, 0)
      ];
      geo.setFromPoints(points);
      const lineMat = new THREE.LineBasicMaterial({ color: 0x00AEEF, linewidth: 2 });
      const line = new THREE.Line(geo, lineMat);
      group.add(line);

      points.forEach(p => {
        const m = new THREE.Mesh(new THREE.SphereGeometry(0.25, 16, 16), new THREE.MeshStandardMaterial({ color: 0x111111 }));
        m.position.copy(p);
        group.add(m);
      });
    } else {
      // Default / Custom AI Geometric Array
      const cubeGeo = new THREE.BoxGeometry(1.8, 1.8, 1.8);
      const cubeMat = new THREE.MeshStandardMaterial({ color: 0x111111, wireframe: true });
      const cube = new THREE.Mesh(cubeGeo, cubeMat);
      group.add(cube);
    }

    // Lighting
    const amb = new THREE.AmbientLight(0xffffff, 1.5);
    const dir = new THREE.DirectionalLight(0x00AEEF, 2);
    dir.position.set(3, 4, 5);
    scene.add(amb, dir);

    let frameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      group.rotation.y = t * 0.3;
      group.rotation.x = Math.sin(t * 0.2) * 0.1;
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(frameId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      scene.clear();
      renderer.dispose();
    };
  }, [type]);

  return (
    <div className={`relative w-full h-full min-h-[260px] flex items-center justify-center ${className}`}>
      <div ref={containerRef} className="w-full h-full absolute inset-0" />
    </div>
  );
};
