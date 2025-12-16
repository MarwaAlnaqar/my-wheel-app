// WheelPopup.jsx
import React from "react";
import Popup from "reactjs-popup";
import popbg from "../assets/popbg.png";
import wheelbg from "../assets/bg.jpg";

const WheelPopup = ({
  open,
  onClose,
  title = "Congratulations!",
  subtitle,
  winnerName,
  rankLabel,
  isWinnerPopup = true, // true = golden winner popup, false = alert popup
  buttonText = "Okay, got it",
  children,
}) => {
  const baseButton = {
    outline: "none",
    fontSize: 34,
    padding: "8px",
    borderRadius: 6,
    border: "none",
    fontFamily: "Lobster-Regular",
    cursor: "pointer",
  };

  const buttonStyle = {
    ...baseButton,
        background: "rgb(255,255,255)",
    color: "rgba(139, 20, 2, 0.9)",
  };

  const buttonAlertStyle = {
    ...baseButton,
    background: "rgb(255,255,255)",
    color: "rgb(22,22,22)",
  };

  const contentStyleWinner = {
    // backgroundImage: `url(${popbg})`,
    backgroundColor: `rgba(139, 20, 2, 0.4)`,

    backgroundSize: "cover",
    backgroundPosition: "center",
    padding: "24px 0px",
    maxWidth: "920px",
    height: "300px",
    width: "90%",
    borderRadius: 15,
    color: "#e5e7eb",
    boxShadow: "0 20px 50px rgba(0,0,0,0.6)",
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

  };

  const contentStyleAlert = {
    backgroundColor: "#570b0bd9",
 padding: "24px 0px",
    maxWidth: "920px",
    width: "90%",
    borderRadius: 15,
    color: "#e5e7eb",
    boxShadow: "0 20px 50px rgba(0,0,0,0.6)",
  };

  return (
    <Popup
      open={open}
      onClose={onClose}
      modal
      nested
      overlayStyle={{
        background: "rgba(15, 23, 42, 0.8)",
        backdropFilter: "blur(4px)",zIndex:50000
      }}
      contentStyle={isWinnerPopup ? contentStyleWinner : contentStyleAlert}
    >
      <div className="winner-popup">
        {/* Uncomment if you want an X close icon */}
        {/* 
        <button
          className="winner-popup-close"
          onClick={onClose}
          aria-label="Close popup"
        >
          ✕
        </button>
        */}

        <h2 className="winner-popup-title">{title}</h2>

        {subtitle && <p className="winner-popup-subtitle">{subtitle}</p>}

        {/* Auto winner layout if props exist */}
        {rankLabel && winnerName && (
          <>
            {/* <p className="winner-popup-subtitle">
              Our  
              <span className="winner-popup-rank">
                {rankLabel} 

              </span>
                winner is
            </p> */}
            <div className="winner-popup-name">{winnerName}</div>
          </>
        )}

        {/* EXTRA CONTENT passed from parent */}
        {children}

        <button
          style={isWinnerPopup ? buttonStyle : buttonAlertStyle}
          onClick={onClose}
        >
          {buttonText}
        </button>
      </div>
    </Popup>
  );
};

export default WheelPopup;
