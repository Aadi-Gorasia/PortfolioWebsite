import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [mobileFormOpen, setMobileFormOpen] = useState(false);
  const formPanelRef = useRef<HTMLDivElement>(null);
  
  const email = "gorasiaaadi@gmail.com"; 

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setStatus("sending");

  try {
    const res = await fetch("https://formspree.io/f/mreyogwb", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Username: formState.name,
        "User Address": formState.email,
        Message: formState.message,
      }),
    });

    if (res.ok) {
      setStatus("success");
      setFormState({ name: "", email: "", message: "" });
    } else {
      setStatus("error");
    }
  } catch {
    setStatus("error");
  }
};

  return (
    <section id="contact" className="portfolio-section relative bg-[#0B0B0C] py-20 md:py-32 px-5 sm:px-6 md:px-12 overflow-hidden">
      
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 lg:gap-24 items-center relative z-10">
        
        {/* --- LEFT COLUMN: THE HOOK --- */}
        <div className="hidden space-y-8 md:block md:space-y-12">
            
            <div className="space-y-6">
                <p className="text-[#D6B97A] font-mono text-xs uppercase tracking-[0.2em]">Contact</p>
                <h2 className="text-[#F3EFE6] text-[clamp(2.5rem,10vw,4.5rem)] md:text-7xl font-semibold tracking-tighter leading-[0.9]">
                    Get in touch.
                </h2>

                <p className="text-[#BEB6A8] text-base sm:text-lg max-w-md leading-relaxed">
                    For project inquiries or questions, use the email link or send a message below.
                </p>
            </div>

            <motion.button
                onClick={handleCopy}
                whileHover={{ x: 6 }}
                whileTap={{ scale: 0.99 }}
                className="group w-full md:w-auto min-h-16 flex items-center justify-between md:justify-start gap-4 sm:gap-8 border-y border-white/15 py-4 sm:py-6 text-left hover:border-[#D6B97A]/50 transition-colors"
            >
                <div className="text-left">
                    <span className="block text-[10px] font-mono uppercase tracking-widest text-[#F3EFE6]/40 mb-1 group-hover:text-[#D6B97A]">
                        Copy email address
                    </span>
                    <span className="text-sm sm:text-xl md:text-2xl font-mono tracking-tight text-[#F3EFE6] group-hover:text-white break-all">
                        {email}
                    </span>
                </div>
                
                <span className="font-mono text-xs uppercase tracking-widest text-[#D6B97A]">{copied ? "Copied" : "Copy"}</span>
            </motion.button>
        </div>

        <div className="md:hidden">
          <div className="mb-6 font-mono text-[9px] uppercase tracking-[0.16em] text-[#D6B97A]">Contact</div>
          <h2 className="max-w-[12ch] font-display text-[clamp(2.7rem,12vw,4rem)] font-semibold leading-[0.92] tracking-[-0.07em] text-[#F3EFE6]">
            Get in touch.
          </h2>
          <p className="mt-4 max-w-sm text-sm leading-6 text-[#BEB6A8]">
            For project inquiries or questions, send me an email.
          </p>
          <a href={`mailto:${email}`} className="mt-6 flex min-h-14 items-center justify-between border-y border-[#D6B97A] font-mono text-xs font-semibold text-[#D6B97A]">
            {email} <span aria-hidden="true">↗</span>
          </a>
          <button
            onClick={() => {
              setMobileFormOpen((isOpen) => !isOpen);
              if (!mobileFormOpen) {
                window.setTimeout(() => formPanelRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 80);
              }
            }}
            aria-expanded={mobileFormOpen}
            className="mt-3 flex min-h-14 w-full items-center justify-between border-b border-white/15 font-mono text-[10px] uppercase tracking-[0.12em] text-[#F3EFE6]"
          >
            {mobileFormOpen ? "Close message form" : "Prefer a form? Write a note"}
            <span aria-hidden="true">{mobileFormOpen ? "−" : "+"}</span>
          </button>
        </div>


        {/* --- RIGHT COLUMN: THE CONSOLE (FORM) --- */}
        <motion.div
          ref={formPanelRef}
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className={`relative scroll-mt-24 ${mobileFormOpen ? "block" : "hidden"} md:block`}
        >
            <div className="relative border-y border-[#F3EFE6]/15 py-6 sm:py-8 md:py-12">
                <div className="flex items-center justify-between mb-8 border-b border-[#F3EFE6]/10 pb-4">
                    <span className="text-[#F3EFE6]/70 font-mono text-xs uppercase tracking-widest">
                        Send a message
                    </span>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    
                    {/* Name Input */}
                    <div className="group space-y-2">
                        <label className="text-[10px] font-mono uppercase tracking-widest text-[#F3EFE6]/40 group-focus-within:text-[#D6B97A] transition-colors">
                            Name
                        </label>
                        <input 
                            type="text" 
                            required
                            name="Username"
                            value={formState.name}
                            onChange={(e) => setFormState({...formState, name: e.target.value})}
                            className="w-full bg-transparent border-b border-[#F3EFE6]/20 py-3 text-[#F3EFE6] font-mono text-base md:text-sm focus:outline-none focus:border-[#D6B97A] transition-colors placeholder:text-[#F3EFE6]/10"
                            placeholder="Your name"
                        />
                    </div>

                    {/* Email Input */}
                    <div className="group space-y-2">
                        <label className="text-[10px] font-mono uppercase tracking-widest text-[#F3EFE6]/40 group-focus-within:text-[#D6B97A] transition-colors">
                            Email
                        </label>
                        <input 
                            type="email" 
                            required
                            name="User Address"
                            value={formState.email}
                            onChange={(e) => setFormState({...formState, email: e.target.value})}
                            className="w-full bg-transparent border-b border-[#F3EFE6]/20 py-3 text-[#F3EFE6] font-mono text-base md:text-sm focus:outline-none focus:border-[#D6B97A] transition-colors placeholder:text-[#F3EFE6]/10"
                            placeholder="you@example.com"
                        />
                    </div>

                    {/* Message Input */}
                    <div className="group space-y-2">
                        <label className="text-[10px] font-mono uppercase tracking-widest text-[#F3EFE6]/40 group-focus-within:text-[#D6B97A] transition-colors">
                            Message
                        </label>
                        <textarea 
                            required
                            rows={4}
                            name="Message"
                            value={formState.message}
                            onChange={(e) => setFormState({...formState, message: e.target.value})}
                            className="w-full bg-transparent border-b border-[#F3EFE6]/20 py-3 text-[#F3EFE6] font-mono text-base md:text-sm focus:outline-none focus:border-[#D6B97A] transition-colors placeholder:text-[#F3EFE6]/10 resize-none"
                            placeholder="What would you like to discuss?"
                        />
                    </div>

                    {/* Action Area */}
                    <div className="pt-4">
                            {status === "success" ? (
                                <p role="status" className="border-y border-[#D6B97A]/40 py-4 font-mono text-sm text-[#D6B97A]">
                                    Message sent.
                                </p>
                            ) : (
                                <>
                                {status === "error" && (
                                  <p role="alert" className="mb-4 border border-red-400/30 bg-red-400/5 p-4 text-sm text-red-200">
                                    Your message could not be sent. Please use the email link to contact me.
                                  </p>
                                )}
                                <button 
                                    type="submit"
                                    disabled={status === "sending"}
                                    className="group relative w-full border-y border-[#F3EFE6]/50 py-4 text-left font-mono text-xs font-bold uppercase tracking-widest text-[#F3EFE6] transition-colors hover:border-[#D6B97A] hover:text-[#D6B97A] disabled:opacity-50"
                                >
                                    {status === "sending" ? "Sending..." : "Send message"}
                                </button>
                                </>
                            )}
                    </div>

                    <p className="text-xs leading-5 text-[#F3EFE6]/45">
                      Submitting sends your details to Formspree. See the{" "}
                      <Link to="/privacy-policy" className="text-[#D6B97A] underline underline-offset-2">Privacy Policy</Link>.
                    </p>

                </form>
            </div>
        </motion.div>

      </div>
    </section>
  );
}