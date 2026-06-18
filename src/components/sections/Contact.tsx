import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Github, Linkedin, Youtube, Twitter, Codepen, Send, CheckCircle2 } from 'lucide-react';

const SOCIALS = [
  { name: 'GitHub', icon: Github, href: 'https://github.com/Sdm940', color: 'hover:text-white hover:border-white hover:bg-white/10' },
  { name: 'CodePen', icon: Codepen, href: 'https://codepen.io/SDM-TECH-KNOW', color: 'hover:text-white hover:border-white hover:bg-white/10' },
  { name: 'LinkedIn', icon: Linkedin, href: '#', color: 'hover:text-blue-400 hover:border-blue-400 hover:bg-blue-400/10' },
  { name: 'X / Twitter', icon: Twitter, href: '#', color: 'hover:text-white hover:border-white hover:bg-white/10' },
  { name: 'YouTube', icon: Youtube, href: '#', color: 'hover:text-red-500 hover:border-red-500 hover:bg-red-500/10' },
];

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setIsSuccess(false), 5000);
    }, 1500);
  };

  return (
    <section id="contact" className="py-24 relative bg-black/20">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-2 gap-16">
          
          {/* Contact Details */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6">
              Let's build something together.
            </h2>
            <p className="text-app-muted text-lg mb-12 max-w-md">
              Whether you have a project in mind, a question about my work, or just want to say hi, my inbox is always open.
            </p>

            <div className="space-y-6 mb-12 text-white">
              <a href="mailto:sutantudutta@outlook.com" className="flex items-center space-x-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 hover:bg-white/10 transition-all group">
                <div className="w-12 h-12 bg-blue-500/10 text-blue-400 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-sm text-app-muted">Outlook Email</p>
                  <p className="font-medium">sutantudutta@outlook.com</p>
                </div>
              </a>
              
              <a href="mailto:sutantu.dutta@gmail.com" className="flex items-center space-x-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 hover:bg-white/10 transition-all group">
                <div className="w-12 h-12 bg-red-500/10 text-red-400 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-sm text-app-muted">Gmail Account</p>
                  <p className="font-medium">sutantu.dutta@gmail.com</p>
                </div>
              </a>
            </div>

            <div className="flex flex-wrap gap-4">
              {SOCIALS.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className={`w-14 h-14 rounded-full border border-white/10 flex items-center justify-center text-app-muted transition-all duration-300 shadow-lg hover:-translate-y-1 ${social.color}`}
                >
                  <social.icon size={24} />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="bg-app-card border border-white/10 rounded-3xl p-8 relative overflow-hidden"
          >
            <AnimatePresence mode='wait'>
              {isSuccess ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 bg-app-card"
                >
                  <div className="w-16 h-16 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle2 size={32} />
                  </div>
                  <h3 className="text-2xl font-display font-bold text-white mb-2">Message Sent!</h3>
                  <p className="text-app-muted">Thank you for reaching out. I'll get back to you as soon as possible.</p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                  onSubmit={handleSubmit}
                >
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-app-muted">Full Name</label>
                    <input
                      id="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-app-primary focus:bg-white/10 transition-all"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-app-muted">Email Address</label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-app-primary focus:bg-white/10 transition-all"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium text-app-muted">Your Message</label>
                    <textarea
                      id="message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-app-primary focus:bg-white/10 transition-all resize-none"
                      placeholder="Tell me about your project..."
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-white text-app-bg font-medium rounded-xl px-4 py-3 flex items-center justify-center space-x-2 hover:bg-gray-200 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                    {!isSubmitting && <Send size={18} />}
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
