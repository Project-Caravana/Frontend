import React, { useState } from 'react';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';

const Toast = ({ message, type, onClose }) => {
  const [isExiting, setIsExiting] = useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(onClose, 300);
    }, 3000); // Desaparece em 3 segundos

    return () => clearTimeout(timer);
  }, [onClose]);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(onClose, 300);
  };

  const styles = {
    success: 'bg-green-500 text-white',
    error: 'bg-red-500 text-white',
    warning: 'bg-yellow-500 text-white',
    info: 'bg-blue-500 text-white'
  };

  const icons = {
    success: <CheckCircle2 size={20} />,
    error: <AlertCircle size={20} />,
    warning: <AlertCircle size={20} />,
    info: <AlertCircle size={20} />
  };

  return (
    <div
      className={`fixed top-4 right-4 z-50 flex items-center gap-3 px-4 py-3 rounded-lg shadow-2xl ${
        styles[type]
      } ${
        isExiting ? 'animate-slide-out' : 'animate-slide-in'
      } min-w-[300px] max-w-md`}
      style={{
        animation: isExiting 
          ? 'slideOut 0.3s ease-out forwards' 
          : 'slideIn 0.3s ease-out forwards'
      }}
    >
      <div className="flex-shrink-0">{icons[type]}</div>
      <p className="flex-1 font-medium">{message}</p>
      <button
        onClick={handleClose}
        className="flex-shrink-0 hover:bg-white/20 rounded p-1 transition-colors"
      >
        <X size={18} />
      </button>
      <style>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        @keyframes slideOut {
          from {
            transform: translateX(0);
            opacity: 1;
          }
          to {
            transform: translateX(100%);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default Toast;