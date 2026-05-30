"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { GitFork, Star, GitBranch, Copy, Check, Terminal, ExternalLink } from "lucide-react";

interface Repo {
  name: string;
  desc: string;
  tech: string[];
  stars: number;
  forks: number;
  branches: number;
  url: string;
}

export default function LabRepositories() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const repos: Repo[] = [
    {
      name: "esp32-quadcopter",
      desc: "Bare-metal C++ firmware for flight stabilization, cascade PID control, and MPU9250 sensor fusion running on FreeRTOS.",
      tech: ["C++", "FreeRTOS", "CMake", "IMU Fusion"],
      stars: 14,
      forks: 4,
      branches: 3,
      url: "https://github.com/Subho483/esp32-quadcopter"
    },
    {
      name: "mazemerize-solver",
      desc: "Autonomous Micromouse robot solving logic. Implements coordinate flood-fill optimization and wall-detection state machines.",
      tech: ["C", "Assembly", "AVR-GCC", "Algorithms"],
      stars: 8,
      forks: 2,
      branches: 2,
      url: "https://github.com/Subho483/mazemerize-solver"
    },
    {
      name: "4wd-smart-vehicle",
      desc: "Intelligent autonomous rover propulsion algorithms, including sonar-based boundary sweeps and real-time path corrections.",
      tech: ["C++", "Arduino", "GPIO/PWM", "Robotics"],
      stars: 6,
      forks: 1,
      branches: 1,
      url: "https://github.com/Subho483/4wd-smart-vehicle"
    },
    {
      name: "hope-drone-webapp",
      desc: "Ground control station hub UI. Streams telemetry data packet logs from the quadcopter drone over WebSockets in real time.",
      tech: ["Next.js", "TypeScript", "Tailwind CSS", "WebSockets"],
      stars: 11,
      forks: 3,
      branches: 4,
      url: "https://github.com/Subho483/hope-drone-webapp"
    },
    {
      name: "line-follower-robot",
      desc: "PID-controlled industrial-styled trajectory tracker robot utilizing high-precision TCRT5000 optocoupler sensor arrays.",
      tech: ["C", "PID Loop", "Optocouplers", "Hardware Control"],
      stars: 4,
      forks: 1,
      branches: 1,
      url: "https://github.com/Subho483/line-follower-robot"
    }
  ];

  const handleCopy = (name: string, url: string) => {
    navigator.clipboard.writeText(`git clone ${url}.git`);
    setCopiedId(name);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {repos.map((repo, idx) => (
        <motion.div
          key={repo.name}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: idx * 0.08 }}
          viewport={{ once: true }}
          className="glass-panel p-5 rounded-lg border border-white/5 bg-[#030303]/65 relative overflow-hidden flex flex-col justify-between group hover:border-electric-blue/30 transition-all duration-300"
        >
          {/* Top corner tech lines */}
          <div className="absolute top-0 right-0 w-6 h-6 border-t border-r border-white/10 pointer-events-none group-hover:border-electric-blue/30 transition-colors" />
          
          <div className="flex flex-col gap-3">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-electric-blue">
                <Terminal className="w-4 h-4" />
                <span className="font-orbitron font-bold text-xs tracking-wider text-white group-hover:text-electric-blue transition-colors">
                  {repo.name}
                </span>
              </div>
              <span className="text-[8px] font-mono border border-white/15 px-1.5 py-0.5 rounded text-white/40 bg-white/[0.01]">
                PUBLIC
              </span>
            </div>

            {/* Description */}
            <p className="text-xs text-white/60 font-mono leading-relaxed min-h-[48px]">
              {repo.desc}
            </p>

            {/* Tech Tags */}
            <div className="flex flex-wrap gap-1 mt-1">
              {repo.tech.map((t) => (
                <span key={t} className="text-[8px] font-mono px-1.5 py-0.5 rounded border border-white/5 bg-white/[0.02] text-white/50">
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4 mt-6 pt-4 border-t border-white/5 font-mono text-[10px]">
            {/* Git Stats */}
            <div className="flex items-center justify-between text-white/45">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1 hover:text-white transition-colors">
                  <Star className="w-3.5 h-3.5 text-amber-400" />
                  {repo.stars}
                </span>
                <span className="flex items-center gap-1 hover:text-white transition-colors">
                  <GitFork className="w-3.5 h-3.5 text-electric-blue" />
                  {repo.forks}
                </span>
                <span className="flex items-center gap-1 hover:text-white transition-colors">
                  <GitBranch className="w-3.5 h-3.5 text-neon-purple" />
                  {repo.branches}
                </span>
              </div>
              <span className="text-emerald-400 font-bold uppercase text-[8px] flex items-center gap-1">
                <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse"></span>
                main
              </span>
            </div>

            {/* Git Clone Box & Action Buttons */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between bg-black/60 border border-white/5 rounded px-2 py-1.5 text-[9px] text-white/60 select-all font-mono">
                <span className="truncate pr-2">git clone {repo.url}.git</span>
                <button
                  onClick={() => handleCopy(repo.name, repo.url)}
                  className="text-electric-blue hover:text-cyan-300 p-0.5 transition-colors cursor-pointer"
                  title="Copy clone command"
                >
                  {copiedId === repo.name ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>

              <a
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-1.5 border border-white/10 hover:border-electric-blue/40 bg-white/[0.01] hover:bg-electric-blue/5 rounded text-center text-white/70 hover:text-white font-orbitron font-bold uppercase tracking-wider text-[9px] flex items-center justify-center gap-1.5 transition-all duration-300"
              >
                <ExternalLink className="w-3 h-3 text-electric-blue" />
                Inspect Repository Source
              </a>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
