import { FaGraduationCap } from "react-icons/fa";

function Navbar({ setPage }) {
  return (
    <nav className="navbar">

      <div className="logo">

        <FaGraduationCap className="cap" />

        <div>
          <h2>Student Management System</h2>
          <p>Smart Portal</p>
        </div>

      </div>

      <div className="menu">

        <button
          onClick={() => setPage("dashboard")}
        >
          Dashboard
        </button>

        <button
          onClick={() => setPage("students")}
        >
          Student List
        </button>

        <button
          onClick={() => setPage("add")}
        >
          Add Student
        </button>

       

      </div>

    </nav>
  );
}

export default Navbar;