import React from 'react';

const WeatherDisplay = ({ data, unit, onToggleClick }) => {
  const { name, main, weather } = data;
  const temperatureUnit = unit === 'metric' ? '°C' : '°F';
  const temperature = unit === 'metric' ? main.temp : (main.temp * 9/5) + 32;
  console.log(temperature)
  console.log(temperatureUnit)
  const tempText = unit === 'metric' ? 'See in Fahrenheit' : 'See in Celsius';
    console.log(tempText)
    
  return (
    <div className="weather-display">
      <h2 style={{fontFamily: 'sans-serif'}}>{name}</h2>
      <p className='temp-text'>{weather[0].description}</p>
      <p style={{ fontSize: '15px' }}>Temperature: <span className='temp-text'>{temperature.toFixed(1)} {temperatureUnit}</span></p>
      <button className='serch-btn' onClick={onToggleClick}>{tempText}</button>
      <p style={{fontSize: '15px'}}>Humidity: <span className='temp-text'>{main.humidity}</span>%</p>
      <p style={{fontSize: '15px'}}>Pressure: <span className='temp-text'>{main.pressure} hPa</span></p>
    </div>
  );
};

export default WeatherDisplay;
