"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Award, Cpu, BookOpen, GraduationCap, ShieldAlert, Activity, GitFork, Orbit } from "lucide-react";

// Micro Counter Component for real-time telemetry effect
function Counter({ value, suffix = "", duration = 2 }: { value: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = value;
    const totalMs = duration * 1000;
    const fps = 30;
    const totalFrames = Math.max(Math.floor(totalMs / (1000 / fps)), 1);
    let frame = 0;

    const timer = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      // Ease out quad
      const current = Math.floor(end * (progress * (2 - progress)));
      
      if (frame >= totalFrames) {
        clearInterval(timer);
        setCount(end);
      } else {
        setCount(current);
      }
    }, 1000 / fps);

    return () => clearInterval(timer);
  }, [value, duration, isInView]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

export default function StatsPanel() {
  const engineeringStats = [
    {
      label: "Drone Flight Hours",
      value: 24,
      suffix: "+ hrs",
      desc: "Simulated & Field Autonomous Flight Runs",
      icon: <Orbit className="w-5 h-5 text-electric-blue" />,
    },
    {
      label: "Projects Built",
      value: 12,
      suffix: "+ systems",
      desc: "Embedded controllers, rovers, web portals",
      icon: <GitFork className="w-5 h-5 text-neon-purple" />,
    },
    {
      label: "Sensors Integrated",
      value: 35,
      suffix: "+ units",
      desc: "IMUs, ToF LIDAR, sonar sweeps, TCRTs",
      icon: <Cpu className="w-5 h-5 text-electric-blue" />,
    },
    {
      label: "Lines of Embedded Code",
      value: 50000,
      suffix: "+ lines",
      desc: "Bare-metal C/C++, FreeRTOS threads",
      icon: <Activity className="w-5 h-5 text-neon-purple" />,
    },
  ];

  const academicHolograms = [
    {
      title: "WBJEE AIR 3513",
      exam: "State Engineering Rank",
      institution: "West Bengal Board Entry",
      detail: "Top 2.5% Percentile Standing",
      border: "border-electric-blue/30 text-electric-blue shadow-[0_0_15px_rgba(0,240,255,0.05)]",
      glow: "from-electric-blue/10 to-transparent",
      dot: "bg-electric-blue",
      icon: <Award className="w-5 h-5 text-electric-blue" />,
    },
    {
      title: "JEE Main 96%ile",
      exam: "Joint Entrance Exam",
      institution: "National Level Standing",
      detail: "Top Tier out of 1.4 Million",
      border: "border-neon-purple/30 text-neon-purple shadow-[0_0_15px_rgba(189,0,255,0.05)]",
      glow: "from-neon-purple/10 to-transparent",
      dot: "bg-neon-purple",
      icon: <Cpu className="w-5 h-5 text-neon-purple" />,
    },
    {
      title: "HS Marks 94%",
      exam: "Higher Secondary Exam",
      institution: "West Bengal State Board",
      detail: "Registered Score: 470 / 500",
      border: "border-electric-blue/30 text-electric-blue shadow-[0_0_15px_rgba(0,240,255,0.05)]",
      glow: "from-electric-blue/10 to-transparent",
      dot: "bg-electric-blue",
      icon: <BookOpen className="w-5 h-5 text-electric-blue" />,
    },
    {
      title: "B.Tech EE @ KGEC",
      exam: "Electrical Engineering",
      institution: "Kalyani Govt Engineering Coll.",
      detail: "Academic Standing: 7.6 YGPA",
      border: "border-neon-purple/30 text-neon-purple shadow-[0_0_15px_rgba(189,0,255,0.05)]",
      glow: "from-neon-purple/10 to-transparent",
      dot: "bg-neon-purple",
      icon: <GraduationCap className="w-5 h-5 text-neon-purple" />,
    },
  ];

  return (
    <div className="w-full relative z-10 flex flex-col gap-10">
      
      {/* SECTION 1: REAL ENGINEERING TELEMETRY COUNTERS */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2 text-xs font-mono text-electric-blue tracking-widest uppercase">
          <Activity className="w-4 h-4 animate-pulse" />
          <span>Section // 01: Core Hardware Telemetry Logs</span>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {engineeringStats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              viewport={{ once: true }}
              className="glass-panel p-5 rounded-lg border border-white/5 bg-[#030303]/60 relative overflow-hidden flex flex-col justify-between"
            >
              {/* Corner tech details */}
              <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-white/10 pointer-events-none" />
              
              <div className="flex justify-between items-start mb-4">
                <span className="text-[9px] font-mono text-white/30 uppercase tracking-wider">
                  STAT_CH // 0{idx + 1}
                </span>
                <div className="p-1.5 bg-white/[0.02] border border-white/5 rounded">
                  {stat.icon}
                </div>
              </div>
              
              <div className="flex flex-col">
                <span className="text-2xl md:text-3xl font-orbitron font-extrabold text-white tracking-tight">
                  <Counter value={stat.value} suffix={stat.suffix} />
                </span>
                <span className="text-xs font-orbitron font-bold text-white/80 mt-1">
                  {stat.label}
                </span>
                <p className="text-[10px] text-white/40 font-mono mt-1 leading-normal">
                  {stat.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* SECTION 2: ACADEMIC CREDENTIALS HOLOGRAMS */}
      <div className="flex flex-col gap-4 mt-2">
        <div className="flex items-center gap-2 text-xs font-mono text-neon-purple tracking-widest uppercase">
          <Orbit className="w-4 h-4 animate-spin-slow" />
          <span>Section // 02: Holographic Academic Credentials</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {academicHolograms.map((holo, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, scale: 1.02 }}
              className={`glass-panel border p-5 rounded-lg flex flex-col justify-between transition-all duration-300 relative overflow-hidden bg-gradient-to-b ${holo.glow} to-[#030303]/90 ${holo.border}`}
            >
              {/* Dynamic corner laser lines */}
              <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-current opacity-70" />
              <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-current opacity-70" />

              <div className="flex items-start justify-between mb-3">
                <div className="flex flex-col">
                  <span className="text-[9px] uppercase tracking-widest text-white/40 font-mono flex items-center gap-1.5 mb-0.5">
                    <span className={`inline-block w-1 h-1 rounded-full ${holo.dot}`}></span>
                    {holo.exam}
                  </span>
                  <h3 className="text-lg font-orbitron font-extrabold text-white tracking-wide leading-tight">
                    {holo.title}
                  </h3>
                </div>
                <div className="p-1.5 bg-white/[0.03] rounded border border-white/[0.05]">
                  {holo.icon}
                </div>
              </div>

              <div className="flex flex-col gap-0.5 font-mono text-[10px]">
                <span className="text-white/60 font-semibold">{holo.institution}</span>
                <span className="text-white/40">{holo.detail}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Mini warning diagnostic disclaimer */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="border border-white/5 bg-white/[0.01] px-4 py-2.5 rounded text-[10px] text-white/40 font-mono flex items-center gap-2 justify-center"
      >
        <ShieldAlert className="w-3.5 h-3.5 text-neon-purple animate-pulse" />
        SECURE LINK ESTABLISHED // INVENTIVE DATA CONSOLIDATION SUCCESSFUL // ALL METRICS LOCKED AND VERIFIED
      </motion.div>
    </div>
  );
}
