import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Check, Terminal, Send, Loader2 } from "lucide-react";

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  
  const email = "aadi@engineering.com"; 

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    
    // Simulate network request (Replace with actual Formspree/EmailJS logic)
    setTimeout(() => {
      setStatus("success");
      setFormState({ name: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 3000);
    }, 2000);
  };

  return (
    <section id="contact" className="relative bg-[#0B0B0C] py-32 px-6 md:px-12 overflow-hidden">
      
      {/* 1. ATMOSPHERE */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(214,185,122,0.05),transparent_40%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 lg:gap-24 items-center relative z-10">
        
        {/* --- LEFT COLUMN: THE HOOK --- */}
        <div className="space-y-12">
            
            <div className="space-y-6">
                <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-[#D6B97A] rounded-full animate-pulse shadow-[0_0_10px_#D6B97A]" />
                    <span className="text-[#D6B97A] font-mono text-xs uppercase tracking-[0.2em]">
                        Comms_Link :: Open
                    </span>
                </div>
                
                <h2 className="text-[#F3EFE6] text-5xl md:text-7xl font-semibold tracking-tighter leading-[0.9]">
                    Ready to engineer <br />
                    the <span className="text-[#444] italic font-serif">impossible?</span>
                </h2>

                <p className="text-[#BEB6A8] text-lg max-w-md leading-relaxed">
                    I am currently available for select projects involving autonomous systems, high-scale architecture, and exotic interfaces.
                </p>
            </div>

            {/* The Existing Magnetic Email Button */}
            <motion.button
                onClick={handleCopy}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group w-full md:w-auto flex items-center justify-between md:justify-start gap-8 px-8 py-6 bg-[#1A1A1A] border border-white/10 rounded-sm hover:border-[#D6B97A]/50 transition-all duration-300"
            >
                <div className="text-left">
                    <span className="block text-[10px] font-mono uppercase tracking-widest text-[#F3EFE6]/40 mb-1 group-hover:text-[#D6B97A]">
                        Direct Uplink
                    </span>
                    <span className="text-xl md:text-2xl font-mono tracking-tight text-[#F3EFE6] group-hover:text-white">
                        {email}
                    </span>
                </div>
                
                <div className="w-10 h-10 flex items-center justify-center bg-white/5 rounded-full group-hover:bg-[#D6B97A] transition-colors">
                    {copied ? <Check className="w-5 h-5 text-white" /> : <Copy className="w-5 h-5 text-[#F3EFE6] group-hover:text-black" />}
                </div>
            </motion.button>
        </div>


        {/* --- RIGHT COLUMN: THE CONSOLE (FORM) --- */}
        <div className="relative">
            {/* Console Frame */}
            <div className="absolute -inset-1 bg-gradient-to-b from-[#F3EFE6]/10 to-transparent rounded-lg blur-sm opacity-50" />
            
            <div className="relative bg-[#050505] border border-[#F3EFE6]/10 p-8 md:p-12 rounded-lg overflow-hidden">
                
                {/* Scanline Effect */}
                <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[size:100%_4px] opacity-20 pointer-events-none" />
                
                <div className="flex items-center justify-between mb-8 border-b border-[#F3EFE6]/10 pb-4">
                    <span className="text-[#F3EFE6]/50 font-mono text-xs uppercase tracking-widest flex items-center gap-2">
                        <Terminal size={14} /> Transmission_Console
                    </span>
                    <span className="text-[#D6B97A] font-mono text-xs uppercase tracking-widest">
                        v2.0
                    </span>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                    
                    {/* Name Input */}
                    <div className="group space-y-2">
                        <label className="text-[10px] font-mono uppercase tracking-widest text-[#F3EFE6]/40 group-focus-within:text-[#D6B97A] transition-colors">
                            // Identification
                        </label>
                        <input 
                            type="text" 
                            required
                            value={formState.name}
                            onChange={(e) => setFormState({...formState, name: e.target.value})}
                            className="w-full bg-transparent border-b border-[#F3EFE6]/20 py-2 text-[#F3EFE6] font-mono text-sm focus:outline-none focus:border-[#D6B97A] transition-colors placeholder:text-[#F3EFE6]/10"
                            placeholder="ENTER_ID"
                        />
                    </div>

                    {/* Email Input */}
                    <div className="group space-y-2">
                        <label className="text-[10px] font-mono uppercase tracking-widest text-[#F3EFE6]/40 group-focus-within:text-[#D6B97A] transition-colors">
                            // Return_Signal
                        </label>
                        <input 
                            type="email" 
                            required
                            value={formState.email}
                            onChange={(e) => setFormState({...formState, email: e.target.value})}
                            className="w-full bg-transparent border-b border-[#F3EFE6]/20 py-2 text-[#F3EFE6] font-mono text-sm focus:outline-none focus:border-[#D6B97A] transition-colors placeholder:text-[#F3EFE6]/10"
                            placeholder="ENTER_SIGNAL_ADDRESS"
                        />
                    </div>

                    {/* Message Input */}
                    <div className="group space-y-2">
                        <label className="text-[10px] font-mono uppercase tracking-widest text-[#F3EFE6]/40 group-focus-within:text-[#D6B97A] transition-colors">
                            // Payload_Data
                        </label>
                        <textarea 
                            required
                            rows={4}
                            value={formState.message}
                            onChange={(e) => setFormState({...formState, message: e.target.value})}
                            className="w-full bg-transparent border-b border-[#F3EFE6]/20 py-2 text-[#F3EFE6] font-mono text-sm focus:outline-none focus:border-[#D6B97A] transition-colors placeholder:text-[#F3EFE6]/10 resize-none"
                            placeholder="ENTER_TRANSMISSION_DATA..."
                        />
                    </div>

                    {/* Action Area */}
                    <div className="pt-4">
                        <AnimatePresence mode="wait">
                            {status === "success" ? (
                                <motion.div 
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="flex items-center gap-4 text-[#D6B97A] font-mono text-sm bg-[#D6B97A]/10 p-4 border border-[#D6B97A]/20"
                                >
                                    <Check size={16} />
                                    <span className="uppercase tracking-widest">Transmission_Sent</span>
                                </motion.div>
                            ) : (
                                <button 
                                    type="submit"
                                    disabled={status === "sending"}
                                    className="group relative w-full overflow-hidden bg-[#F3EFE6] text-[#0B0B0C] py-4 font-bold uppercase tracking-widest text-xs hover:text-[#F3EFE6] transition-colors disabled:opacity-50"
                                >
                                    <div className="absolute inset-0 w-full h-full bg-[#1A1A1A] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                                    <div className="relative flex items-center justify-center gap-3">
                                        {status === "sending" ? (
                                            <>
                                                <Loader2 className="animate-spin" size={14} />
                                                <span>Encrypting...</span>
                                            </>
                                        ) : (
                                            <>
                                                <span>Initiate_Protocol</span>
                                                <Send size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                            </>
                                        )}
                                    </div>
                                </button>
                            )}
                        </AnimatePresence>
                    </div>

                </form>
            </div>
        </div>

      </div>
    </section>
  );
}