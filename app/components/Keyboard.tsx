"use client";

type KeyboardProps = {
  onKey: (key: string) => void;
  charStatuses: Record<string, string>;
};

export default function Keyboard({ onKey, charStatuses }: KeyboardProps) {
  const rows = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["Enter", "Z", "X", "C", "V", "B", "N", "M", "Backspace"],
  ];

  return (
    <div className="flex flex-col items-center gap-2 mt-8 md:mt-0 w-full max-w-2xl px-1 md:px-0">
      {rows.map((row, i) => (
        <div key={i} className="flex gap-1.5 w-full justify-center">
          {row.map((key) => {
            let bgColor = "bg-gray-300 dark:bg-zinc-600";
            let textColor = "text-black dark:text-white";

            if (key !== "Enter" && key !== "Backspace") {
              const status = charStatuses[key];
              if (status === "green") {
                bgColor = "bg-green-600";
                textColor = "text-white";
              }
              else if (status === "yellow") {
                bgColor = "bg-yellow-500";
                textColor = "text-white";
              }
              else if (status === "gray") {
                bgColor = "bg-gray-500 dark:bg-zinc-700";
                textColor = "text-white";
              }
            }

            return (
              <button
                key={key}
                onClick={() => onKey(key)}
                className={`${key.length > 1 ? "flex-[1.5] text-xs sm:text-sm px-1" : "flex-1 text-lg sm:text-xl font-bold"} h-14 sm:h-16 rounded-md ${bgColor} ${textColor} active:scale-95 transition-all select-none shadow-sm hover:opacity-90 hover:cursor-pointer`}
              >
                {key === "Backspace" ? (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 mx-auto">
                    <path fillRule="evenodd" d="M2.515 10.674a1.875 1.875 0 000 2.652L8.89 19.7c.352.351.829.549 1.326.549H19.5a3 3 0 003-3V6.75a3 3 0 00-3-3h-9.284c-.497 0-.974.198-1.326.55l-6.375 6.374zM12.53 9.22a.75.75 0 10-1.06 1.06L13.19 12l-1.72 1.72a.75.75 0 101.06 1.06l1.72-1.72 1.72 1.72a.75.75 0 101.06-1.06L15.31 12l1.72-1.72a.75.75 0 10-1.06-1.06l-1.72 1.72-1.72-1.72z" clipRule="evenodd" />
                  </svg>
                ) : key}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}
