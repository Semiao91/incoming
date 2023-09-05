import React from 'react';

const Levels = ({ onStartNewGame }) => {
    return (
        <div className="bg-gray-700 text-white w-full h-screen flex flex-col justify-center items-center">
            <h1 className="text-5xl mb-10 font-extrabold">Select Level</h1>
            <div className="flex flex-wrap gap-8">
                {[1, 2, 3, 4, 5].map((level, index) => (
                    <div
                        key={index}
                        className="bg-gray-800 hover:bg-gray-900 cursor-pointer p-6 rounded-lg shadow-lg transition duration-300"
                        onClick={() => onStartNewGame(level)}
                    >
                        <h2 className="text-2xl font-bold mb-2">Level {level}</h2>
                        <p className="text-sm">Description for level {level}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Levels;
