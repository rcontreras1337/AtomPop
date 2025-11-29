import { motion } from 'framer-motion';
import { Sparkles, ArrowLeft, Info } from 'lucide-react';
import { Link } from 'react-router-dom';

export const CompositionPage = () => {
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
          <div className="p-3 rounded-2xl bg-neon-green/20 text-neon-green">
            <Sparkles className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              Composición <span className="text-gradient-nature">Porcentual</span>
            </h1>
            <p className="text-slate-400 mt-1">
              Visualiza el porcentaje de masa de cada elemento
            </p>
          </div>
        </div>
      </motion.div>

      {/* Contenido principal */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-6"
      >
        {/* Input */}
        <div className="card-glass p-6" style={{ borderColor: 'rgba(34, 197, 94, 0.3)' }}>
          <label className="block text-sm font-medium text-slate-300 mb-3">
            Fórmula Química
          </label>
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Ej: H2SO4"
              className="input-tube flex-1 text-center text-xl"
            />
            <button className="btn-primary whitespace-nowrap">
              📊 Analizar
            </button>
          </div>
        </div>

        {/* Resultados */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Gráfico circular placeholder */}
          <div className="card-glass p-6">
            <h3 className="text-lg font-bold text-white mb-4 text-center">
              Distribución Visual
            </h3>
            <div className="aspect-square max-w-[300px] mx-auto flex items-center justify-center">
              <div className="w-48 h-48 rounded-full border-4 border-dashed border-slate-600 
                            flex items-center justify-center text-slate-500">
                <span className="text-sm text-center px-4">
                  El gráfico circular aparecerá aquí
                </span>
              </div>
            </div>
          </div>

          {/* Lista de porcentajes */}
          <div className="card-glass p-6">
            <h3 className="text-lg font-bold text-white mb-4 text-center">
              Desglose por Elemento
            </h3>
            <div className="space-y-4">
              {/* Placeholder items */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-slate-700 animate-pulse" />
                <div className="flex-1">
                  <div className="h-3 bg-slate-700 rounded animate-pulse mb-2" />
                  <div className="h-2 bg-slate-800 rounded w-1/2 animate-pulse" />
                </div>
                <div className="text-slate-500">--%</div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-slate-700 animate-pulse" />
                <div className="flex-1">
                  <div className="h-3 bg-slate-700 rounded animate-pulse mb-2" />
                  <div className="h-2 bg-slate-800 rounded w-2/3 animate-pulse" />
                </div>
                <div className="text-slate-500">--%</div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-slate-700 animate-pulse" />
                <div className="flex-1">
                  <div className="h-3 bg-slate-700 rounded animate-pulse mb-2" />
                  <div className="h-2 bg-slate-800 rounded w-1/3 animate-pulse" />
                </div>
                <div className="text-slate-500">--%</div>
              </div>
            </div>
            
            <div className="mt-6 pt-4 border-t border-white/10 text-center">
              <p className="text-slate-500 text-sm flex items-center justify-center gap-2">
                <Info size={14} />
                Ingresa una fórmula para ver los porcentajes
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CompositionPage;

