
import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const ThemeContext = createContext(null);

export const ThemeProvider = ({ children }) => {
  const [dark, setDark] = useState(() => {
    const savedTheme = localStorage.getItem("fasco-theme");

    if (savedTheme) {
      return savedTheme === "dark";
    }

    return false;
  });

  useEffect(() => {
    const root = document.documentElement;

    if (dark) {
      root.setAttribute("data-theme", "dark");
      localStorage.setItem("fasco-theme", "dark");
    } else {
      root.setAttribute("data-theme", "light");
      localStorage.setItem("fasco-theme", "light");
    }
  }, [dark]);

  const toggleTheme = () => {
    setDark((previous) => !previous);
  };

  return (
    <ThemeContext.Provider
      value={{
        dark,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used inside ThemeProvider");
  }

  return context;
};
