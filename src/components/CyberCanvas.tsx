"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import * as THREE from "three";

// Space dust particles component (150-200 particles for performance)
function SpaceParticles({ count = 200 }) {
  const pointsRef = useRef<THREE.Points>(null);

  // Generate random positions and drift factors
  const [positions, driftFactors] = useMemo(() => {
    const posArray = new Float32Array(count * 3);
    const driftArray = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Spread particles in a 30x30x30 space
      posArray[i * 3] = (Math.random() - 0.5) * 30;
      posArray[i * 3 + 1] = (Math.random() - 0.5) * 30;
      posArray[i * 3 + 2] = (Math.random() - 0.5) * 30;

      // Small speeds for drifting
      driftArray[i * 3] = (Math.random() - 0.5) * 0.05;
      driftArray[i * 3 + 1] = (Math.random() - 0.5) * 0.05;
      driftArray[i * 3 + 2] = (Math.random() - 0.5) * 0.05;
    }
    return [posArray, driftArray];
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const time = state.clock.getElapsedTime();
    const geo = pointsRef.current.geometry;
    const posAttr = geo.getAttribute("position") as THREE.BufferAttribute;

    // Slowly drift particles
    for (let i = 0; i < count; i++) {
      const idx = i * 3;
      
      // Zero gravity drift + slight hover wave
      posAttr.array[idx] += driftFactors[idx] * 0.1;
      posAttr.array[idx + 1] += (driftFactors[idx + 1] + Math.sin(time + i) * 0.005) * 0.1;
      posAttr.array[idx + 2] += driftFactors[idx + 2] * 0.1;

      // Reset particles if they drift too far
      if (Math.abs(posAttr.array[idx]) > 25) posAttr.array[idx] = (Math.random() - 0.5) * 30;
      if (Math.abs(posAttr.array[idx + 1]) > 25) posAttr.array[idx + 1] = (Math.random() - 0.5) * 30;
      if (Math.abs(posAttr.array[idx + 2]) > 25) posAttr.array[idx + 2] = (Math.random() - 0.5) * 30;
    }
    posAttr.needsUpdate = true;
    pointsRef.current.rotation.y = time * 0.02;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.12}
        color="#00F0FF"
        transparent
        opacity={0.6}
        sizeAttenuation={true}
      />
    </points>
  );
}

// Detailed DJI F450 Quadcopter Drone Model Component
function DroneModel() {
  const droneGroupRef = useRef<THREE.Group>(null);
  const rotorsRef = useRef<THREE.Group[]>([]);

  // Array to collect references to the 4 rotors
  const setRotorRef = (el: THREE.Group | null, index: number) => {
    if (el) rotorsRef.current[index] = el;
  };

  useFrame((state) => {
    if (!droneGroupRef.current) return;
    const time = state.clock.getElapsedTime();
    const { x, y } = state.pointer; // Normalized mouse coordinates [-1, 1]

    // 1. Hover/floating zero-gravity animation (slow sine waves)
    const hoverY = Math.sin(time * 1.2) * 0.15;
    const hoverRotationX = Math.cos(time * 0.8) * 0.04;
    const hoverRotationZ = Math.sin(time * 0.6) * 0.04;

    // 2. Mouse tracking parallax (tilt towards pointer)
    const targetRotationX = -y * 0.25 + hoverRotationX;
    const targetRotationY = x * 0.2 + time * 0.08; // slowly spin while tilting
    const targetRotationZ = -x * 0.2 + hoverRotationZ;

    droneGroupRef.current.position.y = THREE.MathUtils.lerp(
      droneGroupRef.current.position.y,
      hoverY,
      0.08
    );
    droneGroupRef.current.rotation.x = THREE.MathUtils.lerp(
      droneGroupRef.current.rotation.x,
      targetRotationX,
      0.08
    );
    droneGroupRef.current.rotation.y = THREE.MathUtils.lerp(
      droneGroupRef.current.rotation.y,
      targetRotationY,
      0.05
    );
    droneGroupRef.current.rotation.z = THREE.MathUtils.lerp(
      droneGroupRef.current.rotation.z,
      targetRotationZ,
      0.08
    );

    // 3. Spin rotors rapidly
    rotorsRef.current.forEach((rotor) => {
      if (rotor) {
        // High speed rotation on Y axis
        rotor.rotation.y += 0.8;
      }
    });
  });

  // DJI F450 Diagonal arm config (Front: Red, Back: White/Black)
  const armConfigs = [
    { x: 1.3, z: 1.3, angle: Math.PI / 4, color: "#ff1818", label: "Front Right" },    // Front Right (Red)
    { x: -1.3, z: 1.3, angle: (3 * Math.PI) / 4, color: "#ff1818", label: "Front Left" },  // Front Left (Red)
    { x: -1.3, z: -1.3, angle: (5 * Math.PI) / 4, color: "#eeeeee", label: "Back Left" }, // Back Left (White)
    { x: 1.3, z: -1.3, angle: (7 * Math.PI) / 4, color: "#eeeeee", label: "Back Right" },  // Back Right (White)
  ];

  return (
    <group ref={droneGroupRef} scale={1.1}>
      
      {/* 1. DJI F450 CENTER COMPOSITE PLATES */}
      {/* Bottom Plate */}
      <mesh position={[0, -0.1, 0]} rotation={[0, Math.PI / 8, 0]}>
        <cylinderGeometry args={[0.65, 0.65, 0.02, 8]} />
        <meshStandardMaterial color="#111111" metalness={0.9} roughness={0.2} wireframe={false} />
      </mesh>
      
      {/* Top Plate */}
      <mesh position={[0, 0.1, 0]} rotation={[0, Math.PI / 8, 0]}>
        <cylinderGeometry args={[0.55, 0.55, 0.02, 8]} />
        <meshStandardMaterial color="#111111" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Structural Spacers (connecting top and bottom plates) */}
      {Array.from({ length: 6 }).map((_, i) => {
        const angle = (i * Math.PI) / 3;
        const radius = 0.35;
        return (
          <mesh key={i} position={[Math.cos(angle) * radius, 0, Math.sin(angle) * radius]}>
            <cylinderGeometry args={[0.02, 0.02, 0.18, 8]} />
            <meshStandardMaterial color="#888888" metalness={0.9} roughness={0.1} />
          </mesh>
        );
      })}

      {/* 2. ESP32 FLIGHT CONTROLLER (On Top Plate) */}
      <group position={[0, 0.12, 0]}>
        {/* Main Board PCB */}
        <mesh>
          <boxGeometry args={[0.55, 0.02, 0.55]} />
          <meshStandardMaterial color="#005522" roughness={0.6} /> {/* Green PCB */}
        </mesh>
        
        {/* Copper Traces on PCB */}
        <mesh position={[0, 0.011, 0]}>
          <boxGeometry args={[0.5, 0.001, 0.5]} />
          <meshStandardMaterial color="#ffcc00" metalness={0.8} roughness={0.2} wireframe />
        </mesh>

        {/* ESP32 Module */}
        <group position={[0, 0.03, -0.08]}>
          {/* Module PCB */}
          <mesh>
            <boxGeometry args={[0.3, 0.03, 0.42]} />
            <meshStandardMaterial color="#1a1a1a" />
          </mesh>
          {/* ESP32 Metal Shield */}
          <mesh position={[0, 0.02, -0.04]}>
            <boxGeometry args={[0.22, 0.02, 0.22]} />
            <meshStandardMaterial color="#cccccc" metalness={0.9} roughness={0.1} />
          </mesh>
          {/* ESP32 Antenna Board trace */}
          <mesh position={[0, 0.016, 0.15]}>
            <boxGeometry args={[0.22, 0.01, 0.06]} />
            <meshStandardMaterial color="#444444" roughness={0.8} />
          </mesh>
          {/* Gold pins along the sides */}
          {Array.from({ length: 12 }).map((_, i) => (
            <group key={i} position={[0, -0.01, (i - 5.5) * 0.03]}>
              <mesh position={[0.16, 0, 0]}>
                <boxGeometry args={[0.04, 0.02, 0.015]} />
                <meshStandardMaterial color="#d4af37" metalness={0.9} />
              </mesh>
              <mesh position={[-0.16, 0, 0]}>
                <boxGeometry args={[0.04, 0.02, 0.015]} />
                <meshStandardMaterial color="#d4af37" metalness={0.9} />
              </mesh>
            </group>
          ))}
        </group>

        {/* MPU9250 IMU Module (Blue board) */}
        <group position={[0.14, 0.02, 0.12]} rotation={[0, -Math.PI / 4, 0]}>
          <mesh>
            <boxGeometry args={[0.15, 0.02, 0.15]} />
            <meshStandardMaterial color="#0066cc" /> {/* Blue PCB */}
          </mesh>
          <mesh position={[0, 0.015, 0]}>
            <boxGeometry args={[0.05, 0.02, 0.05]} />
            <meshStandardMaterial color="#222222" roughness={0.7} />
          </mesh>
        </group>

        {/* Flight Controller Status LEDs */}
        <mesh position={[-0.15, 0.02, 0.15]}>
          <sphereGeometry args={[0.02, 8, 8]} />
          <meshStandardMaterial color="#00ff44" emissive="#00ff44" emissiveIntensity={2.0} />
        </mesh>
        <mesh position={[-0.1, 0.02, 0.18]}>
          <sphereGeometry args={[0.02, 8, 8]} />
          <meshStandardMaterial color="#ff1100" emissive="#ff1100" emissiveIntensity={1.5} />
        </mesh>
      </group>

      {/* 3. DJI F450 ARMS & MOTORS & ESCS */}
      {armConfigs.map((arm, idx) => (
        <group key={idx}>
          {/* Double-arm truss structure */}
          <group position={[arm.x / 2, 0, arm.z / 2]} rotation={[0, -arm.angle, 0]}>
            {/* Top Arm beam */}
            <mesh position={[0, 0.06, 0]}>
              <boxGeometry args={[0.07, 0.05, 1.4]} />
              <meshStandardMaterial color={arm.color} roughness={0.3} />
            </mesh>
            {/* Bottom Arm beam */}
            <mesh position={[0, -0.06, 0]}>
              <boxGeometry args={[0.07, 0.05, 1.4]} />
              <meshStandardMaterial color={arm.color} roughness={0.3} />
            </mesh>
            {/* Arm truss diagonal supports */}
            {Array.from({ length: 5 }).map((_, sIdx) => (
              <mesh
                key={sIdx}
                position={[0, 0, (sIdx - 2) * 0.22]}
                rotation={[Math.PI / 4, 0, 0]}
              >
                <boxGeometry args={[0.05, 0.02, 0.12]} />
                <meshStandardMaterial color={arm.color} roughness={0.3} />
              </mesh>
            ))}
          </group>

          {/* ESC Module (Electronic Speed Controller) under the arm */}
          <group
            position={[arm.x * 0.45, -0.11, arm.z * 0.45]}
            rotation={[0, -arm.angle + Math.PI / 2, 0]}
          >
            <mesh>
              <boxGeometry args={[0.15, 0.05, 0.28]} />
              <meshStandardMaterial color="#1a1a1a" roughness={0.8} />
            </mesh>
            {/* ESC Label */}
            <mesh position={[0, 0.026, 0]}>
              <boxGeometry args={[0.11, 0.001, 0.22]} />
              <meshStandardMaterial color="#333333" />
            </mesh>
          </group>

          {/* ESC Wiring Glow Path (Battery/hub -> ESC -> Motor) */}
          {/* Path from center hub to ESC */}
          <mesh
            position={[arm.x * 0.225, -0.09, arm.z * 0.225]}
            rotation={[0, -arm.angle, 0]}
          >
            <cylinderGeometry args={[0.012, 0.012, 0.6, 6]} />
            <meshStandardMaterial
              color="#00f0ff"
              emissive="#00f0ff"
              emissiveIntensity={1.2}
              transparent
              opacity={0.8}
            />
          </mesh>
          {/* Path from ESC to Motor */}
          <mesh
            position={[arm.x * 0.725, 0, arm.z * 0.725]}
            rotation={[0, -arm.angle, 0]}
          >
            <cylinderGeometry args={[0.01, 0.01, 0.7, 6]} />
            <meshStandardMaterial
              color="#ff00cc"
              emissive="#ff00cc"
              emissiveIntensity={0.8}
              transparent
              opacity={0.6}
            />
          </mesh>

          {/* Motor Pod Plate at arm tip */}
          <mesh position={[arm.x, 0.07, arm.z]}>
            <cylinderGeometry args={[0.16, 0.16, 0.04, 12]} />
            <meshStandardMaterial color="#111111" />
          </mesh>

          {/* DJI 2212 920KV MOTOR */}
          <group position={[arm.x, 0.18, arm.z]}>
            {/* Motor Bottom Stator */}
            <mesh position={[0, -0.06, 0]}>
              <cylinderGeometry args={[0.13, 0.13, 0.04, 16]} />
              <meshStandardMaterial color="#222222" metalness={0.9} />
            </mesh>
            {/* Copper Stator Windings inside (Bronze coils) */}
            <mesh position={[0, 0, 0]}>
              <cylinderGeometry args={[0.11, 0.11, 0.08, 12]} />
              <meshStandardMaterial
                color="#b87333"
                emissive="#b87333"
                emissiveIntensity={0.5}
                metalness={0.8}
                roughness={0.3}
              />
            </mesh>
            {/* Motor Outer Bell housing */}
            <mesh position={[0, 0.01, 0]}>
              <cylinderGeometry args={[0.135, 0.135, 0.1, 16]} />
              <meshStandardMaterial color="#222222" metalness={0.9} roughness={0.3} />
            </mesh>
            {/* Silver cap / spacer */}
            <mesh position={[0, 0.065, 0]}>
              <cylinderGeometry args={[0.06, 0.06, 0.03, 8]} />
              <meshStandardMaterial color="#cccccc" metalness={0.9} />
            </mesh>
            {/* Motor Shaft spindle */}
            <mesh position={[0, 0.09, 0]}>
              <cylinderGeometry args={[0.02, 0.02, 0.07, 8]} />
              <meshStandardMaterial color="#dddddd" metalness={0.9} />
            </mesh>

            {/* ROTORS / 9x4.2 PROPELLERS */}
            <group ref={(el) => setRotorRef(el, idx)} position={[0, 0.11, 0]}>
              {/* Rotor Spin Bullet spinner */}
              <mesh position={[0, 0.02, 0]}>
                <cylinderGeometry args={[0.045, 0.045, 0.05, 8]} />
                <meshStandardMaterial color="#cccccc" metalness={0.9} />
              </mesh>
              
              {/* Propeller Blade 1 */}
              <mesh position={[0.48, 0.01, 0]} rotation={[0.05, 0, 0]}>
                <boxGeometry args={[0.96, 0.01, 0.08]} />
                <meshStandardMaterial color="#151515" roughness={0.4} />
              </mesh>
              {/* Propeller Blade 2 */}
              <mesh position={[-0.48, 0.01, 0]} rotation={[-0.05, 0, 0]}>
                <boxGeometry args={[0.96, 0.01, 0.08]} />
                <meshStandardMaterial color="#151515" roughness={0.4} />
              </mesh>

              {/* SLOW PROPELLER ROTATIONAL BLUR DISC */}
              <mesh position={[0, 0.005, 0]}>
                <cylinderGeometry args={[0.96, 0.96, 0.002, 32]} />
                <meshStandardMaterial
                  color="#ffffff"
                  transparent
                  opacity={0.06}
                  depthWrite={false}
                />
              </mesh>
            </group>
          </group>
        </group>
      ))}

      {/* 4. 3S LIPO BATTERY PACK (Underside Mount) */}
      <group position={[0, -0.22, 0]}>
        {/* Battery Yellow/Blue Block */}
        <mesh>
          <boxGeometry args={[0.38, 0.22, 0.85]} />
          <meshStandardMaterial color="#e0c000" roughness={0.7} /> {/* Yellow wrap */}
        </mesh>
        {/* Battery Cap End */}
        <mesh position={[0, 0, 0.43]}>
          <boxGeometry args={[0.36, 0.2, 0.02]} />
          <meshStandardMaterial color="#222222" />
        </mesh>
        {/* Silicon power cable wires */}
        <mesh position={[0.06, 0, 0.46]} rotation={[Math.PI / 6, 0, 0]}>
          <cylinderGeometry args={[0.015, 0.015, 0.12, 6]} />
          <meshStandardMaterial color="#ff1100" roughness={0.5} /> {/* Red wire */}
        </mesh>
        <mesh position={[-0.06, 0, 0.46]} rotation={[Math.PI / 6, 0, 0]}>
          <cylinderGeometry args={[0.015, 0.015, 0.12, 6]} />
          <meshStandardMaterial color="#111111" roughness={0.5} /> {/* Black wire */}
        </mesh>
        {/* Battery Strap (Velcro wrap) */}
        <mesh>
          <boxGeometry args={[0.4, 0.24, 0.3]} />
          <meshStandardMaterial color="#111111" roughness={0.9} />
        </mesh>
      </group>

      {/* 5. GPS MODULE MAST (F450 Classic Mast) */}
      <group position={[-0.25, 0.11, -0.25]}>
        {/* Carbon fiber rod stick */}
        <mesh position={[0, 0.35, 0]}>
          <cylinderGeometry args={[0.012, 0.012, 0.7, 8]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.9} roughness={0.1} />
        </mesh>
        {/* GPS Puck disc on top */}
        <mesh position={[0, 0.7, 0]}>
          <cylinderGeometry args={[0.13, 0.13, 0.04, 16]} />
          <meshStandardMaterial color="#eeeeee" roughness={0.4} /> {/* White GPS cap */}
        </mesh>
        <mesh position={[0, 0.72, 0]}>
          <cylinderGeometry args={[0.11, 0.11, 0.01, 16]} />
          <meshStandardMaterial color="#00f0ff" emissive="#00f0ff" emissiveIntensity={0.8} />
        </mesh>
      </group>

      {/* 5.5 CAD TELEMETRY HUD LABELS (Float overlays pointing to drone parts) */}
      {/* ESP32 FC */}
      <Html position={[0, 0.38, 0]} distanceFactor={4.5} center>
        <div className="flex flex-col items-center pointer-events-none select-none">
          <div className="px-2 py-0.5 border border-electric-blue/40 bg-black/85 rounded text-[8px] font-mono font-bold text-electric-blue uppercase tracking-widest whitespace-nowrap glow-blue">
            ESP32 FC
          </div>
          <div className="w-[1px] h-6 bg-gradient-to-b from-electric-blue/50 to-transparent"></div>
        </div>
      </Html>

      {/* MPU9250 */}
      <Html position={[0.14, 0.32, 0.12]} distanceFactor={4.5} center>
        <div className="flex flex-col items-center pointer-events-none select-none">
          <div className="px-2 py-0.5 border border-neon-purple/40 bg-black/85 rounded text-[8px] font-mono font-bold text-neon-purple uppercase tracking-widest whitespace-nowrap glow-purple">
            MPU9250
          </div>
          <div className="w-[1px] h-5 bg-gradient-to-b from-neon-purple/50 to-transparent"></div>
        </div>
      </Html>

      {/* DJI 2212 Motor */}
      <Html position={[1.3, 0.44, 1.3]} distanceFactor={4.5} center>
        <div className="flex flex-col items-center pointer-events-none select-none">
          <div className="px-2 py-0.5 border border-electric-blue/40 bg-black/85 rounded text-[8px] font-mono font-bold text-electric-blue uppercase tracking-widest whitespace-nowrap glow-blue">
            DJI 2212 920KV
          </div>
          <div className="w-[1px] h-6 bg-gradient-to-b from-electric-blue/50 to-transparent"></div>
        </div>
      </Html>

      {/* 3S LiPo Battery */}
      <Html position={[0, -0.42, 0]} distanceFactor={4.5} center>
        <div className="flex flex-col items-center pointer-events-none select-none">
          <div className="w-[1px] h-6 bg-gradient-to-t from-electric-blue/50 to-transparent"></div>
          <div className="px-2 py-0.5 border border-electric-blue/40 bg-black/85 rounded text-[8px] font-mono font-bold text-electric-blue uppercase tracking-widest whitespace-nowrap glow-blue">
            3S LiPo
          </div>
        </div>
      </Html>

      {/* F450 Frame */}
      <Html position={[-0.65, 0.22, -0.65]} distanceFactor={4.5} center>
        <div className="flex flex-col items-center pointer-events-none select-none">
          <div className="px-2 py-0.5 border border-neon-purple/40 bg-black/85 rounded text-[8px] font-mono font-bold text-neon-purple uppercase tracking-widest whitespace-nowrap glow-purple">
            F450 FRAME
          </div>
          <div className="w-[1px] h-5 bg-gradient-to-b from-neon-purple/50 to-transparent"></div>
        </div>
      </Html>

      {/* GPS Module */}
      <Html position={[-0.25, 0.94, -0.25]} distanceFactor={4.5} center>
        <div className="flex flex-col items-center pointer-events-none select-none">
          <div className="px-2 py-0.5 border border-white/35 bg-black/85 rounded text-[8px] font-mono font-bold text-white/80 uppercase tracking-widest whitespace-nowrap">
            GPS Module
          </div>
          <div className="w-[1px] h-5 bg-gradient-to-b from-white/30 to-transparent"></div>
        </div>
      </Html>

      {/* 6. AMBIENT FIELD ORBIT RING */}
      <mesh rotation={[Math.PI / 2, 0.1, 0]}>
        <torusGeometry args={[2.2, 0.01, 8, 64]} />
        <meshStandardMaterial
          color="#00F0FF"
          emissive="#00F0FF"
          emissiveIntensity={1.2}
          transparent
          opacity={0.4}
        />
      </mesh>

      <mesh rotation={[0.1, 0, Math.PI / 2]}>
        <torusGeometry args={[2.5, 0.006, 8, 64]} />
        <meshStandardMaterial
          color="#BD00FF"
          emissive="#BD00FF"
          emissiveIntensity={0.8}
          transparent
          opacity={0.2}
        />
      </mesh>
    </group>
  );
}

export default function CyberCanvas() {
  return (
    <div className="w-full h-full min-h-[400px] md:min-h-[600px] relative z-10">
      {/* Canvas Elements */}
      <Canvas
        camera={{ position: [0, 1.5, 5], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#00F0FF" />
        <pointLight position={[-10, -10, -10]} intensity={0.8} color="#BD00FF" />
        <directionalLight position={[0, 5, 0]} intensity={1.2} color="#ffffff" />
        
        {/* Particle Stars */}
        <SpaceParticles count={220} />
        
        {/* Drone Centerpiece */}
        <DroneModel />

        {/* Orbit Controls (constrained to prevent flipping) */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 1.7}
          minPolarAngle={Math.PI / 2.5}
        />
      </Canvas>
      
      {/* HUD Telemetry label overlays */}
      <div className="absolute top-4 left-4 border border-electric-blue/20 bg-cyber-bg/70 px-3 py-1 text-xs text-electric-blue rounded-md pointer-events-none uppercase tracking-widest font-mono">
        <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 mr-2 hud-dot"></span>
        ESP32 Telemetry: Active
      </div>

      <div className="absolute bottom-4 right-4 border border-neon-purple/20 bg-cyber-bg/70 px-3 py-1 text-xs text-neon-purple rounded-md pointer-events-none uppercase tracking-widest font-mono">
        Zero-G Simulation Engine v4.8
      </div>
    </div>
  );
}
