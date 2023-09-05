import React, { useState } from 'react'; 
import './App.css';
import Checkerboard from './components/Checkerboard';
import Menu from './components/Menu';

function App() {
  const [isGameActive, setIsGameActive] = useState(false);

  const startNewGame = () => {
    setIsGameActive(true);
  };

  const goToMenu = () => {
    setIsGameActive(false);
  };

  return (
    <div className='flex justify-center items-center h-screen'>
      {isGameActive ? <Checkerboard onGoToMenu={goToMenu} /> : <Menu onStartNewGame={startNewGame} />}
    </div>
  );
}

export default App;
