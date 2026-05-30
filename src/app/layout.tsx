import type { Metadata } from "next";
import { Orbitron, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Subho Saha | Robotics & Embedded Systems Engineer",
  description: "Futuristic zero-gravity portfolio of Subho Saha. B.Tech Electrical Engineer, robotics innovator, drone engineer, and embedded systems developer.",
  keywords: [
    "Subho Saha", "Electrical Engineer", "Robotics Innovator", "Embedded Systems", 
    "Autonomous Quadcopter", "Quadcopter Drone", "ESP32", "Three.js Portfolio", "Awwwards Portfolio"
  ],
  authors: [{ name: "Subho Saha" }],
  openGraph: {
    title: "Subho Saha | Robotics & Embedded Systems Engineer",
    description: "Futuristic space laboratory portfolio showcasing autonomous drones, robotics, and embedded systems.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Subho Saha | Robotics & Embedded Systems Engineer",
    description: "Futuristic space laboratory portfolio showcasing autonomous drones, robotics, and embedded systems.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${orbitron.variable} ${jetbrainsMono.variable} font-mono bg-cyber-bg text-white selection:bg-neon-purple selection:text-white antialiased min-h-screen relative`}
      >
        {/* Cyber scanline overlays */}
        <div className="scanlines" />
        
        {/* Interactive background cyber grid */}
        <div className="fixed inset-0 cyber-grid pointer-events-none z-0" />
        
        {/* Ambient atmosphere glow */}
        <div className="fixed top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-electric-blue/5 blur-[120px] pointer-events-none z-0" />
        <div className="fixed bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-neon-purple/5 blur-[120px] pointer-events-none z-0" />

        {/* Global HUD Layout */}
        <div className="relative z-10 flex flex-col min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}
