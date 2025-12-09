import wheelImg from "../assets/wheel.png";
import wheelbg from "../assets/bg.jpg";
import { useEffect, useRef, useState } from "react";
import "../App.css";
const NAMES = ["Marwa", "Omar", "Sara", "Lina", "Rami", "Nour"];

export default function PrizeWheel() {
  const [currentName, setCurrentName] = useState("?");
  const [finalName, setFinalName] = useState(null);
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [winners, setWinners] = useState([]); // store winners (keep last 3)

  const intervalRef = useRef(null);
  const timeoutRef = useRef(null);

  const startSpin = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    setFinalName(null);

    // reset center text if you want
    // setCurrentName("?");

    // FAST name animation (every 80ms)
    intervalRef.current = window.setInterval(() => {
      const idx = Math.floor(Math.random() * NAMES.length);
      setCurrentName(NAMES[idx]);
    }, 80);

    // Smooth rotation for 60 seconds in ONE direction
    const fullTurns = 360 * 60; // 60 full circles
    const randomOffset = Math.floor(Math.random() * 360);

    setRotation((prev) => prev + fullTurns + randomOffset);

    // Stop after 1 minute
    timeoutRef.current = window.setTimeout(() => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }

      const winnerIndex = Math.floor(Math.random() * NAMES.length);
      const winner = NAMES[winnerIndex];

      setCurrentName(winner);
      setFinalName(winner);
      setIsSpinning(false);

      // Save winner (keep only latest 3)
      setWinners((prev) => {
        const updated = [...prev, winner];
        return updated.slice(-3);
      });
    }, 60000); // 1 minute
  };

  // Cleanup
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  // Compute last winner + rank
  let lastWinner = null;
  let rankLabel = "";
  if (winners.length > 0) {
    const lastIndex = winners.length - 1;
    lastWinner = winners[lastIndex];

    rankLabel =
      lastIndex === 0
        ? "First"
        : lastIndex === 1
        ? "Second"
        : lastIndex === 2
        ? "Third"
        : `${lastIndex + 1}th`;
  }

  return (
    <div className="app">
      {/* Winners banner at the top */}
      {lastWinner && (
        <div
          className="winner-banner"
          style={{
            backgroundImage: `url(${wheelbg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <h2 style={{ fontSize: "42px" }}>🎉 Congratulations! 🎉</h2>

          <div className="last-winner-box">
            <p>
              Our <strong>{rankLabel}</strong> winner is:&nbsp;
              <span className="winner-name">{lastWinner}</span>
            </p>
          </div>

          <button
            onClick={() => {
              // hide banner + start again
              setWinners([]);
              setFinalName(null);
              setCurrentName("?");
              startSpin();
            }}
            className="spin-btn"
        
            disabled={isSpinning}
          >
            Play Again
          </button>
        </div>
      )}

      <div className="wheel-wrapper">
        <div
          className="wheel"
          style={{ transform: `rotate(${rotation}deg)` }}
          onClick={startSpin}
        >
          <img src={wheelImg} alt="Wheel" />
        </div>

        {/* Name in the center (no rotate) */}
        <div className="wheel-name">{currentName}</div>

        <button onClick={startSpin} className="spin-btn" disabled={isSpinning}>
          {isSpinning ? "Spinning..." : "Spin"}
        </button>

        {finalName && (
          <p className="result">
            Selected: <strong>{finalName}</strong>
          </p>
        )}
      </div>
    </div>
  );
}
