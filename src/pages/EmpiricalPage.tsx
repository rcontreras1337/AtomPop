import { motion } from 'framer-motion';
import { Atom, ArrowLeft, Lightbulb, Trash2, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { 
  useEmpiricalFormula, 
  useMolecularFormula, 
  ElementInputList, 
  StepsDisplay 
} from '../features/empirical';
import { ChemicalInput } from '../components/ui/ChemicalInput';
import { Button } from '../components/ui/Button';

// ═══════════════════════════════════════════════════════════════
// TIPOS
// ═══════════════════════════════════════════════════════════════

type Mode = 'empirical' | 'molecular';

// ═══════════════════════════════════════════════════════════════
// COMPONENTE PRINCIPAL
// ═══════════════════════════════════════════════════════════════

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
          <div className="p-3 rounded-2xl bg-purple-500/20 text-purple-400">
            <Atom className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              Fórmula <span className="text-purple-400">Empírica</span> y{' '}
              <span className="text-pink-400">Molecular</span>
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
              ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/30'
              : 'bg-slate-800 text-slate-400 hover:text-white'
          }`}
          data-testid="tab-empirical"
        >
          📊 Desde Porcentajes
        </button>
        <button
          onClick={() => setMode('molecular')}
          className={`flex-1 py-3 px-6 rounded-xl font-bold transition-all ${
            mode === 'molecular'
              ? 'bg-pink-500 text-white shadow-lg shadow-pink-500/30'
              : 'bg-slate-800 text-slate-400 hover:text-white'
          }`}
          data-testid="tab-molecular"
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

// ═══════════════════════════════════════════════════════════════
// MODO 1: FÓRMULA EMPÍRICA DESDE PORCENTAJES
// ═══════════════════════════════════════════════════════════════

const EmpiricalMode = () => {
  const {
    elements,
    addElement,
    removeElement,
    updateElement,
    totalPercentage,
    isValidTotal,
    canCalculate,
    validationError,
    calculate,
    result,
    isCalculated,
    clear,
    loadExample,
  } = useEmpiricalFormula();

  return (
    <div className="space-y-6">
      <div className="card-glass p-6" style={{ borderColor: 'rgba(168, 85, 247, 0.3)' }}>
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold text-white">
            Ingresa los elementos y sus porcentajes de masa
          </h3>
          <button
            onClick={loadExample}
            className="text-sm text-purple-400 hover:text-purple-300 flex items-center gap-1"
          >
            <Lightbulb size={14} />
            Cargar ejemplo
          </button>
        </div>

        {/* Lista de elementos */}
        <ElementInputList
          elements={elements}
          onAdd={addElement}
          onRemove={removeElement}
          onUpdate={updateElement}
          totalPercentage={totalPercentage}
          isValidTotal={isValidTotal}
          canRemove={elements.length > 2}
        />

        {/* Error de validación */}
        {validationError && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 p-3 rounded-lg bg-red-500/20 border border-red-500/30 flex items-center gap-2 text-red-400"
          >
            <AlertCircle size={18} />
            <span>{validationError}</span>
          </motion.div>
        )}

        {/* Botones */}
        <div className="mt-6 flex gap-4 justify-center">
          <Button
            onClick={calculate}
            disabled={!canCalculate}
            className="flex items-center gap-2"
          >
            🧮 Calcular Fórmula Empírica
          </Button>
          
          {(elements.some(e => e.symbol || e.percentage) || isCalculated) && (
            <Button
              variant="ghost"
              onClick={clear}
              icon={<Trash2 size={16} />}
            >
              Limpiar
            </Button>
          )}
        </div>
      </div>

      {/* Resultado con pasos */}
      {isCalculated && result && result.isValid && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card-glass p-6"
          style={{ borderColor: 'rgba(168, 85, 247, 0.3)' }}
        >
          <StepsDisplay steps={result.steps} finalFormula={result.formula} />
        </motion.div>
      )}

      {/* Error de cálculo */}
      {isCalculated && result && !result.isValid && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="p-6 rounded-xl bg-red-500/20 border border-red-500/30 text-center"
        >
          <AlertCircle className="w-12 h-12 mx-auto mb-4 text-red-400" />
          <p className="text-red-400">{result.error}</p>
        </motion.div>
      )}
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
// MODO 2: FÓRMULA MOLECULAR DESDE EMPÍRICA
// ═══════════════════════════════════════════════════════════════

const MolecularMode = () => {
  const {
    empiricalFormula,
    setEmpiricalFormula,
    experimentalMass,
    setExperimentalMass,
    isValidFormula,
    formulaError,
    empiricalMass,
    canCalculate,
    calculate,
    result,
    isCalculated,
    clear,
    loadExample,
  } = useMolecularFormula();

  // Formatear fórmula con subíndices
  const formatFormula = (formula: string): string => {
    const subscripts: { [key: string]: string } = {
      '0': '₀', '1': '₁', '2': '₂', '3': '₃', '4': '₄',
      '5': '₅', '6': '₆', '7': '₇', '8': '₈', '9': '₉',
    };
    return formula.replace(/\d/g, (d) => subscripts[d] || d);
  };

  return (
    <div className="space-y-6">
      <div className="card-glass p-6" style={{ borderColor: 'rgba(236, 72, 153, 0.3)' }}>
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold text-white">
            Calcula la fórmula molecular a partir de la empírica
          </h3>
          <button
            onClick={loadExample}
            className="text-sm text-pink-400 hover:text-pink-300 flex items-center gap-1"
          >
            <Lightbulb size={14} />
            Cargar ejemplo
          </button>
        </div>

        <div className="space-y-6">
          {/* Input fórmula empírica */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Fórmula Empírica
            </label>
            <ChemicalInput
              value={empiricalFormula}
              onChange={setEmpiricalFormula}
              placeholder="Ej: CH2O"
              error={formulaError ?? undefined}
              className="text-center text-xl"
            />
            
            {/* Mostrar masa de empírica */}
            {isValidFormula && empiricalMass && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-2 text-sm text-center text-slate-400"
              >
                Masa de fórmula empírica: <span className="text-pink-400 font-bold">{empiricalMass.toFixed(3)} g/mol</span>
              </motion.p>
            )}
          </div>

          {/* Input masa molar experimental */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Masa Molar Experimental
            </label>
            <div className="relative">
              <input
                type="text"
                inputMode="decimal"
                value={experimentalMass}
                onChange={(e) => setExperimentalMass(e.target.value)}
                placeholder="Ej: 180"
                className="input-tube text-center text-xl pr-20"
                data-testid="experimental-mass-input"
              />
              <span className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-500">
                g/mol
              </span>
            </div>
          </div>

          {/* Botones */}
          <div className="flex gap-4 justify-center">
            <Button
              onClick={calculate}
              disabled={!canCalculate}
              className="flex items-center gap-2"
              style={{ backgroundColor: canCalculate ? '#ec4899' : undefined }}
            >
              🧬 Calcular Fórmula Molecular
            </Button>
            
            {(empiricalFormula || experimentalMass || isCalculated) && (
              <Button
                variant="ghost"
                onClick={clear}
                icon={<Trash2 size={16} />}
              >
                Limpiar
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Resultado */}
      {isCalculated && result && result.isValid && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card-glass p-6"
          style={{ borderColor: 'rgba(236, 72, 153, 0.3)' }}
        >
          {/* Info de cálculo */}
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="p-4 bg-slate-800/50 rounded-xl text-center">
              <p className="text-slate-500 text-sm mb-1">Masa Empírica</p>
              <p className="text-xl font-bold text-purple-400">
                {result.empiricalMass.toFixed(3)} g/mol
              </p>
            </div>
            <div className="p-4 bg-slate-800/50 rounded-xl text-center">
              <p className="text-slate-500 text-sm mb-1">Masa Experimental</p>
              <p className="text-xl font-bold text-pink-400">
                {result.experimentalMass.toFixed(3)} g/mol
              </p>
            </div>
            <div className="p-4 bg-slate-800/50 rounded-xl text-center">
              <p className="text-slate-500 text-sm mb-1">Multiplicador (n)</p>
              <p className="text-xl font-bold text-cyan-400">
                {result.multiplier}
              </p>
            </div>
          </div>

          {/* Explicación */}
          <div className="mb-6 p-4 bg-slate-800/30 rounded-xl text-sm text-slate-400">
            <p className="font-mono">
              n = {result.experimentalMass.toFixed(2)} ÷ {result.empiricalMass.toFixed(2)} = {result.multiplier}
            </p>
            <p className="mt-2">
              La fórmula molecular es {result.multiplier} veces la fórmula empírica
            </p>
          </div>

          {/* Resultado final */}
          <div className="p-6 rounded-xl bg-gradient-to-r from-pink-500/20 to-purple-500/20 border border-pink-500/30 text-center">
            <p className="text-slate-400 mb-2">Fórmula Molecular</p>
            <p className="text-4xl font-bold text-white" data-testid="molecular-result">
              {formatFormula(result.molecularFormula)}
            </p>
            {result.molecularFormula === 'C6H12O6' && (
              <p className="text-sm text-slate-400 mt-2">(Glucosa)</p>
            )}
          </div>
        </motion.div>
      )}

      {/* Error de cálculo */}
      {isCalculated && result && !result.isValid && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="p-6 rounded-xl bg-red-500/20 border border-red-500/30 text-center"
        >
          <AlertCircle className="w-12 h-12 mx-auto mb-4 text-red-400" />
          <p className="text-red-400">{result.error}</p>
        </motion.div>
      )}
    </div>
  );
};

export default EmpiricalPage;
