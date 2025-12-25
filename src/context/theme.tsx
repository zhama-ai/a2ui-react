/**
 * A2UI Theme Context
 */

import { createContext, useContext, type ReactNode } from 'react';

import { defaultTheme } from '../styles/default-theme';
import type { Theme } from '../types/types';

const ThemeContext = createContext<Theme>(defaultTheme);

export interface ThemeProviderProps {
  theme?: Theme;
  children: ReactNode;
}

export function ThemeProvider({ theme = defaultTheme, children }: ThemeProviderProps) {
  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
}

export function useTheme(): Theme {
  return useContext(ThemeContext);
}

export { ThemeContext };
