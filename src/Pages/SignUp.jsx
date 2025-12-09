import React, { useState } from "react";
import prizebg from"../assets/wheelbg.png";
export default function SignUp() {
    const [form, setForm] = useState({
        id:"",
        name: "",
        email: "",
    
    });
    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState("");

    const validate = (values) => {
        const e = {};
         if (!values.id.trim()) e.name = "Id is required.";
        if (!values.name.trim()) e.name = "Name is required.";
        if (!values.email.trim()) e.email = "Email is required.";
        // simple email check
        else if (!/^\S+@\S+\.\S+$/.test(values.email)) e.email = "Email is invalid.";
        // validate only id, name and email; ensure id is unique (checked against localStorage "users")
        if (!values.id || !values.id.trim()) {
            e.id = "Id is required.";
        } else {
            try {
            const users = JSON.parse(localStorage.getItem("users") || "[]");
            if (users.some((u) => String(u.id) === String(values.id))) {
                e.id = "Id is already taken.";
            }
            } catch (err) {
            // ignore parse errors and fall back to allowing the id (or you can set a generic error)
            }
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
        // live-clear error for that field
        setErrors((prev) => ({ ...prev, [name]: undefined }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccess("");
        const validation = validate(form);
        setErrors(validation);
        if (Object.keys(validation).length > 0) return;

        setSubmitting(true);
        // fake API call
        try {
            await new Promise((r) => setTimeout(r, 900));
            // normally you'd send `form` to your backend here
            console.log("Registering user:", { name: form.name, email: form.email });
            setSuccess("Account created successfully!");
            setForm({ name: "", email: "", password: "", confirm: "" });
        } catch (err) {
            setErrors({ form: "Something went wrong. Please try again." });
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
        fontFamily: "Dubai-Bold",fontSize: 24,
        outline: '-webkit-focus-ring-color auto 0px'
    };

    const labelStyle = { display: "block", marginBottom: 4, fontWeight: 600,textAlign: 'left', fontSize: 24, };

    return (
        <div style={{ maxWidth: '100%', height:'100vh',    backgroundImage: `url(${prizebg})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
        >
               <div style={{ width: 520,  padding: '30px 16px', border: '1px solid #8b140252',
                                backgroundColor:'#8b140252',
                                    borderRadius: 15,margin:15
                 
                  }}
        >
            <h2 style={{ marginTop: 0,fontFamily: "Lobster-Regular", fontSize:32 }}>Sign Up</h2>
            <form onSubmit={handleSubmit} noValidate>
                    <div style={{ marginBottom: 12,fontFamily: "Dubai-Bold" }}>
                    <label htmlFor="id" style={labelStyle}>
                       ID
                    </label>
                    <input
                        id="id"
                        name="id"
                        value={form.id}
                        onChange={handleChange}
                        style={inputStyle}
                        placeholder="ID Card"
                        autoComplete="id"
                        aria-invalid={!!errors.id}
                        aria-describedby={errors.id ? "id-error" : undefined}
                    />
                    {errors.id && (
                        <div id="id-error" style={{ color: "crimson", fontSize: 13 }}>
                            {errors.id}
                        </div>
                    )}
                </div>
                <div style={{ marginBottom: 12 ,fontFamily: "Dubai-Bold"}}>
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
                        <div id="name-error" style={{ color: "crimson", fontSize: 13 }}>
                            {errors.name}
                        </div>
                    )}
                </div>

                <div style={{ marginBottom: 12,    fontFamily: "Dubai-Bold", }}>
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
                        <div id="email-error" style={{ color: "crimson", fontSize: 13 }}>
                            {errors.email}
                        </div>
                    )}
                </div>

             

                {errors.form && (
                    <div style={{ color: "crimson", marginBottom: 12 }}>{errors.form}</div>
                )}

                <button
                    type="submit"
                    disabled={submitting}
                    style={{
                        fontSize: 24,
                        padding: "16px",
                        borderRadius: 6,
                        border: "none",
                        background: "#b5281d",
                        color: "#fff9cf",
                        fontFamily: "Lobster-Regular",
                        cursor: submitting ? "not-allowed" : "pointer",
                       
                    }}
                >
                    {submitting ? "Check-In" : "Check-In"}
                </button>

                {success && (
                    <div style={{ marginTop: 12, color: "green", fontWeight: 600 }}>{success}</div>
                )}
            </form>
        </div>
        </div>
    );
}