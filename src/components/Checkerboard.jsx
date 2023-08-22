import React, { useState } from "react";

function Checkerboard() {
    const width = 12;
    const height = 6;
    const [selectedSquares, setSelectedSquares] = useState([]);

    const toggleSelection = (index) => {
        if (selectedSquares.includes(index)) {
            setSelectedSquares(selectedSquares.filter(i => i !== index));
        } else {
            setSelectedSquares([...selectedSquares, index]);
        }
    }

    return (
        <div className="grid grid-cols-12 gap-0">
            {Array.from({ length: width * height }).map((_, index) => {
                const row = Math.floor(index / width);
                const col = index % width;
                const isGray = (row + col) % 2 === 0;
                const isSelected = selectedSquares.includes(index);

                return (
                    <div
                        key={index}
                        className={`w-32 h-32 p-0 m-0 cursor-pointer ${isSelected ? 'border-4 border-blue-500' : ''} ${isGray ? 'bg-[#eeb3ef]' : 'bg-[#92eef2]'}`}
                        onClick={() => toggleSelection(index)}
                    />
                );
            })}
        </div>
    );
}
export default Checkerboard;