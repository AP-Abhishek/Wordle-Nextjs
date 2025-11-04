import Board from "./components/Board";

export default function Home() {
  return (
    <div className="w-full h-screen bg-amber-100 flex flex-col items-center justify-center">
      <h1 className="text-center text-4xl font-bold tracking-wider">WORDLE</h1>
      <Board />
    </div>
  );
}
