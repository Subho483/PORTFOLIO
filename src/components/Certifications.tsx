"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Award, FileSpreadsheet, Shield } from "lucide-react";

interface Certificate {
  title: string;
  issuer: string;
  date: string;
  credentialId: string;
  icon: React.ReactNode;
  category: string;
}

export default function Certifications() {
  const certificates: Certificate[] = [
    {
      title: "Embedded Systems & IoT Specialization",
      issuer: "Coursera / UC Irvine",
      date: "Aug 2025",
      credentialId: "CRED-EMB-9842X",
      icon: <Award className="w-5 h-5 text-electric-blue" />,
      category: "EMBEDDED HARDWARE",
    },
    {
      title: "MATLAB & Simulink Core Skills",
      issuer: "MathWorks Certification",
      date: "Nov 2025",
      credentialId: "CRED-MAT-5512A",
      icon: <FileSpreadsheet className="w-5 h-5 text-neon-purple" />,
      category: "SYSTEM SIMULATION",
    },
    {
      title: "Microprocessors and Microcontrollers",
      issuer: "NPTEL / IIT Kharagpur",
      date: "Oct 2024",
      credentialId: "NPTEL24EE58S4125",
      icon: <Award className="w-5 h-5 text-electric-blue" />,
      category: "ACADEMIC ELECTIVE",
    },
    {
      title: "Introduction to Internet of Things",
      issuer: "NPTEL / IIT Kharagpur",
      date: "Apr 2024",
      credentialId: "NPTEL24CS33S5964",
      icon: <ShieldCheck className="w-5 h-5 text-neon-purple" />,
      category: "NETWORK PROTOCOLS",
    },
  ];

  return (
    <div className="w-full relative z-10 flex flex-col gap-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {certificates.map((cert, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            viewport={{ once: true }}
            className="glass-panel p-5 rounded-lg border border-white/5 flex gap-4 hover:border-neon-purple/30 transition-all duration-300 relative overflow-hidden"
          >
            {/* Top right corner diagonal glowing notch */}
            <div className="absolute top-0 right-0 w-3 h-3 border-r border-t border-neon-purple/50"></div>
            
            {/* Icon Block */}
            <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded border border-white/10 bg-white/[0.02]">
              {cert.icon}
            </div>

            {/* Information Block */}
            <div className="flex-grow flex flex-col gap-1 justify-center">
              <div className="flex justify-between items-center text-[9px] font-mono text-white/40 tracking-wider">
                <span>{cert.category}</span>
                <span>{cert.date}</span>
              </div>
              <h4 className="text-sm font-bold font-orbitron text-white tracking-wide mt-0.5">
                {cert.title}
              </h4>
              <p className="text-xs text-white/70 font-mono">
                Issued by: {cert.issuer}
              </p>
              
              {/* Verification Telemetry Token */}
              <div className="flex items-center gap-1.5 mt-2 text-[9px] font-mono text-electric-blue/80 bg-electric-blue/[0.03] border border-electric-blue/10 px-2 py-1 rounded w-fit">
                <Shield className="w-3 h-3" />
                <span>TOKEN: {cert.credentialId}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
