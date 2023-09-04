import React, { useState } from "react";
import Arrow from "../assets/next-arrow-svgrepo-com.svg"

function Checkerboard() {
    const width = 12;
    const height = 6;
    const [selectedSquares, setSelectedSquares] = useState(null);
    const [arrowStored, setArrowStored] = useState([]);

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

                    if (updatedArrows.length > 4) {
                        updatedArrows.shift();
                    }

                    return updatedArrows;
                });
            }
        }
    };

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
                const storedArrow = arrowStored.find(arrow => arrow.index === index);

                return (
                    <div
                        key={index}
                        className={`w-32 h-32 relative p-0 m-0 cursor-pointer 
                                      ${isSelected ? 'border-4 border-black' : ''} 
                                      ${isGray ? 'bg-[#eeb3ef]' : 'bg-[#92eef2]'}`}
                        onClick={() => toggleSelection(index)}
                    >
                        {storedArrow &&
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className={`block w-[120px] h-[120px] bg-[#0200d4]  
                                                transform ${getTransform(storedArrow.direction)}`}
                                >
                                    <img  src={Arrow} alt="arrow" draggable="false"/>
                                </div>
                            </div>
                        }
                    </div>
                );
            })}
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
