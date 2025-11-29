import { motion } from 'framer-motion';
import { Atom, ArrowLeft, Plus, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

type Mode = 'empirical' | 'molecular';

export const EmpiricalPage = () => {
  const [mode, setMode] = useState<Mode>('empirical');

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
          <div className="p-3 rounded-2xl bg-neon-purple/20 text-neon-purple">
            <Atom className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              Fórmula <span className="text-neon-purple">Empírica</span> y{' '}
              <span className="text-neon-pink">Molecular</span>
            </h1>
            <p className="text-slate-400 mt-1">
              Calcula fórmulas desde porcentajes o datos experimentales
            </p>
          </div>
        </div>
      </motion.div>

      {/* Tabs de modo */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="flex gap-2 mb-6"
      >
        <button
          onClick={() => setMode('empirical')}
          className={`flex-1 py-3 px-6 rounded-xl font-bold transition-all ${
            mode === 'empirical'
              ? 'bg-neon-purple text-white shadow-lg shadow-neon-purple/30'
              : 'bg-lab-surface text-slate-400 hover:text-white'
          }`}
        >
          📊 Desde Porcentajes
        </button>
        <button
          onClick={() => setMode('molecular')}
          className={`flex-1 py-3 px-6 rounded-xl font-bold transition-all ${
            mode === 'molecular'
              ? 'bg-neon-pink text-white shadow-lg shadow-neon-pink/30'
              : 'bg-lab-surface text-slate-400 hover:text-white'
          }`}
        >
          🧬 Desde Empírica
        </button>
      </motion.div>

      {/* Contenido según modo */}
      <motion.div
        key={mode}
        initial={{ opacity: 0, x: mode === 'empirical' ? -20 : 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        {mode === 'empirical' ? <EmpiricalMode /> : <MolecularMode />}
      </motion.div>
    </div>
  );
};

// Modo 1: Calcular fórmula empírica desde porcentajes
const EmpiricalMode = () => {
  return (
    <div className="card-glass p-6" style={{ borderColor: 'rgba(168, 85, 247, 0.3)' }}>
      <h3 className="text-lg font-bold text-white mb-6">
        Ingresa los elementos y sus porcentajes de masa
      </h3>

      {/* Lista de elementos */}
      <div className="space-y-4 mb-6">
        {/* Ejemplo de fila */}
        <div className="flex items-center gap-4">
          <select className="bg-lab-surface border border-lab-elevated rounded-xl px-4 py-3 
                          text-white outline-none focus:border-neon-purple">
            <option value="">Elemento</option>
            <option value="C">C - Carbono</option>
            <option value="H">H - Hidrógeno</option>
            <option value="O">O - Oxígeno</option>
            <option value="N">N - Nitrógeno</option>
            <option value="S">S - Azufre</option>
          </select>
          <div className="flex-1 relative">
            <input
              type="number"
              placeholder="0.00"
              className="w-full bg-lab-surface border border-lab-elevated rounded-xl 
                       px-4 py-3 text-white outline-none focus:border-neon-purple text-right pr-12"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500">%</span>
          </div>
          <button className="p-3 rounded-xl bg-danger/20 text-danger hover:bg-danger/30 transition-colors">
            <Trash2 size={18} />
          </button>
        </div>

        {/* Segunda fila de ejemplo */}
        <div className="flex items-center gap-4">
          <select className="bg-lab-surface border border-lab-elevated rounded-xl px-4 py-3 
                          text-white outline-none focus:border-neon-purple">
            <option value="">Elemento</option>
            <option value="C">C - Carbono</option>
            <option value="H">H - Hidrógeno</option>
            <option value="O">O - Oxígeno</option>
          </select>
          <div className="flex-1 relative">
            <input
              type="number"
              placeholder="0.00"
              className="w-full bg-lab-surface border border-lab-elevated rounded-xl 
                       px-4 py-3 text-white outline-none focus:border-neon-purple text-right pr-12"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500">%</span>
          </div>
          <button className="p-3 rounded-xl bg-danger/20 text-danger hover:bg-danger/30 transition-colors">
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      {/* Botón agregar */}
      <button className="w-full py-3 border-2 border-dashed border-lab-elevated rounded-xl 
                       text-slate-400 hover:border-neon-purple hover:text-neon-purple 
                       transition-colors flex items-center justify-center gap-2">
        <Plus size={18} />
        Agregar elemento
      </button>

      {/* Total */}
      <div className="mt-6 p-4 bg-lab-surface/50 rounded-xl flex justify-between items-center">
        <span className="text-slate-400">Total:</span>
        <span className="text-2xl font-bold text-slate-500">0.00%</span>
      </div>

      {/* Botón calcular */}
      <div className="mt-6 text-center">
        <button className="btn-primary">
          🧮 Calcular Fórmula Empírica
        </button>
      </div>

      {/* Resultado placeholder */}
      <div className="mt-8 result-display p-6 text-center">
        <p className="text-slate-500 mb-2">Resultado</p>
        <p className="text-4xl font-bold text-slate-600">?</p>
      </div>
    </div>
  );
};

// Modo 2: Calcular fórmula molecular desde empírica
const MolecularMode = () => {
  return (
    <div className="card-glass p-6" style={{ borderColor: 'rgba(236, 72, 153, 0.3)' }}>
      <h3 className="text-lg font-bold text-white mb-6">
        Calcula la fórmula molecular a partir de la empírica
      </h3>

      <div className="space-y-6">
        {/* Input fórmula empírica */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Fórmula Empírica
          </label>
          <input
            type="text"
            placeholder="Ej: CH2O"
            className="input-tube text-center text-xl"
          />
        </div>

        {/* Input masa molar experimental */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Masa Molar Experimental
          </label>
          <div className="relative">
            <input
              type="number"
              placeholder="Ej: 180"
              className="input-tube text-center text-xl pr-20"
            />
            <span className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-500">
              g/mol
            </span>
          </div>
        </div>

        {/* Botón calcular */}
        <div className="text-center">
          <button className="btn-primary" style={{ backgroundColor: '#ec4899' }}>
            🧬 Calcular Fórmula Molecular
          </button>
        </div>

        {/* Info de cálculo */}
        <div className="grid md:grid-cols-2 gap-4 text-center">
          <div className="p-4 bg-lab-surface/50 rounded-xl">
            <p className="text-slate-500 text-sm">Masa de Empírica</p>
            <p className="text-xl font-bold text-slate-400">-- g/mol</p>
          </div>
          <div className="p-4 bg-lab-surface/50 rounded-xl">
            <p className="text-slate-500 text-sm">Multiplicador (n)</p>
            <p className="text-xl font-bold text-slate-400">--</p>
          </div>
        </div>

        {/* Resultado */}
        <div className="result-display p-6 text-center">
          <p className="text-slate-500 mb-2">Fórmula Molecular</p>
          <p className="text-4xl font-bold text-slate-600">?</p>
        </div>
      </div>
    </div>
  );
};

export default EmpiricalPage;

