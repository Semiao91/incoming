import React, { useState } from 'react';  
import Checkerboard from './components/Checkerboard';
import Menu from './components/Menu';
import Levels from './components/Levels';  
import './App.css';

function App() {
  const [isGameActive, setIsGameActive] = useState(false);
  const [isLevelsActive, setIsLevelsActive] = useState(false);

  const startNewGame = () => {
    setIsGameActive(true);
  };

  const showLevels = () => {
    setIsLevelsActive(true);
  };

  const goToMenu = () => {
    setIsGameActive(false);
    setIsLevelsActive(false);
  };

  return (
    <div className='flex justify-center items-center h-screen'>
     {isGameActive ? <Checkerboard onGoToMenu={goToMenu} /> : (isLevelsActive ? <Levels onStartNewGame={startNewGame} /> : <Menu onStartNewGame={showLevels} />)}
    </div>
  )
}

export default App;
