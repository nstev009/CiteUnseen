import { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

const translations = {
  en: {
    siteTitle: 'Cite Unseen',
    navigation: {
      home: 'Home',
      analytics: 'Analytics'
    },
    home: {
      title: 'Welcome to Cite Unseen',
      subtitle: 'Parking Citation Data Analytics',
      description: 'Explore comprehensive parking citation data through interactive visualizations and insights.',
      getStarted: 'Get Started',
      learnMore: 'Learn More'
    },
    analytics: {
      title: 'Analytics Dashboard',
      citationsByMonth: 'Citations by Month',
      citationsByType: 'Citations by Type',
      totalCitations: 'Total Citations',
      averagePerMonth: 'Average per Month'
    },
    language: {
      switch: 'Switch Language',
      english: 'English',
      french: 'Français'
    }
  },
  fr: {
    siteTitle: 'Cite Invisible',
    navigation: {
      home: 'Accueil',
      analytics: 'Analyses'
    },
    home: {
      title: 'Bienvenue à Cite Invisible',
      subtitle: 'Analyses des Données de Contraventions de Stationnement',
      description: 'Explorez des données complètes de contraventions de stationnement à travers des visualisations interactives et des insights.',
      getStarted: 'Commencer',
      learnMore: 'En Savoir Plus'
    },
    analytics: {
      title: 'Tableau de Bord Analytique',
      citationsByMonth: 'Contraventions par Mois',
      citationsByType: 'Contraventions par Type',
      totalCitations: 'Total des Contraventions',
      averagePerMonth: 'Moyenne par Mois'
    },
    language: {
      switch: 'Changer de Langue',
      english: 'English',
      french: 'Français'
    }
  }
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'fr' : 'en');
  };

  const t = translations[language];

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
