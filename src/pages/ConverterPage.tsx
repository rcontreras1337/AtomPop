import { motion } from 'framer-motion';
import { TestTubes, ArrowLeft, Info, Beaker, Scale, Atom, Trash2, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useConverter, ConverterInput } from '../features/converter';
import { Button } from '../components/ui/Button';
import { ChemicalInput } from '../components/ui/ChemicalInput';
import { formatScientific } from '../utils/chemistryEngine';

// ═══════════════════════════════════════════════════════════════
// CONSTANTES
// ═══════════════════════════════════════════════════════════════

const EXAMPLE_FORMULAS = ['H2O', 'NaCl', 'C6H12O6', 'H2SO4', 'CO2'];

// ═══════════════════════════════════════════════════════════════
// COMPONENTE PRINCIPAL
// ═══════════════════════════════════════════════════════════════

export const ConverterPage = () => {
  const {
    formula,
    setFormula,
    molarMass,
    formulaError,
    moles,
    grams,
    particles,
    activeField,
    setMoles,
    setGrams,
    setParticles,
    clear,
    isValid,
    hasValues,
  } = useConverter();

  // Usar un ejemplo
  const handleUseExample = (example: string) => {
    setFormula(example);
    clear();
  };

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
        className="card-glass-cyan p-6 md:p-8"
      >
        {/* Input de compuesto */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-slate-300 mb-3">
            Compuesto de referencia
          </label>
          
          <ChemicalInput
            value={formula}
            onChange={setFormula}
            placeholder="Ej: H2O, NaCl, C6H12O6"
            error={formulaError ?? undefined}
            className="text-center text-xl"
          />
          
          {/* Masa molar */}
          {isValid && molarMass && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-3 flex items-center justify-center gap-2 text-slate-300"
            >
              <Scale size={16} className="text-cyan-400" />
              <span>Masa Molar:</span>
              <span className="font-mono text-cyan-400 font-bold">
                {molarMass.toFixed(3)} g/mol
              </span>
            </motion.div>
          )}
          
          {/* Ejemplos */}
          <div className="mt-4 flex flex-wrap gap-2 justify-center">
            <span className="text-slate-500 text-sm">Ejemplos:</span>
            {EXAMPLE_FORMULAS.map((ex) => (
              <button
                key={ex}
                onClick={() => handleUseExample(ex)}
                className="px-3 py-1 text-sm rounded-full bg-slate-700/50 text-slate-300 
                         hover:bg-cyan-500/20 hover:text-cyan-400 transition-colors"
              >
                {ex}
              </button>
            ))}
          </div>
        </div>

        {/* Mensaje si no hay fórmula */}
        {!formula && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12 text-slate-400"
          >
            <Sparkles className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p className="text-lg">Ingresa un compuesto para comenzar</p>
            <p className="text-sm mt-2">Escribe una fórmula química arriba</p>
          </motion.div>
        )}

        {/* Mensaje si hay error */}
        {formula && formulaError && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500/20 text-red-400">
              <Info size={18} />
              <span>{formulaError}</span>
            </div>
          </motion.div>
        )}

        {/* Tres inputs de conversión */}
        {isValid && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {/* Moles */}
              <ConverterInput
                label="MOLES"
                value={moles}
                unit="mol"
                unitLong="moles"
                icon={<Beaker />}
                onChange={setMoles}
                isActive={activeField === 'moles'}
                isCalculated={activeField !== null && activeField !== 'moles' && moles !== ''}
                color="cyan"
                disabled={!isValid}
              />

              {/* Gramos */}
              <ConverterInput
                label="GRAMOS"
                value={grams}
                unit="g"
                unitLong="gramos"
                icon={<Scale />}
                onChange={setGrams}
                isActive={activeField === 'grams'}
                isCalculated={activeField !== null && activeField !== 'grams' && grams !== ''}
                color="amber"
                disabled={!isValid}
              />

              {/* Partículas */}
              <ConverterInput
                label="PARTÍCULAS"
                value={particles}
                unit="N"
                unitLong="moléculas/átomos"
                icon={<Atom />}
                onChange={setParticles}
                isActive={activeField === 'particles'}
                isCalculated={activeField !== null && activeField !== 'particles' && particles !== ''}
                color="purple"
                disabled={!isValid}
              />
            </div>

            {/* Botón Limpiar */}
            {hasValues && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-center"
              >
                <Button
                  variant="ghost"
                  onClick={clear}
                  className="flex items-center gap-2"
                >
                  <Trash2 size={16} />
                  Limpiar valores
                </Button>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* Info */}
        {isValid && !hasValues && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-slate-500 text-sm flex items-center justify-center gap-2 mt-4"
          >
            <Info size={14} />
            Escribe en cualquier campo y los otros se calcularán automáticamente
          </motion.div>
        )}

        {/* Constantes */}
        <div className="mt-8 pt-8 border-t border-white/10 text-center">
          <p className="text-slate-400 text-sm">
            Número de Avogadro: <span className="text-neon-cyan font-mono">{formatScientific(6.02214076e23)}</span>
          </p>
        </div>
      </motion.div>

      {/* Fórmulas de referencia */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-8 card-glass p-6"
      >
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Info size={18} className="text-cyan-400" />
          Fórmulas de Conversión
        </h3>
        
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div className="bg-slate-800/50 rounded-lg p-4">
            <p className="text-slate-400 mb-2">De moles a gramos:</p>
            <p className="font-mono text-cyan-400">
              gramos = moles × masa molar
            </p>
          </div>
          
          <div className="bg-slate-800/50 rounded-lg p-4">
            <p className="text-slate-400 mb-2">De gramos a moles:</p>
            <p className="font-mono text-amber-400">
              moles = gramos ÷ masa molar
            </p>
          </div>
          
          <div className="bg-slate-800/50 rounded-lg p-4">
            <p className="text-slate-400 mb-2">De moles a partículas:</p>
            <p className="font-mono text-purple-400">
              partículas = moles × N<sub>A</sub>
            </p>
          </div>
          
          <div className="bg-slate-800/50 rounded-lg p-4">
            <p className="text-slate-400 mb-2">De partículas a moles:</p>
            <p className="font-mono text-green-400">
              moles = partículas ÷ N<sub>A</sub>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ConverterPage;
