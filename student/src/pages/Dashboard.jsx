import { useState, useEffect } from "react";
import axios from "axios";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";

import { Pie, Bar } from "react-chartjs-2";

import Navbar from "../components/Navbar";
import StudentList from "./StudentList";
import AddStudent from "./AddStudent";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

function Dashboard() {
  const [page, setPage] =
    useState("dashboard");

  const [students, setStudents] =
    useState([]);

  useEffect(() => {
    getStudents();
  }, []);

  const getStudents = async () => {
    try {
      const res = await axios.get(
        " https://student-management-system-7mh3.onrender.com/api/students"
      );

      setStudents(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const totalStudents =
    students.length;

  const maleStudents =
    students.filter(
      (s) => s.gender === "Male"
    ).length;

  const femaleStudents =
    students.filter(
      (s) => s.gender === "Female"
    ).length;

  const pieData = {
    labels: [
      "Male",
      "Female",
    ],

    datasets: [
      {
        data: [
          maleStudents,
          femaleStudents,
        ],
        backgroundColor: [
          "#4f46e5",
          "#ec4899",
        ],
      },
    ],
  };

  const barData = {
    labels: [
      "Total",
      "Male",
      "Female",
    ],

    datasets: [
      {
        label: "Students",
        data: [
          totalStudents,
          maleStudents,
          femaleStudents,
        ],
        backgroundColor: [
          "#4f46e5",
          "#06b6d4",
          "#ec4899",
        ],
      },
    ],
  };

  

  return (
    <>
      <Navbar setPage={setPage} />

      {page === "dashboard" && (
        <div className="dashboard-container">

          <div className="dashboard-cards">

            <div className="card">
              <h3>Total Students</h3>
              <h1>
                {totalStudents}
              </h1>
            </div>

            <div className="card">
              <h3>Male Students</h3>
              <h1>
                {maleStudents}
              </h1>
            </div>

            <div className="card">
              <h3>Female Students</h3>
              <h1>
                {femaleStudents}
              </h1>
            </div>

          </div>

          <div className="chart-section">

            <div className="chart-card">
              <h2>
                Gender Distribution
              </h2>

              <Pie
                data={pieData}
              />
            </div>

            <div className="chart-card">
              <h2>
                Student Statistics
              </h2>

              <Bar
                data={barData}
              />
            </div>

          </div>

        </div>
      )}

      {page === "students" && (
        <StudentList />
      )}

      {page === "add" && (
        <AddStudent />
      )}
    </>
  );
}

export default Dashboard;