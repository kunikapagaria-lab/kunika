import { useState, useEffect, useRef } from "react";
import Confetti from "react-confetti";
import { Fireworks } from "@fireworks-js/react"; // Import fireworks
import { Volume2, VolumeX } from "lucide-react";
import BirthdayBg from "./assets/BirthdayBg.jpg"; // Import background image
import p1 from "./assets/p1.jpg";
import p2 from "./assets/p2.jpg";
import bgMusic from "./assets/BgMusic.mp3"; // Import bg music

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
    if (audioRef.current) {
      audioRef.current.loop = true;
    }
  }, []);

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
      <div
        className="min-h-screen flex flex-col items-center justify-center text-white text-center bg-cover bg-center relative"
        style={{ backgroundImage: `url(${BirthdayBg})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-70"></div>
        <div className="relative z-10 flex flex-col items-center">
          <div className="flex gap-4 mb-6">
            <img
              src={p1}
              alt="Person 1"
              className="w-24 h-24 object-cover rounded-full border-4 border-white shadow-lg"
            />
            <img
              src={p2}
              alt="Person 2"
              className="w-24 h-24 object-cover rounded-full border-4 border-white shadow-lg"
            />
          </div>
          <h1 className="text-6xl md:text-7xl font-extrabold mb-6 drop-shadow-lg neon-text">
            Happy Birthday
          </h1>
          <h2 className="text-4xl md:text-5xl mb-12 font-semibold text-blue-300">
            Alex & Calvin
          </h2>
          <button
            onClick={handleEnter}
            className="px-10 py-5 bg-blue-400 text-black font-bold text-2xl rounded-full shadow-lg hover:bg-blue-300 transition"
          >
            Enter
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center text-white relative overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: `url(${BirthdayBg})` }}
    >
      {showConfetti && (
        <>
          <Confetti
            width={window.innerWidth}
            height={window.innerHeight}
            recycle={false}
            numberOfPieces={800}
          />
          <Fireworks className="absolute inset-0 pointer-events-none" />
        </>
      )}

      <audio ref={audioRef} src={bgMusic} preload="auto"></audio>

      <button
        onClick={toggleMusic}
        className="absolute top-6 right-6 p-4 rounded-full bg-white text-blue-800 shadow-lg hover:scale-110 transition"
      >
        {isPlaying ? <Volume2 size={28} /> : <VolumeX size={28} />}
      </button>

      <Sparkles />

      <div className="relative flex flex-col items-center mt-24 z-10">
        <div className="absolute -top-20 flex flex-col items-center">
          <div className="w-4 h-16 bg-white rounded-t-md relative">
            {!candleBlown && (
              <div className="absolute -top-6 left-[0.2rem] transform -translate-x-1/2 w-3 h-6 rounded-full bg-gradient-to-t from-yellow-300 via-orange-400 to-red-500 animate-flame opacity-90 shadow-lg"></div>
            )}
          </div>
        </div>

        <div className="w-36 h-16 bg-gradient-to-r from-blue-400 to-blue-600 rounded-t-2xl shadow-md relative flex items-center justify-center overflow-hidden">
          <div className="absolute w-full h-4 bg-white rounded-b-full top-0 opacity-50 animate-drip"></div>
        </div>

        <div className="w-48 h-20 bg-gradient-to-r from-blue-500 to-blue-700 shadow-md relative rounded-md overflow-hidden">
          <div className="absolute w-full h-4 bg-white rounded-b-full top-0 opacity-50 animate-drip"></div>
        </div>

        <div className="w-64 h-24 bg-gradient-to-r from-blue-600 to-blue-800 rounded-b-2xl shadow-lg relative overflow-hidden">
          <div className="absolute w-full h-6 bg-white rounded-b-full top-0 opacity-50 animate-drip"></div>
        </div>
      </div>

      {!candleBlown && (
        <button
          onClick={blowCandle}
          className="mt-10 px-12 py-4 bg-blue-500 rounded-full text-lg font-semibold shadow-md hover:bg-blue-600 transition z-10"
        >
          🎂 Make a Wish & Blow the Candle
        </button>
      )}

      {candleBlown && (
        <div className="mt-14 text-3xl md:text-4xl font-extrabold text-blue-300 animate-bounce text-center drop-shadow-xl neon-text z-10">
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
