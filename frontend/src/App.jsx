import { useEffect, useRef, useState } from "react";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
  Link,
} from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import TeacherDashboard from "./pages/TeacherDashboard";
import TeacherSessionCreate from "./pages/TeacherSessionCreate";
import TeacherSessionLive from "./pages/TeacherSessionLive";
import TeacherAnalytics from "./pages/TeacherAnalytics";
import TeacherAnnouncements from "./pages/TeacherAnnouncements";
import StudentDashboard from "./pages/StudentDashboard";
import StudentJoin from "./pages/StudentJoin";
import StudentCheckin from "./pages/StudentCheckin";
import StudentHistory from "./pages/StudentHistory";
import OfflineIndicator from "./components/OfflineIndicator";

function ProfileMenu({ onLoggedOut }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  const name = localStorage.getItem("geoName") || "GeoTend User";
  const email = localStorage.getItem("geoEmail") || "No email on file";
  const phone = localStorage.getItem("geoPhone") || "No phone number on file";
  const avatar = localStorage.getItem("geoAvatar") || "";
  const initial = (name.trim()[0] || "?").toUpperCase();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("geoVerified");
    setOpen(false);
    onLoggedOut();
    navigate("/login");
  };

  return (
    <div className="profile-menu" ref={menuRef}>
      <button
        type="button"
        className="profile-trigger"
        onClick={() => setOpen((value) => !value)}
        aria-haspopup="true"
        aria-expanded={open}
        aria-label="Open profile menu"
      >
        {avatar ? (
          <img src={avatar} alt="Profile" className="profile-avatar" />
        ) : (
          <span className="profile-avatar profile-avatar-fallback">
            {initial}
          </span>
        )}
      </button>

      {open && (
        <div className="profile-dropdown" role="menu">
          <div className="profile-dropdown-header">
            {avatar ? (
              <img src={avatar} alt="Profile" className="profile-avatar-lg" />
            ) : (
              <span className="profile-avatar-lg profile-avatar-fallback">
                {initial}
              </span>
            )}
            <div>
              <strong>{name}</strong>
            </div>
          </div>
          <div className="profile-dropdown-body">
            <div className="profile-field">
              <span className="profile-field-label">Phone</span>
              <span className="profile-field-value">{phone}</span>
            </div>
            <div className="profile-field">
              <span className="profile-field-label">Email</span>
              <span className="profile-field-value">{email}</span>
            </div>
          </div>
          <button
            type="button"
            className="btn secondary profile-logout"
            onClick={handleLogout}
          >
            Log out
          </button>
        </div>
      )}
    </div>
  );
}

function Shell({ children }) {
  const location = useLocation();
  const isRegister = location.pathname === "/register";
  const isLogin = location.pathname === "/login";
  const [isAuthed, setIsAuthed] = useState(
    () => localStorage.getItem("geoVerified") === "true",
  );

  useEffect(() => {
    setIsAuthed(localStorage.getItem("geoVerified") === "true");
  }, [location.pathname]);

  return (
    <div className="app-shell">
      <OfflineIndicator />
      <header className="topbar">
        <div>
          <p className="eyebrow">UNILAG classroom attendance</p>
          <h1>GeoTend</h1>
        </div>
        {isAuthed ? (
          <ProfileMenu onLoggedOut={() => setIsAuthed(false)} />
        ) : (
          <nav className="top-nav" aria-label="Primary">
            <Link to="/register" className={isRegister ? "active" : ""}>
              Register
            </Link>
            <Link to="/login" className={isLogin ? "active" : ""}>
              Login
            </Link>
          </nav>
        )}
      </header>
      {children}
    </div>
  );
}

export default function App() {
  return (
    <Shell>
      <Routes>
        <Route path="/" element={<Navigate to="/register" replace />} />
        <Route path="/login" element={<AuthPage type="login" />} />
        <Route path="/register" element={<AuthPage type="register" />} />
        <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
        <Route path="/teacher/session/new" element={<TeacherSessionCreate />} />
        <Route
          path="/teacher/session/:id/live"
          element={<TeacherSessionLive />}
        />
        <Route
          path="/teacher/session/:id/analytics"
          element={<TeacherAnalytics />}
        />
        <Route
          path="/teacher/course/:id/announcements"
          element={<TeacherAnnouncements />}
        />
        <Route path="/student/dashboard" element={<StudentDashboard />} />
        <Route path="/student/join" element={<StudentJoin />} />
        <Route
          path="/student/session/:id/checkin"
          element={<StudentCheckin />}
        />
        <Route path="/student/history" element={<StudentHistory />} />
      </Routes>
    </Shell>
  );
}
