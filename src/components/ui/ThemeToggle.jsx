
import { Moon, Sun } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

const ThemeToggle = () => {
  const { dark, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={dark}
      className="relative flex h-10 w-[76px] shrink-0 items-center rounded-full border border-[var(--border)] bg-[var(--surface-secondary)] p-1 transition-all duration-300 hover:shadow-lg"
    >
      {/* Moving Circle */}
      <span
        className={`absolute left-1 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 via-indigo-500 to-cyan-500 text-white shadow-md transition-transform duration-300 ${
          dark ? "translate-x-9" : "translate-x-0"
        }`}
      >
        {dark ? (
          <Moon size={17} />
        ) : (
          <Sun size={17} />
        )}
      </span>

      {/* Light / Dark Labels */}
      <span
        className={`absolute left-2 text-[10px] font-semibold transition-opacity ${
          dark ? "opacity-0" : "opacity-100"
        }`}
      >
        Light
      </span>

      <span
        className={`absolute right-2 text-[10px] font-semibold transition-opacity ${
          dark ? "opacity-100" : "opacity-0"
        }`}
      >
        Dark
      </span>
    </button>
  );
};

export default ThemeToggle;
