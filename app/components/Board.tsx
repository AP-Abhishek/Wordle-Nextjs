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
      {gameOver &&
        <>
          <div className="text-xl">
            The Answer was <b>"{target}"</b>
          </div>
          <p>
            Reload to restart
          </p>
        </>
      }
    </>
  )
}
