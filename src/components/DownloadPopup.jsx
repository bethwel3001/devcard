import { useEffect } from 'react';

const DownloadPopup = ({ isOpen, onClose, onFormatSelect, isDownloading, currentTheme }) => {
  useEffect(() => {
    if (isOpen) {
      const handleEscape = (e) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const theme = currentTheme === 'dark' 
    ? {
        background: 'bg-gray-800',
        text: 'text-gray-100',
        border: 'border-gray-700',
        button: 'bg-gray-700 hover:bg-gray-600',
      }
    : {
        background: 'bg-white',
        text: 'text-gray-800',
        border: 'border-gray-300',
        button: 'bg-gray-100 hover:bg-gray-200',
      };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className={`rounded-xl border-2 ${theme.background} ${theme.border} ${theme.text} shadow-2xl max-w-md w-full mx-auto animate-scale-in`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Download Format</h3>
            <button
              onClick={onClose}
              className={`p-1 rounded-lg transition-colors ${theme.button}`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <p className="text-sm opacity-75 mb-6">Choose your preferred download format:</p>

          <div className="space-y-3">
            <button
              onClick={() => onFormatSelect('json')}
              disabled={isDownloading}
              className="w-full flex items-center space-x-3 p-4 rounded-lg border border-blue-200 bg-blue-50 hover:bg-blue-100 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed group dark:border-blue-800 dark:bg-blue-900 dark:hover:bg-blue-800"
            >
              <div className="w-10 h-10 rounded-lg bg-blue-500 flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div className="flex-1 text-left">
                <div className="font-semibold text-blue-700 dark:text-blue-300">JSON Format</div>
                <div className="text-xs text-blue-600 dark:text-blue-400">Raw data file for developers</div>
              </div>
            </button>

            <button
              onClick={() => onFormatSelect('png')}
              disabled={isDownloading}
              className="w-full flex items-center space-x-3 p-4 rounded-lg border border-green-200 bg-green-50 hover:bg-green-100 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed group dark:border-green-800 dark:bg-green-900 dark:hover:bg-green-800"
            >
              <div className="w-10 h-10 rounded-lg bg-green-500 flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="flex-1 text-left">
                <div className="font-semibold text-green-700 dark:text-green-300">PNG Image</div>
                <div className="text-xs text-green-600 dark:text-green-400">High-quality screenshot</div>
              </div>
            </button>

            <button
              onClick={() => onFormatSelect('pdf')}
              disabled={isDownloading}
              className="w-full flex items-center space-x-3 p-4 rounded-lg border border-red-200 bg-red-50 hover:bg-red-100 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed group dark:border-red-800 dark:bg-red-900 dark:hover:bg-red-800"
            >
              <div className="w-10 h-10 rounded-lg bg-red-500 flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="flex-1 text-left">
                <div className="font-semibold text-red-700 dark:text-red-300">PDF Document</div>
                <div className="text-xs text-red-600 dark:text-red-400">Printable format</div>
              </div>
            </button>
          </div>

          {isDownloading && (
            <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200 dark:bg-blue-900 dark:border-blue-800">
              <div className="flex items-center space-x-2 text-blue-700 dark:text-blue-300">
                <div className="w-4 h-4 border-2 border-blue-700 dark:border-blue-300 border-t-transparent rounded-full animate-spin" />
                <span className="text-sm font-medium">Processing download...</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DownloadPopup;