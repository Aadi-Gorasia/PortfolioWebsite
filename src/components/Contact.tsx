import { useState } from "react";
import { motion } from "framer-motion";
import { Copy, Check } from "lucide-react";

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const email = "aadi@engineering.com"; // Replace with yours

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="relative bg-[#0B0B0C] py-32 md:py-48 px-6 md:px-12 overflow-hidden flex flex-col items-center text-center">
      
      {/* Decorative Background Circles */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/5 rounded-full" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-white/5 rounded-full opacity-50" />
      
      {/* The Hook */}
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="text-[#F3EFE6] text-5xl md:text-7xl font-semibold tracking-tighter mb-8 max-w-3xl z-10"
      >
        Ready to engineer the <span className="text-[#444] italic font-serif">impossible?</span>
      </motion.h2>

      <p className="text-[#BEB6A8] text-lg mb-12 max-w-xl z-10">
        I am currently available for select projects involving autonomous systems and high-scale architecture.
      </p>

      {/* The Magnetic Email Button */}
      <motion.button
        onClick={handleCopy}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="relative z-10 group flex items-center gap-6 px-8 py-6 bg-[#1A1A1A] border border-white/10 rounded-2xl hover:bg-[#F3EFE6] hover:text-[#0B0B0C] transition-all duration-300"
      >
        <div className="text-left">
            <span className="block text-xs font-mono uppercase tracking-widest opacity-50 mb-1 group-hover:text-[#0B0B0C]/60">
                Secure Uplink
            </span>
            <span className="text-2xl md:text-3xl font-mono tracking-tight group-hover:text-[#0B0B0C]">
                {email}
            </span>
        </div>
        
        <div className="w-12 h-12 flex items-center justify-center bg-white/5 rounded-full group-hover:bg-[#0B0B0C]/10 transition-colors">
            {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
        </div>
      </motion.button>
      
    </section>
  );
}