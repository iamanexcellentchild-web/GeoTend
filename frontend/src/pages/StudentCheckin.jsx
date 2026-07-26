import { Link } from 'react-router-dom';

export default function StudentCheckin() {
  return (
    <div className="page">
      <section className="card">
        <h2>Attendance check-in</h2>
        <p className="muted">Your attendance is now being prepared for the active session.</p>
        <div className="list" style={{ marginTop: 16 }}>
          <div className="list-item"><span>Session</span><span className="badge">CPE102</span></div>
          <div className="list-item"><span>Status</span><span className="badge">Ready</span></div>
        </div>
        <div className="btn-row">
          <button className="btn primary" type="button">Confirm attendance</button>
          <Link className="btn secondary" to="/student/history">View history</Link>
        </div>
      </section>
    </div>
  );
}
