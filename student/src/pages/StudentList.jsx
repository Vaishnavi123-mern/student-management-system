import { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function StudentList() {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const getStudents = async () => {
    try {
      const res = await axios.get(
        "https://student-management-system-7mh3.onrender.com/api/students"
      );
      setStudents(res.data);
    } catch (err) {
      console.error("Error fetching students:", err);
    }
  };

  useEffect(() => {
    getStudents();
  }, []);

  const editStudent = (student) => {
    navigate("/edit", { state: student });
  };

  const deleteStudent = async (id) => {
    if (!window.confirm("Delete Student?")) return;
    await axios.delete(
      `https://student-management-system-7mh3.onrender.com/api/students/${id}`
    );
    getStudents();
  };

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="table-container">
      <div className="table-header">
        <h2>Student List</h2>
        <input
          type="text"
          placeholder="Search Student..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <table>
        <thead>
          <tr>
            <th>Photo</th>
            <th>Name</th>
            <th>Roll No</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Gender</th>
            <th>Graduation</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.map((student) => (
            <tr key={student._id}>
              <td>
                <img
                  src={`https://student-management-system-7mh3.onrender.com/uploads/${student.photo}`}
                  alt="Student"
                  width="60"
                  height="60"
                  style={{ borderRadius: "50%", objectFit: "cover" }}
                  onError={(e) => {
                    
                    e.target.src =
                      student.gender === "Female"
                        ? "https://cdn-icons-png.flaticon.com/512/3135/3135768.png"
                        : "https://cdn-icons-png.flaticon.com/512/3135/3135715.png";
                  }}
                />
              </td>
              <td>{student.name}</td>
              <td>{student.rollNo}</td>
              <td>{student.email}</td>
              <td>{student.phone}</td>
              <td>{student.gender}</td>
              <td>{student.graduation}</td>
              <td>
                <button className="edit-btn" onClick={() => editStudent(student)}>
                  <FaEdit />
                </button>
                <button
                  className="delete-btn"
                  onClick={() => deleteStudent(student._id)}
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StudentList;