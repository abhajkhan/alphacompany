"use client";

import * as React from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

// ---------------------------------------------------------------------------
// WebGL Availability Check
// ---------------------------------------------------------------------------

function checkWebGL(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch (e) {
    return false;
  }
}

// ---------------------------------------------------------------------------
// 3D Sculpture Component
// Stylized Alpha logo: a 3D wireframe prism with light reflections.
// ---------------------------------------------------------------------------

interface SculptureProps {
  mouse: React.MutableRefObject<{ x: number; y: number }>;
  reducedMotion: boolean;
}

function AlphaSculpture({ mouse, reducedMotion }: SculptureProps) {
  const meshRef = React.useRef<THREE.Group>(null);
  
  // Custom geometry for a 3D triangle prism (Alpha sculpture)
  const vertices = React.useMemo(() => {
    return new Float32Array([
      // Front face triangle
      0, 1.5, 0,    // Top
      -1.2, -1, 0.4, // Bottom Left
      1.2, -1, 0.4,  // Bottom Right

      // Back face triangle
      0, 1.5, -0.4,
      -1.2, -1, -0.4,
      1.2, -1, -0.4,
    ]);
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;

    // Slow rotation
    if (!reducedMotion) {
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.15;
      meshRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.1) * 0.1;
      
      // Subtly react to mouse position
      meshRef.current.position.x = THREE.MathUtils.lerp(
        meshRef.current.position.x,
        mouse.current.x * 0.4,
        0.05
      );
      meshRef.current.position.y = THREE.MathUtils.lerp(
        meshRef.current.position.y,
        mouse.current.y * 0.4,
        0.05
      );
    }
  });

  return (
    <group ref={meshRef}>
      {/* outer wireframe cage for precision engineering feel */}
      <mesh>
        <coneGeometry args={[1.5, 2.5, 3, 1, true]} />
        <meshBasicMaterial
          color="#3B82F6"
          wireframe
          transparent
          opacity={0.35}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Inner solid semi-transparent core */}
      <mesh>
        <coneGeometry args={[1.4, 2.4, 3, 1, false]} />
        <meshStandardMaterial
          color="#1D4ED8"
          roughness={0.2}
          metalness={0.8}
          transparent
          opacity={0.65}
        />
      </mesh>

      {/* Horizontal horizontal beam across the center (like the A in Alpha) */}
      <mesh position={[0, -0.2, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 1.3, 8]} />
        <meshStandardMaterial
          color="#60A5FA"
          metalness={0.9}
          roughness={0.2}
          emissive="#3B82F6"
          emissiveIntensity={0.5}
        />
      </mesh>
    </group>
  );
}

// ---------------------------------------------------------------------------
// Low-density Particles
// ---------------------------------------------------------------------------

function SlowParticles({ reducedMotion }: { reducedMotion: boolean }) {
  const pointsRef = React.useRef<THREE.Points>(null);
  
  const [positions] = React.useState(() => {
    const arr = new Float32Array(150 * 3); // Low density: 150 points
    for (let i = 0; i < 150; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 10;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 10;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return arr;
  });

  useFrame((state) => {
    if (!pointsRef.current || reducedMotion) return;
    pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.02;
    pointsRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.01) * 0.02;
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3}>
      <PointMaterial
        transparent
        color="#3B82F6"
        size={0.04}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.4}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

// ---------------------------------------------------------------------------
// Architectural Grid Background
// ---------------------------------------------------------------------------

function ArchitecturalGrid() {
  return (
    <gridHelper
      args={[30, 30, "#2A2A2A", "#171717"]}
      position={[0, -2, 0]}
      rotation={[0, 0, 0]}
    />
  );
}

// ---------------------------------------------------------------------------
// Main 3D Canvas wrapper with Performance & Fallback
// ---------------------------------------------------------------------------

export default function Hero3D() {
  const [hasWebGL, setHasWebGL] = React.useState<boolean | null>(null);
  const [reducedMotion, setReducedMotion] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const isVisible = React.useRef(true);

  const mouse = React.useRef({ x: 0, y: 0 });

  React.useEffect(() => {
    setHasWebGL(checkWebGL());

    // Check reduced motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);
    const handleMotionChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handleMotionChange);

    // Track mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Intersection observer to suspend rendering when offscreen
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible.current = entry.isIntersecting;
      },
      { threshold: 0.1 }
    );
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      mediaQuery.removeEventListener("change", handleMotionChange);
      window.removeEventListener("mousemove", handleMouseMove);
      observer.disconnect();
    };
  }, []);

  if (hasWebGL === false) {
    return <SVGFallback />;
  }

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full pointer-events-none select-none overflow-hidden z-0">
      {hasWebGL === null ? (
        // Loading state matches background
        <div className="w-full h-full bg-background-primary" />
      ) : (
        <Canvas
          camera={{ position: [0, 0, 5], fov: 45 }}
          dpr={[1, 1.5]}
          gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
          style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
        >
          {/* Ambient light */}
          <ambientLight intensity={0.2} />
          
          {/* Directional cinematic light */}
          <directionalLight
            position={[5, 5, 2]}
            intensity={1.5}
            color="#E0F2FE"
            castShadow={false}
          />
          
          {/* Accent colored light */}
          <pointLight position={[-4, 2, -2]} intensity={2} color="#3B82F6" />
          <pointLight position={[3, -2, 3]} intensity={1.5} color="#1D4ED8" />

          {/* Grid helper */}
          <ArchitecturalGrid />

          {/* Low density slow moving particles */}
          <SlowParticles reducedMotion={reducedMotion} />

          {/* rotating abstract Alpha sculpture */}
          <React.Suspense fallback={null}>
            <AlphaSculpture mouse={mouse} reducedMotion={reducedMotion} />
          </React.Suspense>
        </Canvas>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// High-Quality SVG fallback
// ---------------------------------------------------------------------------

function SVGFallback() {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none select-none z-0 overflow-hidden flex items-center justify-center bg-background-primary">
      {/* Grid pattern background */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
          backgroundSize: "64px 64px",
        }}
      />
      {/* Glowing abstract stylized triangle */}
      <div className="relative w-80 h-80 flex items-center justify-center opacity-65 animate-pulse duration-[8000ms]">
        <svg viewBox="0 0 100 100" className="w-full h-full filter drop-shadow-[0_0_24px_rgba(59,130,246,0.3)]">
          <polygon
            points="50,15 85,80 15,80"
            fill="none"
            stroke="#3B82F6"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <polygon
            points="50,22 80,77 20,77"
            fill="none"
            stroke="#1D4ED8"
            strokeWidth="0.75"
            strokeDasharray="4 2"
            opacity="0.6"
          />
          <line
            x1="30"
            y1="55"
            x2="70"
            y2="55"
            stroke="#60A5FA"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  );
}
