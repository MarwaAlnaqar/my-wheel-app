import React, { useState } from "react";
import prizebg from "../assets/wheelbg.png";
import { createParticipant, checkIdExists } from "../services/Users";
import WheelPopup from "./WheelPopup";
export default function SignUp() {
  const [form, setForm] = useState({
    participantId: "",
    name: "",
    email: "",
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [showAlert, setShowAlert] = useState(false);  
  const [success, setSuccess] = useState("");
  const [message, setMessage] = useState("");

  // ---------- basic (sync) validation ----------
  const validate = (values) => {
    const e = {};

    if (!values.participantId || !values.participantId.trim()) {
      e.participantId = "ID is required,if you dont have one please add 0000";
    }

    if (!values.name || !values.name.trim()) {
      e.name = "Name is required.";
    }

    if (!values.email || !values.email.trim()) {
      e.email = "Email is required.";
    } else if (!/^\S+@\S+\.\S+$/.test(values.email)) {
      e.email = "Email is invalid.";
    }

    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // clear error for this field
    setErrors((prev) => ({ ...prev, [name]: undefined, form: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    setErrors({});

    // 1) Basic validation
    const validation = validate(form);
    if (Object.keys(validation).length > 0) {
      setErrors(validation);
      return;
    }

    setSubmitting(true);

    try {
      // 2) Check if ID exists in backend
      const exists = await checkIdExists(form.email).then((data) => {
        if(data && data.exists){
             setErrors((prev) => ({
          ...prev,
          exists: data.exists,
          email: "This email already exists. Please use another one.",
        }));
        setShowAlert(true);
        setSubmitting(false);
        return true;
      }
      return false;
    });
    
console.log("ID exists:", exists);
      // 3) Create participant via API
      if (!exists) {
       
   
      console.log('should save ',{
        id: form.participantId.toLowerCase(),
        name: form.name,
        email: form.email,
      })
      const res = await createParticipant({
        id: form.participantId.toLowerCase(),
        name: form.name,
        email: form.email,
      }).then((data) => {
        console.log("Participant creation response:", data.participantId);

        if(data.participantId){
            console.log("Participant created:", data);
            // setSuccess("Checked in successfully!");
            setMessage("You have Checked in successfully!");
            setShowAlert(true);
            // show success message with alert if we want 
            setForm({
                participantId: "",
                name: "",
                email: "",
            });
        }
        else{
          setMessage(data.error || "Failed to check in. Please Make sure you haven't checked in before.");
            setShowAlert(true);
        }
      });

     

        }
        else{
          return;
        }
    } catch (err) {
      console.error("Error in handleSubmit:", err);
      if (errors.exists) {
        setErrors({ form: "This ID already registered. Please use another one." });
      } else {
        setErrors({ form: "Something went wrong. Please try again." });
      }
    } finally {
      setSubmitting(false);
    }
  };

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
        Sign Up for Check-In
        </h2>
        <form onSubmit={handleSubmit} noValidate>
          {/* ID */}
          <div style={{ marginBottom: 12, fontFamily: "Dubai-Bold" }}>
            <label htmlFor="participantId" style={labelStyle}>
              ID
            </label>
            <input
              id="participantId"
              name="participantId"
              value={form.participantId}
              onChange={handleChange}
              style={inputStyle}
              placeholder="ID Card"
              autoComplete="off"
              aria-invalid={!!errors.participantId}
              aria-describedby={
                errors.participantId ? "participantId-error" : undefined
              }
            />
            {errors.participantId && (
              <div
                id="participantId-error"
                style={errorStyle}
              >
                {errors.participantId}
              </div>
            )}
          </div>

          {/* Name */}
          <div style={{ marginBottom: 12, fontFamily: "Dubai-Bold" }}>
            <label htmlFor="name" style={labelStyle}>
              Full name
            </label>
            <input
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              style={inputStyle}
              placeholder="Name"
              autoComplete="name"
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "name-error" : undefined}
            />
            {errors.name && (
              <div id="name-error" style={errorStyle}>
                {errors.name}
              </div>
            )}
          </div>

          {/* Email */}
          <div style={{ marginBottom: 12, fontFamily: "Dubai-Bold" }}>
            <label htmlFor="email" style={labelStyle}>
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              style={inputStyle}
              placeholder="you@dwtc.com"
              autoComplete="email"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
            />
            {errors.email && (
              <div id="email-error" style={errorStyle}>
                {errors.email}
              </div>
            )}
          </div>

          {errors.form && (
            <div style={errorStyle}>
              {errors.form}
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            style={buttonStyle}
          >
            {submitting ? "Checking in..." : "Check-In"}
          </button>

          {success && (
            <div
              style={{
                marginTop: 12,
                color: "lightgreen",
                fontWeight: 600,
                fontFamily: "Dubai-Bold",
              }}
            >
              {success}
            </div>
          )}
        </form>
      </div>
  <WheelPopup
  open={showAlert}
  onClose={() => setShowAlert(false)}
  isWinnerPopup={false}
  title={message ? message : "Please Make sure you haven't checked in before."}
  buttonText="Close"
>
  {/* <p>This participant cannot register again.</p> */}
</WheelPopup>

    </div>

  );
}
