import { Bell, User, Moon, Sun, Menu } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

const Navbar = ({ toggleSidebar }) => {
  const { isDark, toggleTheme } = useTheme();
  const { user } = useAuth();

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md px-6 py-4 flex items-center justify-between sticky top-0 z-30">
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="lg:hidden text-gray-600 dark:text-gray-300 hover:text-primary"
        >
          <Menu size={24} />
        </button>
        <h1 className="text-2xl font-bold text-primary">College App</h1>
      </div>

      <div className="flex items-center gap-4">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300"
        >
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 relative"
        >
          <Bell size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-error rounded-full"></span>
        </motion.button>

        <div className="flex items-center gap-2 pl-4 border-l border-gray-300 dark:border-gray-600">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-semibold">
            {user?.name?.charAt(0) || 'U'}
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-semibold text-gray-800 dark:text-white">
              {user?.name || 'User'}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {user?.role || 'Student'}
            </p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
