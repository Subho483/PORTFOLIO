"use client";

import React from "react";
import { motion } from "framer-motion";
import { Target, Activity, Zap, Cpu, Server, Network, ShieldAlert } from "lucide-react";

interface Mission {
  id: string;
  name: string;
  status: string;
  statusColor: "GREEN" | "YELLOW" | "BLUE" | "RED";
  progress: number;
  tech: string[];
  milestone: string;
  challenge: string;
  applications?: string[];
}

export default function FutureMissions() {
  const missions: Mission[] = [
    {
      id: "M-01",
      name: "ANALOG COMPUTER",
      status: "Research Phase",
      statusColor: "BLUE",
      progress: 15,
      tech: ["Operational Amplifiers", "Analog Computing", "Signal Processing", "Differential Equation Solvers"],
      milestone: "Build Integrator and Differentiator Modules",
      challenge: "Stable Analog Computation"
    },
    {
      id: "M-02",
      name: "SMART ELECTRONIC VOTING MACHINE",
      status: "Prototype Development",
      statusColor: "YELLOW",
      progress: 40,
      tech: ["7400", "7404", "7408", "7432", "7474", "7476", "7447", "7414"],
      milestone: "Complete Vote Counting Logic",
      challenge: "Reliable Hardware Logic Verification"
    },
    {
      id: "M-03",
      name: "IC-BASED TRAFFIC MANAGEMENT SYSTEM",
      status: "Design Phase",
      statusColor: "BLUE",
      progress: 30,
      tech: ["555 Timer", "4017 Counter", "TTL Logic", "Flip-Flops"],
      milestone: "Emergency Vehicle Priority System",
      challenge: "Complex Timing Sequences"
    },
    {
      id: "M-04",
      name: "SELF-BALANCING ROBOT",
      status: "Active Development",
      statusColor: "GREEN",
      progress: 70,
      tech: ["Arduino Nano", "MPU6050", "TB6612FNG", "PID Control"],
      milestone: "Stable Autonomous Balancing",
      challenge: "PID Optimization"
    },
    {
      id: "M-05",
      name: "WIFI HUMAN TRACKING SYSTEM",
      status: "Research & Development",
      statusColor: "BLUE",
      progress: 25,
      tech: ["ESP32", "WiFi RSSI Analysis", "Signal Processing", "ESP-NOW"],
      milestone: "Human Motion Detection",
      challenge: "Accurate Localization Through Walls",
      applications: ["Smart Homes", "Security", "Occupancy Detection"]
    },
    {
      id: "M-06",
      name: "AI-POWERED AUTONOMOUS DRONE",
      status: "Concept Research",
      statusColor: "RED",
      progress: 10,
      tech: ["ESP32", "Computer Vision", "Machine Learning", "Sensor Fusion"],
      milestone: "Autonomous Object Tracking",
      challenge: "Real-Time AI Processing"
    },
    {
      id: "M-07",
      name: "ADVANCED EMBEDDED NETWORKS",
      status: "Research Phase",
      statusColor: "BLUE",
      progress: 20,
      tech: ["ESP-NOW", "Mesh Networking", "IoT Systems"],
      milestone: "Multi-Node Communication System",
      challenge: "Low-Latency Reliable Communication"
    }
  ];

  const getStatusColor = (color: string) => {
    switch (color) {
      case "GREEN": return "text-emerald-400 border-emerald-400/30 bg-emerald-400/10";
      case "YELLOW": return "text-amber-400 border-amber-400/30 bg-amber-400/10";
      case "BLUE": return "text-electric-blue border-electric-blue/30 bg-electric-blue/10";
      case "RED": return "text-rose-400 border-rose-400/30 bg-rose-400/10";
      default: return "text-white/60 border-white/10 bg-white/5";
    }
  };

  const getProgressBarColor = (color: string) => {
    switch (color) {
      case "GREEN": return "bg-emerald-400";
      case "YELLOW": return "bg-amber-400";
      case "BLUE": return "bg-electric-blue";
      case "RED": return "bg-rose-400";
      default: return "bg-white/40";
    }
  };

  return (
    <div className="flex flex-col gap-12 w-full">
      {/* Mission Control Analytics Dashboard */}
      <div className="glass-panel border border-white/10 bg-[#030303]/80 p-6 md:p-8 rounded-lg relative overflow-hidden">
        {/* Holographic scanning overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-electric-blue/[0.02] to-transparent pointer-events-none animate-scanline"></div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-electric-blue/5 rounded-full blur-[60px]"></div>
        
        <div className="flex items-center gap-3 mb-8 border-b border-white/5 pb-4">
          <Activity className="w-5 h-5 text-electric-blue" />
          <h3 className="font-orbitron font-bold tracking-widest text-white">MISSION CONTROL ANALYTICS</h3>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 font-mono">
          <div className="flex flex-col gap-2 border-l-2 border-emerald-400/50 pl-4">
            <span className="text-[10px] text-white/40 uppercase tracking-widest">Completed Projects</span>
            <span className="text-3xl font-bold text-white tracking-tighter">5<span className="text-emerald-400">+</span></span>
          </div>
          <div className="flex flex-col gap-2 border-l-2 border-amber-400/50 pl-4">
            <span className="text-[10px] text-white/40 uppercase tracking-widest">Under Development</span>
            <span className="text-3xl font-bold text-white tracking-tighter">7<span className="text-amber-400">+</span></span>
          </div>
          <div className="flex flex-col gap-2 border-l-2 border-neon-purple/50 pl-4">
            <span className="text-[10px] text-white/40 uppercase tracking-widest">Sensors Tested</span>
            <span className="text-3xl font-bold text-white tracking-tighter">35<span className="text-neon-purple">+</span></span>
          </div>
          <div className="flex flex-col gap-2 border-l-2 border-electric-blue/50 pl-4">
            <span className="text-[10px] text-white/40 uppercase tracking-widest">Flight Hours</span>
            <span className="text-3xl font-bold text-white tracking-tighter">24<span className="text-electric-blue">+</span></span>
          </div>
          
          <div className="col-span-2 md:col-span-4 mt-4 bg-white/[0.02] border border-white/5 p-4 rounded flex flex-col sm:flex-row items-center gap-4 sm:justify-between">
            <div className="flex flex-col gap-1 w-full sm:w-auto">
              <span className="text-[10px] text-white/40 uppercase tracking-widest">Embedded Code Lines</span>
              <span className="text-2xl font-bold text-white tracking-tighter">50,000<span className="text-emerald-400">+</span></span>
            </div>
            <div className="flex flex-wrap gap-2 w-full sm:flex-1 sm:justify-end">
              {["Robotics", "Embedded Systems", "Control Systems", "Digital Electronics", "Analog Computing", "IoT", "Power Systems"].map(domain => (
                <span key={domain} className="text-[9px] px-2 py-1 border border-white/10 bg-black rounded text-white/60">
                  {domain}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Active Missions Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {missions.map((mission, idx) => (
          <motion.div
            key={mission.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            viewport={{ once: true }}
            className="glass-panel p-6 rounded-lg border border-white/10 bg-[#030303]/60 relative flex flex-col gap-5 group hover:border-white/20 transition-all duration-300"
          >
            {/* Header */}
            <div className="flex items-start justify-between">
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-mono text-white/40 tracking-widest">MISSION {mission.id.split('-')[1]}</span>
                <h4 className="font-orbitron font-bold text-sm tracking-widest text-white uppercase pr-4">
                  {mission.name}
                </h4>
              </div>
              <div className={`px-2 py-1 border rounded text-[9px] font-mono font-bold tracking-widest uppercase flex items-center gap-1.5 whitespace-nowrap ${getStatusColor(mission.statusColor)}`}>
                <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${getProgressBarColor(mission.statusColor)}`}></span>
                {mission.status}
              </div>
            </div>

            {/* Progress Bar */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between text-[10px] font-mono font-bold">
                <span className="text-white/40 uppercase tracking-widest">Initialization Progress</span>
                <span className={mission.statusColor === "GREEN" ? "text-emerald-400" : mission.statusColor === "YELLOW" ? "text-amber-400" : mission.statusColor === "BLUE" ? "text-electric-blue" : "text-rose-400"}>
                  {mission.progress}%
                </span>
              </div>
              <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${mission.progress}%` }}
                  transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                  viewport={{ once: true }}
                  className={`h-full ${getProgressBarColor(mission.statusColor)} relative`}
                >
                  <div className="absolute top-0 right-0 bottom-0 w-10 bg-gradient-to-r from-transparent to-white/50 blur-[2px]"></div>
                </motion.div>
              </div>
            </div>

            {/* Technologies */}
            <div className="flex flex-col gap-2 mt-1">
              <span className="text-[9px] font-mono text-white/40 tracking-widest uppercase flex items-center gap-1.5">
                <Cpu className="w-3 h-3" /> Hardware/Tech Stack
              </span>
              <div className="flex flex-wrap gap-1.5">
                {mission.tech.map((t, i) => (
                  <span key={i} className="text-[9px] font-mono px-1.5 py-0.5 rounded border border-white/10 bg-white/[0.03] text-white/70">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Milestone & Challenge */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2 font-mono text-[10px] border-t border-white/5 pt-4">
              <div className="flex flex-col gap-1.5">
                <span className="text-neon-purple tracking-widest uppercase flex items-center gap-1">
                  <Target className="w-3 h-3" /> Next Milestone
                </span>
                <span className="text-white/80">{mission.milestone}</span>
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="text-amber-400 tracking-widest uppercase flex items-center gap-1">
                  <ShieldAlert className="w-3 h-3" /> Challenge
                </span>
                <span className="text-white/80">{mission.challenge}</span>
              </div>
            </div>

            {/* Optional Applications */}
            {mission.applications && (
              <div className="flex flex-col gap-1.5 border-t border-white/5 pt-3 mt-1">
                <span className="text-[9px] font-mono text-emerald-400 tracking-widest uppercase flex items-center gap-1">
                  <Network className="w-3 h-3" /> Target Applications
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {mission.applications.map((app, i) => (
                    <span key={i} className="text-[9px] font-mono text-white/60">
                      {i > 0 && <span className="text-white/20 mr-1.5">|</span>}
                      {app}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {/* Ambient Background glow on hover */}
            <div className={`absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity pointer-events-none ${getProgressBarColor(mission.statusColor)}`} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
