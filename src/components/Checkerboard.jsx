import React, { useState } from "react";

function Checkerboard() {
    const width = 12;
    const height = 6;
    const [selectedSquares, setSelectedSquares] = useState(null);
    const [arrowDirection, setArrowDirection] = useState(null);

    const toggleSelection = (index) => {
        if (selectedSquares === index) {
            setSelectedSquares(null);
            setArrowDirection(null);
        } else {
            setSelectedSquares(index);
        }
    }

    const handleInput = (event) => {
        if (selectedSquares !== null) {
            switch (event.key) {
                case 'ArrowUp':
                    setArrowDirection('up');
                    break;
                case 'ArrowDown':
                    setArrowDirection('down');
                    break;
                case 'ArrowLeft':
                    setArrowDirection('left');
                    break;
                case 'ArrowRight':
                    setArrowDirection('right');
                    break;
                default:
                    break;
            }
        }
    }

    return (
        <div className="grid grid-cols-12 gap-0"
            tabIndex={0}
            onKeyDown={handleInput}
        >
            {Array.from({ length: width * height }).map((_, index) => {
                const row = Math.floor(index / width);
                const col = index % width;
                const isGray = (row + col) % 2 === 0;
                const isSelected = selectedSquares === index;
                const direction = isSelected ? arrowDirection : null;

                return (
                    <div
                        key={index}
                        className={`w-32 h-32 relative p-0 m-0 cursor-pointer 
                                ${isSelected ? 'border-4 border-blue-500' : ''} 
                                ${isGray ? 'bg-[#eeb3ef]' : 'bg-[#92eef2]'}`}
                        onClick={() => toggleSelection(index)}
                    >
                        {direction &&
                            <div className={`absolute inset-0 flex items-center justify-center`}>
                                <div className={`w-0 h-0 border-x-8 border-b-8 border-x-transparent border-b-blue-600 ${direction === 'up' && 'transform rotate-0'} 
                                ${direction === 'right' && 'transform rotate-90'} 
                                ${direction === 'down' && 'transform rotate-180'} 
                                ${direction === 'left' && 'transform -rotate-90'}`}></div>
                            </div>
                        }
                    </div>
                );
            })}
        </div>
    );
}
export default Checkerboard;