import React, { useState } from 'react';

function SearchPatient({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  return (
    <div>
      <input
        type='text'
        placeholder='Search by name...'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={() => {handleSearch(searchTerm); handleSearch(searchTerm);}}>Search</button>
    </div>
  );
}

export default SearchPatient;