import VideoCall from '@/components/shared/VideoCall';
import ChessBoard from '@/components/shared/ChessBoard';
import MovesList from '@/components/shared/MovesList';

export default function GamePage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      <header className="bg-gray-800 py-3 px-4 lg:py-4 lg:px-6 text-center">
        <h1 className="text-2xl lg:text-3xl font-bold">Chess P2P</h1>
      </header>
      <main className="flex-grow flex items-center justify-center p-2 sm:p-4 lg:p-[1rem]">
        <div className="bg-gray-800 border border-gray-700 rounded-lg overflow-auto w-full max-w-[90vw] max-h-[100vh] lg:overflow-hidden lg:transform lg:scale-90 lg:origin-top">
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr,2.1fr,1fr] gap-3 lg:gap-4 p-4 lg:p-6 h-full">
            <VideoCall />
            <div className="flex items-center justify-center">
              <ChessBoard />
            </div>
            <MovesList />
          </div>
        </div>
      </main>
      <span className="text-center text-gray-400 block py-4 lg:pt-[1px]">
          Made with ❤️ by <a href="https://x.com/JatinSriva36542?t=jInLA9mjPJc3klWMBmAhDg&s=09" className="underline">Jatin</a>
      </span>
    </div>
  );
}