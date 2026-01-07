import Board from "./components/Board";

export default function Home() {
  return (
    <div className="w-full min-h-screen bg-amber-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-center text-4xl font-bold tracking-wider mb-2">WORDLE</h1>
      <Board />
    </div>
  );
}
