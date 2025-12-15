import React from 'react';
import { motion } from 'framer-motion';
import { Snowflake, PartyPopper, Heart, Clover, Egg, Flower2, Flag, Sun, Ghost, Award, TreeDeciduous } from 'lucide-react';

interface SeasonalConfig {
  message: string;
  icon: React.ReactNode;
  bgGradient: string;
  textColor: string;
  showBanner: boolean;
}

const getSeasonalConfig = (): SeasonalConfig => {
  const now = new Date();
  const month = now.getMonth(); // 0-indexed
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
      showBanner: true
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
        showBanner: true
      };
    }
    if (day >= 15 && day <= 21) {
      return {
        message: "🕊️ Honoring Dr. Martin Luther King Jr. - A time to reflect on justice and service.",
        icon: <Award className="h-5 w-5" />,
        bgGradient: "bg-gradient-to-r from-blue-800 via-blue-700 to-blue-800",
        textColor: "text-white",
        showBanner: true
      };
    }
  }

  // February - Valentine's Day
  if (month === 1 && day >= 10 && day <= 14) {
    return {
      message: "💕 Happy Valentine's Day! Sending warmth and appreciation your way. 💕",
      icon: <Heart className="h-5 w-5 text-pink-200" />,
      bgGradient: "bg-gradient-to-r from-pink-600 via-red-500 to-pink-600",
      textColor: "text-white",
      showBanner: true
    };
  }

  // March - St. Patrick's Day
  if (month === 2 && day >= 14 && day <= 17) {
    return {
      message: "☘️ Happy St. Patrick's Day! May luck and security be on your side. ☘️",
      icon: <Clover className="h-5 w-5 text-green-200" />,
      bgGradient: "bg-gradient-to-r from-green-700 via-emerald-600 to-green-700",
      textColor: "text-white",
      showBanner: true
    };
  }

  // April - Easter (approximate)
  if (month === 3 && day >= 1 && day <= 21) {
    return {
      message: "🐣 Happy Easter! Wishing you a wonderful spring season. 🌷",
      icon: <Egg className="h-5 w-5 text-yellow-200" />,
      bgGradient: "bg-gradient-to-r from-purple-500 via-pink-400 to-yellow-400",
      textColor: "text-white",
      showBanner: true
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
        showBanner: true
      };
    }
    if (day >= 25 && day <= 31) {
      return {
        message: "🇺🇸 Memorial Day - Honoring those who gave everything for our freedom. 🇺🇸",
        icon: <Flag className="h-5 w-5" />,
        bgGradient: "bg-gradient-to-r from-[#B22234] via-[#3C3B6E] to-[#B22234]",
        textColor: "text-white",
        showBanner: true
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
      showBanner: true
    };
  }

  // July - Independence Day
  if (month === 6 && day >= 1 && day <= 4) {
    return {
      message: "🇺🇸 Happy Independence Day! Proud to be Protecting America Through Technology™ 🇺🇸",
      icon: <Flag className="h-5 w-5" />,
      bgGradient: "bg-gradient-to-r from-[#B22234] via-white to-[#3C3B6E]",
      textColor: "text-[#3C3B6E]",
      showBanner: true
    };
  }

  // September - Labor Day
  if (month === 8 && day >= 1 && day <= 7) {
    return {
      message: "🔧 Happy Labor Day! Honoring the hard work that builds our nation. 🔧",
      icon: <Award className="h-5 w-5" />,
      bgGradient: "bg-gradient-to-r from-blue-800 via-blue-600 to-blue-800",
      textColor: "text-white",
      showBanner: true
    };
  }

  // October - Halloween
  if (month === 9 && day >= 24 && day <= 31) {
    return {
      message: "🎃 Happy Halloween! Don't let cyber threats spook you - I'm here to help! 👻",
      icon: <Ghost className="h-5 w-5 text-orange-200" />,
      bgGradient: "bg-gradient-to-r from-orange-600 via-purple-700 to-orange-600",
      textColor: "text-white",
      showBanner: true
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
        showBanner: true
      };
    }
    if (day >= 20 && day <= 28) {
      return {
        message: "🦃 Happy Thanksgiving! Grateful for the opportunity to help protect you. 🍂",
        icon: <TreeDeciduous className="h-5 w-5 text-orange-200" />,
        bgGradient: "bg-gradient-to-r from-orange-700 via-amber-600 to-orange-700",
        textColor: "text-white",
        showBanner: true
      };
    }
  }

  // Summer default (June-August)
  if (month >= 5 && month <= 7) {
    return {
      message: "☀️ Summer greetings from Dr. Troy Williams! Stay safe online this season.",
      icon: <Sun className="h-5 w-5 text-yellow-200" />,
      bgGradient: "bg-gradient-to-r from-sky-500 via-blue-400 to-sky-500",
      textColor: "text-white",
      showBanner: false // Only show for specific holidays
    };
  }

  // Default - no banner
  return {
    message: "",
    icon: null,
    bgGradient: "",
    textColor: "",
    showBanner: false
  };
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
      className={`${config.bgGradient} ${config.textColor} py-3 px-4 text-center relative overflow-hidden`}
    >
      {/* Animated background sparkles for festive feel */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/30 rounded-full"
            style={{
              left: `${15 + i * 15}%`,
              top: '50%'
            }}
            animate={{
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto flex items-center justify-center gap-3 relative z-10">
        <motion.span
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {config.icon}
        </motion.span>
        <span className="font-medium text-sm md:text-base">
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
