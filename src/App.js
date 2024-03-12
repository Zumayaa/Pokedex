import React, { useState, useEffect } from 'react';
import Pokemones from './components/pokemones';
import Navbar from './components/Navbar';
import Searchbar from './components/Searchbar';

function App() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <>
      <Navbar />
      <Searchbar onSearch={setSearchTerm} />
      <Pokemones searchTerm={searchTerm} />
    </>
  );
}

export default App;
