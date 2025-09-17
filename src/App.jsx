import { useState, useEffect, useRef } from "react";
import Confetti from "react-confetti";
import { Volume2, VolumeX } from "lucide-react";

export default function BirthdayApp() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [showConfetti, setShowConfetti] = useState(false);
  const [candleBlown, setCandleBlown] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const triggerConfetti = () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 5000);
  };

  const handleEnter = () => {
    setShowWelcome(false);
    triggerConfetti();
  };

  const blowCandle = () => {
    setCandleBlown(true);
    triggerConfetti();
  };

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    if (audioRef.current) audioRef.current.loop = true;
  }, []);

  // Sparkles around cake
  const Sparkles = () => {
    return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-blue-400 opacity-60"
            style={{
              width: `${5 + Math.random() * 15}px`,
              height: `${5 + Math.random() * 15}px`,
              top: `${50 + Math.random() * 40}%`,
              left: `${30 + Math.random() * 40}%`,
              animation: `sparkle ${2 + Math.random() * 3}s ease-in-out infinite alternate`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>
    );
  };

  if (showWelcome) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-900 to-black text-white text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 drop-shadow-lg neon-text">
          🎉 Happy Birthday 🎉
        </h1>
        <h2 className="text-3xl md:text-4xl mb-12 font-light text-blue-300">
          Alex & Calvin
        </h2>
        <button
          onClick={handleEnter}
          className="px-10 py-5 bg-blue-400 text-black font-bold text-2xl rounded-full shadow-lg hover:bg-blue-300 transition"
        >
          Enter
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-900 to-black text-white relative overflow-hidden">
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={800}
        />
      )}
      <audio ref={audioRef} src="/birthday-song.mp3" preload="auto"></audio>

      {/* Music toggle */}
      <button
        onClick={toggleMusic}
        className="absolute top-6 right-6 p-4 rounded-full bg-white text-blue-800 shadow-lg hover:scale-110 transition"
      >
        {isPlaying ? <Volume2 size={28} /> : <VolumeX size={28} />}
      </button>

      <Sparkles />

      {/* Cake */}
      <div className="relative flex flex-col items-center mt-24">
        {/* Candle */}
        {!candleBlown && (
          <div className="absolute -top-20 flex flex-col items-center">
            <div className="w-4 h-16 bg-white rounded-t-md relative">
              {/* Flame */}
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-3 h-6 rounded-full bg-gradient-to-t from-yellow-300 via-orange-400 to-red-500 animate-flame opacity-90 shadow-lg"></div>
            </div>
          </div>
        )}

        {/* Top Layer */}
        <div className="w-36 h-16 bg-gradient-to-r from-blue-400 to-blue-600 rounded-t-2xl shadow-md relative flex items-center justify-center overflow-hidden">
          <div className="absolute w-full h-4 bg-white rounded-b-full top-0 opacity-50 animate-drip"></div>
        </div>
        {/* Middle Layer */}
        <div className="w-48 h-20 bg-gradient-to-r from-blue-500 to-blue-700 shadow-md relative rounded-md overflow-hidden">
          <div className="absolute w-full h-4 bg-white rounded-b-full top-0 opacity-50 animate-drip"></div>
        </div>
        {/* Bottom Layer */}
        <div className="w-64 h-24 bg-gradient-to-r from-blue-600 to-blue-800 rounded-b-2xl shadow-lg relative overflow-hidden">
          <div className="absolute w-full h-6 bg-white rounded-b-full top-0 opacity-50 animate-drip"></div>
        </div>
      </div>

      {/* Blow Candle Button */}
      {!candleBlown && (
        <button
          onClick={blowCandle}
          className="mt-10 px-12 py-4 bg-blue-500 rounded-full text-lg font-semibold shadow-md hover:bg-blue-600 transition"
        >
          🎂 Make a Wish & Blow the Candle
        </button>
      )}

      {/* Final Message */}
      {candleBlown && (
        <div className="mt-14 text-4xl md:text-5xl font-extrabold text-blue-300 animate-bounce text-center drop-shadow-xl neon-text">
          ✨ Hope you guys have the most wonderful year ahead ✨
        </div>
      )}

      <style>{`
        @keyframes sparkle {
          0% { transform: translateY(0) scale(1); opacity: 0.5; }
          50% { transform: translateY(-20px) scale(1.2); opacity: 1; }
          100% { transform: translateY(-40px) scale(1); opacity: 0; }
        }

        @keyframes drip {
          0% { transform: translateY(0); opacity: 0.6; }
          50% { transform: translateY(5px); opacity: 0.8; }
          100% { transform: translateY(10px); opacity: 0.5; }
        }

        @keyframes flame {
          0%, 100% { transform: translateY(0) scaleX(1); opacity: 1; }
          50% { transform: translateY(-3px) scaleX(1.2); opacity: 0.7; }
        }

        .animate-drip { animation: drip 2s infinite ease-in-out; }
        .animate-flame { animation: flame 0.5s infinite alternate; }
        .neon-text {
          text-shadow:
            0 0 5px #3b82f6,
            0 0 10px #3b82f6,
            0 0 20px #3b82f6,
            0 0 40px #3b82f6;
        }
      `}</style>
    </div>
  );
}
