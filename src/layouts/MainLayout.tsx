import React from 'react';
import { motion } from 'framer-motion';
import { FlaskConical, Atom, Beaker, TestTubes, Sparkles } from 'lucide-react';

interface MainLayoutProps {
  children: React.ReactNode;
}

// Componente de burbujas decorativas
const Bubbles = () => {
  const bubbles = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    size: Math.random() * 30 + 10,
    left: Math.random() * 100,
    delay: Math.random() * 10,
    duration: Math.random() * 10 + 15,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {bubbles.map((bubble) => (
        <div
          key={bubble.id}
          className="bubble"
          style={{
            width: bubble.size,
            height: bubble.size,
            left: `${bubble.left}%`,
            bottom: '-50px',
            animationDelay: `${bubble.delay}s`,
            animationDuration: `${bubble.duration}s`,
          }}
        />
      ))}
    </div>
  );
};

// Molécula decorativa SVG
const MoleculeDecoration = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className}>
    {/* Átomo central */}
    <circle cx="50" cy="50" r="12" fill="currentColor" opacity="0.3" />
    <circle cx="50" cy="50" r="8" fill="currentColor" opacity="0.5" />
    
    {/* Átomos orbitales */}
    <circle cx="50" cy="20" r="6" fill="currentColor" opacity="0.4" />
    <circle cx="80" cy="50" r="6" fill="currentColor" opacity="0.4" />
    <circle cx="50" cy="80" r="6" fill="currentColor" opacity="0.4" />
    <circle cx="20" cy="50" r="6" fill="currentColor" opacity="0.4" />
    
    {/* Enlaces */}
    <line x1="50" y1="38" x2="50" y2="26" stroke="currentColor" strokeWidth="2" opacity="0.3" />
    <line x1="62" y1="50" x2="74" y2="50" stroke="currentColor" strokeWidth="2" opacity="0.3" />
    <line x1="50" y1="62" x2="50" y2="74" stroke="currentColor" strokeWidth="2" opacity="0.3" />
    <line x1="38" y1="50" x2="26" y2="50" stroke="currentColor" strokeWidth="2" opacity="0.3" />
  </svg>
);

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen text-white font-sans overflow-hidden relative">
      {/* Burbujas de fondo */}
      <Bubbles />
      
      {/* Decoraciones flotantes */}
      <motion.div
        animate={{ y: [0, -30, 0], rotate: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
        className="fixed top-20 right-10 text-cyan-500/20 pointer-events-none z-0"
      >
        <Atom size={150} strokeWidth={1} />
      </motion.div>
      
      <motion.div
        animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
        transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
        className="fixed bottom-40 left-5 text-amber-500/15 pointer-events-none z-0"
      >
        <FlaskConical size={120} strokeWidth={1} />
      </motion.div>
      
      <motion.div
        animate={{ y: [0, -15, 0], x: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 12, ease: "easeInOut" }}
        className="fixed top-1/3 left-20 text-purple-500/10 pointer-events-none z-0"
      >
        <MoleculeDecoration className="w-32 h-32 molecule-spin" />
      </motion.div>

      {/* ═══════════════ NAVBAR ═══════════════ */}
      <nav className="relative z-50 border-b border-white/5">
        <div className="absolute inset-0 bg-lab-dark/80 backdrop-blur-xl" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-20 flex items-center justify-between">
            
            {/* Logo Brand */}
            <motion.div 
              className="flex items-center gap-3 group cursor-pointer select-none"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Icono con efecto de brillo */}
              <motion.div 
                className="relative"
                whileHover={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 0.5 }}
              >
                <div className="absolute inset-0 bg-neon-amber rounded-2xl blur-lg opacity-50 group-hover:opacity-80 transition-opacity" />
                <div className="relative bg-gradient-to-br from-amber-400 to-orange-500 p-2.5 rounded-2xl shadow-lg">
                  <FlaskConical className="w-7 h-7 text-lab-dark" strokeWidth={2.5} />
                </div>
                {/* Burbuja pequeña */}
                <motion.div
                  animate={{ y: [-2, -8, -2], opacity: [0.5, 1, 0.5] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="absolute -top-1 -right-1 w-3 h-3 bg-cyan-400 rounded-full"
                />
              </motion.div>
              
              {/* Texto del logo */}
              <div className="flex flex-col">
                <span className="text-3xl font-bold tracking-tight">
                  <span className="text-gradient-fire">Atom</span>
                  <span className="text-white">Pop</span>
                </span>
                <span className="text-[10px] text-slate-500 tracking-widest uppercase">
                  Laboratorio Químico
                </span>
              </div>
            </motion.div>

            {/* Menú de navegación */}
            <div className="hidden md:flex items-center gap-2">
              <NavItem icon={<Beaker size={18} />} label="Masa Molar" href="#" />
              <NavItem icon={<TestTubes size={18} />} label="Conversor" href="#" />
              <NavItem icon={<Sparkles size={18} />} label="Composición" href="#" />
              <NavItem icon={<Atom size={18} />} label="Fórmulas" href="#" />
            </div>

            {/* Botón móvil (placeholder) */}
            <button className="md:hidden p-2 rounded-xl bg-lab-surface/50 text-slate-400">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* ═══════════════ CONTENIDO PRINCIPAL ═══════════════ */}
      <main className="relative z-10">
        {children}
      </main>

      {/* ═══════════════ FOOTER ═══════════════ */}
      <footer className="relative z-10 mt-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-slate-500 text-sm">
              <FlaskConical size={16} className="text-neon-amber" />
              <span>AtomPop © 2024 — Hecho con 🧪 y ☕</span>
            </div>
            <div className="text-slate-600 text-xs">
              Inspirado en el laboratorio del Dr. Flint Lockwood
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Componente de item de navegación
const NavItem = ({ icon, label, href, active = false }: { 
  icon: React.ReactNode; 
  label: string; 
  href: string;
  active?: boolean;
}) => (
  <motion.a
    href={href}
    className={`nav-link flex items-center gap-2 ${active ? 'active' : ''}`}
    whileHover={{ y: -2 }}
    whileTap={{ y: 0 }}
  >
    <span className="text-neon-cyan">{icon}</span>
    <span>{label}</span>
  </motion.a>
);

export default MainLayout;
