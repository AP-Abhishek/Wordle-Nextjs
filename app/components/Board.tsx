"use client";

import { useState, useEffect } from "react";
import WordLine from "./WordLine";
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

  useEffect(() => {
    const handleKeys = (event: KeyboardEvent) => {
      if (gameOver) {
        return;
      }
      const key = event.key;
      if (key == 'Enter') {
        if (currentGuess.length < MAX_WORD_LENGTH) {
          return;
        } else {
          const newGuess = [...guesses];
          newGuess[guessIdx] = currentGuess.toUpperCase();
          setGuesses(newGuess)
          const newChecked = [...checked];
          newChecked[guessIdx] = true;
          setChecked(newChecked);
          setGuessIdx(prev => prev + 1);
          if (currentGuess === target) {
            setGameOver(true);
          } else {
            if (guessIdx === TRIES - 1) {
              setGameOver(true);
            }
          }
          setCurrentGuess("")
        }
      }

      if (key == 'Backspace') {
        if (currentGuess.length > 0) {
          setCurrentGuess(currentGuess.slice(0, currentGuess.length - 1));
        }
        return;
      }

      if (currentGuess.length < MAX_WORD_LENGTH && key.match(/^[a-zA-Z]$/)) {
        setCurrentGuess((prev: string) => prev + key.toUpperCase());
      }
    };

    window.addEventListener("keydown", handleKeys);
    return () => window.removeEventListener("keydown", handleKeys);
  }, [currentGuess, guesses, guessIdx, gameOver, checked]);

  return (
    <>
      <div className="m-8 p-1 bg-[#7a5d25aa]">
        {
          guesses.map((guess, idx) => {
            const displayGuess = idx === guessIdx ? currentGuess : guess;
            return (
              <WordLine
                key={idx}
                guess={displayGuess}
                word_length={MAX_WORD_LENGTH}
                target={target}
                check_color={checked[idx]}
              />
            )
          })
        }
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
  )
}
