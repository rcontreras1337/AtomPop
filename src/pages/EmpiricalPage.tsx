import { motion } from 'framer-motion';
import { Atom, ArrowLeft, Lightbulb, Trash2, AlertCircle, AlertTriangle, Info, Beaker } from 'lucide-react';
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
import { getCompoundInfo, getAlternativeFormulas } from '../data/compounds';

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
    validationMessage,
    suggestedMasses,
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
            
            {/* Advertencia cuando la masa es inválida */}
            {experimentalMass && !canCalculate && validationMessage && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-3 p-4 rounded-xl bg-amber-500/10 border border-amber-500/30"
                data-testid="validation-warning"
              >
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div className="space-y-2">
                    <p className="text-amber-300 text-sm font-medium">
                      {validationMessage}
                    </p>
                    {suggestedMasses.length > 0 && (
                      <div className="text-amber-400/80 text-sm">
                        <span className="font-medium">💡 Valores válidos:</span>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {suggestedMasses.slice(0, 4).map(({ n, mass }) => (
                            <button
                              key={n}
                              onClick={() => setExperimentalMass(mass)}
                              className="px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 
                                         text-amber-300 text-xs font-mono transition-colors"
                            >
                              {mass} g/mol (n={n})
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </div>
          
          {/* Sección educativa */}
          <div className="p-4 bg-slate-800/30 rounded-xl border border-slate-700/50">
            <h4 className="text-sm font-semibold text-slate-300 mb-3 flex items-center gap-2">
              <Info size={16} className="text-pink-400" />
              ¿Cómo funciona?
            </h4>
            <div className="text-sm text-slate-400 space-y-2">
              <p>
                La <strong className="text-white">fórmula molecular</strong> es un múltiplo entero 
                de la <strong className="text-white">fórmula empírica</strong>.
              </p>
              <p className="font-mono bg-lab-surface/50 px-2 py-1 rounded inline-block text-pink-300">
                n = Masa experimental ÷ Masa empírica
              </p>
              <p>
                El multiplicador <strong className="text-white">n</strong> debe ser un número 
                entero (1, 2, 3, 4...).
              </p>
              <div className="mt-2 p-2 bg-lab-surface/30 rounded-lg">
                <span className="text-slate-500">Ejemplo:</span>{' '}
                <span className="text-slate-300">
                  CH₂O (30 g/mol) con 180 g/mol → n = 6 → C₆H₁₂O₆ (glucosa)
                </span>
              </div>
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
            
            {/* Nota de equivalencia si el orden cambió */}
            {result.multiplier === 1 && result.molecularFormula !== empiricalFormula && (
              <div className="mt-3 flex items-center justify-center gap-2 text-sm text-slate-400">
                <div className="relative group">
                  <Info size={14} className="text-slate-500 cursor-help" />
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 
                                  bg-slate-800 rounded-lg text-sm text-slate-300 
                                  opacity-0 group-hover:opacity-100 transition-opacity
                                  w-64 text-left pointer-events-none z-10 shadow-lg">
                    <p className="font-medium text-white mb-1">¿Por qué cambió el orden?</p>
                    <p>Las fórmulas <strong>{formatFormula(empiricalFormula)}</strong> y{' '}
                    <strong>{formatFormula(result.molecularFormula)}</strong> representan 
                    la misma molécula. El orden de las letras es solo una convención de escritura.</p>
                  </div>
                </div>
                <span>Equivalente a {formatFormula(empiricalFormula)}</span>
              </div>
            )}
            
            {/* Nombre del compuesto si es conocido */}
            {getCompoundInfo(result.molecularFormula) && (
              <p className="text-sm text-pink-300 mt-2">
                ({getCompoundInfo(result.molecularFormula)?.name})
              </p>
            )}
          </div>
          
          {/* Tarjeta informativa del compuesto */}
          {getCompoundInfo(result.molecularFormula) && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-4 p-4 bg-slate-800/30 rounded-xl border border-slate-700/50"
              data-testid="compound-info"
            >
              <div className="flex items-start gap-3">
                <Beaker className="w-5 h-5 text-neon-cyan shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium text-white">
                    {getCompoundInfo(result.molecularFormula)?.name}
                  </h4>
                  {getCompoundInfo(result.molecularFormula)?.iupac && (
                    <p className="text-sm text-slate-400">
                      IUPAC: {getCompoundInfo(result.molecularFormula)?.iupac}
                    </p>
                  )}
                  {getCompoundInfo(result.molecularFormula)?.description && (
                    <p className="text-sm text-slate-500 mt-1">
                      {getCompoundInfo(result.molecularFormula)?.description}
                    </p>
                  )}
                  <div className="flex flex-wrap gap-2 mt-2">
                    {getCompoundInfo(result.molecularFormula)?.category && (
                      <span className="inline-block px-2 py-0.5 text-xs rounded-full bg-cyan-500/20 text-cyan-300">
                        {getCompoundInfo(result.molecularFormula)?.category}
                      </span>
                    )}
                    {getAlternativeFormulas(result.molecularFormula).length > 0 && (
                      <span className="inline-block px-2 py-0.5 text-xs rounded-full bg-purple-500/20 text-purple-300">
                        También: {getAlternativeFormulas(result.molecularFormula).map(f => formatFormula(f)).join(', ')}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      )}

      {/* Error de cálculo - Mensaje educativo mejorado */}
      {isCalculated && result && !result.isValid && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="p-6 rounded-xl bg-red-500/10 border border-red-500/30"
          data-testid="calculation-error"
        >
          <div className="flex items-start gap-4">
            <AlertCircle className="w-8 h-8 text-red-400 shrink-0" />
            <div className="space-y-3">
              <h4 className="font-semibold text-red-400">El resultado no es válido</h4>
              <div className="text-slate-300 text-sm whitespace-pre-line">
                {result.error}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default EmpiricalPage;
