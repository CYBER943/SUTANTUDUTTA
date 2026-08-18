import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '', honeypot: '' });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const lastSubmitTime = useRef<number>(0);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.name.trim()) newErrors.name = 'Required';
    
    if (!formData.email.trim()) {
      newErrors.email = 'Required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Required';
    } else if (formData.message.trim().length < 5) {
      newErrors.message = 'Too short';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.honeypot) return;
    
    const now = Date.now();
    if (now - lastSubmitTime.current < 10000) {
      toast.error('Please wait a moment before sending another message.');
      return;
    }

    if (!validateForm()) return;
    setIsSubmitting(true);
    
    try {
      const emailjs = (await import('@emailjs/browser')).default;
      emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "SFx7Vfw6kC_YuGJ-HUzzI");
      
      const getBrowserInfo = () => {
        const ua = navigator.userAgent;
        if (ua.indexOf("Firefox") > -1) return "Mozilla Firefox";
        if (ua.indexOf("Opera") > -1 || ua.indexOf("OPR") > -1) return "Opera";
        if (ua.indexOf("Trident") > -1) return "Microsoft Internet Explorer";
        if (ua.indexOf("Edge") > -1) return "Microsoft Edge";
        if (ua.indexOf("Chrome") > -1) return "Google Chrome";
        if (ua.indexOf("Safari") > -1) return "Apple Safari";
        return "Unknown";
      };

      const getOSInfo = () => {
        const ua = navigator.userAgent;
        if (ua.indexOf("Win") > -1) return "Windows";
        if (ua.indexOf("Mac") > -1) return "MacOS";
        if (ua.indexOf("Linux") > -1) return "Linux";
        if (ua.indexOf("Android") > -1) return "Android";
        if (ua.indexOf("like Mac") > -1) return "iOS";
        return "Unknown";
      };

      const templateParams = {
        project_type: 'General Inquiry (Sentence Form)',
        urgency: 'Normal',
        name: formData.name,
        email: formData.email,
        subject: `New inquiry from ${formData.name}`,
        message: formData.message,
        date_time: new Date().toLocaleString(),
        browser: getBrowserInfo(),
        operating_system: getOSInfo(),
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
      };

      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID || "service_m1et0ae",
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "YOUR_TEMPLATE_ID",
        templateParams
      );

      // Attempt to send auto-reply to the visitor
      try {
        await emailjs.send(
          import.meta.env.VITE_EMAILJS_SERVICE_ID || "service_m1et0ae",
          import.meta.env.VITE_EMAILJS_AUTO_REPLY_TEMPLATE_ID || "YOUR_AUTO_REPLY_TEMPLATE_ID",
          {
            name: formData.name,
            email: formData.email,
            subject: `New inquiry from ${formData.name}`,
            message: formData.message,
            project_type: 'General Inquiry',
            urgency: 'Normal'
          }
        );
      } catch (autoReplyErr) {
        console.error("Auto-reply failed to send:", autoReplyErr);
      }

      lastSubmitTime.current = Date.now();
      setIsSubmitting(false);
      setIsSuccess(true);
      
      toast.success('Message Sent Successfully!');
      
      setFormData({ name: '', email: '', message: '', honeypot: '' });
      setTimeout(() => setIsSuccess(false), 5000);
      
    } catch (error) {
      console.error('EmailJS Error:', error);
      setIsSubmitting(false);
      toast.error('Failed to send your message.');
    }
  };

  return (
    <section id="contact" className="py-24 md:py-40 relative bg-[#05050A] overflow-hidden min-h-[800px] flex items-center font-sans border-t border-white/[0.05]">
      {/* Abstract Background Texture */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)', backgroundSize: '4rem 4rem' }} />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.03)_0%,transparent_75%)] pointer-events-none" />
      
      <div className="w-full max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-[1fr_1.8fr] gap-16 lg:gap-24 items-start">
          
          {/* LEFT SIDE - Heading */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col pt-2 lg:pt-6"
          >
            <div className="mb-6 lg:mb-12">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
                <path d="M4 4H10V10H4V4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M14 14H20V20H14V14Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M14 4H20V10H14V4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M4 14H10V20H4V14Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="12" cy="12" r="2" fill="currentColor"/>
              </svg>
            </div>
            
            <h2 className="text-5xl md:text-6xl lg:text-[5.5rem] font-bold tracking-tighter leading-[0.95] mb-6 text-white font-display">
              Let's get<br />started.
            </h2>
            <p className="text-[11px] font-mono uppercase tracking-[0.25em] text-white/40 font-semibold">
              Contact Form
            </p>
          </motion.div>

          {/* RIGHT SIDE - Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="relative"
          >
            <AnimatePresence mode="wait">
              {isSuccess ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-start justify-center h-full py-16"
                >
                  <div className="w-16 h-16 bg-white/5 border border-white/10 text-white rounded-2xl flex items-center justify-center mb-8">
                    <CheckCircle2 size={32} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4 font-display">Message received.</h3>
                  <p className="text-white/50 text-xl max-w-md leading-relaxed">
                    Thank you for reaching out. I'll get back to you shortly to get things started.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="text-2xl md:text-4xl lg:text-[2.75rem] leading-[2.2] md:leading-[2.2] lg:leading-[2.2] font-medium text-white/90"
                >
                  <p className="inline">
                    My name is 
                    <span className="relative inline-block mx-2 md:mx-4">
                      <input
                        type="text"
                        placeholder="YOUR FULL NAME"
                        value={formData.name}
                        onChange={(e) => {
                          setFormData({ ...formData, name: e.target.value });
                          if (errors.name) setErrors(prev => ({ ...prev, name: '' }));
                        }}
                        className={`bg-transparent border-b-2 ${errors.name ? 'border-red-500' : 'border-white/20 focus:border-white'} outline-none px-2 py-1 text-center text-white placeholder:text-white/20 placeholder:text-[11px] md:placeholder:text-sm placeholder:font-mono placeholder:tracking-widest transition-colors w-[180px] md:w-[280px] lg:w-[320px]`}
                      />
                      <AnimatePresence>
                        {errors.name && (
                          <motion.span 
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="absolute -bottom-7 left-0 w-full text-center text-[10px] font-mono tracking-widest text-red-400 uppercase pointer-events-none"
                          >
                            {errors.name}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </span> 
                    and I have a 
                    <span className="relative inline-block mx-2 md:mx-4">
                      <input
                        type="text"
                        placeholder="WEBSITE, PROJECT, ETC."
                        value={formData.message}
                        onChange={(e) => {
                          setFormData({ ...formData, message: e.target.value });
                          if (errors.message) setErrors(prev => ({ ...prev, message: '' }));
                        }}
                        className={`bg-transparent border-b-2 ${errors.message ? 'border-red-500' : 'border-white/20 focus:border-white'} outline-none px-2 py-1 text-center text-white placeholder:text-white/20 placeholder:text-[11px] md:placeholder:text-sm placeholder:font-mono placeholder:tracking-widest transition-colors w-[220px] md:w-[340px] lg:w-[420px]`}
                      />
                      <AnimatePresence>
                        {errors.message && (
                          <motion.span 
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="absolute -bottom-7 left-0 w-full text-center text-[10px] font-mono tracking-widest text-red-400 uppercase pointer-events-none"
                          >
                            {errors.message}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </span> 
                    that needs help. You can reach me at 
                    <span className="relative inline-block mx-2 md:mx-4">
                      <input
                        type="email"
                        placeholder="YOUR EMAIL ADDRESS"
                        value={formData.email}
                        onChange={(e) => {
                          setFormData({ ...formData, email: e.target.value });
                          if (errors.email) setErrors(prev => ({ ...prev, email: '' }));
                        }}
                        className={`bg-transparent border-b-2 ${errors.email ? 'border-red-500' : 'border-white/20 focus:border-white'} outline-none px-2 py-1 text-center text-white placeholder:text-white/20 placeholder:text-[11px] md:placeholder:text-sm placeholder:font-mono placeholder:tracking-widest transition-colors w-[200px] md:w-[320px] lg:w-[380px]`}
                      />
                      <AnimatePresence>
                        {errors.email && (
                          <motion.span 
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="absolute -bottom-7 left-0 w-full text-center text-[10px] font-mono tracking-widest text-red-400 uppercase pointer-events-none"
                          >
                            {errors.email}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </span> 
                    to get things started.
                  </p>

                  {/* Honeypot field for anti-spam */}
                  <div className="hidden" aria-hidden="true">
                    <label htmlFor="website">Website</label>
                    <input 
                      type="text" 
                      id="website"
                      name="website"
                      tabIndex={-1} 
                      value={formData.honeypot}
                      onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                      autoComplete="off"
                    />
                  </div>

                  <div className="mt-16 lg:mt-24">
                    <button 
                      type="submit"
                      disabled={isSubmitting}
                      className="group flex items-center text-xs md:text-sm font-mono tracking-[0.25em] uppercase font-bold text-white hover:text-white/70 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 size={16} className="animate-spin mr-4 text-white/50" />
                          SENDING...
                        </>
                      ) : (
                        <>
                          <span className="mr-4 text-white/50 group-hover:text-white transition-colors">—</span> 
                          SEND MESSAGE
                        </>
                      )}
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
            
            <div className="mt-24 lg:mt-32 pt-8 border-t border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <p className="text-white/30 text-[10px] font-mono uppercase tracking-widest">
                © {new Date().getFullYear()} SUTANTU DUTTA. 
              </p>
              <div className="flex flex-wrap gap-6">
                 <a href="mailto:sutantudutta@outlook.com" className="text-[10px] font-mono uppercase tracking-widest text-white/30 hover:text-white transition-colors">Email</a>
                 <a href="https://github.com/Sdm940" target="_blank" rel="noopener noreferrer" className="text-[10px] font-mono uppercase tracking-widest text-white/30 hover:text-white transition-colors">GitHub</a>
                 <a href="https://codepen.io/SDM-TECH-KNOW" target="_blank" rel="noopener noreferrer" className="text-[10px] font-mono uppercase tracking-widest text-white/30 hover:text-white transition-colors">CodePen</a>
              </div>
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}

