"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Database, Search, Cpu, Thermometer, Battery, Shield, Box, Crosshair } from "lucide-react";

interface InventoryItem {
  name: string;
  qty: string;
  category: "mcu" | "sensor" | "driver" | "power" | "all";
  desc: string;
  specs: string;
  details: string[];
  status: "AVAILABLE" | "DEPLOYED" | "TESTING";
}

export default function LabInventory() {
  const [activeCategory, setActiveCategory] = useState<"mcu" | "sensor" | "driver" | "power" | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [inspectedItem, setInspectedItem] = useState<string | null>(null);

  const inventory: InventoryItem[] = [
    {
      name: "ESP32 NodeMCU",
      qty: "12 Units",
      category: "mcu",
      desc: "Wi-Fi & Bluetooth microcontrollers. Primary choice for wireless ESP-NOW drone telemetry and web servers.",
      specs: "Dual-Core 240MHz // 4MB Flash // Wi-Fi & BLE",
      details: ["GPIO21 -> SDA", "GPIO22 -> SCL", "ESP-NOW Enabled", "3.3V Logic", "Dual FreeRTOS Cores"],
      status: "AVAILABLE",
    },
    {
      name: "Arduino Nano V3",
      qty: "8 Units",
      category: "mcu",
      desc: "Compact ATmega328P boards for basic motor control, sensor interfacing, and small line-followers.",
      specs: "8-bit AVR // 16MHz // 32KB Flash // 5V Logic",
      details: ["Pin A4 -> SDA", "Pin A5 -> SCL", "6 Hardware PWM Channels", "5V TTL Logic", "14 Digital I/O"],
      status: "AVAILABLE",
    },
    {
      name: "MPU9250 IMU",
      qty: "3 Units",
      category: "sensor",
      desc: "9-axis motion tracking sensor modules containing 3-axis gyro, accelerometer, and magnetometer.",
      specs: "SPI/I2C // 16-bit ADC // Low-drift alignment",
      details: ["Accel + Gyro (6-DOF)", "Magnetometer (3-DOF)", "I2C/SPI Support", "Onboard Sensor Fusion"],
      status: "DEPLOYED",
    },
    {
      name: "PCA9685 PWM Driver",
      qty: "2 Units",
      category: "driver",
      desc: "16-channel 12-bit PWM I2C bus driver. Used to coordinate multi-joint robotic limbs and servo steering.",
      specs: "I2C interface // 16 Servo Channels // 24Hz - 1525Hz",
      details: ["I2C Address: 0x40", "12-bit Resolution (4096 steps)", "Internal 25MHz Oscillator", "5V Logic Compliant"],
      status: "TESTING",
    },
    {
      name: "DRV8833 Motor Driver",
      qty: "2 Units",
      category: "driver",
      desc: "Dual H-bridge motor driver carrier. Drives low-voltage DC motors with integrated current limiting.",
      specs: "Dual H-Bridge // 1.2A per channel // Over-temp cutoff",
      details: ["2.7V to 10.8V Range", "1.2A Continuous (2A Peak)", "Built-in Current Limiting", "Thermal Shutdown"],
      status: "AVAILABLE",
    },
    {
      name: "TB6612FNG Dual Driver",
      qty: "3 Units",
      category: "driver",
      desc: "High-efficiency MOSFET H-bridge motor drivers. Perfect for N20 motors in maze solving robots.",
      specs: "Dual H-Bridge // 1.2A continuous (3.2A peak) // 15V max",
      details: ["MOSFET H-Bridge Design", "Standby Power-saving Mode", "CW/CCW/Short Brake Modes", "100kHz PWM Input"],
      status: "DEPLOYED",
    },
    {
      name: "Ultrasonic Sensors (HC-SR04)",
      qty: "10+ Units",
      category: "sensor",
      desc: "Active ultrasonic distance sweep triggers for boundary detection and terrain obstacle avoidance.",
      specs: "2cm - 400cm range // 15° beam angle // 5V Trigger",
      details: ["Trigger: 10µs High Pulse", "Echo: Proportional Length", "Acoustic Freq: 40kHz", "Resolution: 3mm"],
      status: "AVAILABLE",
    },
    {
      name: "ToF Laser Sensors (VL53L0X)",
      qty: "4 Units",
      category: "sensor",
      desc: "Time-of-Flight ranging sensors using invisible vertical lasers to measure height and lock hovering altitudes.",
      specs: "I2C interface // 940nm Laser // Max 2m distance",
      details: ["940nm VCSEL Emitter", "SPAD Receiving Array", "Fast Mode: <30ms", "I2C Comm Interface"],
      status: "DEPLOYED",
    },
    {
      name: "3S LiPo Batteries",
      qty: "5 Units",
      category: "power",
      desc: "High-discharge lithium-polymer battery packs powering high-thrust quadcopter brushless DC motors.",
      specs: "11.1V Nominal // 2200mAh capacity // 35C Discharge",
      details: ["11.1V Nominal (12.6V Max)", "2200mAh Capacity", "35C Continuous Discharge", "XT60 Connector"],
      status: "AVAILABLE",
    },
    {
      name: "DC Metal Gearmotors (N20)",
      qty: "16 Units",
      category: "power",
      desc: "High-torque miniature DC gearmotors with metal gearboxes. Standard drive for micro robotics.",
      specs: "6V rating // 300 RPM // 50:1 reduction // carbon brushes",
      details: ["6V Nominal Voltage", "300 RPM No-Load", "50:1 Gear Ratio", "Stall Current: 1.6A"],
      status: "AVAILABLE",
    }
  ];

  const categories = [
    { id: "all", label: "ALL STOCK" },
    { id: "mcu", label: "MICROCONTROLLERS" },
    { id: "sensor", label: "SENSORS" },
    { id: "driver", label: "MOTOR DRIVERS" },
    { id: "power", label: "ACTUATORS & POWER" },
  ];

  const filteredItems = inventory.filter((item) => {
    const matchesCategory = activeCategory === "all" || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.specs.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "AVAILABLE": return "border-emerald-500/25 text-emerald-400 bg-emerald-950/10";
      case "DEPLOYED": return "border-electric-blue/25 text-electric-blue bg-electric-blue/5";
      case "TESTING": return "border-amber-500/25 text-amber-400 bg-amber-950/10";
      default: return "border-white/10 text-white/55";
    }
  };

  return (
    <div className="w-full relative z-10 flex flex-col gap-6">
      
      {/* Search and Filters Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between border border-white/5 bg-[#030303]/60 p-4 rounded-lg">
        {/* Category Tabs */}
        <div className="flex flex-wrap gap-1.5 order-2 md:order-1">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as any)}
              className={`px-3 py-1.5 rounded text-[10px] font-mono font-bold tracking-wider uppercase border transition-all duration-300 ${
                activeCategory === cat.id
                  ? "border-electric-blue text-electric-blue bg-electric-blue/5"
                  : "border-white/5 text-white/40 hover:text-white/80 hover:border-white/20"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative flex items-center order-1 md:order-2">
          <Search className="w-4 h-4 text-white/30 absolute left-3 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="FILTER INVENTORY LOGS..."
            className="w-full md:w-60 bg-[#030303]/80 border border-white/10 focus:border-electric-blue pl-9 pr-4 py-1.5 rounded text-xs font-mono text-white placeholder:text-white/20 focus:outline-none focus:ring-1 focus:ring-electric-blue transition-colors"
          />
        </div>
      </div>

      {/* Inventory Grid */}
      <motion.div 
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item) => (
            <motion.div
              layout
              key={item.name}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              onClick={() => setInspectedItem(inspectedItem === item.name ? null : item.name)}
              className={`glass-panel p-5 rounded-lg border bg-[#030303]/40 flex flex-col justify-between transition-all duration-300 relative group overflow-hidden cursor-pointer ${
                inspectedItem === item.name ? "border-electric-blue/50 glow-blue" : "border-white/5 hover:border-electric-blue/20"
              }`}
            >
              {/* Corner decor line */}
              <div className={`absolute top-0 right-0 w-6 h-6 border-r border-t pointer-events-none transition-colors ${
                inspectedItem === item.name ? "border-electric-blue/70" : "border-white/10 group-hover:border-electric-blue/30"
              }`} />

              <div className="flex flex-col gap-2">
                {/* Header */}
                <div className="flex justify-between items-start">
                  <div className="flex flex-col">
                    <span className="text-[8px] font-mono text-white/30 uppercase tracking-widest">
                      QTY // {item.qty}
                    </span>
                    <h4 className={`text-base font-orbitron font-extrabold mt-0.5 tracking-wide transition-colors ${
                      inspectedItem === item.name ? "text-electric-blue" : "text-white group-hover:text-electric-blue"
                    }`}>
                      {item.name}
                    </h4>
                  </div>
                  <span className={`text-[8px] font-mono px-2 py-0.5 border rounded-sm font-bold tracking-widest ${getStatusStyle(item.status)}`}>
                    {item.status}
                  </span>
                </div>

                {/* Description */}
                <p className="text-[11px] text-white/60 font-mono leading-relaxed mt-1">
                  {item.desc}
                </p>
              </div>

              {/* Expandable Inspector Panel */}
              <AnimatePresence>
                {inspectedItem === item.name && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="mt-3 pt-3 border-t border-white/10 flex flex-col gap-1.5 overflow-hidden"
                  >
                    <span className="text-[8px] uppercase font-bold text-electric-blue tracking-widest mb-1 flex items-center gap-1.5">
                      <Crosshair className="w-3 h-3" />
                      INSPECTOR PROBE ACTIVE
                    </span>
                    {item.details.map((detail, dIdx) => (
                      <div key={dIdx} className="flex items-center gap-2 text-[10px] font-mono text-white/80">
                        <div className="w-1 h-1 rounded-full bg-electric-blue/50 shadow-[0_0_5px_rgba(0,240,255,0.8)]"></div>
                        {detail}
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Hardware Specifications */}
              <div className="mt-4 pt-3 border-t border-white/5 flex flex-col gap-1 text-[9px] font-mono">
                <span className="text-white/30 uppercase tracking-wider flex items-center gap-1">
                  <Box className="w-3 h-3 text-neon-purple" />
                  Specs Descriptor
                </span>
                <span className="text-white/80 font-bold truncate">
                  {item.specs}
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Inventory Status Terminal Footer */}
      <div className="border border-white/5 bg-[#030303]/60 p-3 rounded-lg text-[9px] font-mono text-white/30 flex flex-col sm:flex-row justify-between gap-2 uppercase tracking-widest">
        <span className="flex items-center gap-1.5">
          <Database className="w-3.5 h-3.5 text-electric-blue animate-pulse" />
          <span>Active Nodes: {filteredItems.length} items filtered</span>
        </span>
        <span>Inventory Database Uplink Status: 100% Synced</span>
      </div>
    </div>
  );
}
