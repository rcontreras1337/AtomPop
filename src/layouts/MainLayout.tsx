import React from 'react';
import { motion } from 'framer-motion';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { FlaskConical, Atom, Beaker, TestTubes, Sparkles, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { routes } from '../router';

// Datos estáticos para burbujas (generados una vez fuera del componente)
const BUBBLE_DATA = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  size: 10 + (i * 2.5) % 30,
  left: (i * 8.3) % 100,
  delay: (i * 0.8) % 10,
  duration: 15 + (i * 0.8) % 10,
}));

// Componente de burbujas decorativas
const Bubbles = () => {
  const bubbles = BUBBLE_DATA;

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
    <circle cx="50" cy="50" r="12" fill="currentColor" opacity="0.3" />
    <circle cx="50" cy="50" r="8" fill="currentColor" opacity="0.5" />
    <circle cx="50" cy="20" r="6" fill="currentColor" opacity="0.4" />
    <circle cx="80" cy="50" r="6" fill="currentColor" opacity="0.4" />
    <circle cx="50" cy="80" r="6" fill="currentColor" opacity="0.4" />
    <circle cx="20" cy="50" r="6" fill="currentColor" opacity="0.4" />
    <line x1="50" y1="38" x2="50" y2="26" stroke="currentColor" strokeWidth="2" opacity="0.3" />
    <line x1="62" y1="50" x2="74" y2="50" stroke="currentColor" strokeWidth="2" opacity="0.3" />
    <line x1="50" y1="62" x2="50" y2="74" stroke="currentColor" strokeWidth="2" opacity="0.3" />
    <line x1="38" y1="50" x2="26" y2="50" stroke="currentColor" strokeWidth="2" opacity="0.3" />
  </svg>
);

export const MainLayout: React.FC = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { path: routes.molarMass, label: 'Masa Molar', icon: Beaker, color: 'text-neon-amber' },
    { path: routes.converter, label: 'Conversor', icon: TestTubes, color: 'text-neon-cyan' },
    { path: routes.composition, label: 'Composición', icon: Sparkles, color: 'text-neon-green' },
    { path: routes.empirical, label: 'Fórmulas', icon: Atom, color: 'text-neon-purple' },
  ];

  return (
    <div className="min-h-screen text-white font-sans overflow-hidden relative">
      {/* Burbujas de fondo */}
      <Bubbles />
      
      {/* Decoraciones flotantes */}
      <motion.div
        animate={{ y: [0, -30, 0], rotate: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
        className="fixed top-20 right-10 text-cyan-500/20 pointer-events-none z-0 hidden lg:block"
      >
        <Atom size={150} strokeWidth={1} />
      </motion.div>
      
      <motion.div
        animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
        transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
        className="fixed bottom-40 left-5 text-amber-500/15 pointer-events-none z-0 hidden lg:block"
      >
        <FlaskConical size={120} strokeWidth={1} />
      </motion.div>
      
      <motion.div
        animate={{ y: [0, -15, 0], x: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 12, ease: "easeInOut" }}
        className="fixed top-1/3 left-20 text-purple-500/10 pointer-events-none z-0 hidden xl:block"
      >
        <MoleculeDecoration className="w-32 h-32 molecule-spin" />
      </motion.div>

      {/* ═══════════════ NAVBAR ═══════════════ */}
      <nav className="relative z-50 border-b border-white/5">
        <div className="absolute inset-0 bg-lab-dark/80 backdrop-blur-xl" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-20 flex items-center justify-between">
            
            {/* Logo Brand */}
            <Link to="/">
              <motion.div 
                className="flex items-center gap-3 group cursor-pointer select-none"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.div 
                  className="relative"
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="absolute inset-0 bg-neon-amber rounded-2xl blur-lg opacity-50 group-hover:opacity-80 transition-opacity" />
                  <div className="relative bg-gradient-to-br from-amber-400 to-orange-500 p-2.5 rounded-2xl shadow-lg">
                    <FlaskConical className="w-7 h-7 text-lab-dark" strokeWidth={2.5} />
                  </div>
                  <motion.div
                    animate={{ y: [-2, -8, -2], opacity: [0.5, 1, 0.5] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="absolute -top-1 -right-1 w-3 h-3 bg-cyan-400 rounded-full"
                  />
                </motion.div>
                
                <div className="flex flex-col">
                  <span className="text-2xl sm:text-3xl font-bold tracking-tight">
                    <span className="text-gradient-fire">Atom</span>
                    <span className="text-white">Pop</span>
                  </span>
                  <span className="text-[10px] text-slate-500 tracking-widest uppercase hidden sm:block">
                    Laboratorio Químico
                  </span>
                </div>
              </motion.div>
            </Link>

            {/* Menú de navegación - Desktop */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                
                return (
                  <Link key={item.path} to={item.path}>
                    <motion.div
                      className={`nav-link flex items-center gap-2 ${isActive ? 'active' : ''}`}
                      whileHover={{ y: -2 }}
                      whileTap={{ y: 0 }}
                    >
                      <Icon size={18} className={isActive ? 'text-neon-amber' : item.color} />
                      <span>{item.label}</span>
                    </motion.div>
                  </Link>
                );
              })}
            </div>

            {/* Botón menú móvil */}
            <button 
              className="md:hidden p-2 rounded-xl bg-lab-surface/50 text-slate-400 hover:text-white transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Menú móvil */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden absolute top-full left-0 right-0 bg-lab-dark/95 backdrop-blur-xl border-b border-white/5"
          >
            <div className="px-4 py-4 space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                
                return (
                  <Link 
                    key={item.path} 
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <div className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                      isActive 
                        ? 'bg-neon-amber/20 text-neon-amber' 
                        : 'text-slate-400 hover:bg-lab-surface hover:text-white'
                    }`}>
                      <Icon size={20} className={isActive ? 'text-neon-amber' : item.color} />
                      <span className="font-medium">{item.label}</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </nav>

      {/* ═══════════════ CONTENIDO PRINCIPAL ═══════════════ */}
      <main className="relative z-10">
        <Outlet />
      </main>

      {/* ═══════════════ FOOTER ═══════════════ */}
      <footer className="relative z-10 mt-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Izquierda - Autor */}
            <div className="flex items-center gap-2 text-slate-500 text-sm">
              <FlaskConical size={16} className="text-neon-amber" />
              <span>AtomPop/Ruben Contreras © 2025</span>
            </div>
            
            {/* Centro - Versión */}
            <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-800/50 border border-slate-700/50">
              <div className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
              <span className="text-slate-400 text-sm font-mono">
                v0.5.1
              </span>
            </div>
            
            {/* Derecha - Inspiración */}
            <div className="text-slate-600 text-xs">
              Inspirado en el laboratorio del Dr. Flint Lockwood
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
