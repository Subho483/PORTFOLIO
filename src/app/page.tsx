"use client";

import React from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Terminal, Shield, Compass, Cpu, Activity, Zap, Award, Calendar, Send, Target } from "lucide-react";

import HeroSection from "@/components/HeroSection";
import StatsPanel from "@/components/StatsPanel";
import SkillsGalaxy from "@/components/SkillsGalaxy";
import ProjectsSection from "@/components/ProjectsSection";
import Certifications from "@/components/Certifications";
import Timeline from "@/components/Timeline";
import ContactConsole from "@/components/ContactConsole";
import LabInventory from "@/components/LabInventory";
import LabRepositories from "@/components/LabRepositories";
import EngineeringFailures from "@/components/EngineeringFailures";
import FutureMissions from "@/components/FutureMissions";

// Load 3D Canvas dynamically to bypass server-side rendering issues with Three.js
const CyberCanvas = dynamic(() => import("@/components/CyberCanvas"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[400px] md:min-h-[600px] flex flex-col items-center justify-center font-mono text-xs text-electric-blue/80 gap-3">
      <div className="w-8 h-8 border-2 border-t-electric-blue border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
      <span className="tracking-widest animate-pulse uppercase">BOOTING ZERO-G DRONE RENDERER...</span>
    </div>
  ),
});

export default function Home() {
  return (
    <>
      {/* High-Tech Sticky Nav Header */}
      <header className="fixed top-0 left-0 w-full z-50 border-b border-white/5 bg-cyber-bg/85 backdrop-blur-md px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 bg-electric-blue rounded-full hud-dot"></span>
          <span className="font-orbitron font-bold text-sm tracking-widest text-white">
            SUBHO SAHA
          </span>
          <span className="hidden sm:inline-block text-[9px] font-mono border border-white/10 px-2 py-0.5 rounded text-white/50 bg-white/[0.01]">
            EE-LAB // v1.2
          </span>
        </div>
        
        {/* Navigation links */}
        <nav className="hidden lg:flex items-center gap-5 font-mono text-[10px] tracking-widest text-white/60">
          <a href="#about" className="hover:text-electric-blue transition-colors font-bold uppercase">// About</a>
          <a href="#stats" className="hover:text-neon-purple transition-colors font-bold uppercase">// Stats</a>
          <a href="#skills" className="hover:text-electric-blue transition-colors font-bold uppercase">// Skills</a>
          <a href="#projects" className="hover:text-neon-purple transition-colors font-bold uppercase">// Projects</a>
          <a href="#repositories" className="hover:text-electric-blue transition-colors font-bold uppercase">// Repos</a>
          <a href="#inventory" className="hover:text-electric-blue transition-colors font-bold uppercase">// Inventory</a>
          <a href="#failures" className="hover:text-neon-purple transition-colors font-bold uppercase">// Failures</a>
          <a href="#future" className="hover:text-electric-blue transition-colors font-bold uppercase">// Missions</a>
          <a href="#timeline" className="hover:text-neon-purple transition-colors font-bold uppercase">// Log</a>
          <a href="#contact" className="hover:text-neon-purple transition-colors font-bold uppercase">// Transmit</a>
        </nav>

        <div>
          <a
            href="#contact"
            className="text-[9px] font-orbitron font-bold border border-electric-blue/30 text-electric-blue hover:border-electric-blue hover:bg-electric-blue/5 px-3 py-1.5 rounded transition-all duration-300 tracking-widest uppercase glow-blue"
          >
            Antennas Online
          </a>
        </div>
      </header>

      {/* Minimal HUD Sidebar */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden 2xl:flex flex-col gap-6 items-end pointer-events-none">
        <div className="flex flex-col gap-4 text-[10px] font-mono tracking-widest text-white/40 border-r border-white/20 pr-4 items-end pointer-events-auto">
          <a href="/resume.pdf" target="_blank" className="hover:text-electric-blue transition-colors uppercase group flex items-center gap-2">
            <span className="opacity-0 group-hover:opacity-100 transition-opacity text-electric-blue text-[8px]">// PDF</span>
            DOWNLOAD DOSSIER
          </a>
          <a href="https://github.com/Subho483" target="_blank" className="hover:text-white transition-colors uppercase">
            GITHUB
          </a>
          <a href="https://linkedin.com/in/subhosaha" target="_blank" className="hover:text-neon-purple transition-colors uppercase">
            LINKEDIN
          </a>
        </div>
        
        <div className="flex items-center gap-2 text-[9px] font-mono font-bold tracking-widest text-emerald-400 mt-4 mr-4 pointer-events-none">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          STATUS: ONLINE
        </div>
      </div>

      {/* Main Container */}
      <main className="flex-1 flex flex-col pt-16">
        
        {/* Hero Section Container (Hero details & 3D Drone Side-by-Side) */}
        <section id="hero" className="min-h-screen w-full grid grid-cols-1 lg:grid-cols-2 items-center justify-stretch border-b border-white/5 relative">
          <div className="order-2 lg:order-1 flex flex-col justify-center">
            <HeroSection />
          </div>
          
          <div className="order-1 lg:order-2 w-full h-[450px] lg:h-full flex items-center justify-center relative bg-gradient-to-b from-transparent via-white/[0.01] to-transparent border-b lg:border-b-0 lg:border-l border-white/5">
            <CyberCanvas />
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-24 border-b border-white/5 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto w-full flex flex-col gap-12">
          <div className="flex flex-col gap-3">
            <span className="text-[10px] font-mono tracking-widest text-electric-blue font-bold uppercase flex items-center gap-2">
              <Shield className="w-4 h-4" />
              01 // HARDWARE & FIRMWARE DEPT
            </span>
            <h2 className="text-3xl md:text-5xl font-black font-orbitron tracking-tight text-white uppercase">
              ANTI-GRAVITY ENGINEERING LOG
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
            <div className="lg:col-span-3 flex flex-col gap-6 text-sm text-white/70 font-mono leading-relaxed">
              <p>
                Welcome to my engineering repository. I am <strong className="text-white">Subho Saha</strong>, an Electrical Engineer specializing in the design, development, and control of complex autonomous robots, embedded devices, and dynamic hardware matrices.
              </p>
              <p>
                Drawing inspiration from advanced physics and aerospace structures, my core objective is to construct reliable, low-latency control systems that interact cleanly with physical boundaries. This deep-space laboratory theme represents my core design ethos: combining micro-level precision code (like register-level microcontrollers) with macro-level mechanical systems (like autonomous flight telemetry).
              </p>
              <p>
                Whether building responsive cascade PID algorithms for autonomous quadcopters, writing path finding scripts for maze-mapping crawlers, or implementing clean, interactive telemetry dashboard systems in React and TypeScript, I seek to bridge the gap between hardware mechanics and software intelligence.
              </p>
            </div>
            
            <div className="lg:col-span-2 glass-panel p-6 rounded-lg flex flex-col gap-4">
              <span className="text-[10px] font-mono text-neon-purple tracking-widest uppercase font-bold flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5" />
                LAB SYSTEM READINGS
              </span>
              <div className="flex flex-col gap-3 font-mono text-xs">
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-white/40">OPERATOR:</span>
                  <span className="text-white/90">SUBHO SAHA</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-white/40">CORE FIELD:</span>
                  <span className="text-white/90">ELECTRICAL ENGINEERING</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-white/40">FOCUS DEPTS:</span>
                  <span className="text-white/90">ROBOTICS / CONTROL SYSTEMS</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-white/40">LINK STATUS:</span>
                  <span className="text-emerald-400 font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    STABLE
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Panel Section */}
        <section id="stats" className="py-24 border-b border-white/5 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto w-full flex flex-col gap-12">
          <div className="flex flex-col gap-3">
            <span className="text-[10px] font-mono tracking-widest text-neon-purple font-bold uppercase flex items-center gap-2">
              <Compass className="w-4 h-4" />
              02 // METRICS & CALIBRATIONS
            </span>
            <h2 className="text-3xl md:text-5xl font-black font-orbitron tracking-tight text-white uppercase">
              ENGINEERING STATS PANEL
            </h2>
          </div>
          <StatsPanel />
        </section>

        {/* Skills Galaxy Section */}
        <section id="skills" className="py-24 border-b border-white/5 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto w-full flex flex-col gap-12">
          <div className="flex flex-col gap-3">
            <span className="text-[10px] font-mono tracking-widest text-electric-blue font-bold uppercase flex items-center gap-2">
              <Cpu className="w-4 h-4" />
              03 // SKILLS CONSTELLATION
            </span>
            <h2 className="text-3xl md:text-5xl font-black font-orbitron tracking-tight text-white uppercase">
              SKILLS GALAXY
            </h2>
          </div>
          <SkillsGalaxy />
        </section>

        {/* Projects Showcase Section */}
        <section id="projects" className="py-24 border-b border-white/5 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto w-full flex flex-col gap-12">
          <div className="flex flex-col gap-3">
            <span className="text-[10px] font-mono tracking-widest text-neon-purple font-bold uppercase flex items-center gap-2">
              <Zap className="w-4 h-4" />
              04 // HARDWARE PROJECTS LOG
            </span>
            <h2 className="text-3xl md:text-5xl font-black font-orbitron tracking-tight text-white uppercase">
              PROJECT SHOWCASE
            </h2>
          </div>
          <ProjectsSection />
        </section>

        {/* Lab Repositories Section */}
        <section id="repositories" className="py-24 border-b border-white/5 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto w-full flex flex-col gap-12">
          <div className="flex flex-col gap-3">
            <span className="text-[10px] font-mono tracking-widest text-electric-blue font-bold uppercase flex items-center gap-2">
              <Terminal className="w-4 h-4" />
              05 // VERSION CONTROL INDEX
            </span>
            <h2 className="text-3xl md:text-5xl font-black font-orbitron tracking-tight text-white uppercase">
              LAB REPOSITORIES
            </h2>
          </div>
          <LabRepositories />
        </section>

        {/* Lab Inventory Section */}
        <section id="inventory" className="py-24 border-b border-white/5 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto w-full flex flex-col gap-12">
          <div className="flex flex-col gap-3">
            <span className="text-[10px] font-mono tracking-widest text-electric-blue font-bold uppercase flex items-center gap-2">
              <Cpu className="w-4 h-4" />
              06 // HARDWARE COMPONENT STOCKPILE
            </span>
            <h2 className="text-3xl md:text-5xl font-black font-orbitron tracking-tight text-white uppercase">
              LAB INVENTORY
            </h2>
          </div>
          <LabInventory />
        </section>

        {/* Engineering Failures Section */}
        <section id="failures" className="py-24 border-b border-white/5 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto w-full flex flex-col gap-12">
          <div className="flex flex-col gap-3">
            <span className="text-[10px] font-mono tracking-widest text-neon-purple font-bold uppercase flex items-center gap-2">
              <Terminal className="w-4 h-4" />
              07 // ENGINEERING FAILURES & LESSONS
            </span>
            <h2 className="text-3xl md:text-5xl font-black font-orbitron tracking-tight text-white uppercase">
              POST-MORTEM LOGS
            </h2>
          </div>
          <EngineeringFailures />
        </section>

        {/* Future Missions Section */}
        <section id="future" className="py-24 border-b border-white/5 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto w-full flex flex-col gap-12">
          <div className="flex flex-col gap-3">
            <span className="text-[10px] font-mono tracking-widest text-electric-blue font-bold uppercase flex items-center gap-2">
              <Target className="w-4 h-4" />
              08 // FUTURE MISSIONS
            </span>
            <h2 className="text-3xl md:text-5xl font-black font-orbitron tracking-tight text-white uppercase">
              ACTIVE R&D LAB
            </h2>
          </div>
          <FutureMissions />
        </section>

        {/* Certifications Section */}
        <section id="certifications" className="py-24 border-b border-white/5 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto w-full flex flex-col gap-12">
          <div className="flex flex-col gap-3">
            <span className="text-[10px] font-mono tracking-widest text-electric-blue font-bold uppercase flex items-center gap-2">
              <Award className="w-4 h-4" />
              09 // TECHNICAL CREDENTIALS
            </span>
            <h2 className="text-3xl md:text-5xl font-black font-orbitron tracking-tight text-white uppercase">
              CERTIFICATIONS
            </h2>
          </div>
          <Certifications />
        </section>

        {/* Timeline Log Section */}
        <section id="timeline" className="py-24 border-b border-white/5 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto w-full flex flex-col gap-12">
          <div className="flex flex-col gap-3">
            <span className="text-[10px] font-mono tracking-widest text-neon-purple font-bold uppercase flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              10 // ARCHIVE CHRONOLOGY
            </span>
            <h2 className="text-3xl md:text-5xl font-black font-orbitron tracking-tight text-white uppercase">
              TIMELINE LOG
            </h2>
          </div>
          <Timeline />
        </section>

        {/* Contact Transmission Section */}
        <section id="contact" className="py-24 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto w-full flex flex-col gap-12">
          <div className="flex flex-col gap-3">
            <span className="text-[10px] font-mono tracking-widest text-electric-blue font-bold uppercase flex items-center gap-2">
              <Send className="w-4 h-4" />
              11 // SUBSPACE TRANSCEIVER
            </span>
            <h2 className="text-3xl md:text-5xl font-black font-orbitron tracking-tight text-white uppercase">
              CONTACT CONSOLE
            </h2>
          </div>
          <ContactConsole />
        </section>
      </main>

      {/* Cybernetic Footer */}
      <footer className="border-t border-white/5 bg-cyber-bg py-8 px-6 md:px-12 lg:px-24 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[9px] text-white/40 tracking-wider">
        <div>
          <span>// OPERATOR PORTFOLIO CONSOLE SECURITY LEVEL: CLEAR</span>
        </div>
        <div className="text-center sm:text-right flex flex-col gap-1">
          <span>DESIGNED BY SUBHO SAHA © 2026. ALL RIGHTS REGISTERED.</span>
          <span className="text-electric-blue/50">// LATENCY CONTROL ACCURACY: ±0.002%</span>
        </div>
      </footer>
    </>
  );
}
