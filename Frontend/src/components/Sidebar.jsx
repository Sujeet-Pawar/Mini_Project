import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Calendar,
  FileText,
  Bus,
  ClipboardList,
  Award,
  Clock,
  Trophy,
  User,
  LogOut,
  X
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Sidebar = ({ isOpen, closeSidebar, items }) => {
  const { logout } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const fallbackItems = [
    { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/timetable', icon: Clock, label: 'Timetable' },
    { path: '/attendance', icon: Calendar, label: 'Attendance' },
    { path: '/notes', icon: FileText, label: 'Notes' },
    { path: '/bus-tracking', icon: Bus, label: 'Bus Tracking' },
    { path: '/assignments', icon: ClipboardList, label: 'Assignments' },
    { path: '/results', icon: Award, label: 'Results' },
    { path: '/achievements', icon: Trophy, label: 'Achievements' },
    { path: '/profile', icon: User, label: 'Profile' }
  ];

  const menuItems = items?.length ? items : fallbackItems;

  const handleLogout = async () => {
    if (isLoggingOut) return;
    setIsLoggingOut(true);
    await logout();
    window.location.href = '/login';
  };

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeSidebar}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside
        className={`fixed lg:static top-0 left-0 h-screen w-64 bg-white dark:bg-gray-800 shadow-lg z-50 flex flex-col transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between lg:hidden">
          <h2 className="text-xl font-bold text-primary">Menu</h2>
          <button onClick={closeSidebar} className="text-gray-600 dark:text-gray-300">
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-6">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={closeSidebar}
              className={({ isActive }) =>
                `flex items-center gap-3 px-6 py-3 text-gray-700 dark:text-gray-300 hover:bg-primary/10 hover:text-primary transition-all ${
                  isActive ? 'bg-primary/10 text-primary border-r-4 border-primary font-semibold' : ''
                }`
              }
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-6 py-4 text-error hover:bg-error/10 transition-all border-t border-gray-200 dark:border-gray-700 disabled:opacity-60"
          disabled={isLoggingOut}
        >
          {isLoggingOut ? (
            <>
              <span className="w-4 h-4 border-2 border-error border-t-transparent rounded-full animate-spin" />
              <span>Signing out...</span>
            </>
          ) : (
            <>
              <LogOut size={20} />
              <span>Logout</span>
            </>
          )}
        </button>
      </aside>
    </>
  );
};

export default Sidebar;
