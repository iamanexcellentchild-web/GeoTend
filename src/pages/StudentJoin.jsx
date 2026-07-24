import { Link } from 'react-router-dom';

export default function StudentJoin() {
  return (
    <div className="page">
      <section className="card">
        <h2>Join session</h2>
        <p className="muted">Enter the room code to continue into attendance.</p>
        <form className="form">
          <label>
            Join code
            <input placeholder="Enter join code" />
          </label>
          <div className="btn-row">
            <Link className="btn primary" to="/student/session/1/checkin">Continue</Link>
            <Link className="btn secondary" to="/student/dashboard">Back</Link>
          </div>
        </form>
      </section>
    </div>
  );
}
