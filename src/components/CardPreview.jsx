import { useState, useEffect, useRef } from 'react';
import DownloadPopup from './DownloadPopup';
import Popup from './Popup';

const CardPreview = ({ cardData, onThemeChange }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showDownloadPopup, setShowDownloadPopup] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [popup, setPopup] = useState(null);
  
  const cardRef = useRef(null);

  // Simple theme detection
  const isDarkTheme = document.documentElement.classList.contains('dark');
  
  const themes = {
    dark: {
      background: 'bg-gray-900',
      card: 'bg-gray-800 border-gray-700',
      text: 'text-gray-100',
      accent: 'text-blue-400',
      button: 'bg-blue-600 hover:bg-blue-700',
      secondaryButton: 'bg-gray-700 hover:bg-gray-600',
      border: 'border-gray-700'
    },
    light: {
      background: 'bg-gray-50',
      card: 'bg-white border-gray-300',
      text: 'text-gray-800',
      accent: 'text-blue-600',
      button: 'bg-blue-500 hover:bg-blue-600',
      secondaryButton: 'bg-gray-200 hover:bg-gray-300',
      border: 'border-gray-300'
    }
  };

  const currentTheme = isDarkTheme ? themes.dark : themes.light;

  useEffect(() => {
    if (cardData && cardData.name) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [cardData]);

  const showPopup = (message, type = 'info', duration = 3000) => {
    setPopup({ message, type, duration });
  };

  const closePopup = () => {
    setPopup(null);
  };

  // Safe data access with fallbacks
  const safeCardData = cardData || {
    name: '',
    email: '',
    github: '',
    x: '',
    title: ''
  };

  const formattedJSON = JSON.stringify({
    profile: {
      name: safeCardData.name,
      email: safeCardData.email,
      github: safeCardData.github,
      x: safeCardData.x,
      title: safeCardData.title
    },
    meta: {
      generatedAt: new Date().toISOString(),
      theme: isDarkTheme ? 'dark' : 'light',
      version: '1.0'
    }
  }, null, 2);

  const downloadJSON = () => {
    try {
      const blob = new Blob([formattedJSON], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${safeCardData.github || 'developer'}-card.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      showPopup('JSON downloaded successfully!', 'success');
    } catch (error) {
      console.error('Error downloading JSON:', error);
      showPopup('Failed to download JSON', 'error');
    }
  };

  const createSimpleCardImage = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    canvas.width = 800;
    canvas.height = 600;
    
    // Background
    ctx.fillStyle = isDarkTheme ? '#1f2937' : '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Card background
    ctx.fillStyle = isDarkTheme ? '#374151' : '#f3f4f6';
    ctx.roundRect = function (x, y, w, h, r) {
      if (w < 2 * r) r = w / 2;
      if (h < 2 * r) r = h / 2;
      this.beginPath();
      this.moveTo(x + r, y);
      this.arcTo(x + w, y, x + w, y + h, r);
      this.arcTo(x + w, y + h, x, y + h, r);
      this.arcTo(x, y + h, x, y, r);
      this.arcTo(x, y, x + w, y, r);
      this.closePath();
      return this;
    };
    
    ctx.roundRect(40, 40, canvas.width - 80, canvas.height - 80, 20);
    ctx.fillStyle = isDarkTheme ? '#1f2937' : '#ffffff';
    ctx.fill();
    
    // Border
    ctx.strokeStyle = isDarkTheme ? '#4b5563' : '#d1d5db';
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // Content
    ctx.fillStyle = isDarkTheme ? '#ffffff' : '#000000';
    ctx.font = 'bold 32px Arial';
    ctx.fillText(safeCardData.name, 80, 120);
    
    ctx.font = '24px Arial';
    ctx.fillStyle = isDarkTheme ? '#60a5fa' : '#2563eb';
    ctx.fillText(safeCardData.title, 80, 160);
    
    ctx.font = '18px Arial';
    ctx.fillStyle = isDarkTheme ? '#9ca3af' : '#6b7280';
    ctx.fillText(safeCardData.email, 80, 200);
    
    // JSON preview
    ctx.font = '14px monospace';
    ctx.fillStyle = isDarkTheme ? '#10b981' : '#059669';
    
    const jsonLines = formattedJSON.split('\n').slice(0, 10);
    jsonLines.forEach((line, index) => {
      ctx.fillText(line, 80, 260 + (index * 20));
    });
    
    return canvas;
  };

  const downloadPNG = () => {
    setIsDownloading(true);
    
    try {
      const canvas = createSimpleCardImage();
      const link = document.createElement('a');
      link.download = `${safeCardData.github || 'developer'}-card.png`;
      link.href = canvas.toDataURL('image/png', 1.0);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      showPopup('PNG downloaded successfully!', 'success');
    } catch (error) {
      console.error('Error generating PNG:', error);
      showPopup('Failed to generate PNG', 'error');
    } finally {
      setIsDownloading(false);
    }
  };

  const downloadPDF = async () => {
    setIsDownloading(true);
    
    try {
      // Dynamically import jsPDF
      const { jsPDF } = await import('jspdf');
      
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      
      // Set background
      pdf.setFillColor(isDarkTheme ? 31 : 255, isDarkTheme ? 41 : 255, isDarkTheme ? 55 : 255);
      pdf.rect(0, 0, pageWidth, pageHeight, 'F');
      
      // Add content
      pdf.setTextColor(isDarkTheme ? 255 : 0, isDarkTheme ? 255 : 0, isDarkTheme ? 255 : 0);
      pdf.setFontSize(20);
      pdf.setFont('helvetica', 'bold');
      pdf.text(safeCardData.name, 20, 30);
      
      pdf.setFontSize(14);
      pdf.setTextColor(isDarkTheme ? 96 : 37, isDarkTheme ? 165 : 99, isDarkTheme ? 250 : 255);
      pdf.text(safeCardData.title, 20, 45);
      
      pdf.setFontSize(10);
      pdf.setTextColor(isDarkTheme ? 156 : 107, isDarkTheme ? 163 : 114, isDarkTheme ? 175 : 128);
      pdf.text(safeCardData.email, 20, 55);
      
      // Add JSON content
      pdf.setFont('courier');
      pdf.setFontSize(8);
      pdf.setTextColor(isDarkTheme ? 16 : 5, isDarkTheme ? 185 : 159, isDarkTheme ? 129 : 102);
      
      const jsonLines = formattedJSON.split('\n');
      let yPosition = 80;
      const lineHeight = 5;
      
      jsonLines.forEach(line => {
        if (yPosition > pageHeight - 20) {
          pdf.addPage();
          yPosition = 20;
        }
        pdf.text(line, 20, yPosition);
        yPosition += lineHeight;
      });
      
      pdf.save(`${safeCardData.github || 'developer'}-card.pdf`);
      showPopup('PDF downloaded successfully!', 'success');
    } catch (error) {
      console.error('Error generating PDF:', error);
      showPopup('Failed to generate PDF', 'error');
    } finally {
      setIsDownloading(false);
    }
  };

  const handleDownload = (format) => {
    setShowDownloadPopup(false);
    
    switch (format) {
      case 'json':
        downloadJSON();
        break;
      case 'png':
        downloadPNG();
        break;
      case 'pdf':
        downloadPDF();
        break;
      default:
        break;
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(formattedJSON);
      showPopup('Copied to clipboard!', 'success');
    } catch (err) {
      console.error('Failed to copy: ', err);
      showPopup('Failed to copy to clipboard', 'error');
    }
  };

  const shareToX = () => {
    const text = `🚀 Just generated my developer card! Check it out:\n\nName: ${safeCardData.name}\nTitle: ${safeCardData.title}\nGitHub: ${safeCardData.github}\n\n#DeveloperCard #Coding`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  if (!isVisible) {
    return (
      <div className={`w-full p-8 text-center rounded-lg border-2 border-dashed ${currentTheme.border} ${currentTheme.text}`}>
        <div className="animate-pulse">
          <svg className="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <h3 className="text-lg font-semibold mb-2">Card Preview</h3>
          <p className="text-sm opacity-75">Fill out the form to see your developer card</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`w-full transition-all duration-500 ${currentTheme.background} relative`}>
      {/* Popup Components */}
      {popup && (
        <Popup
          message={popup.message}
          type={popup.type}
          duration={popup.duration}
          onClose={closePopup}
        />
      )}

      <DownloadPopup
        isOpen={showDownloadPopup}
        onClose={() => setShowDownloadPopup(false)}
        onFormatSelect={handleDownload}
        isDownloading={isDownloading}
        currentTheme={isDarkTheme ? 'dark' : 'light'}
      />

      {/* Background blur when popup is open */}
      {showDownloadPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm z-40 transition-all duration-300" />
      )}

      {/* JSON Card */}
      <div 
        ref={cardRef}
        className={`relative rounded-xl border-2 ${currentTheme.card} ${currentTheme.border} overflow-hidden transition-all duration-500 ${
          showDownloadPopup ? 'opacity-30' : 'opacity-100'
        }`}
      >
        {/* Card Header */}
        <div className={`flex items-center space-x-4 p-6 border-b ${currentTheme.border} ${
          isDarkTheme ? 'bg-gray-750' : 'bg-gray-50'
        }`}>
          <div className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-xl">
              {safeCardData.name.split(' ').map(n => n[0]).join('').toUpperCase()}
            </span>
          </div>
          <div className="flex-1">
            <h3 className={`font-bold text-xl ${currentTheme.text}`}>{safeCardData.name}</h3>
            <p className={`text-sm ${currentTheme.accent} font-medium`}>{safeCardData.title}</p>
            <p className={`text-xs ${currentTheme.text} opacity-75 mt-1`}>{safeCardData.email}</p>
          </div>
        </div>

        {/* JSON Display */}
        <div className="p-6">
          <pre className={`text-sm font-mono overflow-x-auto rounded-lg p-4 border ${
            isDarkTheme ? 'bg-gray-900 text-green-400 border-gray-700' : 'bg-gray-100 text-green-800 border-gray-300'
          }`}>
            {formattedJSON}
          </pre>
        </div>

        {/* Action Buttons */}
        <div className={`flex flex-wrap gap-3 p-6 border-t ${currentTheme.border} ${
          isDarkTheme ? 'bg-gray-750' : 'bg-gray-50'
        }`}>
          <button
            onClick={() => setShowDownloadPopup(true)}
            disabled={isDownloading}
            className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
              isDownloading ? 'bg-gray-500 cursor-not-allowed' : currentTheme.button
            } text-white hover:scale-105 active:scale-95 shadow-lg`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span>Download</span>
          </button>

          <button
            onClick={copyToClipboard}
            className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
              currentTheme.secondaryButton
            } ${currentTheme.text} hover:scale-105 active:scale-95`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            <span>Copy</span>
          </button>

          <button
            onClick={shareToX}
            className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 rounded-lg font-medium transition-all duration-200 bg-black hover:bg-gray-800 text-white hover:scale-105 active:scale-95 shadow-lg"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
            <span>Share</span>
          </button>
        </div>
      </div>

      {/* Quick Profile Links */}
      {(safeCardData.github || safeCardData.x) && (
        <div className={`mt-6 flex justify-center space-x-4 transition-all duration-300 ${
          showDownloadPopup ? 'opacity-30' : 'opacity-100'
        }`}>
          {safeCardData.github && (
            <a
              href={`https://github.com/${safeCardData.github}`}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                currentTheme.secondaryButton
              } ${currentTheme.text} hover:scale-105 active:scale-95`}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              <span>GitHub</span>
            </a>
          )}
          {safeCardData.x && (
            <a
              href={`https://x.com/${safeCardData.x}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 bg-black hover:bg-gray-800 text-white hover:scale-105 active:scale-95"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
              <span>X</span>
            </a>
          )}
        </div>
      )}
    </div>
  );
};

export default CardPreview;