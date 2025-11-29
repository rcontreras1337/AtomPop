import { motion } from 'framer-motion';
import { Beaker, ArrowLeft, Info } from 'lucide-react';
import { Link } from 'react-router-dom';

export const MolarMassPage = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-4"
        >
          <ArrowLeft size={18} />
          <span>Volver al inicio</span>
        </Link>
        
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-neon-amber/20 text-neon-amber">
            <Beaker className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              Calculadora de <span className="text-gradient-fire">Masa Molar</span>
            </h1>
            <p className="text-slate-400 mt-1">
              Ingresa cualquier fórmula química y obtén su masa molar
            </p>
          </div>
        </div>
      </motion.div>

      {/* Contenido principal */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="card-glass-amber p-8"
      >
        {/* Input de fórmula */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-slate-300 mb-3">
            Fórmula Química
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="Ej: H2O, NaCl, C6H12O6, Ca(OH)2"
              className="input-tube text-center text-2xl tracking-wider"
            />
          </div>
          <p className="text-slate-500 text-sm mt-2 flex items-center gap-2">
            <Info size={14} />
            Escribe la fórmula usando mayúsculas para elementos (H, O, Na, Ca)
          </p>
        </div>

        {/* Botón calcular */}
        <div className="text-center mb-8">
          <button className="btn-primary">
            🔬 Calcular Masa Molar
          </button>
        </div>

        {/* Placeholder resultado */}
        <div className="result-display p-8 text-center">
          <p className="text-slate-500 mb-4">
            Ingresa una fórmula para ver el resultado
          </p>
          <div className="text-6xl font-bold text-slate-700">
            ? g/mol
          </div>
        </div>

        {/* Ejemplos rápidos */}
        <div className="mt-8 pt-8 border-t border-white/10">
          <p className="text-slate-400 text-sm mb-4">Prueba con estos ejemplos:</p>
          <div className="flex flex-wrap gap-2">
            {['H2O', 'NaCl', 'H2SO4', 'C6H12O6', 'Ca(OH)2', 'Fe2O3'].map((formula) => (
              <button
                key={formula}
                className="px-4 py-2 rounded-xl bg-lab-surface hover:bg-lab-elevated 
                         text-slate-300 hover:text-white transition-all text-sm font-mono"
              >
                {formula}
              </button>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default MolarMassPage;

