"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FileText, Mail, Compass, Terminal, Shield, Award } from "lucide-react";

export default function HeroSection() {
  const [coordinates, setCoordinates] = useState({ lat: "22.9786° N", lng: "88.4354° E" }); // Kalyani coordinate defaults
  const [systemTime, setSystemTime] = useState("");

  useEffect(() => {
    // Telemetry updates
    const updateTime = () => {
      const d = new Date();
      setSystemTime(d.toUTCString().replace("GMT", "UTC"));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToStats = () => {
    document.getElementById("stats")?.scrollIntoView({ behavior: "smooth" });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring" as const, stiffness: 100, damping: 15 },
    },
  };

  return (
    <div className="min-h-screen flex flex-col justify-center relative z-10 px-4 md:px-12 lg:px-20 py-20">
      
      {/* HUD Telemetry Corner - Top Left */}
      <div className="absolute top-8 left-8 hidden lg:flex flex-col gap-1 text-[10px] text-white/40 font-mono tracking-widest pointer-events-none">
        <div className="flex items-center gap-1.5 text-electric-blue">
          <Terminal className="w-3 h-3" />
          <span>SYSTEM LOG: DEEP_SPACE_LAB_08</span>
        </div>
        <div>IP: 192.168.1.108 // PORT: 3000</div>
        <div>ZERO-G DECAY COEFFICIENT: 0.0034 m/s²</div>
      </div>

      {/* HUD Telemetry Corner - Top Right */}
      <div className="absolute top-8 right-8 hidden lg:flex flex-col items-end gap-1 text-[10px] text-white/40 font-mono tracking-widest pointer-events-none">
        <div className="flex items-center gap-1.5 text-neon-purple">
          <Compass className="w-3 h-3" />
          <span>COORDINATES: {coordinates.lat} / {coordinates.lng}</span>
        </div>
        <div>TIME: {systemTime || "CONNECTING..."}</div>
        <div>SAT-LINK: SECURED (99.8% QOS)</div>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-4xl flex flex-col gap-6"
      >
        {/* System Alert Overlay */}
        <motion.div 
          variants={itemVariants}
          className="inline-flex items-center gap-2 px-3 py-1 border border-electric-blue/20 bg-electric-blue/5 rounded text-xs text-electric-blue font-mono tracking-widest w-fit"
        >
          <Shield className="w-3.5 h-3.5" />
          ESTABLISHING SECURE SUBLIGHT CHANNEL
        </motion.div>

        {/* Hero Title */}
        <motion.h1
          variants={itemVariants}
          className="text-6xl md:text-8xl font-black font-orbitron tracking-tighter leading-none"
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-electric-blue">
            SUBHO SAHA
          </span>
        </motion.h1>

        {/* Credentials / Academic HUD under title */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap gap-x-4 gap-y-2 text-[10px] sm:text-xs font-mono text-electric-blue/90 uppercase tracking-widest border-y border-white/5 py-2.5 max-w-2xl"
        >
          <span className="flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5 text-neon-purple" />
            B.Tech EE @ KGEC
          </span>
          <span className="text-white/20">|</span>
          <span>WBJEE AIR 3513</span>
          <span className="text-white/20">|</span>
          <span>JEE Main 96 Percentile</span>
        </motion.div>

        {/* Dynamic Titles */}
        <motion.div variants={itemVariants} className="flex flex-col gap-2">
          <h2 className="text-xl md:text-3xl font-orbitron font-semibold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-electric-blue to-neon-purple">
            Electrical Engineer
          </h2>
          <h2 className="text-xl md:text-3xl font-orbitron font-semibold tracking-wider text-white/90">
            Robotics Innovator
          </h2>
          <h2 className="text-xl md:text-3xl font-orbitron font-semibold tracking-wider text-white/70">
            Embedded Systems Developer
          </h2>
        </motion.div>

        {/* Tagline */}
        <motion.p
          variants={itemVariants}
          className="text-base md:text-lg text-white/60 font-mono max-w-xl leading-relaxed mt-2"
        >
          Building Intelligent Machines for the Future. Designing autonomous systems, robotic networks, and custom hardware controllers from the physics layer up.
        </motion.p>

        {/* Social / Direct Action Links */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap gap-4 mt-6"
        >
          <a
            href="https://github.com/Subho483"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 border border-white/10 hover:border-electric-blue/50 bg-white/[0.02] hover:bg-electric-blue/5 rounded transition-all duration-300 group font-mono text-sm"
          >
            <svg 
              className="w-4 h-4 fill-white/60 group-hover:fill-electric-blue transition-colors duration-300" 
              viewBox="0 0 24 24"
            >
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            <span>GitHub</span>
          </a>

          <a
            href="https://linkedin.com/in/subho-saha-5a6a6831b"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 border border-white/10 hover:border-neon-purple/50 bg-white/[0.02] hover:bg-neon-purple/5 rounded transition-all duration-300 group font-mono text-sm"
          >
            <svg 
              className="w-4 h-4 fill-white/60 group-hover:fill-neon-purple transition-colors duration-300" 
              viewBox="0 0 24 24"
            >
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
            </svg>
            <span>LinkedIn</span>
          </a>

          <a
            href="mailto:saha.subho483@gmail.com"
            className="flex items-center gap-2 px-4 py-2 border border-white/10 hover:border-electric-blue/50 bg-white/[0.02] hover:bg-electric-blue/5 rounded transition-all duration-300 group font-mono text-sm"
          >
            <Mail className="w-4 h-4 group-hover:text-electric-blue transition-colors" />
            <span>Email</span>
          </a>

          <a
            href="/Subho_Saha_Resume.pdf"
            download
            className="flex items-center gap-2 px-5 py-2 border border-neon-purple bg-neon-purple/10 hover:bg-neon-purple/30 rounded transition-all duration-300 glow-purple font-mono text-sm font-bold"
          >
            <FileText className="w-4 h-4 text-white" />
            <span>DOWNLOAD ENGINEERING DOSSIER</span>
          </a>
        </motion.div>

        {/* Action Button HUD */}
        <motion.div variants={itemVariants} className="mt-8 flex items-center gap-6">
          <button
            onClick={scrollToStats}
            className="relative px-8 py-3.5 bg-transparent border border-electric-blue text-electric-blue font-orbitron font-bold uppercase tracking-widest text-xs rounded transition-all duration-300 glow-blue overflow-hidden group active:scale-95"
          >
            {/* Hover sliding bg */}
            <span className="absolute inset-0 bg-electric-blue/10 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
            ENTER THE LAB
          </button>
          
          <div className="hidden sm:flex flex-col text-[9px] text-white/30 font-mono">
            <span>// PRESS LINK TO LOAD CORE METRICS</span>
            <span>// HARDWARE LAB BOOT STATUS: 100% OK</span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
