import { useState } from "react";
import axios from "axios";

function AddStudent() {
const [photo, setPhoto] = useState(null);
  const [student, setStudent] =
    useState({
      name: "",
      rollNo: "",
      studentClass: "",
      email: "",
      phone: "",
      gender: "",
      graduation: "",
    });

  const handleChange = (e) => {
    setStudent({
      ...student,
      [e.target.name]: e.target.value,
    });
  };

  const addStudent = async (e) => {
  e.preventDefault();

  const formData =
    new FormData();

  formData.append(
    "name",
    student.name
  );

  formData.append(
    "rollNo",
    student.rollNo
  );

  formData.append(
    "email",
    student.email
  );

  formData.append(
    "phone",
    student.phone
  );

  formData.append(
    "gender",
    student.gender
  );

  formData.append(
    "graduation",
    student.graduation
  );

  formData.append(
    "photo",
    photo
  );

  await axios.post(
    " https://student-management-system-7mh3.onrender.com/api/students",
    formData
  );

  alert("Student Added");
};

  return (
    <div className="form-container">

      <h2>Add Student</h2>

      <form onSubmit={addStudent}>

        <input
          name="name"
          placeholder="Student Name"
          value={student.name}
          onChange={handleChange}
        />

        <input
          name="rollNo"
          placeholder="Roll Number"
          value={student.rollNo}
          onChange={handleChange}
        />

       

        <input
          name="email"
          placeholder="Email"
          value={student.email}
          onChange={handleChange}
        />

        <input
          name="phone"
          placeholder="Phone"
          value={student.phone}
          onChange={handleChange}
        />

        <select
          name="gender"
          value={student.gender}
          onChange={handleChange}
        >
          <option>Gender</option>
          <option>Male</option>
          <option>Female</option>
        </select>
      


        <input
          name="graduation"
          placeholder="Graduation"
          value={student.graduation}
          onChange={handleChange}
        />

        <input
  type="file"
  onChange={(e) =>
    setPhoto(e.target.files[0])
  }
/>

        <button>
          Add Student
        </button>

      </form>

    </div>
  );
}

export default AddStudent;