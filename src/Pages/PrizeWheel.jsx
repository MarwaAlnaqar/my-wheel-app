import wheelImg from "../assets/wheel.png";
import wheelstand from "../assets/stand3.png";
import wheelstick from "../assets/stick.png";
import arrow from "../assets/arrow.svg";




import { useEffect, useRef, useState } from "react";
import "../App.css";
import { getParticipants, saveWinner } from "../services/Users";
import WheelPopup from "./WheelPopup";

export default function PrizeWheel() {
  const SPIN_SECONDS = 30;

  const [currentName, setCurrentName] = useState("?");
  const [finalName, setFinalName] = useState(null);
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [isStickAnimating, setIsStickAnimating] = useState(false);
  const [participants, setParticipants] = useState([]);
  const [winners, setWinners] = useState([]);
  const [timeLeft, setTimeLeft] = useState(SPIN_SECONDS);

  const intervalRef = useRef(null);
  const spinTimeoutRef = useRef(null);
  const stickTimeoutRef = useRef(null);
  const countdownRef = useRef(null);

  /* ================= STYLES ================= */

  const styles = {
    app: {
      height: "100vh",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor:'#c9a3b2'
    },

    titleMain: {
      marginTop: 8,
      padding: 20,
      fontFamily: "Lobster-Regular",
      fontSize: 54,
      color: "#B5281D",
    },

    titleSub: {
      marginTop: 0,
      padding: 20,
      fontFamily: "Lobster-Regular",
      fontSize: 48,
      color: "#B5281D",
    },

    centerRow: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 40,
      width: "100%",
      flex: 1,
    },

    nameBox: {
      width: 420,
      padding: "24px 16px",
      backgroundColor: "#8b140252",
      borderRadius: 15,
      textAlign: "center",
    },

    nameText: {
      fontFamily: "Lobster-Regular",
      fontSize: 32,
      zIndex: 1000,
    },

    wheelWrapper: {
      height: "55vh",
      maxHeight: 500,
      position: "relative",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },

    wheel: {
      zIndex: 100,
    },

    stand: {
      position: "absolute",
      top: "88%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: 420,
      height: 300,
      zIndex: 0,
    },

    timer: {
      marginTop: 6,
      fontSize: 22,
      fontWeight: "bold",
      color: "#B5281D",
    },
  };

  /* ================= LOGIC ================= */

  const getRankLabel = (n) =>
    n === 1 ? "First" : n === 2 ? "Second" : n === 3 ? "Third" : `${n}th`;

  const clearCountdown = () => {
    if (countdownRef.current) {
      clearInterval(countdownRef.current);
      countdownRef.current = null;
    }
  };

  useEffect(() => {
    getParticipants().then(setParticipants);

    return () => {
      clearInterval(intervalRef.current);
      clearTimeout(spinTimeoutRef.current);
      clearTimeout(stickTimeoutRef.current);
      clearCountdown();
    };
  }, []);

  const startSpin = () => {
    if (isSpinning || !participants.length) return;

    setIsSpinning(true);
    setFinalName(null);
    setTimeLeft(SPIN_SECONDS);

    countdownRef.current = setInterval(() => {
      setTimeLeft((t) => (t <= 1 ? 0 : t - 1));
    }, 1000);

    intervalRef.current = setInterval(() => {
      const idx = Math.floor(Math.random() * participants.length);
      setCurrentName(participants[idx].name);
    }, 80);

    setRotation((r) => r + 360 * 30 + Math.random() * 360);

    spinTimeoutRef.current = setTimeout(() => {
      clearInterval(intervalRef.current);
      clearCountdown();

      const winner = participants[Math.floor(Math.random() * participants.length)];
      const rankLabel = getRankLabel(winners.length + 1);

      setCurrentName(winner.name);
      setFinalName({ ...winner, rankLabel });
      setIsSpinning(false);
      setTimeLeft(0);

      saveWinner({
        id: winner.participantId,
        name: winner.name,
        email: winner.email,
        rankLabel,
      });

      setWinners((prev) => [...prev, winner].slice(-3));
    }, SPIN_SECONDS * 1000);
  };

  const handleStickClick = () => {
    if (isSpinning || isStickAnimating) return;

    setIsStickAnimating(true);
    stickTimeoutRef.current = setTimeout(() => {
      setIsStickAnimating(false);
      startSpin();
    }, 1000);
  };

  const handleCloseWinnerPopup = () => {
    setFinalName(null);
    setCurrentName("?");
    setTimeLeft(SPIN_SECONDS);
    setWinners([]);
  };

  /* ================= UI ================= */

  return (
    <div style={styles.app}>
      <h2 style={styles.titleMain}>Alloha!</h2>
      <h2 style={styles.titleSub}>Let's use our lucky prize wheel!</h2>

      {finalName && (
        <WheelPopup
          open
          onClose={handleCloseWinnerPopup}
          title="Congratulations!"
          winnerName={finalName.name}
          rankLabel={finalName.rankLabel}
          buttonText="Play Again"
          isWinnerPopup
        />
      )}

      <div style={styles.centerRow}>
        <div style={styles.nameBox}>
          <div style={styles.nameText}>{currentName}</div>
        </div>

        <div style={styles.wheelWrapper}>
          <div
            className="wheel"
            style={{ ...styles.wheel, transform: `rotate(${rotation}deg)` }}
          >
            <img src={wheelImg} alt="Wheel" />
          </div>
       <img
            src={arrow}
            alt="Stick"
          style={{top: '10%',
    left: '100%',
 
    rotate: '-18deg'
}}
            className={`wheel-stick `}
          />
          <img
            src={wheelstick}
            alt="Stick"
            onClick={handleStickClick}
            className={`wheel-stick ${isStickAnimating ? "stick-animating" : ""}`}
          />

          <img src={wheelstand} alt="Stand" style={styles.stand} />

          <div style={styles.timer}>
            {isSpinning ? `${timeLeft}s` : ""}
          </div>
        </div>
      </div>
    </div>
  );
}
