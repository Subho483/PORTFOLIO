"use client";

import React, { useState, FormEvent, useEffect } from "react";
import { motion } from "framer-motion";
import { Send, Terminal, ShieldCheck, RefreshCw, Phone, Mail, GraduationCap, MapPin, HelpCircle } from "lucide-react";

export default function ContactConsole() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [cmdInput, setCmdInput] = useState("");
  const [logs, setLogs] = useState<string[]>([
    "SUBLIGHT LINK: WAITING FOR USER INITIALIZATION",
    "TRANSCEIVER: IDLE",
    "ENTER 'connect subho' TO ESTABLISH LINK",
  ]);
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const addLog = (text: string) => {
    setLogs((prev) => [...prev, `[${new Date().toLocaleTimeString()}] ${text}`].slice(-8)); // keep last 8 logs
  };

  const handleFocus = (field: string) => {
    addLog(`TRANSCEIVER: CAPTURING FOCUS ON [${field.toUpperCase()}]`);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      addLog("ERROR: FAILED VALIDATION - EMPTY BUFFER FIELD");
      return;
    }

    setIsSending(true);
    addLog("TRANSMIT SEQUENCE INSTANTIATED...");
    addLog("ENCRYPTING PACKETS VIA RSA-4096...");
    
    // Simulate telemetry delay
    setTimeout(() => {
      addLog("CONNECTING TO ORBITAL BEACON SATELLITE...");
    }, 600);

    setTimeout(() => {
      addLog("UPLINK SECURED. DISCHARGING SUB-ETHER ENERGY PACKET...");
    }, 1400);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message })
      });

      if (!res.ok) throw new Error("API Route Failed");

      setTimeout(() => {
        setIsSending(false);
        setIsSent(true);
        setName("");
        setEmail("");
        setMessage("");
        addLog("SUCCESS: MESSAGE DISCHARGED INTO DEEP SPACE.");
        addLog("SUBLIGHT LINK: TRANSMISSION DUMP COMPLETE.");
      }, 2200);
    } catch (error) {
      setTimeout(() => {
        setIsSending(false);
        addLog("CRITICAL ERROR: SATELLITE CONNECTION REFUSED.");
      }, 2200);
    }
  };

  const handleCommandSubmit = (e: FormEvent) => {
    e.preventDefault();
    const cmd = cmdInput.trim().toLowerCase();
    if (!cmd) return;

    // Echo command
    setLogs((prev) => [...prev, `subho.os@eep:~$ ${cmd}`].slice(-8));

    if (cmd === "connect subho") {
      setTimeout(() => {
        setLogs((prev) => [...prev, "LINK ESTABLISHED // WELCOME TO SUBHO'S ORBIT"].slice(-8));
      }, 300);
    } else if (cmd === "help") {
      setTimeout(() => {
        setLogs((prev) => [
          ...prev, 
          "SUPPORTED CODES:", 
          "  connect subho - establish beacon uplink", 
          "  status        - check lab power health", 
          "  inventory     - scan chip counts", 
          "  clear         - clear log board"
        ].slice(-8));
      }, 200);
    } else if (cmd === "status") {
      setTimeout(() => {
        setLogs((prev) => [
          ...prev,
          "SYSTEM STATUS: ONLINE // QOS 99.8%",
          "ANTENNA TEMP: 2.4 K (NORMAL)",
          "SUBLIGHT CORE: STABLE // AES-256 ENCRYPTED"
        ].slice(-8));
      }, 200);
    } else if (cmd === "inventory") {
      setTimeout(() => {
        setLogs((prev) => [
          ...prev,
          "LAB ACTIVE CHIPS:",
          "  - ESP32 x12 // Arduino Nano x8",
          "  - MPU9250 x3 // ToF Sensors x4",
          "  - N20 Motors x16 // H-Bridges x7"
        ].slice(-8));
      }, 200);
    } else if (cmd === "clear") {
      setLogs([]);
    } else {
      setTimeout(() => {
        setLogs((prev) => [...prev, `CODE ERROR: '${cmd}' NOT FOUND. Enter 'help' for index.`].slice(-8));
      }, 200);
    }

    setCmdInput("");
  };

  return (
    <div className="w-full relative z-10 grid grid-cols-1 lg:grid-cols-5 gap-8 items-stretch">
      {/* Contact Cards / Form Panel */}
      <div className="lg:col-span-3 flex flex-col gap-6">
        
        {/* Real Contact Info Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="glass-panel p-4 rounded-lg border border-white/5 bg-[#030303]/60 relative overflow-hidden flex items-center gap-3">
            <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-white/10 pointer-events-none" />
            <div className="p-2 bg-electric-blue/10 border border-electric-blue/20 rounded text-electric-blue">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div className="flex flex-col font-mono text-[10px]">
              <span className="text-white/30 uppercase tracking-widest">Institution</span>
              <span className="text-white font-bold font-orbitron tracking-wide text-xs">KGEC College</span>
              <span className="text-white/60">Kalyani, WB, India</span>
            </div>
          </div>

          <div className="glass-panel p-4 rounded-lg border border-white/5 bg-[#030303]/60 relative overflow-hidden flex items-center gap-3">
            <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-white/10 pointer-events-none" />
            <div className="p-2 bg-neon-purple/10 border border-neon-purple/20 rounded text-neon-purple">
              <Mail className="w-5 h-5" />
            </div>
            <div className="flex flex-col font-mono text-[10px]">
              <span className="text-white/30 uppercase tracking-widest">Comm Link</span>
              <span className="text-white font-bold font-orbitron tracking-wide text-xs">saha.subho483@gmail.com</span>
              <span className="text-white/60">Direct email receiver</span>
            </div>
          </div>

          <div className="glass-panel p-4 rounded-lg border border-white/5 bg-[#030303]/60 relative overflow-hidden flex items-center gap-3">
            <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-white/10 pointer-events-none" />
            <div className="p-2 bg-electric-blue/10 border border-electric-blue/20 rounded text-electric-blue">
              <Phone className="w-5 h-5" />
            </div>
            <div className="flex flex-col font-mono text-[10px]">
              <span className="text-white/30 uppercase tracking-widest">Voice Link</span>
              <span className="text-white font-bold font-orbitron tracking-wide text-xs">8617763487</span>
              <span className="text-white/60">IST standard hours</span>
            </div>
          </div>

          <div className="glass-panel p-4 rounded-lg border border-white/5 bg-[#030303]/60 relative overflow-hidden flex items-center gap-3">
            <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-white/10 pointer-events-none" />
            <div className="p-2 bg-neon-purple/10 border border-neon-purple/20 rounded text-neon-purple">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </div>
            <div className="flex flex-col font-mono text-[10px]">
              <span className="text-white/30 uppercase tracking-widest">Uplink Profile</span>
              <a 
                href="https://linkedin.com/in/subho-saha-5a6a6831b" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-white font-bold font-orbitron tracking-wide text-xs hover:text-neon-purple transition-colors truncate block max-w-[180px]"
              >
                in/subho-saha-5a6a6831b
              </a>
              <span className="text-white/60">Professional grid link</span>
            </div>
          </div>

          <div className="glass-panel p-4 rounded-lg border border-white/5 bg-[#030303]/60 relative overflow-hidden flex items-center gap-3 sm:col-span-2">
            <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-white/10 pointer-events-none" />
            <div className="p-2 bg-emerald-500/10 border border-emerald-500/20 rounded text-emerald-400">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div className="flex flex-col font-mono text-[10px]">
              <span className="text-white/30 uppercase tracking-widest">Robotics Q&A</span>
              <a 
                href="mailto:kgec.ee5@gmail.com?subject=Robotics%20Question" 
                className="text-white font-bold font-orbitron tracking-wide text-xs hover:text-emerald-400 transition-colors"
              >
                kgec.ee5@gmail.com
              </a>
              <span className="text-white/60">Ask me anything about robotics!</span>
            </div>
          </div>
        </div>

        {/* Interactive Transmitter Form */}
        <div className="glass-panel p-6 rounded-lg flex flex-col justify-between relative overflow-hidden bg-[#030303]/40 border border-white/5">
          <div className="absolute bottom-0 right-0 w-8 h-8 border-r border-b border-electric-blue/30"></div>
          
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-electric-blue" />
              <h4 className="text-sm font-bold font-orbitron text-white tracking-widest uppercase">
                TRANSMITTER INPUT CHANNELS
              </h4>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4 font-mono text-xs">
              {/* Name Input */}
              <div className="flex flex-col gap-1.5">
                <label className="text-white/40 tracking-wider text-[10px] uppercase font-bold">
                  SENDER CALLSIGN (Your Name)
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onFocus={() => handleFocus("callsign")}
                  disabled={isSending || isSent}
                  placeholder="Enter name..."
                  required
                  className="w-full bg-[#030303]/80 border border-white/10 focus:border-electric-blue px-3 py-2.5 rounded text-white focus:outline-none focus:ring-1 focus:ring-electric-blue transition-colors placeholder:text-white/20"
                />
              </div>

              {/* Email Input */}
              <div className="flex flex-col gap-1.5">
                <label className="text-white/40 tracking-wider text-[10px] uppercase font-bold">
                  TRANSCEIVER ADDRESS (Your Email)
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => handleFocus("transceiver address")}
                  disabled={isSending || isSent}
                  placeholder="Enter email..."
                  required
                  className="w-full bg-[#030303]/80 border border-white/10 focus:border-electric-blue px-3 py-2.5 rounded text-white focus:outline-none focus:ring-1 focus:ring-electric-blue transition-colors placeholder:text-white/20"
                />
              </div>

              {/* Message Input */}
              <div className="flex flex-col gap-1.5">
                <label className="text-white/40 tracking-wider text-[10px] uppercase font-bold">
                  INCOMING TRANSMISSION (Your Message)
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onFocus={() => handleFocus("transmission buffer")}
                  disabled={isSending || isSent}
                  placeholder="Write your transmission coordinates..."
                  rows={5}
                  required
                  className="w-full bg-[#030303]/80 border border-white/10 focus:border-electric-blue px-3 py-2.5 rounded text-white focus:outline-none focus:ring-1 focus:ring-electric-blue transition-colors placeholder:text-white/20 resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSending || isSent}
                className={`mt-4 py-3 bg-transparent border font-orbitron font-bold uppercase tracking-widest text-xs rounded transition-all duration-300 flex items-center justify-center gap-2 group ${
                  isSent
                    ? "border-emerald-500 text-emerald-400 bg-emerald-500/5 cursor-default"
                    : "border-electric-blue text-electric-blue hover:bg-electric-blue/5 active:scale-98 glow-blue"
                }`}
              >
                {isSending ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-electric-blue" />
                    TRANSMITTING PACKETS...
                  </>
                ) : isSent ? (
                  <>
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    TRANSMISSION TRANSMITTED SUCCESSFULLY
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5 group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform" />
                    DISCHARGE TRANSMISSION
                  </>
                )}
              </button>
            </form>
          </div>

          {isSent && (
            <button
              onClick={() => {
                setIsSent(false);
                setLogs(["SUBLIGHT LINK: WAITING FOR USER INITIALIZATION", "TRANSCEIVER: IDLE", "ENTER 'connect subho' TO ESTABLISH LINK"]);
              }}
              className="text-[9px] font-mono text-neon-purple hover:underline mt-4 text-center w-full"
            >
              // Open new channel connection
            </button>
          )}
        </div>
      </div>

      {/* Cyber Diagnostic Console Terminal */}
      <div className="lg:col-span-2 glass-panel p-6 rounded-lg bg-[#030303]/90 border border-white/5 flex flex-col justify-between font-mono text-[10px] leading-relaxed relative overflow-hidden min-h-[380px] lg:min-h-fit">
        
        {/* CRT Scanline look inside terminal */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.01] to-transparent pointer-events-none"></div>

        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between border-b border-white/5 pb-2 text-[9px] text-white/30 uppercase tracking-widest">
            <span>CONSOLE MONITOR v2.02</span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              ONLINE
            </span>
          </div>

          {/* Logging stream */}
          <div className="flex flex-col gap-2.5 text-white/80 min-h-[220px] overflow-y-auto">
            {logs.map((log, lIdx) => (
              <div key={lIdx} className="flex gap-2">
                <span className="text-electric-blue select-none">&gt;</span>
                <span className={
                  log.includes("SUCCESS") || log.includes("ESTABLISHED") || log.includes("WELCOME")
                    ? "text-emerald-400 font-bold" 
                    : log.includes("ERROR") || log.includes("NOT FOUND")
                    ? "text-rose-400 font-semibold"
                    : log.includes("subho.os@eep")
                    ? "text-neon-purple"
                    : ""
                }>
                  {log}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Terminal Command Input */}
        <div className="border-t border-white/5 pt-3 mt-4 flex flex-col gap-2">
          <form onSubmit={handleCommandSubmit} className="flex items-center gap-1.5 border border-white/10 bg-black/60 rounded px-2.5 py-1.5 font-mono text-[10px]">
            <span className="text-neon-purple select-none font-bold">subho.os@eep:~$</span>
            <input
              type="text"
              value={cmdInput}
              onChange={(e) => setCmdInput(e.target.value)}
              className="bg-transparent border-none outline-none focus:ring-0 text-white flex-1 font-mono text-[10px] w-full"
              placeholder="Type 'connect subho' or 'help'..."
            />
          </form>

          {/* Quick link button for mobile users who can't type easily */}
          <div className="flex items-center justify-between text-[8px] text-white/30 uppercase tracking-wider">
            <span>[ Probe Command Shell ]</span>
            <button
              type="button"
              onClick={() => {
                setCmdInput("connect subho");
              }}
              className="text-electric-blue hover:underline cursor-pointer"
            >
              [ Quick Connect Command ]
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
