import React, { useState } from 'react';

const Search = ({ onSearch }) => {
  const [city, setCity] = useState('');

  const handleSearch = () => {
    onSearch(city);
    setCity('');
    console.log(city)
  };

  return (
    <div className="search">
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name"
        className='input-field'
      />
      <br />
      <button className='serch-btn' onClick={handleSearch}>Search</button>
    </div>
  );
};

export default Search;
