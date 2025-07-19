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
      dataSource: 'CSV Data',
      dataSourceLabel: 'Data Source',
      showing: 'Showing',
      citations: 'citations',
      loading: 'Loading analytics...',
      noData: 'No data available...',
      filters: {
        title: 'Filters',
        year: 'Year',
        month: 'Month',
        location: 'Location',
        violationType: 'Violation Type',
        carMake: 'Car Make',
        allYears: 'All Years',
        allMonths: 'All Months',
        allLocations: 'All Locations',
        allTypes: 'All Types',
        allMakes: 'All Makes'
      },
      months: {
        january: 'January',
        february: 'February',
        march: 'March',
        april: 'April',
        may: 'May',
        june: 'June',
        july: 'July',
        august: 'August',
        september: 'September',
        october: 'October',
        november: 'November',
        december: 'December'
      },
      stats: {
        totalCitations: 'Total Citations',
        totalFines: 'Total Fines',
        averageFine: 'Average Fine'
      },
      charts: {
        violationFrequency: {
          title: 'Violation Frequency',
          legend: 'Number of citations for each violation type'
        },
        timeSeriesChart: {
          title: 'Citations Over Time',
          citationCount: 'Citation Count',
          totalFines: 'Total Fines ($)',
          citationsTooltip: 'Citations',
          finesLabel: 'Total Fines',
          citationsLegend: 'Number of citations per month',
          finesLegend: 'Total fine amount ($) per month'
        }
      },
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
      dataSource: 'Données CSV',
      dataSourceLabel: 'Source de Données',
      showing: 'Affichage de',
      citations: 'contraventions',
      loading: 'Chargement des analyses...',
      noData: 'Aucune donnée disponible...',
      filters: {
        title: 'Filtres',
        year: 'Année',
        month: 'Mois',
        location: 'Lieu',
        violationType: 'Type de Violation',
        carMake: 'Marque de Voiture',
        allYears: 'Toutes les Années',
        allMonths: 'Tous les Mois',
        allLocations: 'Tous les Lieux',
        allTypes: 'Tous les Types',
        allMakes: 'Toutes les Marques'
      },
      months: {
        january: 'Janvier',
        february: 'Février',
        march: 'Mars',
        april: 'Avril',
        may: 'Mai',
        june: 'Juin',
        july: 'Juillet',
        august: 'Août',
        september: 'Septembre',
        october: 'Octobre',
        november: 'Novembre',
        december: 'Décembre'
      },
      stats: {
        totalCitations: 'Total des Contraventions',
        totalFines: 'Total des Amendes',
        averageFine: 'Amende Moyenne'
      },
      charts: {
        violationFrequency: {
          title: 'Fréquence des Violations',
          legend: 'Nombre de contraventions pour chaque type de violation'
        },
        timeSeriesChart: {
          title: 'Contraventions dans le Temps',
          citationCount: 'Nombre de Contraventions',
          totalFines: 'Total des Amendes ($)',
          citationsTooltip: 'Contraventions',
          finesLabel: 'Total des Amendes',
          citationsLegend: 'Nombre de contraventions par mois',
          finesLegend: 'Montant total des amendes ($) par mois'
        }
      },
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
