import React, { useState, useEffect } from "react";
import Arrow from "../assets/next-arrow-svgrepo-com.svg"

function Checkerboard({ onGoToMenu }) {
    const width = 6;
    const height = 6;
    const [selectedSquares, setSelectedSquares] = useState(null);
    const [arrowStored, setArrowStored] = useState([]);
    const [mousePos, setMousePos] = useState(0);
    const [mouseDirection, setMouseDirection] = useState('right');
    const [speed, setSpeed] = useState(400);
    const [boardConfig, setBoardConfig] = useState([]);
    const [goalPos, setGoalPos] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        const newBoardConfig = Array.from({ length: width * height }, (_, i) => 1);
        newBoardConfig[5] = 0;
        newBoardConfig[30] = 2;
        newBoardConfig[12] = 3
        newBoardConfig[17] = 3
        setBoardConfig(newBoardConfig);
        setGoalPos(30);
    }, []);

    useEffect(() => {
        if (isPlaying) {
            const moveMouse = () => {
                let currentDirection = mouseDirection;
                const currentArrow = arrowStored.find(arrow => arrow.index === mousePos);
                if (currentArrow) {
                    currentDirection = currentArrow.direction;
                }

                let newRow = Math.floor(mousePos / width);
                let newCol = mousePos % width;
                let hitWall = false;

                switch (currentDirection) {
                    case 'up':
                        newRow = newRow - 1;
                        break;
                    case 'down':
                        newRow = newRow + 1;
                        break;
                    case 'left':
                        newCol = newCol - 1;
                        break;
                    case 'right':
                        newCol = newCol + 1;
                        break;
                    default:
                        break;
                }


                if (newRow < 0 || newRow >= height || newCol < 0 || newCol >= width || boardConfig[newRow * width + newCol] === 3) {
                    hitWall = true;
                }

                if (hitWall) {
                    const directions = ['up', 'right', 'down', 'left'];
                    const currentIdx = directions.indexOf(currentDirection);
                    currentDirection = directions[(currentIdx + 1) % 4];
                    setSpeed(0);
                } else {
                    setMousePos(newRow * width + newCol);
                    setSpeed(400);
                }

                setMouseDirection(currentDirection);
            };

            const timer = setInterval(moveMouse, speed);
            return () => clearInterval(timer);
        }
    }, [mousePos, mouseDirection, arrowStored, speed, isPlaying]);


    const toggleSelection = (index) => {
        if (selectedSquares === index) {
            setSelectedSquares(null);
        }
        else {
            setSelectedSquares(index);
        }
    }

    const handleInput = (event) => {
        if (selectedSquares !== null) {
            let newDirection = null;
            switch (event.key) {
                case 'ArrowUp':
                    newDirection = 'up';
                    break;
                case 'ArrowDown':
                    newDirection = 'down';
                    break;
                case 'ArrowLeft':
                    newDirection = 'left';
                    break;
                case 'ArrowRight':
                    newDirection = 'right';
                    break;
                default:
                    break;
            }

            if (newDirection) {
                const newArrow = { index: selectedSquares, direction: newDirection };
                setArrowStored(prev => {

                    const updatedArrows = prev.filter(arrow => arrow.index !== selectedSquares);
                    updatedArrows.push(newArrow);

                    if (updatedArrows.length > 3) {
                        updatedArrows.shift();
                    }

                    return updatedArrows;
                });
            }
        }
    };

    return (

        <div className="flex flex-col w-screen h-full bg-gray-700">
            <div className="text-7xl mb-10 font-extrabold self-center text-white">Level 1</div>
            <div className="grid place-self-center grid-cols-6 gap-0"
                tabIndex={0}
                onKeyDown={handleInput}
            >
                {boardConfig.map((value, index) => {

                    const row = Math.floor(index / width);
                    const col = index % width;
                    const isGray = (row + col) % 2 === 0;
                    const isSelected = selectedSquares === index;
                    const storedArrow = arrowStored.find(arrow => arrow.index === index);

                    return (
                        <div
                            key={index}
                            className={`w-32 h-32 relative p-0 m-0 cursor-pointer transition duration-300 ease-in
                        ${isSelected ? 'border-4 border-x-yellow-300' : 'hover:border-4 hover:border-blue-500'} 
                        ${isGray ? 'bg-[#93AED9]' : 'bg-[#558ADF]'}`
                            }
                            onClick={() => toggleSelection(index)}
                        >
                            {storedArrow &&
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className={`block w-[120px] h-[120px] bg-gradient-to-r from-[#2C4773] to-[#829ABF]
                                                transform ${getTransform(storedArrow.direction)}`}
                                    >
                                        <img src={Arrow} alt="arrow" draggable="false" />
                                    </div>
                                </div>
                            }
                            {value === 3 &&
                                <div className=" absolute inset-0 pointer-events-none bg-[#374151]">
                                </div>
                            }
                            {mousePos === index &&
                                <div className="absolute z-10 inset-0 flex items-center justify-center ">
                                    <div className="block text-8xl">
                                        🐭
                                    </div>
                                </div>
                            }
                            {goalPos === index &&
                                <div className="absolute inset-0 flex items-center justify-center ">
                                    <div className="block text-8xl">
                                        🧀
                                    </div>
                                </div>
                            }

                        </div>
                    );
                })}
            </div>
            <div className="flex justify-center gap-10  pt-6">
                <button
                    onClick={onGoToMenu}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-3 focus:outline-none focus:shadow-outline">
                    Menu
                </button>
                <button
                    onClick={() => { setIsPlaying(false); setMousePos(0); setMouseDirection('right'); setArrowStored([]) }
                    }
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-3 focus:outline-none focus:shadow-outline">
                    Reset
                </button>
                <button
                    onClick={() => setIsPlaying(true)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-3 focus:outline-none focus:shadow-outline">
                    Play
                </button>
            </div>
        </div>
    );

    function getTransform(direction) {
        switch (direction) {
            case 'up':
                return '-rotate-90';
            case 'right':
                return 'rotate-0';
            case 'down':
                return 'rotate-90';
            case 'left':
                return '-rotate-180';
            default:
                return '';
        }
    }
}
export default Checkerboard;