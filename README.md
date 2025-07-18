# Cite Unseen - Parking Citation Analytics

A bilingual (English/French) analytics website for visualizing parking citation data.

## Features

- **Homepage**: Welcome page with site overview and navigation
- **Analytics Dashboard**: Interactive charts showing:
  - Citations by Month (Bar Chart)
  - Citations by Type (Doughnut Chart)
  - Key statistics and metrics
- **Language Switcher**: Toggle between English and French
- **Responsive Design**: Works on desktop and mobile devices

## Technology Stack

- **Frontend**: React + Vite
- **Routing**: React Router DOM
- **Charts**: Chart.js with React-ChartJS-2
- **Styling**: CSS with CSS Grid and Flexbox
- **Internationalization**: Custom language context

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open your browser to `http://localhost:5173`

## Project Structure

```
src/
├── components/          # Reusable components
│   ├── Navigation.jsx   # Navigation bar with language switcher
│   └── Navigation.css
├── pages/              # Page components
│   ├── Home.jsx        # Homepage
│   ├── Home.css
│   ├── Analytics.jsx   # Analytics dashboard
│   └── Analytics.css
├── context/            # React contexts
│   └── LanguageContext.jsx  # Language switching functionality
├── assets/             # Static assets
│   └── parking_citations.csv
└── App.jsx             # Main app component
```

## Data

The project currently uses mock data for demonstration. The `parking_citations.csv` file in the assets folder can be used to implement real data visualization.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Future Enhancements

- Load and parse real CSV data
- Add more chart types and visualizations
- Implement data filtering and search
- Add export functionality
- Include map-based visualizations+ Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
