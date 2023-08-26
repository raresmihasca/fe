
import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import Navbar from './layout/Navbar';
import Home from './pages/Home';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import ViewPatient from './procedures/ViewPatient';
import React, { useState } from 'react';


function App() {

  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <div className="App">
      <Router>
        <Navbar />

        <Routes>
          <Route exact path = "/" element = {<Home/>}></Route>
          <Route exact path = "/ourPatients" element = {<Home/>}></Route>
          <Route exact path = "/viewPatient/:id" element = {<ViewPatient/>}></Route>
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
