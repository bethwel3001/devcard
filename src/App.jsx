import { useState, useEffect } from 'react';
import CardForm from './components/CardForm';
import CardPreview from './components/CardPreview';
import ThemeToggle from './components/ThemeToggle';

function App() {
  const [cardData, setCardData] = useState(null);
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const savedTheme = localStorage.getItem('devCard-theme');
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('devCard-theme', theme);
    document.documentElement.className = theme;
  }, [theme]);

  const handleGenerate = (data) => {
    setCardData(data);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      {/* Header with Theme Toggle */}
      <header className={`border-b ${theme === 'dark' ? 'border-gray-800' : 'border-gray-200'}`}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              DevCard Generator
            </h1>
            <ThemeToggle theme={theme} onThemeChange={setTheme} />
          </div>
          <p className={`mt-2 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            Create your professional developer profile card in JSON format
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {/* Form Section */}
          <div className="lg:sticky lg:top-8 h-fit">
            <div className={`rounded-xl border ${
              theme === 'dark' ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'
            } p-6 shadow-sm`}>
              <h2 className={`text-xl font-semibold mb-6 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                Your Information
              </h2>
              <CardForm 
                onGenerate={handleGenerate} 
                currentTheme={theme}
              />
            </div>
          </div>

          {/* Preview Section */}
          <div>
            <div className={`rounded-xl border ${
              theme === 'dark' ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'
            } p-6 shadow-sm`}>
              <h2 className={`text-xl font-semibold mb-6 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                Card Preview
              </h2>
              <CardPreview 
                cardData={cardData} 
                onThemeChange={setTheme}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;