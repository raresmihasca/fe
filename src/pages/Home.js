
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import SearchPatient from '../procedures/SearchPatient';
import './styles.css';

function Home() {
  
  const [typeSelected, setTypeSelected] = useState(false);

  const [searchResults, setSearchResults] = useState([]);
  const [patients, setPatients] = useState([]);
  const [types, setTypes] = useState([]);
  const [breeds, setBreeds] = useState([]);
  const [sexes, setSexes] = useState([]);
  const [colors, setColors] = useState([]);
  const [ages, setAges] = useState([]);
  const [weights, setWeights] = useState([]);

  const [selectedType, setSelectedType] = useState('');
  const [selectedBreed, setSelectedBreed] = useState('');
  const [selectedSex, setSelectedSex] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedAge, setSelectedAge] = useState('');
  const [selectedWeight, setSelectedWeight] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const manualAgeRanges = [
    '0-1', '1-2', '3-4', '5-9', '10-19', '20-29', '30-49', '50+'
  ];
  const manualWeightRanges = [
    '0-1', '1-2', '3-4', '5-9', '10-19', '20-29', '30-49', '50+'
  ];


  const loadPatients = async () => {
    const result = await axios.get('http://localhost:8080/patients');
    setPatients(result.data);
  };

  const fetchTypes = async () => {
    try {
      const response = await axios.get('http://localhost:8080/type');
      setTypes(response.data);
    } catch (error) {
      console.error('Error fetching types:', error);
    }
  };

  const fetchBreeds = async () => {
    try {
      const response = await axios.get('http://localhost:8080/breed');
      setBreeds(response.data);
    } catch (error) {
      console.error('Error fetching breeds:', error);
    }
  };

  const fetchSexes = async () => {
    try {
      const response = await axios.get('http://localhost:8080/sex');
      setSexes(response.data);
    } catch (error) {
      console.error('Error fetching breeds:', error);
    }
  };

  const fetchColors = async () => {
    try {
      const response = await axios.get('http://localhost:8080/color');
      setColors(response.data);
    } catch (error) {
      console.error('Error fetching breeds:', error);
    }
  };

  const handleSearch = (term) => {
    setSearchTerm(term);

    if (term) {
      const filteredResults = patients.filter((patient) =>
        patient.name.toLowerCase().includes(term.toLowerCase())
      );
      setSearchResults(filteredResults);
    } else {
      setSearchResults([]);
    }
  };

  const calculateAge = (birthDate) => {
    const currentDate = new Date();
    const birthDateObj = new Date(birthDate);
    const ageInYears = currentDate.getFullYear() - birthDateObj.getFullYear();
  
    if (
      currentDate.getMonth() < birthDateObj.getMonth() ||
      (currentDate.getMonth() === birthDateObj.getMonth() && currentDate.getDate() < birthDateObj.getDate())
    ) {
      return ageInYears - 1;
    } else {
      return ageInYears;
    }
  };

  const isInAgeRange = (birthDate, ageRange) => {
    const currentDate = new Date();
    const birthDateObj = new Date(birthDate);
    const ageInYears = currentDate.getFullYear() - birthDateObj.getFullYear();
    
    const [minAge, maxAge] = ageRange.split('-').map(Number);
    
    return ageInYears >= minAge && ageInYears <= maxAge;
  };

  const isInWeightRange = (weight, range) => {
    const [min, max] = range.split('-').map(Number);
    return weight >= min && weight <= max;
  };

  useEffect(() => {
    loadPatients();
    fetchTypes();
    fetchBreeds();
    fetchSexes();
    fetchColors();
  }, []);

  useEffect(() => {
    let filteredPatients = patients;

    if (selectedType !== '') {
      filteredPatients = filteredPatients.filter(patient => patient.type === selectedType);
    }
  
    if (selectedBreed !== '') {
      filteredPatients = filteredPatients.filter(patient => patient.breed === selectedBreed);
    }
  
    if (selectedSex !== '') {
      filteredPatients = filteredPatients.filter(patient => patient.sex === selectedSex);
    }
  
    if (selectedColor !== '') {
      filteredPatients = filteredPatients.filter(patient => patient.color === selectedColor);
    }
  
    if (selectedAge !== '') {
      filteredPatients = filteredPatients.filter(patient => isInAgeRange(patient.birthDate, selectedAge));
    }

    if (selectedWeight !== '') {
      filteredPatients = filteredPatients.filter(patient => isInWeightRange(patient.weight, selectedWeight));
    }

    setSearchResults(filteredPatients);

    const uniqueTypes = [...new Set(filteredPatients.map((patient) => patient.type))];
  setTypes(uniqueTypes);

  const uniqueBreeds = [...new Set(filteredPatients.map((patient) => patient.breed))];
  setBreeds(uniqueBreeds);

  const uniqueSexes = [...new Set(filteredPatients.map((patient) => patient.sex))];
  setSexes(uniqueSexes);

  const uniqueColors = [...new Set(filteredPatients.map((patient) => patient.color))];
  setColors(uniqueColors);

  const uniqueAges = [...new Set(filteredPatients.map((patient) => calculateAge(patient.birthDate)))];
  setAges(uniqueAges);

  const uniqueWeights = [...new Set(filteredPatients.map((patient) => patient.weight))];
  setWeights(uniqueWeights);

  }, [searchTerm, patients, selectedType, selectedBreed, selectedSex, selectedColor, selectedAge, selectedWeight]);


 return (
    <div className='container'>
      <div className='py-4'>
        <h2>Patients List</h2>
        <SearchPatient onSearch={handleSearch} />
        <div className="filter-container">
          
        <div className="filter">
  <label>Type:</label>
  <select
    value={selectedType}
    onChange={(e) => {
      if (selectedType === e.target.value) {
        setSelectedType(''); // Deselectează dacă se apasă pe opțiunea deja selectată
      } else {
        setSelectedType(e.target.value);
      }
    }}
    onClick={(e) => {
      e.target.value = ''; // Resetează valoarea când se face click pe opțiune
    }}
  >
    <option value=''>All</option>
    {types.map((type) => (
      <option key={type} value={type}>
        {type}
      </option>
    ))}
  </select>
</div>
          <div className="filter">
            <label>Breed:</label>
            <select value={selectedBreed} onChange={(e) => setSelectedBreed(e.target.value)}>
              <option value=''>All</option>
              {breeds.map((breed) => (
                <option key={breed} value={breed}>
                  {breed}
                </option>
              ))}
            </select>
          </div>
          <div className="filter">
            <label>Sex:</label>
            <select value={selectedSex} onChange={(e) => setSelectedSex(e.target.value)}>
              <option value=''>All</option>
              {sexes.map((sex) => (
                <option key={sex} value={sex}>
                  {sex}
                </option>
              ))}
            </select>
          </div>
          <div className="filter">
            <label>Color:</label>
            <select value={selectedColor} onChange={(e) => setSelectedColor(e.target.value)}>
              <option value=''>All</option>
              {colors.map((color) => (
                <option key={color} value={color}>
                  {color}
                </option>
              ))}
            </select>
          </div> 
          <div className="filter">
  <label>Age:</label>
  <select value={selectedAge} onChange={(e) => setSelectedAge(e.target.value)}>
    <option value=''>All</option>
    {manualAgeRanges.map((ageRange) => (
      <option key={ageRange} value={ageRange}>
        {ageRange}
      </option>
    ))}
  </select>
</div>

<div className="filter">
  <label>Weight:</label>
  <select value={selectedWeight} onChange={(e) => setSelectedWeight(e.target.value)}>
    <option value=''>All</option> 
    {manualWeightRanges.map((weightRange) => (
      <option key={weightRange} value={weightRange}>
        {weightRange}
      </option>
    ))}
  </select>
</div>
        </div>
        <table className='table border shadow'>
          <thead>
            <tr>
              <th scope='col'>ID</th>
              <th scope='col'>Name</th>
              <th scope='col'>Sex</th>
              <th scope='col'>Type</th>
              <th scope='col'>Breed</th>
              <th scope='col'>Color</th>
              <th scope='col'>Birth Date</th>
              <th scope='col'>Weight</th>
            </tr>
          </thead>
          <tbody>
            {searchResults.map((patient) => (
              <tr key={patient.id}>
                <td>{patient.id}</td>
                <td>{patient.name}</td>
                <td>{patient.sex}</td>
                <td>{patient.type}</td>
                <td>{patient.breed}</td>
                <td>{patient.color}</td>
                <td>{patient.birthDate}</td>
                <td>{patient.weight}</td>
                <td>
                  <Link className='btn btn-primary mx-2' to={`/viewPatient/${patient.id}`}>
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Home;