"use client";

type WordLineProps = {
  guess: string | null;
  word_length: number;
  target: string;
  check_color: boolean;
};

export default function WordLine({ guess, word_length, target, check_color }: WordLineProps) {
  const letters = Array.from({ length: word_length }, (_, i) => guess?.charAt(i) || "");
  let statuses = Array(word_length).fill("bg-stone-400");

  if (check_color && guess) {
    const targetArr = target.split("");
    const guessArr = guess.split("");
    const remainingLetters: Record<string, number> = {};

    for (const char of targetArr) {
      remainingLetters[char] = (remainingLetters[char] || 0) + 1;
    }

    guessArr.forEach((char, i) => {
      if (char === targetArr[i]) {
        statuses[i] = "bg-green-400";
        remainingLetters[char] -= 1;
      }
    });

    guessArr.forEach((char, i) => {
      if (statuses[i] !== "bg-green-400") {
        if (remainingLetters[char] > 0) {
          statuses[i] = "bg-yellow-400";
          remainingLetters[char] -= 1;
        }
      }
    });
  }

  return (
    <div className="flex">
      {letters.map((letter, idx) => (
        <div
          key={idx}
          className={`m-1 h-16 w-16 flex items-center justify-center text-2xl font-bold uppercase border border-stone-900 transition-colors duration-300 ${check_color ? statuses[idx] : "bg-gray-200 text-black"}`}
        >
          {letter}
        </div>
      ))}
    </div>
  );
}