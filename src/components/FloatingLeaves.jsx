import React from 'react';
import { motion } from 'framer-motion';

const leaves = [
  { id: 1, x: '8%', y: '16%', color: '#E11D48', size: 16, duration: 9, delay: 0 },
  { id: 2, x: '22%', y: '62%', color: '#F59E0B', size: 14, duration: 11, delay: 1.0 },
  { id: 3, x: '36%', y: '22%', color: '#EF4444', size: 15, duration: 10, delay: 0.5 },
  { id: 4, x: '48%', y: '74%', color: '#FACC15', size: 13, duration: 12, delay: 1.8 },
  { id: 5, x: '60%', y: '28%', color: '#FB7185', size: 16, duration: 8.5, delay: 1.2 },
  { id: 6, x: '74%', y: '66%', color: '#F97316', size: 15, duration: 10.5, delay: 0.3 },
  { id: 7, x: '88%', y: '20%', color: '#E11D48', size: 14, duration: 9.5, delay: 2.0 },
  { id: 8, x: '15%', y: '40%', color: '#FACC15', size: 12, duration: 11.5, delay: 0.8 },
  { id: 9, x: '42%', y: '48%', color: '#FB7185', size: 17, duration: 9.8, delay: 1.5 },
  { id: 10, x: '68%', y: '14%', color: '#F59E0B', size: 14, duration: 10.2, delay: 2.4 },
  { id: 11, x: '82%', y: '52%', color: '#EF4444', size: 16, duration: 8.8, delay: 0.7 },
  { id: 12, x: '28%', y: '82%', color: '#F97316', size: 13, duration: 12.2, delay: 1.9 },
  { id: 13, x: '54%', y: '86%', color: '#E11D48', size: 15, duration: 9.2, delay: 1.1 },
  { id: 14, x: '92%', y: '78%', color: '#FACC15', size: 14, duration: 11.0, delay: 0.4 },
];

export default function FloatingLeaves() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {leaves.map((leaf) => (
        <motion.div
          key={leaf.id}
          initial={{ x: 0, y: 0, rotate: 0, opacity: 0.75 }}
          animate={{
            x: [0, 38, -22, 28, 0],
            y: [0, 28, 52, 22, 0],
            rotate: [0, 50, -25, 65, 0],
            opacity: [0.6, 0.95, 0.75, 0.9, 0.6],
          }}
          transition={{
            duration: leaf.duration,
            delay: leaf.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{
            position: 'absolute',
            left: leaf.x,
            top: leaf.y,
            width: leaf.size,
            height: leaf.size * 0.65,
            backgroundColor: leaf.color,
            borderRadius: '70% 10% 70% 10%',
            boxShadow: '0 2px 8px rgba(0,0,0,0.18)',
          }}
        />
      ))}
    </div>
  );
}