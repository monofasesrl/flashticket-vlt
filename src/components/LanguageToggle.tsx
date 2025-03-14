import { useI18n } from '../lib/i18n/context';

export function LanguageToggle() {
  const { language, setLanguage } = useI18n();

  const languages = [
    { code: 'it', name: 'Italiano' },
    { code: 'de', name: 'Deutsch' },
    { code: 'en', name: 'English' }
  ];

  const handleLanguageChange = (code: string) => {
    setLanguage(code as 'it' | 'de' | 'en');
    localStorage.setItem('language', code);
  };

  return (
    <div className="relative inline-block text-left">
      <select
        value={language}
        onChange={(e) => handleLanguageChange(e.target.value)}
        className="block w-full px-3 py-2 text-sm font-medium text-gray-500 dark:text-gray-400 
                   bg-transparent border border-gray-300 dark:border-gray-600 rounded-md 
                   focus:outline-none focus:ring-2 focus:ring-purple-500 dark:ring-offset-gray-900
                   hover:bg-gray-100 dark:hover:bg-gray-700"
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.name}
          </option>
        ))}
      </select>
    </div>
  );
}
