
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))'
        },
        custom: {
          primary: '#B22234', // Deep American Red
          secondary: '#3C3B6E', // Navy Blue
          accent: '#F97316', // Orange
          background: '#fff',
        },
        'accent-highlight': 'hsl(var(--accent-highlight))',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #B22234 0%, #9B0000 100%)',
        'gradient-secondary': 'linear-gradient(135deg, #3C3B6E 0%, #2F2F53 100%)',
        'gradient-accent': 'linear-gradient(135deg, #F97316 0%, #ea580c 100%)',
        'flag-pattern': 'url("/lovable-uploads/flag-background.jpg")',
        'shield-pattern': 'url("/lovable-uploads/shield-pattern.png")',
        'circuit-pattern': 'url("/lovable-uploads/circuit-pattern.png")',
      },
      boxShadow: {
        'soft-glow': '0 10px 15px -3px rgba(178, 34, 52, 0.2), 0 4px 6px -2px rgba(178, 34, 52, 0.1)',
        'patriotic-glow': '0 0 15px rgba(178, 34, 52, 0.6)',
      },
      dropShadow: {
        'text': '0 2px 4px rgba(0, 0, 0, 0.3)',
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0'
          },
          to: {
            height: 'var(--radix-accordion-content-height)'
          }
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)'
          },
          to: {
            height: '0'
          }
        },
        'color-pulse': {
          '0%, 100%': { backgroundColor: '#B22234' },
          '50%': { backgroundColor: '#9B0000' },
        },
        'flag-wave': {
          '0%': { transform: 'translateX(0) translateY(0)' },
          '25%': { transform: 'translateX(-5px) translateY(5px)' },
          '50%': { transform: 'translateX(0) translateY(0)' },
          '75%': { transform: 'translateX(5px) translateY(-5px)' },
          '100%': { transform: 'translateX(0) translateY(0)' },
        },
        'button-pulse': {
          '0%, 100%': { boxShadow: '0 0 0 rgba(178, 34, 52, 0.4)' },
          '50%': { boxShadow: '0 0 20px rgba(178, 34, 52, 0.6)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'bounce-subtle': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'rotate-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'ripple': {
          '0%': { transform: 'scale(0)', opacity: '1' },
          '100%': { transform: 'scale(4)', opacity: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'color-pulse': 'color-pulse 2s ease-in-out infinite',
        'flag-wave': 'flag-wave 15s ease-in-out infinite',
        'button-pulse': 'button-pulse 2s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'bounce-subtle': 'bounce-subtle 2s ease-in-out infinite',
        'fade-in-up': 'fade-in-up 0.6s ease-out',
        'rotate-slow': 'rotate-slow 15s linear infinite',
        'ripple': 'ripple 0.6s ease-out',
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
