import { Link } from 'react-router-dom';

export default function TeacherSessionCreate() {
  return (
    <div className="page">
      <section className="card">
        <h2>Create session</h2>
        <p className="muted">Set the class details and start attendance for the room.</p>
        <form className="form">
          <label>
            Course
            <select defaultValue="CPE102">
              <option value="CPE102">CPE102</option>
              <option value="MTH201">MTH201</option>
            </select>
          </label>
          <label>
            Room
            <input placeholder="Lecture hall / room name" />
          </label>
          <label>
            Join code
            <input placeholder="Enter join code" />
          </label>
          <div className="btn-row">
            <button className="btn primary" type="button">Start session</button>
            <Link className="btn secondary" to="/teacher/session/1/live">Go live</Link>
          </div>
        </form>
      </section>
    </div>
  );
}
