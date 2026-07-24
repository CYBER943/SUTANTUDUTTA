import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Github, Linkedin, Youtube, Twitter, Codepen, Send, CheckCircle2, Copy, Loader2, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';
import { TextReveal } from '../ui/TextReveal';

const SOCIALS = [
  { name: 'GitHub', icon: Github, href: 'https://github.com/Sdm940', color: 'hover:text-white hover:border-white hover:bg-white/5' },
  { name: 'CodePen', icon: Codepen, href: 'https://codepen.io/SDM-TECH-KNOW', color: 'hover:text-white hover:border-white hover:bg-white/5' },
  { name: 'LinkedIn', icon: Linkedin, href: '#', color: 'hover:text-blue-400 hover:border-blue-400 hover:bg-blue-400/10' },
  { name: 'X / Twitter', icon: Twitter, href: '#', color: 'hover:text-white hover:border-white hover:bg-white/5' },
  { name: 'YouTube', icon: Youtube, href: '#', color: 'hover:text-red-500 hover:border-red-500 hover:bg-red-500/10' },
];

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '', projectType: 'Personal Project', urgency: 'Relaxed', honeypot: '' });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const lastSubmitTime = useRef<number>(0);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 20) {
      newErrors.message = 'Message must be at least 20 characters';
    } else if (formData.message.trim().length > 1000) {
      newErrors.message = 'Message cannot exceed 1000 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Spam Protection: Honeypot field check
    if (formData.honeypot) return;
    
    // Spam Protection: Debounce & Prevent rapid submissions (wait 10 seconds between submissions)
    const now = Date.now();
    if (now - lastSubmitTime.current < 10000) {
      toast.error('Please wait a moment before sending another message.');
      return;
    }

    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      // Lazy load EmailJS for performance
      const emailjs = (await import('@emailjs/browser')).default;
      
      // Initialize with public key
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
        project_type: formData.projectType,
        urgency: formData.urgency,
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
        date_time: new Date().toLocaleString(),
        browser: getBrowserInfo(),
        operating_system: getOSInfo(),
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
      };

      // Send main email to the portfolio owner
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
            subject: formData.subject,
            message: formData.message,
            project_type: formData.projectType,
            urgency: formData.urgency
          }
        );
      } catch (autoReplyErr) {
        console.error("Auto-reply failed to send:", autoReplyErr);
      }

      lastSubmitTime.current = Date.now();
      setIsSubmitting(false);
      setIsSuccess(true);
      
      toast.success('Message Sent Successfully!', {
        description: "Thank you for contacting me. I've received your message and will reply as soon as possible.",
      });
      
      setFormData({ name: '', email: '', subject: '', message: '', projectType: 'Personal Project', urgency: 'Relaxed', honeypot: '' });
      setTimeout(() => setIsSuccess(false), 5000);
      
    } catch (error) {
      console.error('EmailJS Error:', error);
      setIsSubmitting(false);
      toast.error('Failed to send your message.', {
        description: "Please try again later.",
      });
    }
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${type} copied to clipboard`);
  };

  return (
    <section id="contact" className="py-32 relative bg-[#020817] overflow-hidden">
      {/* Abstract Background Elements */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute -top-40 right-0 w-[500px] h-[500px] bg-red-500/10 blur-[150px] pointer-events-none rounded-full mix-blend-screen" />
      
      <div className="w-full max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-16 lg:gap-24 items-start">
          
          {/* Contact Details - Cinematic Left Side */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col"
          >
            <div className="flex items-center space-x-3 mb-8">
              <Send className="text-app-primary" size={24} />
              <span className="text-app-primary font-mono text-sm tracking-widest uppercase">Connection</span>
            </div>
            
            <h2 className="text-[clamp(3rem,6vw,4.5rem)] font-display font-bold text-white mb-8 tracking-tight leading-[1.1]">
              <TextReveal text="Let's create something" />
              <br />
              <span className="text-white/30"><TextReveal text="amazing together." /></span>
            </h2>
            
            <p className="text-white/50 text-lg mb-16 max-w-md font-light leading-relaxed">
              Whether you have a project in mind, a question about my work, or just want to discuss the future of the web, my inbox is always open.
            </p>

            {/* Premium Email Card */}
            <div className="group relative overflow-hidden bg-white/[0.02] border border-white/10 rounded-[2rem] p-8 hover:bg-white/[0.04] hover:border-white/20 transition-all duration-500 mb-12">
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/0 to-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              
              <div className="flex flex-col sm:flex-row sm:items-center gap-6 relative z-10">
                <div className="w-16 h-16 bg-white/5 border border-white/10 text-white rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:bg-white group-hover:text-black transition-all duration-500 shrink-0">
                  <Mail size={24} strokeWidth={1.5} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-2">
                    <p className="text-xs text-white/40 font-mono uppercase tracking-widest">Direct Line</p>
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                    </span>
                  </div>
                  <p className="text-xl md:text-2xl font-medium text-white truncate transition-colors">sutantudutta@outlook.com</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3 mt-8 relative z-10">
                                                  <button
                  onClick={() => copyToClipboard('sutantudutta@outlook.com', 'Email')}
                  className="flex items-center justify-center space-x-2 px-6 py-3 border border-white/10 rounded-xl text-white/70 hover:text-white hover:bg-white/5 transition-all font-medium group/btn"
                >
                  <Copy size={16} className="group-hover/btn:scale-110 transition-transform" />
                  <span>Copy</span>
                </button>
                <a 
                  href="mailto:sutantudutta@outlook.com"
                  className="flex items-center justify-center space-x-2 px-6 py-3 bg-white text-black rounded-xl hover:bg-white/90 transition-all font-medium group/btn"
                >
                  <span>Email</span>
                  <ArrowRight size={16} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                </a>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <p className="text-sm font-mono text-white/40 uppercase tracking-widest mb-6">Or find me on</p>
              <div className="flex flex-wrap gap-4">
                {SOCIALS.map((social) => (
                  <motion.a
                    whileHover={{ y: -5, scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className={`relative overflow-hidden w-14 h-14 rounded-2xl bg-white/[0.02] border border-white/10 flex items-center justify-center text-white/50 transition-all duration-300 group ${social.color}`}
                  >
                    <span className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors duration-300 pointer-events-none" />
                    <social.icon size={22} strokeWidth={1.5} className="relative z-10 group-hover:scale-110 transition-transform duration-500" />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Form - Minimalist & Focused */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="bg-[#0A0A0A] border border-white/10 rounded-[3rem] p-8 md:p-12 relative overflow-hidden shadow-2xl"
          >
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-500/10 blur-[100px] rounded-full pointer-events-none" />
            
            <AnimatePresence mode='wait'>
              {isSuccess ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex flex-col items-center justify-center text-center p-12 bg-[#0A0A0A]"
                >
                  <div className="w-20 h-20 bg-green-500/10 border border-green-500/20 text-green-400 rounded-3xl flex items-center justify-center mb-8">
                    <CheckCircle2 size={40} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-3xl font-display font-bold tracking-tight text-white mb-4">Transmission Successful</h3>
                  <p className="text-white/50 text-lg max-w-sm">Got it! I'll reply within 48 hours 🎉</p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6 relative z-10"
                  onSubmit={handleSubmit}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Name Input */}
                    <div className="relative group pb-5">
                      <input
                        id="name"
                        type="text"
                        value={formData.name}
                        onChange={(e) => {
                          setFormData({ ...formData, name: e.target.value });
                          if (errors.name) setErrors(prev => ({ ...prev, name: '' }));
                        }}
                        aria-invalid={errors.name ? "true" : "false"}
                        className={`peer w-full bg-black/40 border-b-2 ${errors.name ? 'border-red-500' : 'border-white/10 focus:border-white'} rounded-none px-0 pt-6 pb-2 text-base text-white placeholder-transparent focus:outline-none transition-colors`}
                        placeholder="John Doe"
                      />
                      <label 
                        htmlFor="name" 
                        className={`absolute left-0 top-3 text-[10px] uppercase tracking-widest font-medium transition-all peer-placeholder-shown:top-6 peer-placeholder-shown:text-xs peer-placeholder-shown:text-white/30 peer-focus:top-2 peer-focus:text-[10px] ${errors.name ? 'text-red-400 peer-focus:text-red-400' : 'text-white/50 peer-focus:text-white'}`}
                      >
                        Full Name
                      </label>
                      {errors.name && (
                        <span className="absolute bottom-0 left-0 text-[10px] text-red-400 font-medium">
                          {errors.name}
                        </span>
                      )}
                    </div>
                    
                    {/* Email Input */}
                    <div className="relative group pb-5">
                      <input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => {
                          setFormData({ ...formData, email: e.target.value });
                          if (errors.email) setErrors(prev => ({ ...prev, email: '' }));
                        }}
                        aria-invalid={errors.email ? "true" : "false"}
                        className={`peer w-full bg-black/40 border-b-2 ${errors.email ? 'border-red-500' : 'border-white/10 focus:border-white'} rounded-none px-0 pt-6 pb-2 text-base text-white placeholder-transparent focus:outline-none transition-colors`}
                        placeholder="john@example.com"
                      />
                      <label 
                        htmlFor="email" 
                        className={`absolute left-0 top-3 text-[10px] uppercase tracking-widest font-medium transition-all peer-placeholder-shown:top-6 peer-placeholder-shown:text-xs peer-placeholder-shown:text-white/30 peer-focus:top-2 peer-focus:text-[10px] ${errors.email ? 'text-red-400 peer-focus:text-red-400' : 'text-white/50 peer-focus:text-white'}`}
                      >
                        Email Address
                      </label>
                      {errors.email && (
                        <span className="absolute bottom-0 left-0 text-[10px] text-red-400 font-medium">
                          {errors.email}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Subject Input */}
                  <div className="relative group pb-5">
                    <input
                      id="subject"
                      type="text"
                      value={formData.subject}
                      onChange={(e) => {
                        setFormData({ ...formData, subject: e.target.value });
                        if (errors.subject) setErrors(prev => ({ ...prev, subject: '' }));
                      }}
                      aria-invalid={errors.subject ? "true" : "false"}
                      className={`peer w-full bg-black/40 border-b-2 ${errors.subject ? 'border-red-500' : 'border-white/10 focus:border-white'} rounded-none px-0 pt-6 pb-2 text-base text-white placeholder-transparent focus:outline-none transition-colors`}
                      placeholder="Project Inquiry"
                    />
                    <label 
                      htmlFor="subject" 
                      className={`absolute left-0 top-3 text-[10px] uppercase tracking-widest font-medium transition-all peer-placeholder-shown:top-6 peer-placeholder-shown:text-xs peer-placeholder-shown:text-white/30 peer-focus:top-2 peer-focus:text-[10px] ${errors.subject ? 'text-red-400 peer-focus:text-red-400' : 'text-white/50 peer-focus:text-white'}`}
                    >
                      Subject
                    </label>
                    {errors.subject && (
                      <span className="absolute bottom-0 left-0 text-[10px] text-red-400 font-medium">
                        {errors.subject}
                      </span>
                    )}
                  </div>

                                    {/* Project Type */}
                  <div className="space-y-3 pb-2">
                    <label className="text-[10px] uppercase tracking-widest font-medium text-white/50">Type of Project</label>
                    <div className="flex flex-wrap gap-3">
                      {['Personal Project', 'Freelance', 'Collaboration'].map(type => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setFormData({ ...formData, projectType: type })}
                          className={`px-4 py-2 rounded-full text-sm transition-all border ${formData.projectType === type ? 'bg-white text-black border-white' : 'bg-white/5 text-white/70 border-white/10 hover:bg-white/10 hover:border-white/20'}`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Urgency */}
                  <div className="space-y-3 pb-2">
                    <label className="text-[10px] uppercase tracking-widest font-medium text-white/50">How urgent?</label>
                    <div className="flex flex-wrap gap-3">
                      {[
                        { label: 'Relaxed', emoji: '🐢' },
                        { label: 'Normal', emoji: '🚶' },
                        { label: 'Soon', emoji: '🏃' },
                        { label: 'ASAP', emoji: '🚀' }
                      ].map(urgency => (
                        <button
                          key={urgency.label}
                          type="button"
                          onClick={() => setFormData({ ...formData, urgency: urgency.label })}
                          className={`px-4 py-2 rounded-xl text-sm transition-all border flex items-center gap-2 ${formData.urgency === urgency.label ? 'bg-white text-black border-white scale-105 shadow-[0_0_15px_rgba(255,255,255,0.2)]' : 'bg-white/5 text-white/70 border-white/10 hover:bg-white/10 hover:border-white/20 hover:scale-105'}`}
                        >
                          <span className="text-lg">{urgency.emoji}</span>
                          <span>{urgency.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Message Input */}
                  <div className="relative group pb-5">
                    <textarea
                      id="message"
                      rows={5}
                      value={formData.message}
                      onChange={(e) => {
                        setFormData({ ...formData, message: e.target.value });
                        if (errors.message) setErrors(prev => ({ ...prev, message: '' }));
                      }}
                      aria-invalid={errors.message ? "true" : "false"}
                      maxLength={1000}
                      className={`peer w-full bg-black/40 border-b-2 ${errors.message ? 'border-red-500' : 'border-white/10 focus:border-white'} rounded-none px-0 pt-8 pb-2 text-base text-white placeholder-transparent focus:outline-none transition-colors resize-none`}
                      placeholder="Tell me about your project..."
                    />
                    <label 
                      htmlFor="message" 
                      className={`absolute left-0 top-3 text-[10px] uppercase tracking-widest font-medium transition-all peer-placeholder-shown:top-8 peer-placeholder-shown:text-xs peer-placeholder-shown:text-white/30 peer-focus:top-2 peer-focus:text-[10px] ${errors.message ? 'text-red-400 peer-focus:text-red-400' : 'text-white/50 peer-focus:text-white'}`}
                    >
                      Your Message
                    </label>
                    <div className="absolute bottom-0 left-0 w-full flex justify-between text-[10px]">
                      {errors.message ? (
                        <span className="text-red-400 font-medium">{errors.message}</span>
                      ) : (
                        <span></span>
                      )}
                      <span className={`font-mono ${formData.message.length >= 1000 ? 'text-red-400' : 'text-white/30'}`}>
                        {formData.message.length} / 1000
                      </span>
                    </div>
                  </div>

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

                                    <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full relative overflow-hidden bg-white text-black font-semibold rounded-2xl px-6 py-4 flex items-center justify-center space-x-2 hover:bg-white/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed group mt-8"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-3">
                      {isSubmitting ? (
                        <>
                          <Loader2 size={18} className="animate-spin" />
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <span className="block group-hover:hidden transition-all">Send Message</span>
                          <span className="hidden group-hover:block transition-all">Let's talk!</span>
                          <ArrowRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </>
                      )}
                    </span>
                  </button>
                  <div className="pt-4 text-center">
                    <p className="text-white/40 text-xs">
                      Or reach out via{' '}
                      <a href="https://github.com/Sdm940" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition-colors">GitHub</a>
                      {' '}/{' '}
                      <a href="mailto:sutantudutta@outlook.com" className="text-white/70 hover:text-white transition-colors">Email</a>
                    </p>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
