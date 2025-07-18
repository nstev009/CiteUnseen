import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import './Home.css';

const Home = () => {
  const { t } = useLanguage();

  return (
    <div className="home">
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">{t.home.title}</h1>
          <h2 className="hero-subtitle">{t.home.subtitle}</h2>
          <p className="hero-description">
            {t.home.description}
          </p>
          
          <div className="hero-actions">
            <Link to="/analytics" className="btn btn-primary">
              {t.home.getStarted}
            </Link>
          </div>
        </div>
      </div>
      
      <div className="features-section">
        <div className="container">
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon"><img src='src/assets/graph_icon.jpg' alt='Graph Icon' /></div>
              <h3>Interactive Charts</h3>
              <p>Visualize parking citation data with dynamic and interactive charts.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon"><img src='src/assets/graph_2.jpg' alt='Graph Icon' /></div>
              <h3>Trend Analysis</h3>
              <p>Identify patterns and trends in parking citations over time.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon"><img src='src/assets/map.jpg' alt='Graph Icon' /></div>
              <h3>Location Insights</h3>
              <p>Discover citation hotspots and geographical patterns.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
