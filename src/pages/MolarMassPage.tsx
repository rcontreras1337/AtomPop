import { useRef, useCallback, useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Beaker, ArrowLeft, Info, Copy, Check, Trash2, History, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

// Hooks y componentes
import { useMolarMass } from '../features/molar-mass';
import { MassBreakdown } from '../features/molar-mass';
import { ChemicalInput, Button, ResultCard, ResultValue } from '../components';
import { parseFormula } from '../utils/formulaParser';

// Ejemplos de fórmulas
const FORMULA_EXAMPLES = [
  { formula: 'H2O', name: 'Agua' },
  { formula: 'NaCl', name: 'Sal' },
  { formula: 'H2SO4', name: 'Ácido Sulfúrico' },
  { formula: 'C6H12O6', name: 'Glucosa' },
  { formula: 'Ca(OH)2', name: 'Hidróxido de Calcio' },
  { formula: 'Fe2O3', name: 'Óxido de Hierro' },
];

// Hook para debounce de validación
const useDebounce = <T,>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  
  return debouncedValue;
};

export const MolarMassPage = () => {
  const {
    formula,
    setFormula,
    result,
    error,
    state,
    isCalculating,
    calculate,
    clear,
    history,
  } = useMolarMass();

  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Validación en tiempo real con debounce
  const debouncedFormula = useDebounce(formula, 300);

  // Calcular error de validación usando useMemo (no useEffect)
  const validationError = useMemo(() => {
    if (!debouncedFormula.trim()) {
      return null;
    }
    const parsed = parseFormula(debouncedFormula);
    if (!parsed.isValid) {
      return parsed.error || 'Fórmula inválida';
    }
    return null;
  }, [debouncedFormula]);

  // Manejar submit con Enter
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !validationError && formula.trim()) {
      calculate();
    }
  };

  // Copiar resultado al portapapeles
  const copyResult = useCallback(async () => {
    if (!result) return;

    const textToCopy = `${result.formulaNormalized}: ${result.totalMass.toFixed(3)} g/mol`;
    
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Error al copiar:', err);
    }
  }, [result]);

  // Usar una fórmula de ejemplo
  const selectExample = (exampleFormula: string) => {
    setFormula(exampleFormula);
    inputRef.current?.focus();
  };

  // Usar una fórmula del historial
  const selectFromHistory = (historyItem: typeof history[0]) => {
    setFormula(historyItem.formula);
    inputRef.current?.focus();
  };

  // Determinar estado del input
  const inputStatus = {
    error: validationError || error,
    success: state === 'success' && !validationError,
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
          <div className="p-3 rounded-2xl bg-neon-amber/20 text-neon-amber">
            <Beaker className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              Calculadora de <span className="text-gradient-fire">Masa Molar</span>
            </h1>
            <p className="text-slate-400 mt-1">
              Ingresa cualquier fórmula química y obtén su masa molar con desglose
            </p>
          </div>
        </div>
      </motion.div>

      {/* Contenido principal */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="card-glass-amber p-6 md:p-8"
      >
        {/* Input de fórmula */}
        <div className="mb-6">
          <ChemicalInput
            ref={inputRef}
            label="Fórmula Química"
            value={formula}
            onChange={setFormula}
            onKeyDown={handleKeyDown}
            placeholder="Ej: H2O, NaCl, C6H12O6, Ca(OH)2"
            error={validationError || undefined}
            success={inputStatus.success}
            helperText="Usa mayúsculas para elementos (H, O, Na, Ca) y números para subíndices"
            className="text-center text-xl md:text-2xl tracking-wider font-mono"
          />
        </div>

        {/* Botones de acción */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          <Button
            variant="primary"
            size="lg"
            onClick={calculate}
            loading={isCalculating}
            disabled={!formula.trim() || !!validationError}
            icon={<Sparkles size={20} />}
          >
            Calcular Masa Molar
          </Button>
          
          {(formula || result) && (
            <Button
              variant="ghost"
              size="lg"
              onClick={clear}
              icon={<Trash2 size={18} />}
            >
              Limpiar
            </Button>
          )}
        </div>

        {/* Resultado */}
        <AnimatePresence mode="wait">
          {state === 'success' && result && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ type: 'spring', damping: 15 }}
            >
              <ResultCard variant="success" className="mb-6">
                {/* Header del resultado */}
                <div className="flex items-center justify-between mb-4">
                  <div className="text-slate-400 text-sm">
                    Resultado para{' '}
                    <span className="font-mono text-white font-bold text-lg">
                      {result.formulaNormalized}
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={copyResult}
                    icon={copied ? <Check size={16} /> : <Copy size={16} />}
                  >
                    {copied ? 'Copiado!' : 'Copiar'}
                  </Button>
                </div>

                {/* Valor principal */}
                <ResultValue
                  value={result.totalMass.toFixed(3)}
                  unit="g/mol"
                  size="xl"
                />
              </ResultCard>

              {/* Desglose */}
              <ResultCard variant="amber" title="Desglose por Elemento">
                <MassBreakdown
                  breakdown={result.breakdown}
                  totalMass={result.totalMass}
                />
              </ResultCard>
            </motion.div>
          )}

          {state === 'idle' && !result && (
            <motion.div
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="result-display p-8 text-center"
            >
              <div className="flex items-center justify-center gap-2 text-slate-500 mb-4">
                <Info size={18} />
                <p>Ingresa una fórmula para ver el resultado</p>
              </div>
              <div className="text-6xl font-bold text-slate-700">
                ? g/mol
              </div>
            </motion.div>
          )}

          {state === 'error' && error && !result && (
            <motion.div
              key="error"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="result-display p-8 text-center border-danger/30"
            >
              <div className="text-danger text-lg mb-2">
                Error en el cálculo
              </div>
              <div className="text-slate-400">
                {error}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Ejemplos rápidos */}
        <div className="mt-8 pt-8 border-t border-white/10">
          <p className="text-slate-400 text-sm mb-4 flex items-center gap-2">
            <Sparkles size={14} />
            Prueba con estos ejemplos:
          </p>
          <div className="flex flex-wrap gap-2">
            {FORMULA_EXAMPLES.map(({ formula: f, name }) => (
              <motion.button
                key={f}
                onClick={() => selectExample(f)}
                className="px-4 py-2 rounded-xl bg-lab-surface hover:bg-lab-elevated 
                         text-slate-300 hover:text-white transition-all text-sm
                         border border-white/5 hover:border-white/20"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="font-mono font-bold">{f}</span>
                <span className="text-slate-500 ml-2">({name})</span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Historial */}
        <AnimatePresence>
          {history.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-8 pt-8 border-t border-white/10"
            >
              <p className="text-slate-400 text-sm mb-4 flex items-center gap-2">
                <History size={14} />
                Cálculos recientes:
              </p>
              <div className="flex flex-wrap gap-2">
                {history.map((item, index) => (
                  <motion.button
                    key={`${item.formulaNormalized}-${index}`}
                    onClick={() => selectFromHistory(item)}
                    className="px-3 py-2 rounded-xl bg-neon-green/10 hover:bg-neon-green/20 
                             border border-neon-green/20 hover:border-neon-green/40
                             transition-all text-sm group"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="font-mono font-bold text-neon-green">
                      {item.formulaNormalized}
                    </span>
                    <span className="text-slate-400 ml-2 group-hover:text-slate-300">
                      = {item.totalMass.toFixed(2)} g/mol
                    </span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default MolarMassPage;
