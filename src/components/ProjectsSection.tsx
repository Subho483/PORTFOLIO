"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Cpu, Info, ShieldAlert, Zap, Network, HelpCircle } from "lucide-react";

interface Spec {
  label: string;
  value: string;
}

interface TwinNode {
  id: string;
  label: string;
  type: "MCU" | "SENSOR" | "ACTUATOR" | "POWER" | "ALGO" | "WEB";
  role: string;
  telemetry: string;
  x: number;
  y: number;
}

interface TwinLink {
  from: string;
  to: string;
  label: string;
  color: string;
  path: string; // SVG path definition
}

interface Project {
  id: string;
  title: string;
  subtitle: string;
  status: "ACTIVE" | "COMPLETED" | "TESTING" | "PROTOTYPE";
  description: string;
  specs: Spec[];
  tags: string[];
  github?: string;
  demo?: string;
  log: string;
  // Digital Twin details
  nodes: TwinNode[];
  links: TwinLink[];
}

export default function ProjectsSection() {
  const [activeTwinId, setActiveTwinId] = useState<string | null>(null);
  const [selectedNode, setSelectedNode] = useState<{ projectId: string; nodeId: string } | null>(null);

  const projects: Project[] = [
    {
      id: "01",
      title: "ESP32 Autonomous Quadcopter",
      subtitle: "Embedded Flight Controller & Stabilizer",
      status: "COMPLETED",
      description: "Designed and built an autonomous quadcopter from the chassis up. Engineered a custom flight control system using an ESP32 chip and MPU9250 IMU, implementing cascade PID loops for attitude stabilization.",
      specs: [
        { label: "Core Processor", value: "ESP32 (Dual Core 240MHz)" },
        { label: "IMU Sensor", value: "MPU9250 (9-axis SPI IMU)" },
        { label: "Control Loop", value: "Dual Rate Cascade PID" },
        { label: "Battery Cells", value: "3S LiPo 2200mAh" },
      ],
      tags: ["ESP32-RTOS", "C++", "PID Tuning", "IMU Calibration", "I2C/PWM"],
      github: "https://github.com/sahasubho483-star/esp32-quadcopter",
      log: "TELEMETRY LOG: Attitude locked. Yaw/Pitch/Roll deviation < 1.2 degrees. ESC response latency: 2.1ms.",
      nodes: [
        { id: "esp32", label: "ESP32 MCU", type: "MCU", role: "Flight controller core running dual FreeRTOS tasks", telemetry: "CPU Temp: 42°C | Loop Latency: 2.5ms", x: 180, y: 110 },
        { id: "imu", label: "MPU9250 IMU", type: "SENSOR", role: "9-Axis SPI Sensor Fusion tracking Pitch/Roll/Yaw rates", telemetry: "Ax: -0.01g | Ay: 0.02g | Az: 1.00g", x: 60, y: 50 },
        { id: "tof", label: "ToF Lidar", type: "SENSOR", role: "VL53L0X Laser ranging sensor for altitude lock", telemetry: "Alt: 124.5 cm | Ranging: Stable", x: 60, y: 170 },
        { id: "battery", label: "3S LiPo", type: "POWER", role: "11.1V Power Source with voltage telemetry alerts", telemetry: "Cell V: 11.4V | Draw: 12.8A", x: 300, y: 50 },
        { id: "esc", label: "20A ESCs", type: "ACTUATOR", role: "Electronic Speed Controllers regulating brushless output", telemetry: "PWM Duty: 64% | Temp: 38°C", x: 300, y: 170 },
        { id: "motors", label: "DJI 2212 Motors", type: "ACTUATOR", role: "Brushless DC Motors driving 9x4.2 propellers", telemetry: "RPM: 7420 | Thrust: 410g per motor", x: 420, y: 110 }
      ],
      links: [
        { from: "imu", to: "esp32", label: "SPI Bus", color: "#00F0FF", path: "M 60 50 L 180 110" },
        { from: "tof", to: "esp32", label: "I2C Bus", color: "#00F0FF", path: "M 60 170 L 180 110" },
        { from: "battery", to: "esc", label: "11.1V DC", color: "#FF5500", path: "M 300 50 L 300 170" },
        { from: "esp32", to: "esc", label: "PWM Signals", color: "#BD00FF", path: "M 180 110 L 300 170" },
        { from: "esc", to: "motors", label: "3-Phase Power", color: "#00F0FF", path: "M 300 170 L 420 110" }
      ]
    },
    {
      id: "02",
      title: "MAZEMERIZE Maze Solver Robot",
      subtitle: "Autonomous Micromouse Class Robot",
      status: "COMPLETED",
      description: "An autonomous robotic crawler designed to map and solve complex matrices. Implemented a Flood-Fill coordinate mapping algorithm with Infrared distance sensor arrays for wall detection and alignment.",
      specs: [
        { label: "Controller", value: "ATmega328P" },
        { label: "Sensors", value: "5x Analog IR Array" },
        { label: "Algorithm", value: "Flood-Fill / Wall Follower" },
        { label: "Motors", value: "N20 Micro Metal Gearmotors" },
      ],
      tags: ["Robotics", "C", "Algorithms", "State Machine", "IR Sensors"],
      github: "https://github.com/sahasubho483-star/mazemerize-solver",
      log: "TELEMETRY LOG: Grid mapped (16x16). Solving route found. Shortest path executed in 14.8 seconds.",
      nodes: [
        { id: "atmega", label: "ATmega328P", type: "MCU", role: "Core processing loop mapping maze coordinate grids", telemetry: "Clock: 16MHz | ROM Usage: 64% | State: Active", x: 180, y: 110 },
        { id: "ir_array", label: "5x IR Array", type: "SENSOR", role: "Infrared emitter/receiver sweep checking wall distance", telemetry: "Pins: ADC0-ADC4 | Threshold: 12cm", x: 60, y: 50 },
        { id: "pid", label: "PID Controller", type: "ALGO", role: "Control loop calculating motor speed offsets", telemetry: "Kp: 1.8 | Kd: 0.55 | Ki: 0.05", x: 60, y: 170 },
        { id: "driver", label: "TB6612FNG", type: "ACTUATOR", role: "Dual H-Bridge motor driver regulating gearmotors", telemetry: "VCC: 7.4V | Logic: 5.0V | Duty: 80%", x: 300, y: 50 },
        { id: "floodfill", label: "Flood-Fill Engine", type: "ALGO", role: "Grid-mapping optimization algorithm", telemetry: "Matrix: 16x16 | Paths Calculated: 24", x: 300, y: 170 },
        { id: "motors", label: "N20 Motors", type: "ACTUATOR", role: "High-torque micro DC gearmotors on wheels", telemetry: "Speed: 1.2m/s | Stall Current: 1.0A", x: 420, y: 110 }
      ],
      links: [
        { from: "ir_array", to: "atmega", label: "ADC Input", color: "#00F0FF", path: "M 60 50 L 180 110" },
        { from: "pid", to: "atmega", label: "Error Comp", color: "#00F0FF", path: "M 60 170 L 180 110" },
        { from: "atmega", to: "driver", label: "PWM Speed", color: "#BD00FF", path: "M 180 110 L 300 50" },
        { from: "atmega", to: "floodfill", label: "Map Array", color: "#BD00FF", path: "M 180 110 L 300 170" },
        { from: "driver", to: "motors", label: "DC Outputs", color: "#FF5500", path: "M 300 50 L 420 110" }
      ]
    },
    {
      id: "03",
      title: "4WD Smart Terrain Vehicle",
      subtitle: "Intelligent Exploration Rover",
      status: "ACTIVE",
      description: "A 4-wheel drive intelligent vehicle engineered for obstacle navigation and telemetry logging. Features ultrasonic sensors and servo mounts to sweep and map boundaries before executing propulsion paths.",
      specs: [
        { label: "MCU Board", value: "Arduino Mega 2560" },
        { label: "Motor Driver", value: "L298N Dual H-Bridge" },
        { label: "Navigation", value: "HC-SR04 ultrasonic sweep" },
        { label: "Power Source", value: "2x 18650 Li-ion cells" },
      ],
      tags: ["Microcontrollers", "Servo Sweep", "H-Bridge Drivers", "PWM", "C++"],
      github: "https://github.com/sahasubho483-star/4wd-smart-vehicle",
      log: "TELEMETRY LOG: Range sweeps calibrated. Obstacle avoidance threshold: 15cm. Motor current stable.",
      nodes: [
        { id: "mega", label: "ATmega2560", type: "MCU", role: "Main processor board coordinating multiple sweep routines", telemetry: "GPIO Pins: 54 | SRAM Free: 6.2KB | Status: OK", x: 180, y: 110 },
        { id: "sonar", label: "HC-SR04 Sonar", type: "SENSOR", role: "Ultrasonic range sensor measuring barrier distances", telemetry: "Trigger: Pin 42 | Echo: Pin 43 | Distance: 28cm", x: 60, y: 50 },
        { id: "servo", label: "Servo Swivel", type: "ACTUATOR", role: "Directing sonar sweep angles (-90° to +90°)", telemetry: "Sweep Angle: +45° | Target: 20ms cycles", x: 60, y: 170 },
        { id: "battery", label: "2x 18650", type: "POWER", role: "Dual cells delivering 7.4V input power", telemetry: "Voltage: 7.8V | Capacity: 2600mAh", x: 300, y: 50 },
        { id: "l298n", label: "L298N H-Bridge", type: "ACTUATOR", role: "High-current dual H-bridge motor controller", telemetry: "Load Temp: 45°C | Channel A: 0.8A | Channel B: 0.8A", x: 300, y: 170 },
        { id: "motors", label: "4x DC Motors", type: "ACTUATOR", role: "Geared wheel actuators driving independent suspension", telemetry: "Propulsion Force: Active | Wheel Encoder: Locked", x: 420, y: 110 }
      ],
      links: [
        { from: "sonar", to: "mega", label: "Pulse Timing", color: "#00F0FF", path: "M 60 50 L 180 110" },
        { from: "mega", to: "servo", label: "PWM Position", color: "#BD00FF", path: "M 180 110 L 60 170" },
        { from: "battery", to: "l298n", label: "7.4V Bus", color: "#FF5500", path: "M 300 50 L 300 170" },
        { from: "mega", to: "l298n", label: "Direction/PWM", color: "#BD00FF", path: "M 180 110 L 300 170" },
        { from: "l298n", to: "motors", label: "Dual Power Rails", color: "#00F0FF", path: "M 300 170 L 420 110" }
      ]
    },
    {
      id: "04",
      title: "Hope Drone Web App",
      subtitle: "Mission Planner & Telemetry Hub",
      status: "TESTING",
      description: "A custom ground control station dashboard that monitors and sends waypoint instructions to drones. Features live simulated video overlay, coordinate plots, battery life gauges, and active GPS lock coordinates.",
      specs: [
        { label: "Frontend", value: "Next.js / TypeScript" },
        { label: "Styling", value: "Tailwind CSS / Glassmorphism" },
        { label: "State Pipe", value: "WebSockets / Realtime API" },
        { label: "Visual Maps", value: "React Leaflet API" },
      ],
      tags: ["Next.js", "WebSockets", "Telemetry UI", "Dashboard", "API Integration"],
      github: "https://github.com/sahasubho483-star/hope-drone-webapp",
      demo: "https://hope-drone.vercel.app",
      log: "TELEMETRY LOG: WebSocket uplink connected. Target coordinates sent. GPS lock: 12 Satellites.",
      nodes: [
        { id: "dashboard", label: "Next.js UI", type: "WEB", role: "Glassmorphism responsive HUD dashboard UI layer", telemetry: "React Nodes: 42 | Socket Ping: 12ms", x: 180, y: 110 },
        { id: "socket", label: "WebSocket Uplink", type: "WEB", role: "Real-time bi-directional telemetry data pipe", telemetry: "State: OPEN | Packets: 120/sec", x: 60, y: 50 },
        { id: "esp_client", label: "ESP32 Client", type: "MCU", role: "Onboard ESP32 module emitting real-time metrics", telemetry: "Wi-Fi RSSI: -58dBm | Packets Sent: 2400+", x: 60, y: 170 },
        { id: "gps", label: "GPS Stream", type: "SENSOR", role: "Satellite receiver feeding latitude/longitude telemetry", telemetry: "Satellites: 12 | Precision (HDOP): 0.85", x: 300, y: 50 },
        { id: "leaflet", label: "Leaflet Maps", type: "WEB", role: "Interactive coordinate mapping overlay engine", telemetry: "Zoom Level: 18 | Target Lock: Verified", x: 300, y: 170 },
        { id: "control", label: "Waypoint Planner", type: "ALGO", role: "Command handler encoding flight route coordinates", telemetry: "Route Coordinates Loaded: 6 Waypoints", x: 420, y: 110 }
      ],
      links: [
        { from: "esp_client", to: "socket", label: "Wi-Fi RF Link", color: "#00F0FF", path: "M 60 170 L 60 50" },
        { from: "socket", to: "dashboard", label: "Socket Frame", color: "#BD00FF", path: "M 60 50 L 180 110" },
        { from: "gps", to: "dashboard", label: "NMEA Stream", color: "#FF5500", path: "M 300 50 L 180 110" },
        { from: "dashboard", to: "leaflet", label: "Render Pipe", color: "#BD00FF", path: "M 180 110 L 300 170" },
        { from: "dashboard", to: "control", label: "Flight Command", color: "#00F0FF", path: "M 180 110 L 420 110" }
      ]
    },
    {
      id: "05",
      title: "Line Following Robot",
      subtitle: "PID-Controlled Trajectory Tracker",
      status: "COMPLETED",
      description: "A high-speed industrial-styled cart designed to follow intricate tracks. Utilizes high-precision optocoupler arrays and an active PID control script to adjust differential motor speeds, preventing track escapes.",
      specs: [
        { label: "Control Chip", value: "ATmega8" },
        { label: "Sensor Array", value: "8-Channel TCRT5000" },
        { label: "Controller", value: "Single-Loop Speed PID" },
        { label: "Drive System", value: "Differential DC Drive" },
      ],
      tags: ["PID Tuning", "Optocouplers", "Hardware Calibration", "DC Drive", "C"],
      github: "https://github.com/sahasubho483-star/line-follower-robot",
      log: "TELEMETRY LOG: Optocoupler calibration OK. PID loop frequency: 500Hz. Max stable track speed: 1.2m/s.",
      nodes: [
        { id: "atmega", label: "ATmega8 MCU", type: "MCU", role: "8-bit core processing optical array readings at 500Hz", telemetry: "Clock: 8MHz | VCC: 5.0V | Registers: Running", x: 180, y: 110 },
        { id: "tcrt", label: "8-Ch TCRT5000", type: "SENSOR", role: "Optocoupler phototransistors detecting dark/light contrast", telemetry: "Outputs: 0b11000011 | Calibration: Calibrated", x: 60, y: 50 },
        { id: "pid", label: "PID Loop Core", type: "ALGO", role: "Discrete differential feedback error algorithm", telemetry: "Error Offset: -2 | Output Drive: 85%", x: 60, y: 170 },
        { id: "l293d", label: "L293D Driver", type: "ACTUATOR", role: "Dual H-bridge IC driving left/right differential lines", telemetry: "Bridge Temp: 32°C | Logic: 5.0V | Load: 0.4A", x: 300, y: 50 },
        { id: "motors", label: "2x DC Motors", type: "ACTUATOR", role: "High speed DC motors driving differential wheels", telemetry: "RPM Left: 320 | RPM Right: 380", x: 420, y: 110 }
      ],
      links: [
        { from: "tcrt", to: "atmega", label: "GPIO Binary", color: "#00F0FF", path: "M 60 50 L 180 110" },
        { from: "pid", to: "atmega", label: "Loop Error", color: "#00F0FF", path: "M 60 170 L 180 110" },
        { from: "atmega", to: "l293d", label: "PWM Speed", color: "#BD00FF", path: "M 180 110 L 300 50" },
        { from: "l293d", to: "motors", label: "Differential", color: "#FF5500", path: "M 300 50 L 420 110" }
      ]
    }
  ];

  const handleNodeInteraction = (projectId: string, nodeId: string) => {
    setSelectedNode({ projectId, nodeId });
  };

  const getActiveNodeInfo = (projectId: string) => {
    if (!selectedNode || selectedNode.projectId !== projectId) return null;
    const project = projects.find((p) => p.id === projectId);
    return project?.nodes.find((n) => n.id === selectedNode.nodeId) || null;
  };

  const getNodeColor = (type: string) => {
    switch (type) {
      case "MCU": return "border-electric-blue text-electric-blue bg-electric-blue/10";
      case "SENSOR": return "border-cyan-400 text-cyan-300 bg-cyan-900/20";
      case "ACTUATOR": return "border-pink-500 text-pink-400 bg-pink-900/20";
      case "POWER": return "border-amber-500 text-amber-400 bg-amber-900/20";
      case "ALGO": return "border-emerald-500 text-emerald-400 bg-emerald-950/20";
      case "WEB": return "border-purple-500 text-purple-400 bg-purple-950/20";
      default: return "border-white/20 text-white/70";
    }
  };

  return (
    <div className="w-full relative z-10 flex flex-col gap-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {projects.map((project, idx) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
            viewport={{ once: true }}
            className="glass-panel p-6 rounded-lg flex flex-col justify-between relative overflow-hidden group hover:translate-y-[-2px] transition-all duration-300"
          >
            {/* Holographic background numbering */}
            <div className="absolute top-[-20px] right-[-10px] text-8xl font-black font-orbitron text-white/[0.01] select-none pointer-events-none group-hover:text-electric-blue/[0.02] transition-colors">
              {project.id}
            </div>

            <div className="flex flex-col gap-4">
              {/* Card Header */}
              <div className="flex justify-between items-start">
                <div className="flex flex-col">
                  <span className="text-[10px] font-mono tracking-widest text-white/40 uppercase">
                    PROJECT // {project.id}
                  </span>
                  <h3 className="text-xl font-bold font-orbitron text-white tracking-wide mt-1 group-hover:text-electric-blue transition-colors">
                    {project.title}
                  </h3>
                  <span className="text-xs text-white/60 font-mono mt-0.5">
                    {project.subtitle}
                  </span>
                </div>
                
                {/* Status Indicator */}
                <span className={`text-[10px] font-mono px-2 py-0.5 border rounded-sm font-bold ${
                  project.status === "ACTIVE" 
                    ? "border-emerald-500/30 text-emerald-400 bg-emerald-500/5" 
                    : project.status === "COMPLETED" 
                    ? "border-electric-blue/30 text-electric-blue bg-electric-blue/5"
                    : project.status === "TESTING"
                    ? "border-amber-500/30 text-amber-400 bg-amber-500/5"
                    : "border-neon-purple/30 text-neon-purple bg-neon-purple/5"
                }`}>
                  {project.status}
                </span>
              </div>

              {/* Description */}
              <p className="text-xs text-white/70 font-mono leading-relaxed">
                {project.description}
              </p>

              {/* Technical Specifications HUD */}
              <div className="border border-white/5 bg-white/[0.01] rounded p-3.5 font-mono text-xs flex flex-col gap-2 relative">
                {/* Tech drawing horizontal divider line */}
                <div className="absolute top-0 left-0 w-2 h-[1px] bg-electric-blue"></div>
                <div className="absolute top-0 left-0 h-2 w-[1px] bg-electric-blue"></div>
                
                <span className="text-[9px] uppercase tracking-widest text-white/40 flex items-center gap-1.5 mb-1">
                  <Cpu className="w-3.5 h-3.5 text-electric-blue" />
                  Hardware Architecture Specs
                </span>
                <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
                  {project.specs.map((spec, sIdx) => (
                    <div key={sIdx} className="flex justify-between border-b border-white/[0.03] pb-1">
                      <span className="text-white/45 text-[10px]">{spec.label}</span>
                      <span className="text-white/90 text-[10px] font-bold text-right truncate pl-2">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technologies Tag List */}
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[9px] font-mono px-2 py-0.5 border border-white/10 rounded-full bg-white/[0.02] text-white/70 hover:border-white/20 transition-colors"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Diagnostics Stream & Actions */}
            <div className="flex flex-col gap-3 mt-6 pt-4 border-t border-white/5">
              {/* Fake Realtime Telemetry Log */}
              <div className="text-[9px] font-mono text-electric-blue/70 bg-electric-blue/[0.02] border border-electric-blue/10 px-2.5 py-1.5 rounded flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-electric-blue animate-pulse"></span>
                <span className="font-bold tracking-tight">{project.log}</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs text-white/60 hover:text-white font-mono transition-colors group/btn"
                    >
                      <svg 
                        className="w-3.5 h-3.5 fill-white/60 group-hover/btn:fill-white transition-colors duration-300" 
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                      <span>Repo</span>
                    </a>
                  )}
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs text-electric-blue hover:text-cyan-300 font-mono transition-colors group/btn"
                    >
                      <ExternalLink className="w-3.5 h-3.5 text-electric-blue group-hover/btn:text-cyan-300 transition-colors" />
                      <span>Live Demo</span>
                    </a>
                  )}
                </div>

                {/* Digital Twin Schematic Button Trigger */}
                <button
                  onClick={() => {
                    const newId = activeTwinId === project.id ? null : project.id;
                    setActiveTwinId(newId);
                    setSelectedNode(null);
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1 border rounded-md font-mono text-[10px] font-bold uppercase transition-all duration-300 tracking-wider hover:-translate-y-0.5 ${
                    activeTwinId === project.id
                      ? "border-neon-purple text-neon-purple bg-neon-purple/10 glow-purple"
                      : "border-electric-blue/40 text-electric-blue bg-electric-blue/5 hover:border-electric-blue hover:bg-electric-blue/10 glow-blue"
                  }`}
                >
                  <Network className="w-3.5 h-3.5 animate-spin-slow" />
                  <span>{activeTwinId === project.id ? "Close Twin Lab" : "View Digital Twin"}</span>
                </button>
              </div>
            </div>

            {/* EXPANDABLE DIGITAL TWIN LAB PANEL */}
            <AnimatePresence>
              {activeTwinId === project.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="mt-6 border-t border-white/10 pt-5 flex flex-col gap-4 overflow-hidden"
                >
                  <div className="flex items-center justify-between text-[10px] font-mono text-white/50 uppercase tracking-widest">
                    <span className="flex items-center gap-1.5 text-neon-purple">
                      <Zap className="w-3.5 h-3.5 animate-pulse text-neon-purple" />
                      Digital Twin Schematic Analyzer
                    </span>
                    <span>ACTIVE LINK // UPLINK SECURE</span>
                  </div>

                  {/* Node schematic rendering view */}
                  <div className="relative border border-white/5 rounded-lg bg-[#050505] p-3 overflow-x-auto select-none">
                    <svg width="480" height="220" viewBox="0 0 480 220" className="mx-auto block">
                      <defs>
                        {/* Define glowing marker heads */}
                        <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                          <path d="M 0 2 L 8 5 L 0 8 z" fill="#00F0FF" />
                        </marker>
                      </defs>
                      <style>{`
                        @keyframes signalFlow {
                          to {
                            stroke-dashoffset: -20;
                          }
                        }
                        .signal-line {
                          stroke-dasharray: 6, 4;
                          animation: signalFlow 1.2s linear infinite;
                        }
                        .signal-line-fast {
                          stroke-dasharray: 5, 3;
                          animation: signalFlow 0.8s linear infinite;
                        }
                      `}</style>

                      {/* Connection wires (with active flowing dashes) */}
                      {project.links.map((link, lIdx) => (
                        <g key={lIdx}>
                          {/* Shadow glow background path */}
                          <path
                            d={link.path}
                            stroke={link.color}
                            strokeWidth="3.5"
                            fill="none"
                            opacity="0.15"
                          />
                          {/* Animating signal core path */}
                          <path
                            d={link.path}
                            stroke={link.color}
                            strokeWidth="1.5"
                            fill="none"
                            opacity="0.75"
                            className={link.color.includes("FF55") ? "signal-line-fast" : "signal-line"}
                          />
                        </g>
                      ))}

                      {/* Schematic Nodes */}
                      {project.nodes.map((node) => {
                        const isSelected = selectedNode?.projectId === project.id && selectedNode?.nodeId === node.id;
                        return (
                          <g
                            key={node.id}
                            transform={`translate(${node.x}, ${node.y})`}
                            onClick={() => handleNodeInteraction(project.id, node.id)}
                            className="cursor-pointer group/node"
                          >
                            {/* Inner glow circle */}
                            <circle
                              r="16"
                              fill="#000000"
                              stroke={isSelected ? "#BD00FF" : "#ffffff"}
                              strokeWidth={isSelected ? "2.5" : "1.2"}
                              strokeOpacity={isSelected ? "1.0" : "0.2"}
                              className="transition-all duration-300"
                            />
                            {/* Inner core circle indicator */}
                            <circle
                              r="4"
                              className={`transition-all duration-300 ${
                                node.type === "MCU" ? "fill-electric-blue" :
                                node.type === "SENSOR" ? "fill-cyan-400 animate-pulse" :
                                node.type === "ACTUATOR" ? "fill-pink-500" :
                                node.type === "POWER" ? "fill-amber-500" :
                                "fill-emerald-400"
                              }`}
                            />
                            {/* Outer pulsating rings on hover/selection */}
                            <circle
                              r="22"
                              fill="none"
                              stroke={isSelected ? "#BD00FF" : "#00F0FF"}
                              strokeWidth="1"
                              opacity={isSelected ? "0.6" : "0"}
                              className="group-hover/node:opacity-30 transition-opacity duration-300"
                              style={{ transformOrigin: "center" }}
                            />

                            {/* Node Title Label text */}
                            <text
                              y="-22"
                              textAnchor="middle"
                              className="fill-white font-mono text-[9px] font-semibold tracking-wide"
                              style={{ textShadow: "0 0 5px rgba(0,0,0,0.8)" }}
                            >
                              {node.label}
                            </text>
                            
                            {/* Subtitle tag label */}
                            <text
                              y="26"
                              textAnchor="middle"
                              className="fill-white/35 font-mono text-[7px]"
                            >
                              {node.type}
                            </text>
                          </g>
                        );
                      })}
                    </svg>

                    <div className="absolute top-2 right-2 text-[8px] font-mono text-white/20 pointer-events-none uppercase">
                      [ Interactive Nodes // Click to Probe ]
                    </div>
                  </div>

                  {/* Node Diagnostics Panel */}
                  <div className="border border-white/5 bg-[#030303]/80 rounded p-4 font-mono text-[11px] leading-relaxed relative min-h-[92px] flex flex-col justify-center">
                    <div className="absolute bottom-1 right-2 text-[7px] text-white/10 uppercase">
                      PROBE STATUS: {selectedNode ? "DATA LOCKED" : "LISTENING..."}
                    </div>

                    {selectedNode && selectedNode.projectId === project.id ? (
                      (() => {
                        const nodeInfo = getActiveNodeInfo(project.id);
                        if (!nodeInfo) return <div className="text-white/40 text-center uppercase tracking-widest text-[9px]">// SELECT SCHEMATIC CORE NODE TO ENGAGE PROBE //</div>;
                        return (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex flex-col gap-1.5"
                          >
                            <div className="flex items-center gap-2 border-b border-white/5 pb-1">
                              <span className={`px-2 py-0.5 border text-[9px] font-bold rounded ${getNodeColor(nodeInfo.type)}`}>
                                {nodeInfo.type}
                              </span>
                              <span className="text-white font-bold font-orbitron tracking-wide text-xs">{nodeInfo.label}</span>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 mt-1">
                              <div className="sm:col-span-2">
                                <span className="text-white/30 text-[9px] block uppercase tracking-wider">Functional Role</span>
                                <span className="text-white/80">{nodeInfo.role}</span>
                              </div>
                              <div className="sm:col-span-2">
                                <span className="text-white/30 text-[9px] block uppercase tracking-wider">Live Packet Diagnostics</span>
                                <span className="text-electric-blue font-bold tracking-tight">{nodeInfo.telemetry}</span>
                              </div>
                            </div>
                          </motion.div>
                        );
                      })()
                    ) : (
                      <div className="text-white/40 text-center uppercase tracking-widest text-[9px] flex flex-col items-center justify-center gap-1">
                        <Info className="w-5 h-5 text-electric-blue/40 animate-pulse" />
                        <span>// SELECT SCHEMATIC CORE NODE TO ENGAGE PROBE //</span>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
