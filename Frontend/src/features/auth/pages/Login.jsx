import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn, User, Lock } from 'lucide-react';
import Button from '../../../components/Button';
import { useAuth } from '../../../context/AuthContext';
import { motion } from 'framer-motion';
import ToastNotification from '@/components/ToastNotification';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Student');
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState(null);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setToast(null);

    try {
      const user = await login({ email, password, role });
      setToast({ type: 'success', message: `Welcome back, ${user.name}!` });
      const redirectMap = {
        Student: '/student/dashboard',
        Faculty: '/faculty/dashboard',
        Admin: '/admin/dashboard'
      };
      navigate(redirectMap[user.role] || '/dashboard', { replace: true });
    } catch (err) {
      setToast({
        type: 'error',
        message: err.message || 'Unable to login. Please try again.'
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 w-full max-w-md"
      >
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="text-white" size={40} />
          </div>
          <h1 className="text-3xl font-bold text-textPrimary dark:text-white mb-2">
            College App
          </h1>
          <p className="text-textSecondary dark:text-gray-400">
            Smart Campus Management System
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-textPrimary dark:text-white mb-2">
              Role
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-textPrimary dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="Student">Student</option>
              <option value="Faculty">Faculty</option>
              <option value="Admin">Admin</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-textPrimary dark:text-white mb-2">
              Email
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@college.edu"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-textPrimary dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-textPrimary dark:text-white mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-textPrimary dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="rounded" />
              <span className="text-textSecondary dark:text-gray-400">Remember me</span>
            </label>
            <a href="#" className="text-primary hover:underline">
              Forgot password?
            </a>
          </div>

          <Button type="submit" className="w-full" disabled={submitting}>
            {submitting ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Signing In...
              </span>
            ) : (
              <>
                <LogIn size={20} />
                Sign In
              </>
            )}
          </Button>

          <div className="text-center">
            <p className="text-textSecondary dark:text-gray-400 text-sm">
              Don't have an account?{' '}
              <a href="/register" className="text-primary hover:underline font-semibold">
                Register here
              </a>
            </p>
          </div>
        </form>

        {toast && (
          <div className="mt-6">
            <ToastNotification type={toast.type} message={toast.message} onClose={() => setToast(null)} />
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Login;
