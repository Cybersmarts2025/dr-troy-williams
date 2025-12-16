import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Snowflake, PartyPopper, Heart, Clover, Egg, Flower2, Flag, Sun, Ghost, Award, TreeDeciduous, Star, Shield } from 'lucide-react';

type AnimationType = 'snowfall' | 'confetti' | 'hearts' | 'clovers' | 'sparkles' | 'leaves' | 'fireworks' | 'none';

interface SeasonalConfig {
  message: string;
  icon: React.ReactNode;
  bgGradient: string;
  textColor: string;
  showBanner: boolean;
  animationType: AnimationType;
}

// Snowfall animation component
const SnowfallEffect: React.FC = () => {
  const snowflakes = useMemo(() => 
    [...Array(20)].map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 3 + Math.random() * 4,
      size: 6 + Math.random() * 8,
      opacity: 0.4 + Math.random() * 0.4,
    })), []
  );

  return (
    <>
      {snowflakes.map((flake) => (
        <motion.div
          key={flake.id}
          className="absolute pointer-events-none"
          style={{
            left: `${flake.left}%`,
            top: -20,
          }}
          animate={{
            y: [0, 80],
            x: [0, Math.sin(flake.id) * 20],
            opacity: [flake.opacity, flake.opacity, 0],
            rotate: [0, 360],
          }}
          transition={{
            duration: flake.duration,
            repeat: Infinity,
            delay: flake.delay,
            ease: "linear",
          }}
        >
          <Snowflake 
            className="text-white" 
            style={{ width: flake.size, height: flake.size, opacity: flake.opacity }} 
          />
        </motion.div>
      ))}
    </>
  );
};

// Confetti animation component
const ConfettiEffect: React.FC = () => {
  const confetti = useMemo(() => 
    [...Array(25)].map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 3,
      duration: 2 + Math.random() * 2,
      color: ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD'][i % 7],
      size: 4 + Math.random() * 6,
    })), []
  );

  return (
    <>
      {confetti.map((piece) => (
        <motion.div
          key={piece.id}
          className="absolute pointer-events-none"
          style={{
            left: `${piece.left}%`,
            top: -10,
            width: piece.size,
            height: piece.size * 1.5,
            backgroundColor: piece.color,
            borderRadius: '2px',
          }}
          animate={{
            y: [0, 80],
            x: [0, (Math.random() - 0.5) * 40],
            rotate: [0, 360 * (Math.random() > 0.5 ? 1 : -1)],
            opacity: [1, 1, 0],
          }}
          transition={{
            duration: piece.duration,
            repeat: Infinity,
            delay: piece.delay,
            ease: "easeOut",
          }}
        />
      ))}
    </>
  );
};

// Hearts animation component
const HeartsEffect: React.FC = () => {
  const hearts = useMemo(() => 
    [...Array(12)].map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 4,
      duration: 3 + Math.random() * 2,
      size: 8 + Math.random() * 8,
      opacity: 0.3 + Math.random() * 0.4,
    })), []
  );

  return (
    <>
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute pointer-events-none"
          style={{ left: `${heart.left}%`, top: -15 }}
          animate={{
            y: [0, 70],
            opacity: [heart.opacity, heart.opacity, 0],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: heart.duration,
            repeat: Infinity,
            delay: heart.delay,
            ease: "easeInOut",
          }}
        >
          <Heart 
            className="text-pink-200 fill-pink-300" 
            style={{ width: heart.size, height: heart.size }} 
          />
        </motion.div>
      ))}
    </>
  );
};

// Clovers animation component
const CloversEffect: React.FC = () => {
  const clovers = useMemo(() => 
    [...Array(10)].map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 4,
      duration: 4 + Math.random() * 2,
      size: 10 + Math.random() * 8,
      opacity: 0.4 + Math.random() * 0.3,
    })), []
  );

  return (
    <>
      {clovers.map((clover) => (
        <motion.div
          key={clover.id}
          className="absolute pointer-events-none"
          style={{ left: `${clover.left}%`, top: -15 }}
          animate={{
            y: [0, 70],
            rotate: [0, 360],
            opacity: [clover.opacity, clover.opacity, 0],
          }}
          transition={{
            duration: clover.duration,
            repeat: Infinity,
            delay: clover.delay,
            ease: "linear",
          }}
        >
          <Clover 
            className="text-green-200" 
            style={{ width: clover.size, height: clover.size }} 
          />
        </motion.div>
      ))}
    </>
  );
};

// Falling leaves animation component
const LeavesEffect: React.FC = () => {
  const leaves = useMemo(() => 
    [...Array(12)].map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 4,
      duration: 3 + Math.random() * 3,
      size: 10 + Math.random() * 8,
      color: ['#D2691E', '#CD853F', '#8B4513', '#DAA520', '#B8860B'][i % 5],
    })), []
  );

  return (
    <>
      {leaves.map((leaf) => (
        <motion.div
          key={leaf.id}
          className="absolute pointer-events-none"
          style={{ left: `${leaf.left}%`, top: -15 }}
          animate={{
            y: [0, 70],
            x: [0, Math.sin(leaf.id) * 30],
            rotate: [0, 180, 360],
            opacity: [0.7, 0.7, 0],
          }}
          transition={{
            duration: leaf.duration,
            repeat: Infinity,
            delay: leaf.delay,
            ease: "easeInOut",
          }}
        >
          <TreeDeciduous 
            style={{ width: leaf.size, height: leaf.size, color: leaf.color }} 
          />
        </motion.div>
      ))}
    </>
  );
};

// Fireworks/Stars animation for Independence Day
const FireworksEffect: React.FC = () => {
  const stars = useMemo(() => 
    [...Array(15)].map((_, i) => ({
      id: i,
      left: 10 + Math.random() * 80,
      top: 10 + Math.random() * 60,
      delay: Math.random() * 2,
      duration: 1 + Math.random(),
      size: 8 + Math.random() * 10,
      color: i % 3 === 0 ? '#FF0000' : i % 3 === 1 ? '#FFFFFF' : '#0000FF',
    })), []
  );

  return (
    <>
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute pointer-events-none"
          style={{ left: `${star.left}%`, top: `${star.top}%` }}
          animate={{
            scale: [0, 1.5, 0],
            opacity: [0, 1, 0],
            rotate: [0, 180],
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            delay: star.delay,
            ease: "easeOut",
          }}
        >
          <Star 
            className="fill-current"
            style={{ width: star.size, height: star.size, color: star.color }} 
          />
        </motion.div>
      ))}
    </>
  );
};

// Sparkles animation (default festive)
const SparklesEffect: React.FC = () => (
  <>
    {[...Array(8)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-1.5 h-1.5 bg-white/50 rounded-full pointer-events-none"
        style={{
          left: `${10 + i * 12}%`,
          top: '50%'
        }}
        animate={{
          opacity: [0.3, 1, 0.3],
          scale: [1, 1.8, 1],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          delay: i * 0.2,
        }}
      />
    ))}
  </>
);

const getSeasonalConfig = (): SeasonalConfig => {
  const now = new Date();
  const month = now.getMonth();
  const day = now.getDate();

  // December - Christmas/Holiday Season
  if (month === 11) {
    return {
      message: day <= 25 
        ? "🎄 Merry Christmas from Dr. Troy Williams! Wishing you a safe and joyful holiday season. 🎅"
        : "✨ Happy Holidays! Wishing you peace and security as we close out the year. ✨",
      icon: <Snowflake className="h-5 w-5" />,
      bgGradient: "bg-gradient-to-r from-red-700 via-green-700 to-red-700",
      textColor: "text-white",
      showBanner: true,
      animationType: 'snowfall'
    };
  }

  // January - New Year
  if (month === 0) {
    if (day <= 7) {
      return {
        message: "🎉 Happy New Year! May 2026 bring you security, success, and peace of mind. 🎊",
        icon: <PartyPopper className="h-5 w-5" />,
        bgGradient: "bg-gradient-to-r from-yellow-600 via-amber-500 to-yellow-600",
        textColor: "text-white",
        showBanner: true,
        animationType: 'confetti'
      };
    }
    if (day >= 15 && day <= 21) {
      return {
        message: "🕊️ Honoring Dr. Martin Luther King Jr. - A time to reflect on justice and service.",
        icon: <Award className="h-5 w-5" />,
        bgGradient: "bg-gradient-to-r from-blue-800 via-blue-700 to-blue-800",
        textColor: "text-white",
        showBanner: true,
        animationType: 'sparkles'
      };
    }
    // Rest of January - show snowfall
    return {
      message: "❄️ Winter greetings from Dr. Troy Williams! Stay warm and secure. ❄️",
      icon: <Snowflake className="h-5 w-5" />,
      bgGradient: "bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600",
      textColor: "text-white",
      showBanner: true,
      animationType: 'snowfall'
    };
  }

  // February - Valentine's Day
  if (month === 1 && day >= 10 && day <= 14) {
    return {
      message: "💕 Happy Valentine's Day! Sending warmth and appreciation your way. 💕",
      icon: <Heart className="h-5 w-5 text-pink-200" />,
      bgGradient: "bg-gradient-to-r from-pink-600 via-red-500 to-pink-600",
      textColor: "text-white",
      showBanner: true,
      animationType: 'hearts'
    };
  }

  // March - St. Patrick's Day
  if (month === 2 && day >= 14 && day <= 17) {
    return {
      message: "☘️ Happy St. Patrick's Day! May luck and security be on your side. ☘️",
      icon: <Clover className="h-5 w-5 text-green-200" />,
      bgGradient: "bg-gradient-to-r from-green-700 via-emerald-600 to-green-700",
      textColor: "text-white",
      showBanner: true,
      animationType: 'clovers'
    };
  }

  // April - Easter
  if (month === 3 && day >= 1 && day <= 21) {
    return {
      message: "🐣 Happy Easter! Wishing you a wonderful spring season. 🌷",
      icon: <Egg className="h-5 w-5 text-yellow-200" />,
      bgGradient: "bg-gradient-to-r from-purple-500 via-pink-400 to-yellow-400",
      textColor: "text-white",
      showBanner: true,
      animationType: 'confetti'
    };
  }

  // May - Mother's Day / Memorial Day
  if (month === 4) {
    if (day >= 8 && day <= 14) {
      return {
        message: "💐 Happy Mother's Day! Celebrating all the amazing mothers. 💐",
        icon: <Flower2 className="h-5 w-5 text-pink-200" />,
        bgGradient: "bg-gradient-to-r from-pink-500 via-rose-400 to-pink-500",
        textColor: "text-white",
        showBanner: true,
        animationType: 'hearts'
      };
    }
    if (day >= 25 && day <= 31) {
      return {
        message: "🇺🇸 Memorial Day - Honoring those who gave everything for our freedom. 🇺🇸",
        icon: <Flag className="h-5 w-5" />,
        bgGradient: "bg-gradient-to-r from-[#B22234] via-[#3C3B6E] to-[#B22234]",
        textColor: "text-white",
        showBanner: true,
        animationType: 'fireworks'
      };
    }
  }

  // June - Father's Day
  if (month === 5 && day >= 15 && day <= 21) {
    return {
      message: "👔 Happy Father's Day! Celebrating all the great dads out there. 👔",
      icon: <Award className="h-5 w-5" />,
      bgGradient: "bg-gradient-to-r from-blue-700 via-sky-600 to-blue-700",
      textColor: "text-white",
      showBanner: true,
      animationType: 'sparkles'
    };
  }

  // July - Independence Day
  if (month === 6 && day >= 1 && day <= 4) {
    return {
      message: "🇺🇸 Happy Independence Day! Proud to be Protecting America Through Technology™ 🇺🇸",
      icon: <Flag className="h-5 w-5" />,
      bgGradient: "bg-gradient-to-r from-[#B22234] via-white to-[#3C3B6E]",
      textColor: "text-[#3C3B6E]",
      showBanner: true,
      animationType: 'fireworks'
    };
  }

  // September - Labor Day
  if (month === 8 && day >= 1 && day <= 7) {
    return {
      message: "🔧 Happy Labor Day! Honoring the hard work that builds our nation. 🔧",
      icon: <Award className="h-5 w-5" />,
      bgGradient: "bg-gradient-to-r from-blue-800 via-blue-600 to-blue-800",
      textColor: "text-white",
      showBanner: true,
      animationType: 'sparkles'
    };
  }

  // October - Halloween
  if (month === 9 && day >= 24 && day <= 31) {
    return {
      message: "🎃 Happy Halloween! Don't let cyber threats spook you - I'm here to help! 👻",
      icon: <Ghost className="h-5 w-5 text-orange-200" />,
      bgGradient: "bg-gradient-to-r from-orange-600 via-purple-700 to-orange-600",
      textColor: "text-white",
      showBanner: true,
      animationType: 'confetti'
    };
  }

  // November - Veterans Day / Thanksgiving
  if (month === 10) {
    if (day >= 9 && day <= 11) {
      return {
        message: "🎖️ Veterans Day - Thank you to all who have served our great nation. 🇺🇸",
        icon: <Award className="h-5 w-5" />,
        bgGradient: "bg-gradient-to-r from-[#B22234] via-[#3C3B6E] to-[#B22234]",
        textColor: "text-white",
        showBanner: true,
        animationType: 'fireworks'
      };
    }
    if (day >= 20 && day <= 28) {
      return {
        message: "🦃 Happy Thanksgiving! Grateful for the opportunity to help protect you. 🍂",
        icon: <TreeDeciduous className="h-5 w-5 text-orange-200" />,
        bgGradient: "bg-gradient-to-r from-orange-700 via-amber-600 to-orange-700",
        textColor: "text-white",
        showBanner: true,
        animationType: 'leaves'
      };
    }
  }

  // Default - always show a welcome banner
  return {
    message: "🛡️ Welcome! Dr. Troy Williams is available via phone and email for consulting and media inquiries.",
    icon: <Shield className="h-5 w-5" />,
    bgGradient: "bg-gradient-to-r from-[#3C3B6E] via-[#B22234] to-[#3C3B6E]",
    textColor: "text-white",
    showBanner: true,
    animationType: 'sparkles'
  };
};

const AnimationRenderer: React.FC<{ type: AnimationType }> = ({ type }) => {
  switch (type) {
    case 'snowfall':
      return <SnowfallEffect />;
    case 'confetti':
      return <ConfettiEffect />;
    case 'hearts':
      return <HeartsEffect />;
    case 'clovers':
      return <CloversEffect />;
    case 'leaves':
      return <LeavesEffect />;
    case 'fireworks':
      return <FireworksEffect />;
    case 'sparkles':
      return <SparklesEffect />;
    default:
      return null;
  }
};

const SeasonalBanner: React.FC = () => {
  const config = getSeasonalConfig();

  if (!config.showBanner) {
    return null;
  }

  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`${config.bgGradient} ${config.textColor} py-3 px-4 text-center relative overflow-hidden fixed top-0 left-0 right-0 z-[60]`}
      id="seasonal-banner"
    >
      {/* Animated effects based on holiday */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <AnimationRenderer type={config.animationType} />
      </div>

      <div className="container mx-auto flex items-center justify-center gap-3 relative z-10">
        <motion.span
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {config.icon}
        </motion.span>
        <span className="font-medium text-sm md:text-base drop-shadow-sm">
          {config.message}
        </span>
        <motion.span
          animate={{ rotate: [0, -10, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {config.icon}
        </motion.span>
      </div>
    </motion.div>
  );
};

export default SeasonalBanner;
