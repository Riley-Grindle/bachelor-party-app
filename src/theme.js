export const themes = {
  yellowGreen: {
    name: 'Yellow & Green (Original)',
    primary: { DEFAULT: '#fbbf24', light: '#fde047', dark: '#ca8a04' },
    secondary: { DEFAULT: '#1e40af', light: '#3b82f6', dark: '#166534' },
    accent: { DEFAULT: '#fbbf24', light: '#fbbf24', dark: '#d97706' },
  },
  
  bluePurple: {
    name: 'Blue & Purple',
    primary: { DEFAULT: '#3b82f6', light: '#60a5fa', dark: '#2563eb' },
    secondary: { DEFAULT: '#8b5cf6', light: '#a78bfa', dark: '#7c3aed' },
    accent: { DEFAULT: '#ec4899', light: '#f472b6', dark: '#db2777' },
  },
  
  redOrange: {
    name: 'Red & Orange',
    primary: { DEFAULT: '#ef4444', light: '#f87171', dark: '#dc2626' },
    secondary: { DEFAULT: '#f97316', light: '#fb923c', dark: '#ea580c' },
    accent: { DEFAULT: '#fb923c', light: '#fdba74', dark: '#f97316' },
  },
  
  tealCyan: {
    name: 'Teal & Cyan',
    primary: { DEFAULT: '#14b8a6', light: '#5eead4', dark: '#0f766e' },
    secondary: { DEFAULT: '#06b6d4', light: '#22d3ee', dark: '#0891b2' },
    accent: { DEFAULT: '#22d3ee', light: '#67e8f9', dark: '#06b6d4' },
  },

  navyGold: {
    name: 'Navy & Gold',
    primary: { DEFAULT: '#fbbf24', light: '#fbbf24', dark: '#d97706' },
    secondary: { DEFAULT: '#1e3a8a', light: '#3b82f6', dark: '#1e40af' },
    accent: { DEFAULT: '#fbbf24', light: '#fde047', dark: '#ca8a04' },
  },
};

export const currentTheme = themes.navyGold; // CHANGE THIS LINE to switch themes
