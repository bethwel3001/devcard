import { useEffect } from 'react';

const Popup = ({ message, type = 'info', onClose, duration = 3000 }) => {
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const getIcon = () => {
    switch (type) {
      case 'success':
        return (
          <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        );
      case 'error':
        return (
          <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
        );
      case 'warning':
        return (
          <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        );
      case 'loading':
        return (
          <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
        );
      default:
        return (
          <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
        );
    }
  };

  const getStyles = (isDark) => {
    const base = "fixed top-4 left-1/2 transform -translate-x-1/2 z-50 rounded-lg border shadow-xl px-6 py-4 transition-all duration-300 animate-fade-in-up max-w-sm w-full mx-4";
    
    switch (type) {
      case 'success':
        return `${base} ${isDark ? 'bg-green-900/90 border-green-700 text-green-100' : 'bg-green-50 border-green-200 text-green-800'}`;
      case 'error':
        return `${base} ${isDark ? 'bg-red-900/90 border-red-700 text-red-100' : 'bg-red-50 border-red-200 text-red-800'}`;
      case 'warning':
        return `${base} ${isDark ? 'bg-yellow-900/90 border-yellow-700 text-yellow-100' : 'bg-yellow-50 border-yellow-200 text-yellow-800'}`;
      case 'loading':
        return `${base} ${isDark ? 'bg-blue-900/90 border-blue-700 text-blue-100' : 'bg-blue-50 border-blue-200 text-blue-800'}`;
      default:
        return `${base} ${isDark ? 'bg-gray-800 border-gray-600 text-gray-100' : 'bg-white border-gray-300 text-gray-800'}`;
    }
  };

  return (
    <div className={getStyles(document.documentElement.classList.contains('dark'))}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {getIcon()}
          <span className="font-medium text-sm">{message}</span>
        </div>
        <button
          onClick={onClose}
          className="flex-shrink-0 ml-4 text-gray-400 hover:text-gray-200 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Popup;