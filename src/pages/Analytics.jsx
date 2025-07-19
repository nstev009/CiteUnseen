import Papa from 'papaparse';
import { useEffect, useState } from 'react';
import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { useLanguage } from '../context/LanguageContext';
import './Analytics.css';

const Analytics = () => {
  const { t } = useLanguage();
  const [rawData, setRawData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dataSource, setDataSource] = useState('');
  
  // Filter states
  const [selectedYear, setSelectedYear] = useState('all');
  const [selectedMonth, setSelectedMonth] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedViolationType, setSelectedViolationType] = useState('all');
  const [selectedCarMake, setSelectedCarMake] = useState('all');
  const [timeViewMode, setTimeViewMode] = useState('citations'); // 'citations' or 'fines'

  // Function to clean violation types by removing trailing single letters
  const cleanViolationType = (violation) => {
    if (!violation) return '';
    
    // Remove trailing single letters (like "HANDICAPPED PARKING C" -> "HANDICAPPED PARKING")
    const cleaned = violation.replace(/\s+[A-Z]$/, '').trim();

    return cleaned || violation;
  };

  useEffect(() => {
    // Load and parse CSV data
    const loadCitationData = async () => {
      try {
        setLoading(true);
        const response = await fetch('public\parking_citations.csv');

        if (!response.ok) {
          throw new Error('CSV file not found');
        }
        
        const csvText = await response.text();
        
        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            const data = results.data.filter(row => Object.values(row).some(value => value !== ''));
            
            if (data.length === 0) {
              throw new Error('No valid data in CSV');
            }
            
  // Clean and process the data
  const cleanedData = data.map(row => ({
    plate: row['Data.Number Plate'] || '',
    state: row['Data.State'] || '',
    make: row['Data.Car.Make'] || '',
    style: row['Data.Car.Style'] || '',
    color: row['Data.Car.Color'] || '',
    location: row['Data.Location'] || '',
    violation: cleanViolationType((row['Data.Violation'] || '').trim()),
    fine: parseFloat(row['Data.Fine']) || 0,
    year: parseInt(row['Date.Year']) || 0,
    month: parseInt(row['Date.Month']) || 0,
    day: parseInt(row['Date.Day']) || 0
  }));
            
            setRawData(cleanedData);
            setDataSource(t.analytics.dataSource);
            setLoading(false);
          },
          error: (error) => {
            console.error('Error parsing CSV:', error);
          }
        });
      } catch (error) {
        console.error('Error loading CSV:', error);
      }
    };

    loadCitationData();
  }, [t]);

  // Get unique values for filters
  const getUniqueValues = (field) => {
    const values = [...new Set(rawData.map(item => item[field]))].filter(v => v);
    return values.sort();
  };

  const years = getUniqueValues('year');
  const months = [
    { value: 1, label: t.analytics.months.january }, 
    { value: 2, label: t.analytics.months.february }, 
    { value: 3, label: t.analytics.months.march },
    { value: 4, label: t.analytics.months.april }, 
    { value: 5, label: t.analytics.months.may }, 
    { value: 6, label: t.analytics.months.june },
    { value: 7, label: t.analytics.months.july }, 
    { value: 8, label: t.analytics.months.august }, 
    { value: 9, label: t.analytics.months.september },
    { value: 10, label: t.analytics.months.october }, 
    { value: 11, label: t.analytics.months.november }, 
    { value: 12, label: t.analytics.months.december }
  ];
  const locations = getUniqueValues('location');
  const violationTypes = getUniqueValues('violation');
  const carMakes = getUniqueValues('make');

  // Filter data based on current selections
  const getFilteredData = () => {
    return rawData.filter(item => {
      return (selectedYear === 'all' || item.year === parseInt(selectedYear)) &&
             (selectedMonth === 'all' || item.month === parseInt(selectedMonth)) &&
             (selectedLocation === 'all' || item.location === selectedLocation) &&
             (selectedViolationType === 'all' || item.violation === selectedViolationType) &&
             (selectedCarMake === 'all' || item.make === selectedCarMake);
    });
  };

  // Process data for violation frequency chart
  const getViolationFrequencyData = () => {
    const filtered = getFilteredData();
    const violationCounts = {};
    
    filtered.forEach(item => {
      violationCounts[item.violation] = (violationCounts[item.violation] || 0) + 1;
    });

    return Object.entries(violationCounts)
      .map(([violation, count]) => ({ violation, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 6); // Top 6 violations
  };

  // Process data for time series chart
  const getTimeSeriesData = () => {
    const filtered = getFilteredData();
    const timeData = {};

    filtered.forEach(item => {
      const dateKey = `${item.year}-${String(item.month).padStart(2, '0')}`;
      if (!timeData[dateKey]) {
        timeData[dateKey] = { citations: 0, totalFines: 0 };
      }
      timeData[dateKey].citations += 1;
      timeData[dateKey].totalFines += item.fine;
    });

    return Object.entries(timeData)
      .map(([date, data]) => ({
        date,
        citations: data.citations,
        totalFines: Math.round(data.totalFines),
        displayValue: timeViewMode === 'citations' ? data.citations : Math.round(data.totalFines)
      }))
      .sort((a, b) => a.date.localeCompare(b.date));
  };

  if (loading) {
    return <div className="loading">{t.analytics.loading}</div>;
  }

  if (rawData.length === 0) {
    return <div className="loading">{t.analytics.noData}</div>;
  }

  const filteredData = getFilteredData();
  const violationData = getViolationFrequencyData();
  const timeSeriesData = getTimeSeriesData();
  
  const totalCitations = filteredData.length;
  const totalFines = filteredData.reduce((sum, item) => sum + item.fine, 0);

  return (
    <div className="analytics">
      <div className="container">
        <h1 className="analytics-title">{t.analytics.title}</h1>
        
        {dataSource && (
          <div className="data-source-indicator">
            <small>{t.analytics.dataSourceLabel}: {dataSource} | {t.analytics.showing} {totalCitations.toLocaleString()} {t.analytics.citations}</small>
          </div>
        )}

        {/* Filter Controls */}
        <div className="filters-section">
          <h3>{t.analytics.filters.title}</h3>
          <div className="filters-grid">
            <div className="filter-group">
              <label>{t.analytics.filters.year}:</label>
              <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
                <option value="all">{t.analytics.filters.allYears}</option>
                {years.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>
            
            <div className="filter-group">
              <label>{t.analytics.filters.month}:</label>
              <select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}>
                <option value="all">{t.analytics.filters.allMonths}</option>
                {months.map(month => (
                  <option key={month.value} value={month.value}>{month.label}</option>
                ))}
              </select>
            </div>
            
            <div className="filter-group">
              <label>{t.analytics.filters.location}:</label>
              <select value={selectedLocation} onChange={(e) => setSelectedLocation(e.target.value)}>
                <option value="all">{t.analytics.filters.allLocations}</option>
                {locations.map(location => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>
            </div>
            
            <div className="filter-group">
              <label>{t.analytics.filters.violationType}:</label>
              <select value={selectedViolationType} onChange={(e) => setSelectedViolationType(e.target.value)}>
                <option value="all">{t.analytics.filters.allTypes}</option>
                {violationTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            
            <div className="filter-group">
              <label>{t.analytics.filters.carMake}:</label>
              <select value={selectedCarMake} onChange={(e) => setSelectedCarMake(e.target.value)}>
                <option value="all">{t.analytics.filters.allMakes}</option>
                {carMakes.map(make => (
                  <option key={make} value={make}>{make}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
        
        <div className="stats-grid">
          <div className="stat-card">
            <h3>{t.analytics.stats.totalCitations}</h3>
            <div className="stat-value">{totalCitations.toLocaleString()}</div>
          </div>
          <div className="stat-card">
            <h3>{t.analytics.stats.totalFines}</h3>
            <div className="stat-value">${totalFines.toLocaleString()}</div>
          </div>
          <div className="stat-card">
            <h3>{t.analytics.stats.averageFine}</h3>
            <div className="stat-value">${totalCitations > 0 ? Math.round(totalFines / totalCitations) : 0}</div>
          </div>
        </div>

        <div className="charts-grid">
          {/* Violation Frequency Bar Chart */}
          <div className="chart-container bar-chart">
            <h2>{t.analytics.charts.violationFrequency.title}</h2>
            <div className="chart-responsive-container">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart 
                  data={violationData} 
                  margin={{ top: 20, right: 30, left: 20, bottom: 120 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                  <XAxis
                    dataKey="violation"
                    angle={-45}
                    textAnchor="end"
                    height={100}
                    interval={0}
                    tick={{ fontSize: 12, fill: '#333333' }}
                  />
                  <YAxis tick={{ fontSize: 12, fill: '#333333' }} />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #ccc',
                      borderRadius: '4px',
                      boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
                    }}
                  />
                  <Bar 
                    dataKey="count" 
                    fill="#3498db"
                    stroke="#2980b9"
                    strokeWidth={1}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="chart-legend">
              <div className="legend-item">
                <span className="legend-color-bar"></span>
                <span className="legend-text">{t.analytics.charts.violationFrequency.legend}</span>
              </div>
            </div>
          </div>
          
          {/* Time Series Line Chart */}
          <div className="chart-container">
            <div className="chart-header">
              <h2>{t.analytics.charts.timeSeriesChart.title}</h2>
              <div className="chart-controls">
                <label>
                  <input
                    type="radio"
                    value="citations"
                    checked={timeViewMode === 'citations'}
                    onChange={(e) => setTimeViewMode(e.target.value)}
                  />
                  {t.analytics.charts.timeSeriesChart.citationCount}
                </label>
                <label>
                  <input
                    type="radio"
                    value="fines"
                    checked={timeViewMode === 'fines'}
                    onChange={(e) => setTimeViewMode(e.target.value)}
                  />
                  {t.analytics.charts.timeSeriesChart.totalFines}
                </label>
              </div>
            </div>
            <div className="chart-responsive-container">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart 
                  data={timeSeriesData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                  <XAxis 
                    dataKey="date"
                    tick={{ fontSize: 12, fill: '#333333' }}
                  />
                  <YAxis 
                    tick={{ fontSize: 12, fill: '#333333' }}
                  />
                  <Tooltip
                    formatter={(value, name) => [
                      timeViewMode === 'citations' ? value : `$${value}`,
                      timeViewMode === 'citations' ? t.analytics.charts.timeSeriesChart.citationsTooltip : t.analytics.charts.timeSeriesChart.finesLabel
                    ]}
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #ccc',
                      borderRadius: '4px',
                      boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="displayValue"
                    stroke="#e74c3c"
                    strokeWidth={2}
                    dot={{ fill: '#e74c3c', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, stroke: '#e74c3c', strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="chart-legend">
              <div className="legend-item">
                <span className="legend-color-line"></span>
                <span className="legend-text">
                  {timeViewMode === 'citations' ? t.analytics.charts.timeSeriesChart.citationsLegend : t.analytics.charts.timeSeriesChart.finesLegend}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
