import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Github, Linkedin, Youtube, Twitter, Codepen, Send, CheckCircle2, Copy, Loader2 } from 'lucide-react';
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
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '', honeypot: '' });
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
      emailjs.init("YOUR_PUBLIC_KEY");
      
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
        "service_m1et0ae",
        "YOUR_TEMPLATE_ID",
        templateParams
      );

      // Attempt to send auto-reply to the visitor
      try {
        await emailjs.send(
          "service_m1et0ae",
          "YOUR_AUTO_REPLY_TEMPLATE_ID",
          {
            name: formData.name,
            email: formData.email,
            subject: formData.subject,
            message: formData.message
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
      
      setFormData({ name: '', email: '', subject: '', message: '', honeypot: '' });
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
    <section id="contact" className="py-32 relative bg-app-bg-secondary border-t border-app-border">
      <div className="w-full max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          
          {/* Contact Details */}
          <motion.div
            initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight text-white mb-6">
              <TextReveal text="Let's connect." />
            </h2>
            <p className="text-app-text-secondary text-lg mb-12 max-w-md font-light leading-relaxed">
              Whether you have a project in mind, a question about my work, or just want to say hi, my inbox is always open.
            </p>

            <div className="space-y-6 mb-12 text-white">
              <div className="flex flex-col md:flex-row md:items-center p-6 rounded-[1.5rem] bg-app-card border border-app-border hover:bg-app-elevated transition-all group relative">
                <div className="flex items-center space-x-4 flex-1 mb-6 md:mb-0">
                  <div className="w-12 h-12 bg-white/5 border border-white/10 text-white/80 rounded-xl flex items-center justify-center group-hover:text-white group-hover:scale-105 transition-all">
                    <Mail size={20} strokeWidth={1.5} />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <p className="text-sm text-app-text-secondary font-medium tracking-wide uppercase text-[10px]">Primary Contact</p>
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                      </span>
                    </div>
                    <p className="text-lg font-medium text-white group-hover:text-white/80 transition-colors break-all">sutantudutta@outlook.com</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 w-full md:w-auto">
                  <button
                    onClick={() => copyToClipboard('sutantudutta@outlook.com', 'Email')}
                    className="flex-1 md:flex-none flex items-center justify-center space-x-2 px-4 py-2 border border-white/10 rounded-lg text-white/70 hover:text-white hover:bg-white/5 transition-all"
                    aria-label="Copy to clipboard"
                  >
                    <Copy size={16} />
                    <span className="text-sm font-medium">Copy</span>
                  </button>
                  <a 
                    href="mailto:sutantudutta@outlook.com"
                    className="flex-1 md:flex-none flex items-center justify-center space-x-2 px-4 py-2 bg-white text-black rounded-lg hover:bg-white/90 transition-all font-medium"
                  >
                    <Send size={16} />
                    <span className="text-sm">Email</span>
                  </a>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              {SOCIALS.map((social) => (
                <motion.a
                  whileHover={{ y: -5, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className={`relative overflow-hidden w-12 h-12 rounded-xl bg-app-card border border-app-border flex items-center justify-center text-app-muted transition-all duration-300 group ${social.color}`}
                >
                  <span className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors duration-300 pointer-events-none" />
                  <social.icon size={20} strokeWidth={1.5} className="relative z-10" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="bg-app-card border border-app-border rounded-[2rem] p-8 md:p-10 relative overflow-hidden"
          >
            <AnimatePresence mode='wait'>
              {isSuccess ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 bg-app-card"
                >
                  <div className="w-16 h-16 bg-white/5 border border-white/10 text-white rounded-2xl flex items-center justify-center mb-6">
                    <CheckCircle2 size={32} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-2xl font-display font-semibold tracking-tight text-white mb-2">Message Sent</h3>
                  <p className="text-app-text-secondary">Thank you for reaching out. I'll get back to you as soon as possible.</p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-5"
                  onSubmit={handleSubmit}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="relative group pb-4">
                      <input
                        id="name"
                        type="text"
                        value={formData.name}
                        onChange={(e) => {
                          setFormData({ ...formData, name: e.target.value });
                          if (errors.name) setErrors(prev => ({ ...prev, name: '' }));
                        }}
                        aria-invalid={errors.name ? "true" : "false"}
                        aria-describedby={errors.name ? "name-error" : undefined}
                        className={`peer w-full bg-[var(--color-app-card)] backdrop-blur-md border ${errors.name ? 'border-red-500 focus:border-red-500 focus:shadow-[0_0_15px_rgba(239,68,68,0.15)]' : 'border-white/10 focus:border-[#3B82F6] focus:shadow-[0_0_15px_rgba(59,130,246,0.15)]'} rounded-xl px-4 pt-5 pb-2 text-sm text-white placeholder-transparent focus:outline-none transition-all`}
                        placeholder="John Doe"
                      />
                      <label 
                        htmlFor="name" 
                        className={`absolute left-4 top-2 text-[10px] uppercase tracking-wider font-medium transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-[11px] peer-placeholder-shown:text-white/40 peer-focus:top-2 peer-focus:text-[10px] ${errors.name ? 'text-red-400 peer-focus:text-red-400' : 'text-app-text-secondary peer-focus:text-[#3B82F6]'}`}
                      >
                        Full Name
                      </label>
                      {errors.name && (
                        <span id="name-error" className="absolute bottom-0 left-2 text-[10px] text-red-400 font-medium">
                          {errors.name}
                        </span>
                      )}
                    </div>
                    
                    <div className="relative group pb-4">
                      <input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => {
                          setFormData({ ...formData, email: e.target.value });
                          if (errors.email) setErrors(prev => ({ ...prev, email: '' }));
                        }}
                        aria-invalid={errors.email ? "true" : "false"}
                        aria-describedby={errors.email ? "email-error" : undefined}
                        className={`peer w-full bg-[var(--color-app-card)] backdrop-blur-md border ${errors.email ? 'border-red-500 focus:border-red-500 focus:shadow-[0_0_15px_rgba(239,68,68,0.15)]' : 'border-white/10 focus:border-[#3B82F6] focus:shadow-[0_0_15px_rgba(59,130,246,0.15)]'} rounded-xl px-4 pt-5 pb-2 text-sm text-white placeholder-transparent focus:outline-none transition-all`}
                        placeholder="john@example.com"
                      />
                      <label 
                        htmlFor="email" 
                        className={`absolute left-4 top-2 text-[10px] uppercase tracking-wider font-medium transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-[11px] peer-placeholder-shown:text-white/40 peer-focus:top-2 peer-focus:text-[10px] ${errors.email ? 'text-red-400 peer-focus:text-red-400' : 'text-app-text-secondary peer-focus:text-[#3B82F6]'}`}
                      >
                        Email Address
                      </label>
                      {errors.email && (
                        <span id="email-error" className="absolute bottom-0 left-2 text-[10px] text-red-400 font-medium">
                          {errors.email}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="relative group pb-4">
                    <input
                      id="subject"
                      type="text"
                      value={formData.subject}
                      onChange={(e) => {
                        setFormData({ ...formData, subject: e.target.value });
                        if (errors.subject) setErrors(prev => ({ ...prev, subject: '' }));
                      }}
                      aria-invalid={errors.subject ? "true" : "false"}
                      aria-describedby={errors.subject ? "subject-error" : undefined}
                      className={`peer w-full bg-[var(--color-app-card)] backdrop-blur-md border ${errors.subject ? 'border-red-500 focus:border-red-500 focus:shadow-[0_0_15px_rgba(239,68,68,0.15)]' : 'border-white/10 focus:border-[#3B82F6] focus:shadow-[0_0_15px_rgba(59,130,246,0.15)]'} rounded-xl px-4 pt-5 pb-2 text-sm text-white placeholder-transparent focus:outline-none transition-all`}
                      placeholder="Project Inquiry"
                    />
                    <label 
                      htmlFor="subject" 
                      className={`absolute left-4 top-2 text-[10px] uppercase tracking-wider font-medium transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-[11px] peer-placeholder-shown:text-white/40 peer-focus:top-2 peer-focus:text-[10px] ${errors.subject ? 'text-red-400 peer-focus:text-red-400' : 'text-app-text-secondary peer-focus:text-[#3B82F6]'}`}
                    >
                      Subject
                    </label>
                    {errors.subject && (
                      <span id="subject-error" className="absolute bottom-0 left-2 text-[10px] text-red-400 font-medium">
                        {errors.subject}
                      </span>
                    )}
                  </div>

                  <div className="relative group pb-4">
                    <textarea
                      id="message"
                      rows={4}
                      value={formData.message}
                      onChange={(e) => {
                        setFormData({ ...formData, message: e.target.value });
                        if (errors.message) setErrors(prev => ({ ...prev, message: '' }));
                      }}
                      aria-invalid={errors.message ? "true" : "false"}
                      aria-describedby={errors.message ? "message-error" : undefined}
                      maxLength={1000}
                      className={`peer w-full bg-[var(--color-app-card)] backdrop-blur-md border ${errors.message ? 'border-red-500 focus:border-red-500 focus:shadow-[0_0_15px_rgba(239,68,68,0.15)]' : 'border-white/10 focus:border-[#3B82F6] focus:shadow-[0_0_15px_rgba(59,130,246,0.15)]'} rounded-xl px-4 pt-6 pb-2 text-sm text-white placeholder-transparent focus:outline-none transition-all resize-none`}
                      placeholder="Tell me about your project..."
                    />
                    <label 
                      htmlFor="message" 
                      className={`absolute left-4 top-2 text-[10px] uppercase tracking-wider font-medium transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-[11px] peer-placeholder-shown:text-white/40 peer-focus:top-2 peer-focus:text-[10px] ${errors.message ? 'text-red-400 peer-focus:text-red-400' : 'text-app-text-secondary peer-focus:text-[#3B82F6]'}`}
                    >
                      Your Message
                    </label>
                    <div className="absolute bottom-0 left-0 w-full flex justify-between px-2 text-[10px]">
                      {errors.message ? (
                        <span id="message-error" className="text-red-400 font-medium">{errors.message}</span>
                      ) : (
                        <span></span>
                      )}
                      <span className={`${formData.message.length >= 1000 ? 'text-red-400' : 'text-app-text-secondary'}`}>
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
                    aria-disabled={isSubmitting}
                    className="w-full relative overflow-hidden bg-app-primary text-white font-medium rounded-xl px-4 py-3.5 flex items-center justify-center space-x-2 hover:bg-app-primary-hover shadow-[0_0_15px_rgba(59,130,246,0.25)] hover:shadow-[0_0_25px_rgba(59,130,246,0.4)] active:scale-[0.99] transition-all disabled:opacity-50 disabled:cursor-not-allowed group mt-2"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {isSubmitting ? (
                        <>
                          <Loader2 size={16} className="animate-spin" />
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <span>Send Message</span>
                          <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </>
                      )}
                    </span>
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
