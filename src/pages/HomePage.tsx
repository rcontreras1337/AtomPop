import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Calculator, 
  Atom, 
  FlaskConical, 
  ArrowRight, 
  Beaker,
  TestTubes,
  Sparkles,
  Zap
} from 'lucide-react';

// Animaciones
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', damping: 15, stiffness: 100 },
  },
};

const floatVariants = {
  animate: {
    y: [0, -15, 0],
    rotate: [0, 5, -5, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

export const HomePage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      
      {/* ═══════════════ HERO SECTION ═══════════════ */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="text-center py-16 md:py-24 relative"
      >
        {/* Badge superior */}
        <motion.div variants={itemVariants} className="mb-6">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neon-amber/10 border border-neon-amber/30 text-neon-amber text-sm font-medium">
            <Zap size={14} className="animate-pulse" />
            Calculadora de Química Interactiva
          </span>
        </motion.div>

        {/* Título principal */}
        <motion.h1 
          variants={itemVariants}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6"
        >
          <span className="text-white">Química </span>
          <motion.span 
            className="text-gradient-fire inline-block"
            whileHover={{ scale: 1.05, rotate: [-1, 1, -1, 0] }}
            transition={{ duration: 0.3 }}
          >
            Divertida
          </motion.span>
        </motion.h1>

        {/* Subtítulo con emoji */}
        <motion.p 
          variants={itemVariants}
          className="text-xl md:text-2xl text-slate-400 max-w-2xl mx-auto mb-4 leading-relaxed"
        >
          La herramienta definitiva para sobrevivir a los{' '}
          <span className="text-neon-cyan font-semibold">moles</span>,{' '}
          <span className="text-neon-amber font-semibold">masas</span> y{' '}
          <span className="text-neon-green font-semibold">fórmulas</span>{' '}
          sin que te explote la cabeza 🧠💥
        </motion.p>

        {/* Descripción adicional */}
        <motion.p 
          variants={itemVariants}
          className="text-base text-slate-500 max-w-xl mx-auto mb-10"
        >
          Inspirado en el laboratorio del Dr. Flint Lockwood. 
          Cálculos precisos con una interfaz que no te dormirá en clase.
        </motion.p>

        {/* Botones de acción */}
        <motion.div 
          variants={itemVariants}
          className="flex flex-wrap justify-center gap-4"
        >
          <Link to="/masa-molar">
            <motion.button
              className="btn-primary flex items-center gap-3 group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Calculator className="w-5 h-5" />
              <span>Comenzar a Calcular</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </Link>
          
          <motion.button
            className="btn-secondary flex items-center gap-3"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Atom className="w-5 h-5 text-neon-cyan" />
            <span>Ver Tabla Periódica</span>
          </motion.button>
        </motion.div>

        {/* Decoración flotante del hero */}
        <motion.div
          variants={floatVariants}
          animate="animate"
          className="absolute -top-10 right-0 md:right-20 opacity-30 pointer-events-none"
        >
          <div className="relative">
            <FlaskConical size={80} className="text-neon-amber" />
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute -top-2 left-1/2 w-4 h-4 bg-neon-green rounded-full blur-sm"
            />
          </div>
        </motion.div>
      </motion.section>

      {/* ═══════════════ CALCULADORAS ═══════════════ */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="py-12"
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            🧪 Elige tu <span className="text-gradient-ocean">Experimento</span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            Cada calculadora está diseñada para hacerte la vida más fácil. 
            Selecciona una y comienza a experimentar.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <CalculatorCard
            to="/masa-molar"
            icon={<Beaker className="w-8 h-8" />}
            title="Masa Molar"
            description="Ingresa cualquier fórmula química y obtén su masa molar con el desglose completo."
            color="amber"
            examples={['H₂O', 'NaCl', 'C₆H₁₂O₆']}
          />
          
          <CalculatorCard
            to="/conversor"
            icon={<TestTubes className="w-8 h-8" />}
            title="Conversor"
            description="Convierte entre moles, gramos y partículas de forma instantánea."
            color="cyan"
            examples={['Moles ↔ Gramos', 'N° Avogadro']}
          />
          
          <CalculatorCard
            to="/composicion"
            icon={<Sparkles className="w-8 h-8" />}
            title="Composición %"
            description="Visualiza qué porcentaje de masa aporta cada elemento en un compuesto."
            color="green"
            examples={['Gráfico circular', 'Barras de %']}
          />
          
          <CalculatorCard
            to="/formula-empirica"
            icon={<Atom className="w-8 h-8" />}
            title="Fórmula Empírica"
            description="Calcula la fórmula empírica desde porcentajes o la molecular desde la empírica."
            color="purple"
            examples={['% → Empírica', 'Empírica → Molecular']}
          />
        </div>
      </motion.section>

      {/* ═══════════════ SECCIÓN DE CARACTERÍSTICAS ═══════════════ */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        className="py-16"
      >
        <div className="card-glass p-8 md:p-12">
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureItem
              emoji="⚡"
              title="Instantáneo"
              description="Cálculos en tiempo real mientras escribes. Sin esperas."
            />
            <FeatureItem
              emoji="📚"
              title="Educativo"
              description="Muestra el paso a paso para que entiendas el proceso."
            />
            <FeatureItem
              emoji="🎨"
              title="Visual"
              description="Gráficos y animaciones que hacen la química más digerible."
            />
          </div>
        </div>
      </motion.section>

      {/* ═══════════════ ELEMENTO DE EJEMPLO ═══════════════ */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1 }}
        className="py-12"
      >
        <div className="card-glass-cyan p-8 max-w-2xl mx-auto text-center">
          <p className="text-slate-400 text-sm uppercase tracking-wider mb-4">
            Vista previa del resultado
          </p>
          
          <div className="result-display p-8 mb-6">
            <p className="text-slate-400 text-sm mb-2">Masa Molar de H₂SO₄</p>
            <p className="result-value">98.079</p>
            <p className="text-neon-green text-xl mt-2">g/mol</p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-3">
            <ElementBadge symbol="H" count={2} color="#ffffff" />
            <span className="text-slate-500 self-center">+</span>
            <ElementBadge symbol="S" count={1} color="#ffff30" />
            <span className="text-slate-500 self-center">+</span>
            <ElementBadge symbol="O" count={4} color="#ff0d0d" />
          </div>
        </div>
      </motion.section>

    </div>
  );
};

// ═══════════════ COMPONENTES ═══════════════

interface CalculatorCardProps {
  to: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  color: 'amber' | 'cyan' | 'green' | 'purple';
  examples: string[];
}

const CalculatorCard = ({ to, icon, title, description, color, examples }: CalculatorCardProps) => {
  const colorClasses = {
    amber: {
      border: 'hover:border-neon-amber/50',
      icon: 'text-neon-amber',
      glow: 'group-hover:shadow-[0_0_40px_rgba(245,158,11,0.15)]',
      tag: 'bg-neon-amber/10 text-neon-amber',
    },
    cyan: {
      border: 'hover:border-neon-cyan/50',
      icon: 'text-neon-cyan',
      glow: 'group-hover:shadow-[0_0_40px_rgba(6,182,212,0.15)]',
      tag: 'bg-neon-cyan/10 text-neon-cyan',
    },
    green: {
      border: 'hover:border-neon-green/50',
      icon: 'text-neon-green',
      glow: 'group-hover:shadow-[0_0_40px_rgba(34,197,94,0.15)]',
      tag: 'bg-neon-green/10 text-neon-green',
    },
    purple: {
      border: 'hover:border-neon-purple/50',
      icon: 'text-neon-purple',
      glow: 'group-hover:shadow-[0_0_40px_rgba(168,85,247,0.15)]',
      tag: 'bg-neon-purple/10 text-neon-purple',
    },
  };

  const classes = colorClasses[color];

  return (
    <Link to={to}>
      <motion.div
        whileHover={{ y: -5, scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        className={`group card-glass cursor-pointer transition-all duration-300 ${classes.border} ${classes.glow} h-full`}
      >
        <div className="flex items-start gap-4">
          <div className={`p-3 rounded-2xl bg-lab-surface ${classes.icon}`}>
            {icon}
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-gradient-fire transition-all">
              {title}
            </h3>
            <p className="text-slate-400 text-sm mb-4 leading-relaxed">
              {description}
            </p>
            <div className="flex flex-wrap gap-2">
              {examples.map((example, i) => (
                <span key={i} className={`px-2 py-1 rounded-lg text-xs font-medium ${classes.tag}`}>
                  {example}
                </span>
              ))}
            </div>
          </div>
        </div>
        
        {/* Flecha de acción */}
        <div className={`absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity ${classes.icon}`}>
          <ArrowRight size={20} />
        </div>
      </motion.div>
    </Link>
  );
};

interface FeatureItemProps {
  emoji: string;
  title: string;
  description: string;
}

const FeatureItem = ({ emoji, title, description }: FeatureItemProps) => (
  <div className="text-center">
    <div className="text-4xl mb-4">{emoji}</div>
    <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
    <p className="text-slate-400 text-sm">{description}</p>
  </div>
);

interface ElementBadgeProps {
  symbol: string;
  count: number;
  color: string;
}

const ElementBadge = ({ symbol, count, color }: ElementBadgeProps) => (
  <motion.div
    whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
    className="element-badge"
    style={{ 
      backgroundColor: color,
      color: isLightColor(color) ? '#0f172a' : '#ffffff'
    }}
  >
    <span>{symbol}</span>
    {count > 1 && (
      <sub className="text-xs ml-0.5 opacity-80">{count}</sub>
    )}
  </motion.div>
);

// Helper para determinar si un color es claro
const isLightColor = (hex: string): boolean => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5;
};

export default HomePage;

