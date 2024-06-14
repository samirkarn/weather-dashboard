import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Search from './components/Search';
import WeatherDisplay from './components/WeatherDisplay';
import Favorites from './components/Favorites';
import ForecastDisplay from './components/ForecastDisplay';
import './style.css';

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null); 
  const [favorites, setFavorites] = useState([]);
  const [lastSearched, setLastSearched] = useState(localStorage.getItem('lastSearched') || '');
  const [unit, setUnit] = useState('metric');
  const [cityName, setCityName] = useState('')

  useEffect(() => {
    fetchFavorites();
    if (lastSearched) {
      fetchWeather(lastSearched);
      fetchForecast(lastSearched); 
    }
  }, [lastSearched]);

  const apiKey = process.env.REACT_APP_OPENWEATHERMAP_API_KEY;

  const fetchWeather = async (city) => {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${apiKey}`);
      setWeatherData(response.data);
      localStorage.setItem('lastSearched', city);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  const fetchForecast = async (city) => {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${unit}&appid=${apiKey}`);
      console.log(response)
      setForecastData(response.data);
      setCityName(response.data.city.name)
      console.log(response.data.city.name)
    } catch (error) {
      console.error('Error fetching forecast data:', error);
    }
  };

  const fetchFavorites = async () => {
    const response = await axios.get('http://localhost:3005/favorites');
    setFavorites(response.data);
  };

  const addFavorite = async (city) => {
    await axios.post('http://localhost:3005/favorites', { city });
    fetchFavorites();
  };

  const removeFavorite = async (id) => {
    await axios.delete(`http://localhost:3005/favorites/${id}`);
    fetchFavorites();
  };

  const handleSearch = (city) => {
    fetchWeather(city);
    fetchForecast(city); 
  };

  const toggleUnit = () => {
    setUnit((prevUnit) => (prevUnit === 'metric' ? 'imperial' : 'metric'));
  };

  const handleFavoriteClick = (city) => {
    fetchWeather(city);
    fetchForecast(city);
  };

  return (
    <div className="App">
      <h1 className='heading'>Weather Dashboard</h1>
      <Search onSearch={handleSearch} />
      {weatherData && <WeatherDisplay data={weatherData} unit={unit} onToggleClick={toggleUnit} />}
      {forecastData && <ForecastDisplay city={cityName} unit={unit} forecast={forecastData} />} 
      <Favorites
        favorites={favorites}
        onAddFavorite={addFavorite}
        onRemoveFavorite={removeFavorite}
        onFavoriteClick={handleFavoriteClick}
      />
    </div>
  );
};

export default App;
