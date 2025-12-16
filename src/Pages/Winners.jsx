import React, { useState,useEffect } from "react";
import prizebg from "../assets/wheelbg.png";
import { getWinners } from "../services/Users";
import WheelPopup from "./WheelPopup";
export default function Winners() {
  

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [showAlert, setShowAlert] = useState(false);  
  const [success, setSuccess] = useState("");
  const [winners, setWinners] = useState([]);


  // ---------- basic (sync) validation ----------
   useEffect(() => {
      const fetchWinners = async () => {
        try {
          const data = await getWinners(); // [{ id, name, email, ... }]
          setWinners(data);
          console.log("Fetched winners:", data);
        } catch (err) {
          console.error("Error fetching winners:", err);
        }
      };
  
      fetchWinners();
  
    }, []);



  const inputStyle = {
    display: "block",
    width: "100%",
    padding: "16px 8px",
    marginBottom: 8,
    borderRadius: 4,
    border: "1px solid #ccc",
    boxSizing: "border-box",
    fontFamily: "Dubai-Bold",
    fontSize: 24,
    outline: "none",
  };

  const labelStyle = {
    display: "block",
    marginBottom: 4,
    fontWeight: 600,
    textAlign: "left",
    fontSize: 24,
  };
;
    
    
  const errorStyle = {
    fontSize: 20,fontFamily: 'Lobster-Regular',color: '#000000',
  }

  const containerStyle = {
    maxWidth: "100%",
    height: "100vh",
    backgroundImage: `url(${prizebg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const formStyle = {
    width: 520,
    padding: "30px 16px",
    border: "1px solid #8b140252",
    backgroundColor: "#8b140252",
    borderRadius: 15,
    margin: 15,
    textAlign: "center",
  };
  const getIndex=(index)=>{
    if (index === 0) return "First ";
    if (index === 1) return "Second ";
    if (index === 2) return "Third ";
    return `${index + 1}th`;
  }
const buttonStyle={   fontSize: 24,
              padding: "16px",
              borderRadius: 6,
              border: "none",
              background: "#b5281d",
              color: "#fff9cf",
              fontFamily: "Lobster-Regular",
              cursor: submitting ? "not-allowed" : "pointer",};
  return (
    <div style={containerStyle}>
      <div style={formStyle}>
        <h2 style={{ marginTop: 0, fontFamily: "Lobster-Regular", fontSize: 42,color:'#B5281D' }}>
           Alloha!
        </h2>
        <h2 style={{ marginTop: 0, fontFamily: "Lobster-Regular", fontSize: 32}}>
        Our Winners 
        </h2>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", fontFamily: "Lobster-Regular", fontSize: 32 }}>

          <ul>
            {[...winners].reverse().map((winner, index) => (
              <li style={{listStyle: "none"}} key={winner.id}>
                {getIndex(index)} winner: {winner.name}
              </li>
            ))}
          </ul>

        </div>
      </div>


    </div>

  );
}
