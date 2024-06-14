import React, { useState } from 'react';

const Favorites = ({ favorites, onAddFavorite, onRemoveFavorite, onFavoriteClick }) => {
  const [newFavorite, setNewFavorite] = useState('');


  const handleAddFavorite = () => {
    onAddFavorite(newFavorite);
    setNewFavorite('');
  };

  return (
    <div className="favorites">
      <h3 className='cities'>Favorite Cities <span style={{fontSize: '10px'}}>(click on city name for show the weather details)</span></h3>
      <input
        type="text"
        value={newFavorite}
        onChange={(e) => setNewFavorite(e.target.value)}
        placeholder="Add new favorite"
        className='favorites-input'
      />
      <button className='serch-btn' onClick={handleAddFavorite}>Add</button>
      <ul>
        {favorites.map((fav) => (
          <li key={fav.id}>
            <span onClick={() => onFavoriteClick(fav.city)}  style={{cursor:'pointer'}}>{fav.city}</span>
            <button onClick={() => onRemoveFavorite(fav.id)} className='favorites-remove-btn'>X</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Favorites;
