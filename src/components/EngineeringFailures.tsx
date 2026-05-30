"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldAlert, AlertTriangle, PenTool, CheckCircle, Wifi, Activity, Radio, Cpu } from "lucide-react";

interface FailureLog {
  id: string;
  title: string;
  issue: string;
  cause: string;
  solution: string;
  icon: React.ReactNode;
}

export default function EngineeringFailures() {
  const [activeLog, setActiveLog] = useState<string | null>(null);

  const failures: FailureLog[] = [
    {
      id: "ERR-01",
      title: "Quadcopter Unstable Oscillation",
      issue: "Drone violently shakes and flips immediately upon takeoff.",
      cause: "PID 'Proportional' gain was too high, causing overcorrection. Loop latency (15ms) was introducing severe phase delay.",
      solution: "Implemented FreeRTOS tasks to isolate the control loop to Core 1, reducing latency to 2.5ms. Retuned PID using Ziegler-Nichols method, drastically lowering P and adding D for dampening.",
      icon: <Activity className="w-5 h-5 text-red-500" />
    },
    {
      id: "ERR-02",
      title: "Sonar Sensor Ghosting",
      issue: "4WD Rover randomly detected non-existent obstacles and stopped.",
      cause: "Acoustic reflections from the floor and heavy EMI (Electromagnetic Interference) from the DC brushed motors interfering with the logic pins.",
      solution: "Added 10uF decoupling capacitors across the sensor power pins. Implemented a software median filter (taking 5 readings, discarding top/bottom outliers).",
      icon: <Wifi className="w-5 h-5 text-amber-500" />
    },
    {
      id: "ERR-03",
      title: "ESP-NOW Packet Drop",
      issue: "Ground station losing telemetry connection beyond 20 meters.",
      cause: "Wi-Fi channel interference and signal blocking from the carbon fiber frame acting as a Faraday cage.",
      solution: "Locked both ESP32 units to Channel 1 (least congested). Physically remounted the ESP32 so the antenna trace protrudes outside the carbon weave.",
      icon: <Radio className="w-5 h-5 text-red-500" />
    },
    {
      id: "ERR-04",
      title: "I2C Bus Lockup",
      issue: "Flight controller randomly froze mid-flight, causing a crash.",
      cause: "Noise on the I2C lines to the MPU9250 caused the ESP32's hardware I2C state machine to wait indefinitely for an ACK.",
      solution: "Added 4.7kΩ pull-up resistors to SDA/SCL. Implemented a software I2C timeout watchdog to reset the bus if no ACK is received within 1ms.",
      icon: <Cpu className="w-5 h-5 text-amber-500" />
    }
  ];

  return (
    <div className="w-full relative z-10 flex flex-col gap-6">
      <div className="border border-white/5 bg-[#030303]/60 p-4 rounded-lg flex items-start gap-3">
        <ShieldAlert className="w-5 h-5 text-electric-blue shrink-0 mt-0.5 animate-pulse" />
        <div className="flex flex-col">
          <span className="text-[10px] font-mono font-bold text-electric-blue uppercase tracking-widest">
            ENGINEERING DOCTRINE
          </span>
          <p className="text-xs text-white/60 font-mono mt-1 leading-relaxed">
            True engineering isn't built on first-try successes. It is built on analyzing catastrophic failures, understanding root causes, and iterating robust solutions. Below are documented system failures and their resolutions.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {failures.map((log, idx) => {
          const isActive = activeLog === log.id;
          return (
            <motion.div
              key={log.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              viewport={{ once: true }}
              onClick={() => setActiveLog(isActive ? null : log.id)}
              className={`glass-panel p-5 rounded-lg border flex flex-col cursor-pointer transition-all duration-300 relative overflow-hidden group ${
                isActive ? "border-electric-blue/50 bg-electric-blue/[0.03]" : "border-white/5 hover:border-white/20 bg-[#030303]/40"
              }`}
            >
              <div className={`absolute top-0 left-0 w-1 h-full transition-colors duration-300 ${isActive ? "bg-electric-blue" : "bg-white/10 group-hover:bg-white/30"}`} />
              
              <div className="flex items-start justify-between pl-2">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/5 rounded">
                    {log.icon}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[9px] font-mono text-white/40 uppercase tracking-widest mb-0.5 flex items-center gap-1.5">
                      INCIDENT // {log.id}
                    </span>
                    <h4 className={`text-sm font-bold font-orbitron tracking-wide transition-colors ${isActive ? "text-electric-blue" : "text-white"}`}>
                      {log.title}
                    </h4>
                  </div>
                </div>
                <div className={`text-[9px] font-mono px-2 py-0.5 border rounded font-bold uppercase ${
                  isActive ? "border-emerald-500/50 text-emerald-400 bg-emerald-900/20" : "border-amber-500/30 text-amber-500 bg-amber-900/10"
                }`}>
                  {isActive ? "RESOLVED" : "POST-MORTEM"}
                </div>
              </div>

              <AnimatePresence>
                {isActive && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-4 pt-4 border-t border-white/10 flex flex-col gap-4 pl-2"
                  >
                    <div className="flex flex-col gap-1">
                      <span className="text-[9px] font-mono text-red-400 uppercase tracking-widest flex items-center gap-1.5">
                        <AlertTriangle className="w-3 h-3" /> Issue Observed
                      </span>
                      <p className="text-xs font-mono text-white/80 border-l border-red-500/30 pl-2 ml-1.5">
                        {log.issue}
                      </p>
                    </div>

                    <div className="flex flex-col gap-1">
                      <span className="text-[9px] font-mono text-amber-400 uppercase tracking-widest flex items-center gap-1.5">
                        <PenTool className="w-3 h-3" /> Root Cause Analysis
                      </span>
                      <p className="text-xs font-mono text-white/80 border-l border-amber-500/30 pl-2 ml-1.5">
                        {log.cause}
                      </p>
                    </div>

                    <div className="flex flex-col gap-1">
                      <span className="text-[9px] font-mono text-emerald-400 uppercase tracking-widest flex items-center gap-1.5">
                        <CheckCircle className="w-3 h-3" /> Engineering Solution
                      </span>
                      <p className="text-xs font-mono text-white/80 border-l border-emerald-500/30 pl-2 ml-1.5">
                        {log.solution}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
