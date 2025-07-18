import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Navigation from './components/Navigation';
import { LanguageProvider } from './context/LanguageContext';
import Analytics from './pages/Analytics';
import Home from './pages/Home';

function App() {
  return (
    <LanguageProvider>
      <Router>
        <div className="App">
          <Navigation />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/analytics" element={<Analytics />} />
            </Routes>
          </main>
        </div>
      </Router>
    </LanguageProvider>
  );
}

export default App
