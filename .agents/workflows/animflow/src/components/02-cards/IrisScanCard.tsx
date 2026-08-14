import { motion } from "framer-motion";
import { Fingerprint, ShieldCheck, Lock } from "lucide-react";
import { cn } from "@/lib/utils";

/** IrisScanCard — Scanning iris / cyberpunk reveal. */
export default function IrisScanCard({ className }: { className?: string }) {
  return (
    <div className={cn("relative w-full h-full flex items-center justify-center bg-[#04060c] overflow-hidden p-6", className)}>
      <div className="relative w-full max-w-sm aspect-[5/4] rounded-2xl border border-emerald-400/30 bg-black/80 overflow-hidden p-6">
        <div className="absolute inset-0 bg-[linear-gradient(transparent_0%,rgba(16,185,129,0.08)_50%,transparent_100%)] bg-[size:100%_4px] pointer-events-none" />
        <motion.div
          className="absolute inset-x-0 h-px bg-emerald-300 shadow-[0_0_20px_4px] shadow-emerald-400"
          animate={{ top: ["0%", "100%", "0%"] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
        <div className="flex items-center gap-2 text-emerald-300 mb-4">
          <ShieldCheck size={16} /> <span className="text-xs uppercase tracking-widest">Biometric Auth</span>
        </div>
        <div className="flex items-center justify-center my-6">
          <div className="relative h-32 w-32 rounded-full border-2 border-emerald-400/40 flex items-center justify-center">
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-emerald-300"
              animate={{ scale: [1, 1.3, 1], opacity: [1, 0, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <Fingerprint className="text-emerald-300" size={56} strokeWidth={1.2} />
            <div className="absolute inset-0 rounded-full overflow-hidden">
              <motion.div className="absolute inset-x-0 h-1 bg-emerald-300/80 shadow-[0_0_12px_2px] shadow-emerald-300" animate={{ top: ["0%", "100%"] }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} />
            </div>
          </div>
        </div>
        <div className="text-center">
          <p className="text-white text-sm font-semibold">Scanning iris pattern</p>
          <p className="text-emerald-300/70 text-xs font-mono mt-1">MATCH: 99.7%</p>
        </div>
        <div className="mt-4 flex items-center gap-2 text-emerald-300/70 text-[10px] font-mono">
          <Lock size={10} /> Encrypted · AES-256
        </div>
      </div>
    </div>
  );
}
