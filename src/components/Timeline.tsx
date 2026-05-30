"use client";

import React from "react";
import { motion } from "framer-motion";
import { Circle, Terminal, Zap, Cpu, Award } from "lucide-react";

interface MissionEvent {
  year: string;
  title: string;
  tag: string;
  description: string;
  icon: React.ReactNode;
  status: string;
}

export default function Timeline() {
  const events: MissionEvent[] = [
    {
      year: "FUTURE",
      title: "AI-Powered Autonomous Systems",
      tag: "CORE DIRECTIVE",
      description: "Developing deep integration models connecting neural network engines to real-time embedded motor drivers. Targeting autonomous swarming and multi-agent coordination capabilities.",
      icon: <Cpu className="w-4 h-4 text-neon-purple" />,
      status: "PLANNED TRAJECTORY",
    },
    {
      year: "2026",
      title: "Advanced Embedded Systems Research",
      tag: "ACADEMIC PHASE II",
      description: "Expanding autonomous navigation scripts into full robotic ecosystems. Researching decentralized sensor networks using ESP-NOW mesh protocols and low-latency motor drivers.",
      icon: <Zap className="w-4 h-4 text-electric-blue" />,
      status: "DEVELOPMENT ENGAGED",
    },
    {
      year: "2025",
      title: "Designed Maze Solving Robot",
      tag: "ALGORITHM OPTIMIZATION",
      description: "Built a Micromouse crawler and implemented a coordinate flood-fill mapping algorithm to solve complex grids.",
      icon: <Terminal className="w-4 h-4 text-neon-purple" />,
      status: "ALGORITHM VERIFIED",
    },
    {
      year: "2025",
      title: "Built Terrain Navigation Rover",
      tag: "OBSTACLE AVOIDANCE",
      description: "Constructed a 4WD exploration vehicle featuring HC-SR04 ultrasonic sensor arrays for boundary sweeps and path correction.",
      icon: <Circle className="w-4 h-4 text-electric-blue" />,
      status: "HARDWARE DEPLOYED",
    },
    {
      year: "2025",
      title: "Developed First Autonomous Drone",
      tag: "FLIGHT DYNAMICS",
      description: "Engineered an ESP32 flight controller, calibrated MPU9250 IMU sensors, and tuned cascade PID matrices for stable active hovering.",
      icon: <Cpu className="w-4 h-4 text-neon-purple" />,
      status: "INTEGRATION SUCCESS",
    },
    {
      year: "2024",
      title: "Entered Electrical Engineering",
      tag: "MATRICULATION",
      description: "Started B.Tech program at Kalyani Government Engineering College. Focused coursework on electric machine models and control systems.",
      icon: <Award className="w-4 h-4 text-electric-blue" />,
      status: "SECTOR ACTIVE",
    },
    {
      year: "2024",
      title: "WBJEE AIR 3513 & JEE Main 96%ile",
      tag: "COMPETITIVE EVALUATION",
      description: "Achieved state-level Top rank (3513 out of 100K+ candidates) in West Bengal Joint Entrance, alongside 96 percentile score in national JEE.",
      icon: <Award className="w-4 h-4 text-neon-purple" />,
      status: "SCORE COMMITTED",
    },
    {
      year: "2005",
      title: "Birth // Unit Activated",
      tag: "INITIAL BOOT",
      description: "System initialized. Hardware and cellular systems online. Logical core booted. Long-term mission clock instantiated.",
      icon: <Terminal className="w-4 h-4 text-electric-blue" />,
      status: "INITIALIZED",
    },
  ];

  return (
    <div className="w-full relative z-10 flex flex-col gap-8">
      {/* Outer Vertical Line */}
      <div className="relative border-l border-white/10 pl-6 md:pl-10 ml-4 md:ml-6 flex flex-col gap-10">
        
        {/* Luminous line tracer */}
        <div className="absolute left-[-1.5px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-electric-blue via-neon-purple to-transparent pointer-events-none" />

        {events.map((event, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            viewport={{ once: true }}
            className="relative flex flex-col gap-2 group"
          >
            {/* Timeline node marker */}
            <div className="absolute left-[-31px] md:left-[-45px] top-1.5 w-4 h-4 rounded-full border-2 border-cyber-bg bg-cyber-bg flex items-center justify-center pointer-events-none">
              <span className={`inline-block w-2 h-2 rounded-full ${
                idx % 2 === 0 
                  ? "bg-electric-blue group-hover:scale-125 transition-transform duration-300" 
                  : "bg-neon-purple group-hover:scale-125 transition-transform duration-300"
              }`} />
            </div>

            {/* Event Timestamp and status HUD */}
            <div className="flex flex-wrap items-center gap-3 text-[10px] font-mono tracking-widest text-white/50">
              <span className={`font-bold text-sm ${idx % 2 === 0 ? "text-electric-blue" : "text-neon-purple"}`}>
                {event.year}
              </span>
              <span>//</span>
              <span className="uppercase text-white/40">{event.tag}</span>
              <span>//</span>
              <span className={`px-2 py-0.5 border rounded-sm text-[8px] font-bold ${
                idx % 2 === 0 
                  ? "border-electric-blue/20 text-electric-blue/80 bg-electric-blue/5" 
                  : "border-neon-purple/20 text-neon-purple/80 bg-neon-purple/5"
              }`}>
                {event.status}
              </span>
            </div>

            {/* Event Content Panel */}
            <div className="glass-panel p-5 rounded-lg hover:border-white/20 transition-all duration-300">
              <div className="flex items-center gap-2.5 mb-2">
                <div className="p-1.5 border border-white/10 rounded bg-white/[0.02]">
                  {event.icon}
                </div>
                <h4 className="text-base font-bold font-orbitron text-white tracking-wide mt-0.5">
                  {event.title}
                </h4>
              </div>
              <p className="text-xs text-white/70 font-mono leading-relaxed">
                {event.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
