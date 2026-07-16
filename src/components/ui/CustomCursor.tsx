import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);
  const dotSpringConfig = { damping: 40, stiffness: 600, mass: 0.2 };
  const dotXSpring = useSpring(dotX, dotSpringConfig);
  const dotYSpring = useSpring(dotY, dotSpringConfig);

  useEffect(() => {
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      setIsTouchDevice(true);
      return;
    }

    let interactiveEl: HTMLElement | null = null;
    let centerX = 0;
    let centerY = 0;

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      interactiveEl = target.closest('a, button, .interactive') as HTMLElement;
      if (interactiveEl) {
        setIsHovering(true);
        const rect = interactiveEl.getBoundingClientRect();
        centerX = rect.left + rect.width / 2;
        centerY = rect.top + rect.height / 2;
      } else {
        setIsHovering(false);
      }
    };

    const updateMousePosition = (e: MouseEvent) => {
      let targetX = e.clientX;
      let targetY = e.clientY;

      if (interactiveEl) {
        // Recalculate center occasionally or rely on the cached one
        targetX = e.clientX + (centerX - e.clientX) * 0.3;
        targetY = e.clientY + (centerY - e.clientY) * 0.3;
      }

      cursorX.set(targetX);
      cursorY.set(targetY);
      dotX.set(e.clientX);
      dotY.set(e.clientY);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [cursorX, cursorY, dotX, dotY]);

  if (isTouchDevice) return null;

  return (
    <>
      {/* Outer Glow Ring */}
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 rounded-full pointer-events-none z-[9998] mix-blend-screen"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
          border: '1px solid',
          borderColor: isHovering ? 'rgba(239, 68, 68, 0.8)' : 'rgba(255, 255, 255, 0.2)',
          backgroundColor: isHovering ? 'rgba(239, 68, 68, 0.1)' : 'transparent',
          boxShadow: isHovering ? '0 0 20px rgba(239, 68, 68, 0.4)' : 'none',
        }}
        animate={{
          scale: isClicking ? 0.8 : isHovering ? 1.5 : 1,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      />
      
      {/* Ripple Effect on click */}
      {isClicking && (
        <motion.div
          className="fixed top-0 left-0 rounded-full pointer-events-none z-[9997] border border-[#ef4444]"
          initial={{ opacity: 1, scale: 1, x: '-50%', y: '-50%' }}
          animate={{ opacity: 0, scale: 3, x: '-50%', y: '-50%' }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          style={{ left: dotX.get(), top: dotY.get(), width: 20, height: 20 }}
        />
      )}

      {/* Inner Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-[9999]"
        style={{
          x: dotXSpring,
          y: dotYSpring,
          translateX: '-50%',
          translateY: '-50%',
          backgroundColor: isHovering ? '#ef4444' : '#ffffff',
        }}
      />
    </>
  );
}
