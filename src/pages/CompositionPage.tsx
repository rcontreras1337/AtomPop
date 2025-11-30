import { useState } from 'react';
import { motion } from 'framer-motion';
import { PieChart as PieChartIcon, ArrowLeft, Info, Sparkles, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useComposition, PieChart, CompositionList } from '../features/composition';
import { ChemicalInput } from '../components/ui/ChemicalInput';
import { Button } from '../components/ui/Button';
import type { CompositionElement } from '../utils/chemistryEngine';

// ═══════════════════════════════════════════════════════════════
// CONSTANTES
// ═══════════════════════════════════════════════════════════════

const EXAMPLE_FORMULAS = ['H2O', 'H2SO4', 'C6H12O6', 'NaCl', 'Ca(OH)2'];

// ═══════════════════════════════════════════════════════════════
// COMPONENTE PRINCIPAL
// ═══════════════════════════════════════════════════════════════

export const CompositionPage = () => {
  const {
    formula,
    setFormula,
    result,
    isValid,
    isCalculated,
    error,
    calculate,
    clear,
  } = useComposition();
  
  const [hoveredElement, setHoveredElement] = useState<CompositionElement | null>(null);

  // Usar ejemplo
  const handleUseExample = (example: string) => {
    setFormula(example);
  };

  // Calcular al presionar Enter
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && isValid) {
      calculate();
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
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
            <PieChartIcon className="w-8 h-8" />
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

      {/* Input de fórmula */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="card-glass p-6 mb-8"
        style={{ borderColor: 'rgba(34, 197, 94, 0.3)' }}
      >
        <label className="block text-sm font-medium text-slate-300 mb-3">
          Fórmula Química
        </label>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1" onKeyDown={handleKeyDown}>
            <ChemicalInput
              value={formula}
              onChange={setFormula}
              placeholder="Ej: H2SO4, C6H12O6"
              error={error ?? undefined}
              className="text-center text-xl"
            />
          </div>
          
          <div className="flex gap-2">
            <Button
              onClick={calculate}
              disabled={!isValid}
              className="flex items-center gap-2 whitespace-nowrap"
            >
              <PieChartIcon size={18} />
              Analizar
            </Button>
            
            {isCalculated && (
              <Button
                variant="ghost"
                onClick={clear}
                className="flex items-center gap-2"
              >
                <Trash2 size={18} />
              </Button>
            )}
          </div>
        </div>
        
        {/* Ejemplos */}
        <div className="mt-4 flex flex-wrap gap-2 justify-center">
          <span className="text-slate-500 text-sm">Ejemplos:</span>
          {EXAMPLE_FORMULAS.map((ex) => (
            <button
              key={ex}
              onClick={() => handleUseExample(ex)}
              className="px-3 py-1 text-sm rounded-full bg-slate-700/50 text-slate-300 
                       hover:bg-green-500/20 hover:text-green-400 transition-colors"
            >
              {ex}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Mensaje inicial */}
      {!isCalculated && !error && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16"
        >
          <Sparkles className="w-16 h-16 mx-auto mb-4 text-slate-600" />
          <p className="text-lg text-slate-400">
            Ingresa una fórmula y haz clic en "Analizar"
          </p>
          <p className="text-sm text-slate-500 mt-2">
            Verás un gráfico circular con la composición porcentual
          </p>
        </motion.div>
      )}

      {/* Resultados */}
      {isCalculated && result && result.isValid && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid lg:grid-cols-2 gap-8"
        >
          {/* Gráfico circular */}
          <div className="card-glass p-6">
            <h3 className="text-lg font-bold text-white mb-6 text-center flex items-center justify-center gap-2">
              <PieChartIcon size={20} className="text-green-400" />
              Distribución Visual
            </h3>
            
            <div className="flex justify-center">
              <PieChart
                data={result.elements}
                size={300}
                onSegmentHover={setHoveredElement}
                centerLabel={result.formula}
                centerValue={`${result.totalMass.toFixed(2)} g/mol`}
              />
            </div>
            
            {/* Leyenda compacta */}
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              {result.elements.map((el) => (
                <div 
                  key={el.symbol}
                  className={`
                    flex items-center gap-2 px-3 py-1 rounded-full text-sm
                    transition-all duration-200
                    ${hoveredElement?.symbol === el.symbol 
                      ? 'bg-white/10 scale-105' 
                      : 'bg-slate-800/50'}
                  `}
                >
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: el.color }}
                  />
                  <span className="text-slate-300">{el.symbol}</span>
                  <span className="text-slate-500">{el.percentage.toFixed(1)}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Lista de porcentajes */}
          <div className="card-glass p-6">
            <h3 className="text-lg font-bold text-white mb-6 text-center flex items-center justify-center gap-2">
              <Info size={20} className="text-green-400" />
              Desglose por Elemento
            </h3>
            
            <CompositionList
              data={result.elements}
              totalMass={result.totalMass}
              onItemHover={setHoveredElement}
              highlightedSymbol={hoveredElement?.symbol}
            />
          </div>
        </motion.div>
      )}

      {/* Información educativa */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-8 card-glass p-6"
      >
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Info size={18} className="text-green-400" />
          ¿Cómo se calcula?
        </h3>
        
        <div className="grid md:grid-cols-2 gap-6 text-sm">
          <div className="bg-slate-800/50 rounded-lg p-4">
            <p className="text-slate-400 mb-2">Fórmula:</p>
            <p className="font-mono text-green-400">
              % Elemento = (Masa del elemento / Masa molar total) × 100
            </p>
          </div>
          
          <div className="bg-slate-800/50 rounded-lg p-4">
            <p className="text-slate-400 mb-2">Donde:</p>
            <p className="font-mono text-cyan-400">
              Masa del elemento = Masa atómica × Cantidad en fórmula
            </p>
          </div>
        </div>
        
        <div className="mt-4 text-slate-500 text-sm">
          <p>
            <strong>Ejemplo:</strong> En H₂O, el hidrógeno contribuye 2 × 1.008 = 2.016 g/mol, 
            lo que representa el {((2.016 / 18.015) * 100).toFixed(2)}% de la masa total.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default CompositionPage;
