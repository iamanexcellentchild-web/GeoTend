import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function AuthPage({ type }) {
  const isRegister = type === "register";
  const navigate = useNavigate();
  const [role, setRole] = useState(() => localStorage.getItem("geoRole") || "");
  const [verified, setVerified] = useState(
    () => localStorage.getItem("geoVerified") === "true",
  );
  const [name, setName] = useState(() => localStorage.getItem("geoName") || "");
  const [email, setEmail] = useState(
    () => localStorage.getItem("geoEmail") || "",
  );
  const [phone, setPhone] = useState(
    () => localStorage.getItem("geoPhone") || "",
  );
  const [avatar, setAvatar] = useState(
    () => localStorage.getItem("geoAvatar") || "",
  );

  const handlePhotoChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setAvatar(reader.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = () => {
    if (isRegister) {
      if (role) {
        localStorage.setItem("geoRole", role);
      }
      if (name) localStorage.setItem("geoName", name);
      if (email) localStorage.setItem("geoEmail", email);
      if (phone) localStorage.setItem("geoPhone", phone);
      if (avatar) localStorage.setItem("geoAvatar", avatar);
      localStorage.setItem("geoVerified", "false");
      setVerified(false);
      navigate("/login");
      return;
    }

    if (!verified) {
      return;
    }

    if (email) localStorage.setItem("geoEmail", email);

    const selectedRole = role || localStorage.getItem("geoRole") || "teacher";
    localStorage.setItem("geoRole", selectedRole);
    navigate(
      selectedRole === "student" ? "/student/dashboard" : "/teacher/dashboard",
    );
  };

  const handleVerify = () => {
    localStorage.setItem("geoVerified", "true");
    setVerified(true);
  };
  return (
    <div className="page">
      <div style={{ maxWidth: "500px", margin: "60px auto" }}>
        <div style={{ textAlign: "center", marginBottom: "50px" }}>
          <h1
            style={{
              fontSize: "32px",
              fontWeight: "800",
              color: "#0d2f4f",
              margin: "0 0 12px",
              letterSpacing: "-0.5px",
            }}
          >
            {isRegister ? "Get Started" : "Welcome Back"}
          </h1>
          <p
            style={{
              fontSize: "16px",
              color: "#6e8090",
              margin: "0",
              maxWidth: "400px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            {isRegister
              ? "Create your account to access intelligent attendance tracking"
              : "Sign in to your account to continue"}
          </p>
        </div>

        <div
          className="card"
          style={{ boxShadow: "0 4px 16px rgba(0, 85, 179, 0.08)" }}
        >
          <form className="form" style={{ gap: "18px" }}>
            {isRegister && (
              <label style={{ textAlign: "center" }}>
                <span
                  style={{
                    display: "block",
                    marginBottom: "10px",
                    fontWeight: "500",
                    color: "#0d2f4f",
                  }}
                >
                  Profile Photo
                </span>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <div
                    style={{
                      width: "84px",
                      height: "84px",
                      borderRadius: "50%",
                      overflow: "hidden",
                      background: avatar
                        ? "transparent"
                        : "linear-gradient(135deg, #0055b3 0%, #14b8a6 100%)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#fff",
                      fontWeight: "700",
                      fontSize: "28px",
                      border: "1px solid #d7e1eb",
                    }}
                  >
                    {avatar ? (
                      <img
                        src={avatar}
                        alt="Profile preview"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      (name.trim()[0] || "?").toUpperCase()
                    )}
                  </div>
                  <label
                    className="btn secondary"
                    style={{
                      cursor: "pointer",
                      padding: "8px 14px",
                      fontSize: "14px",
                    }}
                  >
                    Upload photo
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoChange}
                      style={{ display: "none" }}
                    />
                  </label>
                </div>
              </label>
            )}

            {isRegister && (
              <label>
                <span
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    fontWeight: "500",
                    color: "#0d2f4f",
                  }}
                >
                  Full Name
                </span>
                <input
                  placeholder="John Doe"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  style={{
                    padding: "12px 14px",
                    borderRadius: "10px",
                    border: "1px solid #d7e1eb",
                    backgroundColor: "#f9fbfd",
                  }}
                />
              </label>
            )}

            <label>
              <span
                style={{
                  display: "block",
                  marginBottom: "8px",
                  fontWeight: "500",
                  color: "#0d2f4f",
                }}
              >
                University Email
              </span>
              <input
                placeholder="your.email@unilag.edu.ng"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                style={{
                  padding: "12px 14px",
                  borderRadius: "10px",
                  border: "1px solid #d7e1eb",
                  backgroundColor: "#f9fbfd",
                }}
              />
            </label>

            {isRegister && (
              <label>
                <span
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    fontWeight: "500",
                    color: "#0d2f4f",
                  }}
                >
                  Phone Number
                </span>
                <input
                  placeholder="080X XXX XXXX"
                  type="tel"
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  style={{
                    padding: "12px 14px",
                    borderRadius: "10px",
                    border: "1px solid #d7e1eb",
                    backgroundColor: "#f9fbfd",
                  }}
                />
              </label>
            )}
            <label>
              <span
                style={{
                  display: "block",
                  marginBottom: "8px",
                  fontWeight: "500",
                  color: "#0d2f4f",
                }}
              >
                Account Type
              </span>
              <select
                value={role}
                onChange={(event) => setRole(event.target.value)}
                style={{
                  padding: "12px 14px",
                  borderRadius: "10px",
                  border: "1px solid #d7e1eb",
                  backgroundColor: "#f9fbfd",
                  cursor: "pointer",
                }}
              >
                <option value="" disabled>
                  Select account type
                </option>
                <option value="student">Student</option>
                <option value="teacher">Instructor</option>
              </select>
            </label>

            <label>
              <span
                style={{
                  display: "block",
                  marginBottom: "8px",
                  fontWeight: "500",
                  color: "#0d2f4f",
                }}
              >
                Password
              </span>
              <input
                type="password"
                placeholder={
                  isRegister
                    ? "Create a strong password"
                    : "Enter your password"
                }
                style={{
                  padding: "12px 14px",
                  borderRadius: "10px",
                  border: "1px solid #d7e1eb",
                  backgroundColor: "#f9fbfd",
                }}
              />
            </label>

            <div style={{ marginTop: "8px" }}>
              {!isRegister && !verified && (
                <button
                  className="btn secondary"
                  type="button"
                  onClick={handleVerify}
                  style={{ width: "100%", marginBottom: "12px" }}
                >
                  Verify Email
                </button>
              )}
              <button
                className="btn primary"
                type="button"
                onClick={handleSubmit}
                style={{ width: "100%" }}
              >
                {isRegister
                  ? "Create Account"
                  : verified
                    ? "Sign In"
                    : "Awaiting Verification"}
              </button>
            </div>

            <div style={{ textAlign: "center", marginTop: "16px" }}>
              <Link
                to={isRegister ? "/login" : "/register"}
                style={{
                  fontSize: "14px",
                  color: "#0055b3",
                  textDecoration: "none",
                  fontWeight: "500",
                  hover: { textDecoration: "underline" },
                }}
              >
                {isRegister
                  ? "Already have an account? Sign in"
                  : "Don't have an account? Register"}
              </Link>
            </div>
          </form>
        </div>

        <p
          style={{
            textAlign: "center",
            fontSize: "12px",
            color: "#9ca3af",
            marginTop: "30px",
          }}
        >
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
}
