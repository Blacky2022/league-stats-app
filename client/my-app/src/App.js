import React from 'react';
import './App.css';
import LoginPage from './pages/LoginPage';
import ChampionStats from './pages/ChampionStats';
import UpdatePerformance from './pages/UpdatePerformance';
import WorldsPerformance from './pages/WorldsPerformance';
import { Route, Link, Routes } from 'react-router';
import NavBar from './Navbar';


function App() {
  return (
    <div className="App">
    <NavBar/>
    <Routes>
      <Route exact path="/" Component={LoginPage} />
      <Route exact path="/ChampionStats" Component={ChampionStats} />
      <Route exact path="/UpdatePerformance" Component={UpdatePerformance} />
      <Route exact path="/WorldsPerformance" Component={WorldsPerformance} />
    </Routes>
    </div>
  );
}

export default App;
