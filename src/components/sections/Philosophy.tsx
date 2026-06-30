import { motion } from 'motion/react';
import { Quote } from 'lucide-react';

export default function Philosophy() {
  return (
    <section className="py-32 relative overflow-hidden bg-app-bg flex items-center justify-center">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg h-[400px] bg-white/[0.02] blur-[120px] rounded-full pointer-events-none" />
      
      <div className="w-full max-w-6xl mx-auto px-6 relative z-10 text-center">
        <motion.div
           initial={{ opacity: 0, scale: 0.8 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true, margin: "-50px" }}
           transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
           className="mb-8 flex justify-center"
        >
          <div className="w-16 h-16 bg-app-card border border-app-border rounded-full flex items-center justify-center text-white/50">
            <Quote size={24} className="text-white/80" strokeWidth={1.5} />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        >
          <h2 className="text-[11px] font-semibold tracking-widest text-white/50 uppercase mb-12">My Philosophy</h2>
          
          <div className="space-y-8 md:space-y-10 text-2xl md:text-4xl lg:text-5xl font-display font-semibold text-white leading-tight tracking-tight">
            <p className="opacity-90">I believe learning happens through building.</p>
            <p className="opacity-70">Every project is an opportunity to experiment, improve, and understand technology more deeply.</p>
            <p className="opacity-100 text-white">Technology is not just about writing code—it's about solving problems, learning continuously, and creating meaningful experiences.</p>
          </div>

          <div className="mt-16 flex items-center justify-center space-x-4">
            <div className="w-12 h-px bg-white/20" />
            <span className="font-medium text-app-text-secondary tracking-wide text-sm uppercase">— Sutantu Dutta</span>
            <div className="w-12 h-px bg-white/20" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
