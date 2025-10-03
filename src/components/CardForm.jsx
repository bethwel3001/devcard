import { useState } from 'react';

const CardForm = ({ onGenerate, currentTheme }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    github: '',
    x: '',
    title: ''
  });

  const [errors, setErrors] = useState({});
  const [isGenerating, setIsGenerating] = useState(false);

  const theme = currentTheme === 'dark' 
    ? {
        input: 'bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500',
        label: 'text-gray-200',
        button: 'bg-blue-600 hover:bg-blue-700 text-white',
        error: 'text-red-400',
        container: 'bg-gray-800 border-gray-700'
      }
    : {
        input: 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500',
        label: 'text-gray-700',
        button: 'bg-blue-500 hover:bg-blue-600 text-white',
        error: 'text-red-600',
        container: 'bg-white border-gray-200'
      };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.github.trim()) newErrors.github = 'GitHub username is required';
    if (!formData.title.trim()) newErrors.title = 'Title is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsGenerating(true);
    
    setTimeout(() => {
      onGenerate({
        name: formData.name.trim(),
        email: formData.email.trim(),
        github: formData.github.trim(),
        x: formData.x.trim(),
        title: formData.title.trim()
      });
      setIsGenerating(false);
    }, 800);
  };

  const updateField = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 gap-6">
        {/* Name Field */}
        <div className="animate-fade-in-up" style={{ animationDelay: '0ms' }}>
          <label className={`block text-sm font-medium mb-3 ${theme.label}`}>
            <div className="flex items-center space-x-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span>Full Name *</span>
            </div>
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => updateField('name', e.target.value)}
            className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 ${theme.input}`}
            placeholder="Be Tu"
          />
          {errors.name && <p className={`text-sm mt-2 flex items-center space-x-1 ${theme.error}`}>
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <span>{errors.name}</span>
          </p>}
        </div>

        {/* Email Field */}
        <div className="animate-fade-in-up" style={{ animationDelay: '50ms' }}>
          <label className={`block text-sm font-medium mb-3 ${theme.label}`}>
            <div className="flex items-center space-x-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>Email Address *</span>
            </div>
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => updateField('email', e.target.value)}
            className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 ${theme.input}`}
            placeholder="betu@nextspace.com"
          />
          {errors.email && <p className={`text-sm mt-2 flex items-center space-x-1 ${theme.error}`}>
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <span>{errors.email}</span>
          </p>}
        </div>

        {/* Title Field */}
        <div className="animate-fade-in-up" style={{ animationDelay: '100ms' }}>
          <label className={`block text-sm font-medium mb-3 ${theme.label}`}>
            <div className="flex items-center space-x-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>Job Title *</span>
            </div>
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => updateField('title', e.target.value)}
            className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 ${theme.input}`}
            placeholder="Senior Fronted Developer"
          />
          {errors.title && <p className={`text-sm mt-2 flex items-center space-x-1 ${theme.error}`}>
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <span>{errors.title}</span>
          </p>}
        </div>

        {/* GitHub Field */}
        <div className="animate-fade-in-up" style={{ animationDelay: '150ms' }}>
          <label className={`block text-sm font-medium mb-3 ${theme.label}`}>
            <div className="flex items-center space-x-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              <span>GitHub Username *</span>
            </div>
          </label>
          <input
            type="text"
            value={formData.github}
            onChange={(e) => updateField('github', e.target.value)}
            className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 ${theme.input}`}
            placeholder="bethwel3001"
          />
          {errors.github && <p className={`text-sm mt-2 flex items-center space-x-1 ${theme.error}`}>
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <span>{errors.github}</span>
          </p>}
        </div>

        {/* X Field */}
        <div className="animate-fade-in-up" style={{ animationDelay: '200ms' }}>
          <label className={`block text-sm font-medium mb-3 ${theme.label}`}>
            <div className="flex items-center space-x-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
              <span>X Username (optional)</span>
            </div>
          </label>
          <input
            type="text"
            value={formData.x}
            onChange={(e) => updateField('x', e.target.value)}
            className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 ${theme.input}`}
            placeholder="am_kiplagat"
          />
        </div>
      </div>

      {/* Generate Button */}
      <div className="animate-fade-in-up" style={{ animationDelay: '250ms' }}>
        <button
          type="submit"
          disabled={isGenerating}
          className={`w-full py-4 px-6 rounded-lg font-semibold text-lg transition-all duration-300 flex items-center justify-center space-x-3 ${
            isGenerating 
              ? 'bg-blue-500 cursor-not-allowed' 
              : `${theme.button} hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] shadow-lg`
          }`}
        >
          {isGenerating ? (
            <>
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin" />
                <span className="animate-pulse">Generating Card...</span>
              </div>
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span>Generate Card</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default CardForm;