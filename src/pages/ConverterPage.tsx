import { motion } from 'framer-motion';
import { TestTubes, ArrowLeft, Info } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ConverterPage = () => {
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
          <div className="p-3 rounded-2xl bg-neon-cyan/20 text-neon-cyan">
            <TestTubes className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              <span className="text-gradient-ocean">Conversor</span> de Unidades
            </h1>
            <p className="text-slate-400 mt-1">
              Convierte entre moles, gramos y partículas
            </p>
          </div>
        </div>
      </motion.div>

      {/* Contenido principal */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="card-glass-cyan p-8"
      >
        {/* Input de compuesto */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-slate-300 mb-3">
            Compuesto de referencia
          </label>
          <input
            type="text"
            placeholder="Ej: H2O, NaCl"
            className="input-tube text-center text-xl"
          />
        </div>

        {/* Tres inputs de conversión */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* Moles */}
          <div className="text-center">
            <div className="card-glass p-6">
              <label className="block text-neon-cyan font-bold text-lg mb-3">
                MOLES
              </label>
              <input
                type="number"
                placeholder="0"
                className="w-full bg-transparent border-b-2 border-neon-cyan/30 
                         focus:border-neon-cyan text-center text-3xl font-bold 
                         text-white outline-none py-2"
              />
              <span className="text-slate-500 text-sm mt-2 block">mol</span>
            </div>
          </div>

          {/* Gramos */}
          <div className="text-center">
            <div className="card-glass p-6">
              <label className="block text-neon-amber font-bold text-lg mb-3">
                GRAMOS
              </label>
              <input
                type="number"
                placeholder="0"
                className="w-full bg-transparent border-b-2 border-neon-amber/30 
                         focus:border-neon-amber text-center text-3xl font-bold 
                         text-white outline-none py-2"
              />
              <span className="text-slate-500 text-sm mt-2 block">g</span>
            </div>
          </div>

          {/* Partículas */}
          <div className="text-center">
            <div className="card-glass p-6">
              <label className="block text-neon-purple font-bold text-lg mb-3">
                PARTÍCULAS
              </label>
              <input
                type="text"
                placeholder="0"
                className="w-full bg-transparent border-b-2 border-neon-purple/30 
                         focus:border-neon-purple text-center text-3xl font-bold 
                         text-white outline-none py-2"
              />
              <span className="text-slate-500 text-sm mt-2 block">moléculas/átomos</span>
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="text-center text-slate-500 text-sm flex items-center justify-center gap-2">
          <Info size={14} />
          Escribe en cualquier campo y los otros se calcularán automáticamente
        </div>

        {/* Constantes */}
        <div className="mt-8 pt-8 border-t border-white/10 text-center">
          <p className="text-slate-400 text-sm">
            Número de Avogadro: <span className="text-neon-cyan font-mono">6.022 × 10²³</span>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default ConverterPage;

