import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, Info, AlertTriangle, X } from 'lucide-react';

const ToastNotification = ({ toasts, removeToast }) => {
  const icons = {
    success: <CheckCircle className="text-success" size={20} />,
    error: <XCircle className="text-error" size={20} />,
    info: <Info className="text-primary" size={20} />,
    warning: <AlertTriangle className="text-accent" size={20} />,
  };

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4 flex items-center gap-3 min-w-[300px]"
          >
            {icons[toast.type]}
            <p className="flex-1 text-sm text-gray-800 dark:text-gray-200">
              {toast.message}
            </p>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <X size={16} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ToastNotification;
