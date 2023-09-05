import React, { useState, useEffect } from "react";
import Arrow from "../assets/next-arrow-svgrepo-com.svg"
import App from '../App.jsx'

function Checkerboard({onGoToMenu}) {
    const width = 12;
    const height = 6;
    const [selectedSquares, setSelectedSquares] = useState(null);
    const [arrowStored, setArrowStored] = useState([]);
    const [mousePos, setMousePos] = useState(0);
    const [mouseDirection, setMouseDirection] = useState('right');
    const [speed, setSpeed] = useState(400);

    useEffect(() => {
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
                    if (newRow === 0) hitWall = true;
                    newRow = Math.max(0, newRow - 1);
                    break;
                case 'down':
                    if (newRow === height - 1) hitWall = true;
                    newRow = Math.min(height - 1, newRow + 1);
                    break;
                case 'left':
                    if (newCol === 0) hitWall = true;
                    newCol = Math.max(0, newCol - 1);
                    break;
                case 'right':
                    if (newCol === width - 1) hitWall = true;
                    newCol = Math.min(width - 1, newCol + 1);
                    break;
                default:
                    break;
            }

            if (hitWall) {
                const directions = ['up', 'right', 'down', 'left'];
                const currentIdx = directions.indexOf(currentDirection);
                currentDirection = directions[(currentIdx + 1) % 4];
                setSpeed(0);
            } else {
                setSpeed(400);
            }

            setMousePos(newRow * width + newCol);
            setMouseDirection(currentDirection);

        };

        const timer = setInterval(moveMouse, speed);

        return () => clearInterval(timer);
    }, [mousePos, mouseDirection, arrowStored, speed]);


    const toggleSelection = (index) => {
        if (selectedSquares === index) {
            setSelectedSquares(null);
        } else {
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
        <div className="">
            <button
                onClick={onGoToMenu}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-3 focus:outline-none focus:shadow-outline">
                Menu
            </button>
            <div className="grid grid-cols-12 gap-0"
                tabIndex={0}
                onKeyDown={handleInput}
            >
                {Array.from({ length: width * height }).map((_, index) => {
                    const row = Math.floor(index / width);
                    const col = index % width;
                    const isGray = (row + col) % 2 === 0;
                    const isSelected = selectedSquares === index;
                    const storedArrow = arrowStored.find(arrow => arrow.index === index);

                    return (
                        <div
                            key={index}
                            className={`w-32 h-32 relative p-0 m-0 cursor-pointer transition duration-300 ease-in
                        ${isSelected ? 'border-4 border-blue-500' : 'hover:border-4 hover:border-blue-500'} 
                        ${isGray ? 'bg-[#eeb3ef]' : 'bg-[#92eef2]'}`
                            }
                            onClick={() => toggleSelection(index)}
                        >
                            {storedArrow &&
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className={`block w-[120px] h-[120px] bg-[#0200d4]  
                                                transform ${getTransform(storedArrow.direction)}`}
                                    >
                                        <img src={Arrow} alt="arrow" draggable="false" />
                                    </div>
                                </div>
                            }
                            {mousePos === index &&
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="block text-8xl">
                                        🐭
                                    </div>
                                </div>
                            }
                        </div>
                    );
                })}
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
