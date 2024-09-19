import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import '../css/cousre.css'; // Ensure this path is correct

function Course() {
  let navigate = useNavigate();
  const [courses, setCourses] = useState([]);

  const getCourses = async () => {
    await fetch("http://localhost:8000/getoffer", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setCourses(data);
      });
  };

  useEffect(() => {
    getCourses();
  }, []);

  const { id } = useParams();
  console.log({ id });

  console.log(courses);
  const course = courses.filter((cours) => cours._id === id);
  console.log(course);
  if (!course) {
    return <div>Loading...</div>;
  }

  return (
    <div className="course-container">
      {course.map((course) => (
        <div key={course._id} className="course-card">
          <h2>{course.name}</h2>
          <img src={course.image} alt={course.name} />
          <p>{course.description}</p>
          <p>Price: {course.price}</p>
          <div>
            <Link to={`/application/${course._id}`}>
              <button className="enroll-button">
                Enroll now
              </button>
            </Link>
          </div>
        </div>
      ))}
      <div style={{ flex: "1 1 30%", maxWidth: "300px" }}></div>
    </div>
  );
}

export default Course;
