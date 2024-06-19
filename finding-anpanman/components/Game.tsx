"use client"

// components/Game.tsx
import React, { useState, useEffect } from "react";

interface Pokemon {
  name: string;
  image: string;
  position: { top: number; left: number };
}

const Game: React.FC = () => {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([
    {
      name: "Anpanman",
      image: "/images/Anpanman-and-friends.webp",
      position: { top: 30, left: 50 },
    },
    {
        name: "akachanman",
        image: "/images/akachanman.png",
        position: { top: 80, left: 44 },
      },
      {
        name: "anpanman",
        image: "/images/anpanman.png",
        position: { top: 66, left: 72 },
      },
      {
        name: "creampanda-chan",
        image: "/images/creampanda-chan.png",
        position: { top: 44, left: 41 },
      },
      {
        name: "melonpanna-chan",
        image: "/images/melonpanna-chan.png",
        position: { top: 45, left: 71 },
      },
      {
        name: "rollpan-chan",
        image: "/images/rollpan-chan.png",
        position: { top: 22, left: 41 },
      },
    // Add more Pokemon here with their correct positions
  ]);

  const [currentPokemon, setCurrentPokemon] = useState<Pokemon>(pokemonList[0]);
  const [found, setFound] = useState(false);
  const [errorPosition, setErrorPosition] = useState<{
    top: number;
    left: number;
  } | null>(null);

  useEffect(() => {
    if (found) {
      const timeout = setTimeout(() => {
        setFound(false);
        setErrorPosition(null);
        const nextPokemon =
          pokemonList[Math.floor(Math.random() * pokemonList.length)];
        setCurrentPokemon(nextPokemon);
      }, 2000);

      return () => clearTimeout(timeout);
    }
  }, [found]);

  const handleClick = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const rect = (e.target as HTMLDivElement).getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    const imgWidth = rect.width;
    const imgHeight = rect.height;

    // Convert percentage position to actual pixel coordinates
    const correctX = (currentPokemon.position.left / 100) * imgWidth;
    const correctY = (currentPokemon.position.top / 100) * imgHeight;

    const isCorrect =
      Math.abs(x - correctX) < 40 && Math.abs(y - correctY) < 40;

    if (isCorrect) {
      setFound(true);
    } else {
      setErrorPosition({ top: y, left: x });
    }
  };

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center bg-gray-100">
      <div
        className="absolute inset-0 bg-no-repeat bg-center bg-cover sm:bg-contain"
        style={{ backgroundImage: `url(${currentPokemon.image})` }}
        onClick={handleClick}
      >
        {found && (
          <div
            className="absolute transform -translate-x-1/2 -translate-y-1/2"
            style={{
              top: `${currentPokemon.position.top}%`,
              left: `${currentPokemon.position.left}%`,
            }}
          >
            <div className="w-50 h-50 sm:w-20 sm:h-20 rounded-full border-8 border-green-500"></div>
            </div>
        )}
        {errorPosition && (
          <div
            className="absolute transform -translate-x-1/2 -translate-y-1/2"
            style={{
              top: `${errorPosition.top}px`,
              left: `${errorPosition.left}px`,
            }}
          >
            <div className="w-20 h-20 sm:w-10 sm:h-10 flex items-center justify-center text-red-500 text-7xl font-bold">
              X
            </div>
          </div>
        )}
        {/* Marker for the correct position */}
        <div
          className="absolute transform -translate-x-1/2 -translate-y-1/2"
          style={{
            top: `${currentPokemon.position.top}%`,
            left: `${currentPokemon.position.left}%`,
          }}
        >
          <div className="w-6 h-6 sm:w-4 sm:h-4 rounded-full bg-blue-500 opacity-50"></div>
        </div>
      </div>
      <div className="absolute top-4 w-full text-center">
        {/* <h1 className="text-2xl font-bold">Find {currentPokemon.name}</h1> */}
      </div>
    </div>
  );
};

export default Game;
