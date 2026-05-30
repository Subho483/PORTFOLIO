"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cpu, Zap, Activity, Globe } from "lucide-react";

interface Skill {
  name: string;
  level: number; // 0 to 100
  info: string;
}

interface SkillCategory {
  title: string;
  icon: React.ReactNode;
  color: string;
  glow: string;
  skills: Skill[];
}

export default function SkillsGalaxy() {
  const [activeCategory, setActiveCategory] = useState<number>(0);

  const categories: SkillCategory[] = [
    {
      title: "Embedded Systems",
      icon: <Cpu className="w-5 h-5 text-electric-blue" />,
      color: "text-electric-blue border-electric-blue/30",
      glow: "glow-blue",
      skills: [
        { name: "ESP32 / ESP8266", level: 90, info: "WiFi/BLE microcontrollers, RTOS, firmware development, low-power sleep modes." },
        { name: "C / C++ (Embedded)", level: 85, info: "Hardware-level programming, register manipulation, interrupts, memory optimization." },
        { name: "STM32 / AVR", level: 80, info: "ARM Cortex architecture, HAL/LL libraries, peripheral config, timers." },
        { name: "UART / I2C / SPI", level: 90, info: "Serial communication protocols, sensor interfacing, logic analyzer debugging." },
      ],
    },
    {
      title: "Hardware & Design",
      icon: <Zap className="w-5 h-5 text-neon-purple" />,
      color: "text-neon-purple border-neon-purple/30",
      glow: "glow-purple",
      skills: [
        { name: "PCB Design & EDA", level: 80, info: "Multi-layer schematic capture & board layout, high-frequency trace routing, design for manufacturing." },
        { name: "MATLAB & Simulink", level: 85, info: "Dynamic system simulations, physical model blocks, control loop optimizations." },
        { name: "Proteus / Multisim", level: 80, info: "Circuit prototyping, digital/analog simulations, troubleshooting electronic schematics." },
        { name: "Power Electronics", level: 75, info: "Buck-Boost converter designs, gate drivers, battery management systems (BMS)." },
      ],
    },
    {
      title: "Robotics & Control",
      icon: <Activity className="w-5 h-5 text-electric-blue" />,
      color: "text-electric-blue border-electric-blue/30",
      glow: "glow-blue",
      skills: [
        { name: "PID Control Systems", level: 88, info: "Closed-loop feedback control systems, cascade PID tuning for drone pitch/roll/yaw, motor encoders." },
        { name: "Sensor Fusion / IMU", level: 80, info: "Complementary/Kalman filtering, gyroscope-accelerometer-magnetometer integration." },
        { name: "Path Planning Algorithms", level: 85, info: "Flood-fill algorithm for maze solvers, wall-following state machines, obstacle avoidance." },
        { name: "DC / BLDC Motors", level: 82, info: "ESC throttle control, PWM driver circuits, stepper motor positioning." },
      ],
    },
    {
      title: "Software & Web Dev",
      icon: <Globe className="w-5 h-5 text-neon-purple" />,
      color: "text-neon-purple border-neon-purple/30",
      glow: "glow-purple",
      skills: [
        { name: "TypeScript / JavaScript", level: 80, info: "Modern ES6 syntax, type safety, reactive client-side rendering structures." },
        { name: "Next.js / React", level: 78, info: "App router, static site generation, server components, interactive HUD dashboards." },
        { name: "Tailwind CSS", level: 85, info: "Responsive grid systems, custom animation extensions, glassmorphic styling." },
        { name: "Node.js & WebSockets", level: 75, info: "Real-time telemetry streaming servers, drone telemetry APIs, dashboard data pipes." },
      ],
    },
  ];

  return (
    <div className="w-full relative z-10 flex flex-col gap-8">
      {/* Category Tabs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full">
        {categories.map((cat, idx) => (
          <button
            key={idx}
            onClick={() => setActiveCategory(idx)}
            className={`px-4 py-3 border rounded text-xs font-orbitron uppercase tracking-widest transition-all duration-300 flex items-center gap-2.5 justify-center md:justify-start ${
              activeCategory === idx
                ? idx % 2 === 0
                  ? "border-electric-blue bg-electric-blue/10 text-electric-blue glow-blue"
                  : "border-neon-purple bg-neon-purple/10 text-neon-purple glow-purple"
                : "border-white/10 bg-white/[0.01] hover:bg-white/[0.03] text-white/60"
            }`}
          >
            {cat.icon}
            <span className="hidden sm:inline font-bold">{cat.title}</span>
            <span className="sm:hidden font-bold">{cat.title.split(" ")[0]}</span>
          </button>
        ))}
      </div>

      {/* Category Detail Panel */}
      <div className="glass-panel p-6 md:p-8 rounded-lg relative overflow-hidden min-h-[380px] flex flex-col lg:flex-row gap-8 items-center justify-between">
        
        {/* Decorative Grid Line Ring */}
        <div className="absolute top-0 right-0 w-64 h-64 border border-white/[0.02] rounded-full pointer-events-none transform translate-x-1/3 -translate-y-1/3 flex items-center justify-center">
          <div className="w-48 h-48 border border-white/[0.02] rounded-full flex items-center justify-center">
            <div className="w-32 h-32 border border-white/[0.02] rounded-full"></div>
          </div>
        </div>

        {/* Info Column */}
        <div className="w-full lg:w-3/5 flex flex-col gap-6 relative z-10">
          <div className="flex items-center gap-3">
            <div className="p-2 border border-white/10 rounded bg-white/[0.02]">
              {categories[activeCategory].icon}
            </div>
            <h3 className="text-xl md:text-2xl font-bold font-orbitron text-white tracking-widest uppercase">
              {categories[activeCategory].title}
            </h3>
          </div>

          <div className="flex flex-col gap-5">
            {categories[activeCategory].skills.map((skill, sIdx) => (
              <div key={sIdx} className="flex flex-col gap-2 group">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-mono text-white/90 group-hover:text-electric-blue transition-colors font-bold">
                    {skill.name}
                  </span>
                  <span className={`font-mono font-bold text-xs ${activeCategory % 2 === 0 ? "text-electric-blue" : "text-neon-purple"}`}>
                    {skill.level}%
                  </span>
                </div>
                
                {/* Progress bar */}
                <div className="w-full bg-white/[0.03] border border-white/5 h-2 rounded overflow-hidden relative">
                  <motion.div
                    key={`${activeCategory}-${sIdx}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className={`h-full rounded ${
                      activeCategory % 2 === 0 
                        ? "bg-gradient-to-r from-electric-blue to-cyan-400" 
                        : "bg-gradient-to-r from-neon-purple to-pink-500"
                    }`}
                  />
                </div>
                
                <p className="text-xs text-white/60 font-mono pl-1 leading-relaxed">
                  {skill.info}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Telemetry Ring Graphic */}
        <div className="hidden lg:flex w-2/5 justify-center items-center relative select-none">
          <svg className="w-64 h-64 transform rotate-[-90deg]" viewBox="0 0 100 100">
            {/* Background Circle */}
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="transparent"
              stroke="rgba(255,255,255,0.02)"
              strokeWidth="4"
            />
            {/* Active Circle Segment */}
            <motion.circle
              cx="50"
              cy="50"
              r="40"
              fill="transparent"
              stroke={activeCategory % 2 === 0 ? "#00F0FF" : "#BD00FF"}
              strokeWidth="4"
              strokeDasharray="251.2"
              initial={{ strokeDashoffset: 251.2 }}
              animate={{ strokeDashoffset: 251.2 - (251.2 * 0.82) }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              strokeLinecap="round"
            />
            {/* Embedded inner rotating ring */}
            <circle
              cx="50"
              cy="50"
              r="34"
              fill="transparent"
              stroke="rgba(0, 240, 255, 0.05)"
              strokeWidth="1"
              strokeDasharray="10 5"
              className="animate-spin"
              style={{ animationDuration: "12s" }}
            />
          </svg>
          <div className="absolute flex flex-col items-center justify-center font-mono">
            <span className="text-[10px] text-white/40 tracking-wider">LAB UNIT</span>
            <span className="text-2xl font-bold font-orbitron text-white">
              0{activeCategory + 1}
            </span>
            <span className={`text-[8px] tracking-widest font-bold ${activeCategory % 2 === 0 ? "text-electric-blue" : "text-neon-purple"}`}>
              SYS ACTIVE
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}
