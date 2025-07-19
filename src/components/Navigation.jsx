import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import './Navigation.css';

const Navigation = () => {
  const { language, toggleLanguage, t } = useLanguage();
  const location = useLocation();

  return (
    <nav className="navigation">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <div className='logo' aria-label='logo' />
          <h2>{t.siteTitle}</h2>
        </Link>
        
        <div className="nav-links">
          <Link
            to="/analytics"
            className={`nav-link ${location.pathname === '/analytics' ? 'active' : ''}`}
          >
            {t.navigation.analytics}
          </Link>
        </div>

        <div className="language-switcher">
          <button 
            onClick={toggleLanguage}
            className="language-btn"
            title={t.language.switch}
          >
            {language === 'en' ? 'FR' : 'EN'}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
