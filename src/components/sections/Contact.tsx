import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Github, Linkedin, Youtube, Twitter, Codepen, Send, CheckCircle2, Copy } from 'lucide-react';
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
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.subject || !formData.message) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      toast.success('Message sent successfully!');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setIsSuccess(false), 5000);
    }, 1500);
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
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-[11px] uppercase tracking-wider font-medium text-app-text-secondary">Full Name</label>
                      <input
                        id="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-[var(--color-app-card)] backdrop-blur-md border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#3B82F6] transition-all"
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-[11px] uppercase tracking-wider font-medium text-app-text-secondary">Email Address</label>
                      <input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-[var(--color-app-card)] backdrop-blur-md border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#3B82F6] transition-all"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-[11px] uppercase tracking-wider font-medium text-app-text-secondary">Subject</label>
                    <input
                      id="subject"
                      type="text"
                      required
                      value={formData.subject || ''}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full bg-[var(--color-app-card)] backdrop-blur-md border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#3B82F6] transition-all"
                      placeholder="Project Inquiry"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-[11px] uppercase tracking-wider font-medium text-app-text-secondary">Your Message</label>
                    <textarea
                      id="message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-[var(--color-app-card)] backdrop-blur-md border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#3B82F6] transition-all resize-none"
                      placeholder="Tell me about your project..."
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full relative overflow-hidden bg-app-primary text-white font-medium rounded-xl px-4 py-3.5 flex items-center justify-center space-x-2 hover:bg-app-primary-hover shadow-[0_0_15px_rgba(59,130,246,0.25)] hover:shadow-[0_0_25px_rgba(59,130,246,0.4)] active:scale-[0.99] transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                      {!isSubmitting && <Send size={16} />}
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
