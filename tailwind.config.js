/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
          foreground: "hsl(var(--destructive-foreground) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        club: {
          bg: '#0A0A0F',
          dark: '#050508',
          card: '#111118',
          gold: '#D4A853',
          pink: '#FF2D7B',
          gray: '#8A8A9E',
        },
      },
      fontFamily: {
        oswald: ['Oswald', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        xl: "calc(var(--radius) + 4px)",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xs: "calc(var(--radius) - 6px)",
      },
      boxShadow: {
        xs: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        'neon-gold': '0 0 20px rgba(212, 168, 83, 0.3), 0 0 40px rgba(212, 168, 83, 0.15)',
        'neon-pink': '0 0 20px rgba(255, 45, 123, 0.3), 0 0 40px rgba(255, 45, 123, 0.15)',
        'card-hover-gold': '0 8px 32px rgba(212, 168, 83, 0.2), 0 0 60px rgba(212, 168, 83, 0.1)',
        'card-hover-pink': '0 8px 32px rgba(255, 45, 123, 0.2), 0 0 60px rgba(255, 45, 123, 0.1)',
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
        "glitch-1": {
          "0%, 100%": { clipPath: "inset(0 0 85% 0)", transform: "translateX(-4px)" },
          "20%": { clipPath: "inset(15% 0 60% 0)", transform: "translateX(4px)" },
          "40%": { clipPath: "inset(50% 0 30% 0)", transform: "translateX(-4px)" },
          "60%": { clipPath: "inset(70% 0 10% 0)", transform: "translateX(4px)" },
          "80%": { clipPath: "inset(35% 0 45% 0)", transform: "translateX(-2px)" },
        },
        "glitch-2": {
          "0%, 100%": { clipPath: "inset(85% 0 0 0)", transform: "translateX(4px)" },
          "20%": { clipPath: "inset(60% 0 15% 0)", transform: "translateX(-4px)" },
          "40%": { clipPath: "inset(30% 0 50% 0)", transform: "translateX(4px)" },
          "60%": { clipPath: "inset(10% 0 70% 0)", transform: "translateX(-4px)" },
          "80%": { clipPath: "inset(45% 0 35% 0)", transform: "translateX(2px)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.8" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "shimmer": {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "caret-blink": "caret-blink 1.25s ease-out infinite",
        "glitch-1": "glitch-1 0.8s ease-in-out",
        "glitch-2": "glitch-2 0.8s ease-in-out 0.05s",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "float": "float 3s ease-in-out infinite",
        "shimmer": "shimmer 3s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}