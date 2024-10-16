import { useTheme } from 'next-themes';
import { IoMoonSharp } from "react-icons/io5";
import { ImSun } from "react-icons/im";

function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      {theme === 'light' ? <IoMoonSharp />
: <ImSun />}
    </button>
  );
}

export default ThemeSwitcher;