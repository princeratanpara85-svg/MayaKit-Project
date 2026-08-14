"use client";

import React, { useState, useEffect } from "react";
import { Palette } from "@/data/palettes";
import { Fira_Code, VT323 } from "next/font/google";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Terminal, Folder, FileCode, Server, Database, Activity, GitBranch } from "lucide-react";
import { cn } from "@/lib/utils";

const fira = Fira_Code({ subsets: ["latin"] });
const vt323 = VT323({ weight: "400", subsets: ["latin"] });

// Typewriter component for terminal effect
const TypewriterText = ({ text, delay = 0, onComplete }: { text: string, delay?: number, onComplete?: () => void }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (!started) {
      timeout = setTimeout(() => setStarted(true), delay);
      return () => clearTimeout(timeout);
    }

    if (displayedText.length < text.length) {
      timeout = setTimeout(() => {
        setDisplayedText(text.slice(0, displayedText.length + 1));
      }, Math.random() * 20 + 10); // Fast typing
    } else if (onComplete) {
      onComplete();
    }
    
    return () => clearTimeout(timeout);
  }, [displayedText, started, text, delay, onComplete]);

  return <span>{displayedText}</span>;
};

// Blinking cursor component
const Cursor = ({ visible = true }: { visible?: boolean }) => {
  if (!visible) return null;
  return (
    <motion.span
      animate={{ opacity: [1, 1, 0, 0] }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      className="inline-block w-2 h-4 ml-1 bg-current align-middle"
    />
  );
};

export function DevOpsTerminalDemo({ palette }: { palette: Palette }) {
  const [green, darkGreen] = palette.colors; // #8ED968, #103C1F
  
  const [bootSequence, setBootSequence] = useState(0);
  const [activeProject, setActiveProject] = useState<string | null>(null);

  // Boot sequence logic
  useEffect(() => {
    const timer1 = setTimeout(() => setBootSequence(1), 800);
    const timer2 = setTimeout(() => setBootSequence(2), 1600);
    const timer3 = setTimeout(() => setBootSequence(3), 2200);
    const timer4 = setTimeout(() => setBootSequence(4), 3000);
    return () => { clearTimeout(timer1); clearTimeout(timer2); clearTimeout(timer3); clearTimeout(timer4); };
  }, []);

  return (
    <div 
      className={cn(
        "relative min-h-screen w-full overflow-x-hidden selection:bg-[#8ED968] selection:text-[#103C1F]",
        fira.className
      )}
      style={{ backgroundColor: darkGreen, color: green }}
    >
      {/* 1. THE SHELL WINDOW HEADER */}
      <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
        {/* Fake Window Chrome */}
        <div className="w-full flex items-center justify-between px-4 py-2 border-b backdrop-blur-md" style={{ borderColor: green, backgroundColor: 'rgba(16,60,31,0.9)' }}>
          <div className="flex items-center gap-4">
            <Link 
              href="/color-combo" 
              className="pointer-events-auto text-xs font-bold hover:bg-[#8ED968] hover:text-[#103C1F] transition-none px-2 py-1 flex items-center gap-2"
            >
              [esc] Gallery
            </Link>
          </div>
          <div className="text-xs tracking-widest opacity-70">
            root@devops-sysadmin:~ (zsh)
          </div>
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full border border-current opacity-50" />
            <div className="w-3 h-3 rounded-full border border-current opacity-50" />
            <div className="w-3 h-3 rounded-full border border-current opacity-50" />
          </div>
        </div>
      </header>

      <main className="pt-20 pb-32 px-4 md:px-12 max-w-7xl mx-auto flex flex-col gap-16 relative z-10 text-sm md:text-base leading-relaxed">
        
        {/* 2. BOOT SEQUENCE & HERO */}
        <section className="flex flex-col gap-2 min-h-[30vh]">
          {bootSequence >= 0 && (
            <div className="opacity-70">
              <TypewriterText text="[ OK ] Booting kernel..." delay={100} />
            </div>
          )}
          {bootSequence >= 1 && (
            <div className="opacity-70">
              <TypewriterText text="[ OK ] Loading infrastructure definitions from tf-state..." />
            </div>
          )}
          {bootSequence >= 2 && (
            <div className="opacity-70">
              <TypewriterText text="[ OK ] Starting Kubernetes control plane..." />
            </div>
          )}
          {bootSequence >= 3 && (
            <div className="opacity-70 mb-8">
              <TypewriterText text="[ OK ] System initialized. Welcome to the cluster." />
            </div>
          )}
          
          {bootSequence >= 4 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-6">
              <div className="flex items-center gap-2 font-bold text-xl md:text-3xl mt-4">
                <span>root@sysadmin:~$</span>
                <span className={cn("tracking-widest", vt323.className)}>whoami</span>
              </div>
              <div className="pl-4 md:pl-8 border-l border-current">
                <h1 className={cn("text-5xl md:text-7xl font-bold uppercase tracking-tight mb-4", vt323.className)}>
                  Systems Architect
                </h1>
                <p className="max-w-2xl text-lg opacity-80">
                  Designing highly available infrastructure, automating deployments, and scaling distributed systems with zero downtime.
                </p>
                <div className="mt-6 flex flex-wrap gap-4">
                  <span className="px-3 py-1 border border-dashed border-current opacity-70">SRE</span>
                  <span className="px-3 py-1 border border-dashed border-current opacity-70">Cloud Native</span>
                  <span className="px-3 py-1 border border-dashed border-current opacity-70">Infrastructure as Code</span>
                </div>
              </div>
            </motion.div>
          )}
        </section>

        {/* 3. ARCHITECTURE & PROJECTS (DIRECTORY LISTING) */}
        {bootSequence >= 4 && (
          <section className="flex flex-col gap-6 mt-12">
            <div className="flex items-center gap-2 font-bold text-lg md:text-xl">
              <span>root@sysadmin:~$</span>
              <span className={cn("tracking-widest", vt323.className)}>ls -la /projects</span>
            </div>
            
            <div className="pl-4 md:pl-8 border-l border-current">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[600px]">
                  <thead>
                    <tr className="border-b border-current opacity-50 text-xs uppercase">
                      <th className="py-2 px-4 font-normal">Permissions</th>
                      <th className="py-2 px-4 font-normal">User</th>
                      <th className="py-2 px-4 font-normal">Size</th>
                      <th className="py-2 px-4 font-normal">Date</th>
                      <th className="py-2 px-4 font-normal">Directory</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { id: "fintech-pipeline", perms: "drwxr-xr-x", user: "root", size: "4096", date: "Oct 12 09:34", name: "fintech-ci-cd", desc: "Zero-downtime deployment pipeline for high-frequency trading platform. Reduced deployment time by 80%." },
                      { id: "global-dns", perms: "drwxr-xr-x", user: "root", size: "4096", date: "Sep 28 14:12", name: "global-dns-router", desc: "Multi-region Route53 architecture handling 1M+ req/sec with active-active failover." },
                      { id: "k8s-mesh", perms: "drwxr-xr-x", user: "root", size: "4096", date: "Aug 05 11:45", name: "istio-mesh-cluster", desc: "Service mesh implementation securing microservices communication and enabling canary rollouts." },
                      { id: "observability", perms: "drwxr-xr-x", user: "root", size: "4096", date: "Jul 19 16:20", name: "telemetry-stack", desc: "Prometheus + Grafana + Loki stack aggregating 50TB of logs daily with sub-second query times." },
                    ].map((proj) => (
                      <React.Fragment key={proj.id}>
                        <tr 
                          className={cn(
                            "group cursor-pointer transition-none",
                            activeProject === proj.id ? "bg-[#8ED968] text-[#103C1F]" : "hover:bg-[#8ED968] hover:text-[#103C1F]"
                          )}
                          onClick={() => setActiveProject(activeProject === proj.id ? null : proj.id)}
                        >
                          <td className="py-3 px-4 whitespace-nowrap">{proj.perms}</td>
                          <td className="py-3 px-4 whitespace-nowrap">{proj.user}</td>
                          <td className="py-3 px-4 whitespace-nowrap">{proj.size}</td>
                          <td className="py-3 px-4 whitespace-nowrap">{proj.date}</td>
                          <td className="py-3 px-4 font-bold flex items-center gap-2">
                            <Folder size={16} /> {proj.name}/
                          </td>
                        </tr>
                        {/* Expanded details mimicking a cat command output */}
                        {activeProject === proj.id && (
                          <tr>
                            <td colSpan={5} className="p-0 border-b border-current">
                              <div className="bg-[#103C1F] text-[#8ED968] p-6 border-x border-current relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-full h-[1px] opacity-30 bg-current" />
                                <div className="flex gap-2 font-bold opacity-70 mb-4">
                                  <span>root@sysadmin:/projects$</span>
                                  <span className={cn(vt323.className, "tracking-widest")}>cat {proj.name}/README.md</span>
                                </div>
                                <div className="pl-4 border-l border-dashed border-current opacity-90 mb-4">
                                  <h3 className="font-bold text-lg mb-2 uppercase"># {proj.name}</h3>
                                  <p>{proj.desc}</p>
                                </div>
                                <div className="flex gap-2 font-bold opacity-70">
                                  <span>root@sysadmin:/projects$</span>
                                  <Cursor visible={true} />
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}

        {/* 4. STACK PROFICIENCY (HTOP MONITOR) */}
        {bootSequence >= 4 && (
          <section className="flex flex-col gap-6 mt-12">
            <div className="flex items-center gap-2 font-bold text-lg md:text-xl">
              <span>root@sysadmin:~$</span>
              <span className={cn("tracking-widest", vt323.className)}>htop</span>
            </div>
            
            <div className="p-4 md:p-8 border border-current bg-black/20">
              <div className="flex flex-col md:flex-row gap-8 md:gap-16 mb-8">
                {/* CPU Bars for Skills */}
                <div className="flex-1 flex flex-col gap-2">
                  <div className="text-xs mb-2 flex justify-between opacity-70">
                    <span>SYSTEM SKILLS</span>
                    <span>LOAD AVG</span>
                  </div>
                  {[
                    { name: "1  [Kubernetes]", level: 90 },
                    { name: "2  [Terraform]", level: 85 },
                    { name: "3  [AWS/GCP]", level: 95 },
                    { name: "4  [Docker]", level: 90 },
                  ].map((skill) => (
                    <div key={skill.name} className="flex items-center gap-4 text-xs md:text-sm">
                      <span className="w-32 whitespace-pre">{skill.name}</span>
                      <span className="flex-1 flex items-center">
                        <span className="mr-2">[</span>
                        <span className="tracking-tighter">
                          {Array.from({ length: 40 }).map((_, i) => (
                            <span key={i} className={i < (skill.level / 100) * 40 ? "opacity-100" : "opacity-20"}>|</span>
                          ))}
                        </span>
                        <span className="ml-2">]</span>
                      </span>
                      <span className="w-12 text-right">{skill.level}%</span>
                    </div>
                  ))}
                </div>

                {/* Second column of CPU bars */}
                <div className="flex-1 flex flex-col gap-2">
                  <div className="text-xs mb-2 flex justify-between opacity-70">
                    <span>LANGUAGES</span>
                    <span>MEM USAGE</span>
                  </div>
                  {[
                    { name: "5  [Golang]", level: 80 },
                    { name: "6  [Python]", level: 90 },
                    { name: "7  [Bash/Zsh]", level: 95 },
                    { name: "8  [TypeScript]", level: 70 },
                  ].map((skill) => (
                    <div key={skill.name} className="flex items-center gap-4 text-xs md:text-sm">
                      <span className="w-32 whitespace-pre">{skill.name}</span>
                      <span className="flex-1 flex items-center">
                        <span className="mr-2">[</span>
                        <span className="tracking-tighter">
                          {Array.from({ length: 40 }).map((_, i) => (
                            <span key={i} className={i < (skill.level / 100) * 40 ? "opacity-100" : "opacity-20"}>|</span>
                          ))}
                        </span>
                        <span className="ml-2">]</span>
                      </span>
                      <span className="w-12 text-right">{skill.level}%</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Status Indicators */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-dashed border-current opacity-80 text-xs">
                <div className="flex items-center gap-2">
                  <Activity size={14} className="animate-pulse" />
                  <span>Uptime: 99.999%</span>
                </div>
                <div className="flex items-center gap-2">
                  <Server size={14} />
                  <span>Nodes: 142 Active</span>
                </div>
                <div className="flex items-center gap-2">
                  <GitBranch size={14} />
                  <span>Deploys: 48/day</span>
                </div>
                <div className="flex items-center gap-2">
                  <Database size={14} />
                  <span>Data: 5.2 PB</span>
                </div>
              </div>
            </div>
          </section>
        )}

      </main>

      {/* 5. EXECUTION FOOTER */}
      {bootSequence >= 4 && (
        <footer className="fixed bottom-0 left-0 right-0 p-4 md:p-6 backdrop-blur-md bg-[#103C1F]/90 border-t" style={{ borderColor: green }}>
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            <div className="flex items-center gap-2 font-bold text-lg">
              <span>root@sysadmin:~$</span>
              <span className={cn("tracking-widest", vt323.className)}>./contact.sh</span>
              <Cursor visible={true} />
            </div>

            <div className="flex gap-6 text-sm font-bold">
              <a href="#" className="hover:bg-[#8ED968] hover:text-[#103C1F] px-2 py-1 transition-none border border-transparent hover:border-current flex items-center gap-2">
                <FileCode size={16} /> GITHUB
              </a>
              <a href="#" className="hover:bg-[#8ED968] hover:text-[#103C1F] px-2 py-1 transition-none border border-transparent hover:border-current flex items-center gap-2">
                <Terminal size={16} /> LINKEDIN
              </a>
              <a href="#" className="hover:bg-[#8ED968] hover:text-[#103C1F] px-2 py-1 transition-none border border-transparent hover:border-current flex items-center gap-2">
                <Server size={16} /> EMAIL
              </a>
            </div>

          </div>
        </footer>
      )}

      {/* Ambient Matrix Grid overlay */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-[0.02] mix-blend-overlay z-0"
        style={{
          backgroundImage: `linear-gradient(${green} 1px, transparent 1px), linear-gradient(90deg, ${green} 1px, transparent 1px)`,
          backgroundSize: '20px 20px'
        }}
      />
    </div>
  );
}
