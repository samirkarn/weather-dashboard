import React from 'react';

const ForecastDisplay = ({ forecast, city, unit }) => {
  const { list } = forecast;

  console.log('city Name:', city)

  const temperatureUnit = unit === 'metric' ? '°C' : '°F';
  
  list.forEach(item => {
    item.temperature = unit === 'metric' ? item.main.temp : (item.main.temp * 9/5) + 32;
  });
  console.log(temperatureUnit)

  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const day = date.getDate();
    const month = date.getMonth() + 1; 
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  return (
    <div className="forecast-display">
      <h2>5-Day Forecast <span style={{fontWeight: '400'}}>({city})</span></h2>
      <div className="forecast-list">
        {list.slice(0, 5).map((item, index) => (
          <div key={index} className="forecast-item">
            <p style={{fontSize: '15px'}}>Date: <span className='temp-text'>{formatDate(item.dt)}</span></p>
            <p style={{fontSize: '15px'}}>Temperature: <span className='temp-text'>{item.temperature.toFixed(1)} {temperatureUnit}</span></p>
            <p style={{fontSize: '15px'}}>Humidity: <span className='temp-text'>{item.main.humidity}%</span></p>
            <p style={{fontSize: '15px'}}>Pressure: <span className='temp-text'>{item.main.pressure} hPa</span></p>
            <p style={{fontSize: '15px'}}>Description: <span className='temp-text'>{item.weather[0].description}</span></p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ForecastDisplay;
