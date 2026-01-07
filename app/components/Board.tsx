"use client";

import { useState, useEffect } from "react";
import WordLine from "./WordLine";
import Keyboard from "./Keyboard";
import { fetchTarget } from "../api/target";

const TRIES: number = 5;
const MAX_WORD_LENGTH: number = 5;

export default function Board() {
  const [target, setTarget] = useState<string>("");
  const [currentGuess, setCurrentGuess] = useState<string>("");
  const [guessIdx, setGuessIdx] = useState<number>(0);
  const [guesses, setGuesses] = useState<(string | null)[]>(Array(TRIES).fill(null));
  const [checked, setChecked] = useState<boolean[]>(Array(TRIES).fill(false));
  const [gameOver, setGameOver] = useState<boolean>(false);

  useEffect(() => {
    const getTarget = async () => {
      const data: string = await fetchTarget();
      setTarget(data.toUpperCase());
    };
    getTarget();
  }, []);

  /* New Logic for handling input */
  const handleInput = (key: string) => {
    if (gameOver) return;

    if (key === 'Enter') {
      if (currentGuess.length < MAX_WORD_LENGTH) return;

      const newGuess = [...guesses];
      newGuess[guessIdx] = currentGuess.toUpperCase();
      setGuesses(newGuess);

      const newChecked = [...checked];
      newChecked[guessIdx] = true;
      setChecked(newChecked);

      if (currentGuess.toUpperCase() === target.toUpperCase()) {
        setGameOver(true);
      } else if (guessIdx === TRIES - 1) {
        setGameOver(true);
      }

      setGuessIdx(prev => prev + 1);
      setCurrentGuess("");
      return;
    }

    if (key === 'Backspace') {
      setCurrentGuess(prev => prev.slice(0, -1));
      return;
    }

    if (currentGuess.length < MAX_WORD_LENGTH && /^[a-zA-Z]$/.test(key)) {
      setCurrentGuess(prev => (prev + key).toUpperCase());
    }
  };

  useEffect(() => {
    const handleKeys = (event: KeyboardEvent) => {
      handleInput(event.key);
    };

    window.addEventListener("keydown", handleKeys);
    return () => window.removeEventListener("keydown", handleKeys);
  }, [currentGuess, guesses, guessIdx, gameOver, target, checked]);

  // Calculate character statuses for keyboard
  const getCharStatuses = () => {
    const statuses: Record<string, string> = {};

    guesses.forEach((guess, idx) => {
      if (!checked[idx] || !guess) return;

      const targetArr = target.split('');
      const guessArr = guess.split('');

      guessArr.forEach((char, i) => {
        if (!statuses[char] || statuses[char] !== 'green') {
          if (targetArr[i] === char) {
            statuses[char] = 'green';
          } else if (target.includes(char)) {
            statuses[char] = 'yellow';
          } else {
            statuses[char] = 'gray';
          }
        }
      });
    });
    return statuses;
  };

  return (
    <>
      <div className="m-8 flex flex-col md:flex-row items-center md:items-center justify-center md:gap-20 gap-8 w-full max-w-5xl px-2">
        <div className="p-1 bg-[#7a5d25aa] inline-block rounded-lg shadow-lg">
          {guesses.map((guess, idx) => (
            <WordLine
              key={idx}
              guess={idx === guessIdx ? currentGuess : guess}
              word_length={MAX_WORD_LENGTH}
              target={target}
              check_color={checked[idx]}
            />
          ))}
        </div>
        <div className="w-full max-w-lg md:max-w-md">
          <Keyboard onKey={handleInput} charStatuses={getCharStatuses()} />
        </div>
      </div>

      {gameOver && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="bg-[#1a1a1b] p-8 rounded-xl border border-gray-600 shadow-2xl flex flex-col items-center text-center max-w-sm w-full mx-4">
            <h2 className="text-3xl font-bold text-white mb-4">
              {guesses.includes(target) ? "Splendid!" : "Nice Try"}
            </h2>
            <div className="text-gray-300 mb-8">
              <span className="text-sm uppercase tracking-widest block mb-1">Target Word</span>
              <b className="text-3xl tracking-wider text-green-500 font-mono">"{target}"</b>
            </div>
            <button
              className="w-full py-3 text-lg rounded-md bg-amber-500 text-black font-bold uppercase tracking-tight transition-all hover:bg-amber-400 active:scale-95"
              onClick={() => window.location.reload()}
            >
              Play Again
            </button>
          </div>
        </div>
      )}
    </>
  );
}