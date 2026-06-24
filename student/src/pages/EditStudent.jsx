import axios from "axios";

import { useState } from "react";
import {
  useLocation,
  useNavigate
} from "react-router-dom";

function EditStudent() {

  const location = useLocation();
  const navigate = useNavigate();

  const [student, setStudent] =
    useState(location.state);

  const [photo, setPhoto] =
    useState(null);

  const handleChange = (e) => {

    setStudent({
      ...student,
      [e.target.name]:
        e.target.value,
    });

  };

  const updateStudent =
    async (e) => {

      e.preventDefault();
console.log(student._id);
      try {

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

        if (photo) {

          formData.append(
            "photo",
            photo
          );

        }

        await axios.put(
          ` https://student-management-system-7mh3.onrender.com/api/students/${student._id}`,
          formData
        );

        alert(
          "Student Updated Successfully"
        );

        navigate("/");

      } catch (error) {

        console.log(error);

        alert(
          "Update Failed"
        );

      }

    };

  return (

    <div className="form-container">

      <h2>Edit Student</h2>

      <img
        src={` https://student-management-system-7mh3.onrender.com/uploads/${student.photo}`}
        alt=""
        width="100"
        height="100"
        style={{
          borderRadius: "50%",
          objectFit: "cover",
          marginBottom: "15px"
        }}
      />

      <form
        onSubmit={updateStudent}
      >

        <input
          type="text"
          name="name"
          value={student.name}
          onChange={handleChange}
          placeholder="Student Name"
        />

        <input
          type="text"
          name="rollNo"
          value={student.rollNo}
          onChange={handleChange}
          placeholder="Roll Number"
        />

        <input
          type="email"
          name="email"
          value={student.email}
          onChange={handleChange}
          placeholder="Email"
        />

        <input
          type="text"
          name="phone"
          value={student.phone}
          onChange={handleChange}
          placeholder="Phone"
        />

        <select
          name="gender"
          value={student.gender}
          onChange={handleChange}
        >
          <option value="">
            Select Gender
          </option>

          <option value="Male">
            Male
          </option>

          <option value="Female">
            Female
          </option>
        </select>

        <input
          type="text"
          name="graduation"
          value={student.graduation}
          onChange={handleChange}
          placeholder="Course"
        />

        <input
          type="file"
          onChange={(e) =>
            setPhoto(
              e.target.files[0]
            )
          }
        />
<button
  type="submit"
  className="submit-btn"
>
  Update Student
</button>

      </form>

    </div>

  );
}

export default EditStudent;