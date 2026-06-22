import { motion } from 'motion/react';
import { Quote } from 'lucide-react';

export default function Philosophy() {
  return (
    <section className="py-32 relative overflow-hidden bg-[#020817] flex items-center justify-center">
      <div className="absolute inset-0 bg-[#0B1120]/50" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg h-[400px] bg-gradient-to-tr from-[#3B82F6]/10 via-[#8B5CF6]/10 to-[#06B6D4]/10 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="w-full max-w-[1200px] mx-auto px-6 relative z-10 text-center">
        <motion.div
           initial={{ opacity: 0, scale: 0.8 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true, margin: "-50px" }}
           transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
           className="mb-8 flex justify-center"
        >
          <div className="w-16 h-16 bg-[#1E293B] border border-[#1F2937] rounded-full flex items-center justify-center text-app-muted shadow-2xl">
            <Quote size={24} className="text-[#3B82F6]" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        >
          <h2 className="text-sm font-semibold tracking-widest text-[#8B5CF6] uppercase mb-12">My Philosophy</h2>
          
          <div className="space-y-8 md:space-y-10 text-2xl md:text-4xl lg:text-5xl font-display font-bold text-white leading-tight tracking-tight">
            <p className="opacity-90">I believe learning happens through building.</p>
            <p className="opacity-70 text-[#06B6D4]">Every project is an opportunity to experiment, improve, and understand technology more deeply.</p>
            <p className="opacity-100 text-transparent bg-clip-text bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6]">Technology is not just about writing code—it's about solving problems, learning continuously, and creating meaningful experiences.</p>
          </div>

          <div className="mt-16 flex items-center justify-center space-x-4">
            <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-[#3B82F6]" />
            <span className="font-medium text-white tracking-wide text-lg">— Sutantu Dutta</span>
            <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-[#3B82F6]" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
