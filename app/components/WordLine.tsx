"use client";

type WordLineProps = {
  guess: string | null;
  word_length: number;
  target: string;
  check_color: boolean;
};

export default function WordLine({ guess, word_length, target, check_color }: WordLineProps) {

  const letters = Array.from({ length: word_length }, (_, i) => guess?.charAt(i) || "");

  return (
    <div className="flex">
      {
        letters.map((letter, idx) => {
          let classes = "bg-gray-200";
          if (check_color) {
            if (target[idx] == letter) {
              classes = "bg-green-400";
            } else if (target.includes(letter)) {
              classes = "bg-yellow-400";
            } else {
              classes = "bg-stone-400";
            }
          }
          return (
            <div key={idx} className={`m-1 h-16 w-16 flex items-center justify-center text-2xl font-semibold capitalize border border-stone-900 ${classes}`}>
              {letter}
            </div>
          );
        })
      }
    </div>
  );
}
