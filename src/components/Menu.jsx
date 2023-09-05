import React from 'react';

const Menu = ({ onStartNewGame }) => {
    return (
        <div className="bg-gray-700 text-white w-full h-screen flex flex-col justify-center items-center">
            <h1 className="text-5xl mb-10 font-extrabold">Incoming</h1>
            <div className='flex gap-8'>
                <button
                    onClick={onStartNewGame}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-3 focus:outline-none focus:shadow-outline">
                    Single Player
                </button>
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-3 focus:outline-none focus:shadow-outline">
                    Multiplayer
                </button>
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-3 focus:outline-none focus:shadow-outline">
                    Options
                </button>
            </div>
        </div>
    );
};

export default Menu;
