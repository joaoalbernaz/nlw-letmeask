import { ReactNode, createContext, useState, useEffect } from "react";

type ThemeContextProviderProps = {
  children: ReactNode
}

type ThemeContextType = {
  theme: string;
  changeTheme: () => void;
}

export const ThemeContext = createContext({} as ThemeContextType);

export function ThemeContextProvider(props: ThemeContextProviderProps) {

  const [theme, setTheme] = useState<string>(getDefaultThemeBasedOnUserPreferences);

  if (theme) {
    document.body.classList.add(theme);
    
    localStorage.setItem('prefersDarkMode', theme === 'dark' ? 'true' : 'false');
  }

  function getDefaultThemeBasedOnUserPreferences() {
    const prefersDarkMode = localStorage.getItem('prefersDarkMode');
    return prefersDarkMode === 'true' ? 'dark' : 'light';
  }

  function changeTheme(): void {
    setTheme(theme === 'light' ? 'dark' : 'light');
    if (theme) {
      document.body.classList.remove(theme);
    }
  }

  return (
    <ThemeContext.Provider value={{ theme, changeTheme }} >
      { props.children}
    </ThemeContext.Provider>
  )
}