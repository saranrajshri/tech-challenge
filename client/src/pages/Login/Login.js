import React, { useState } from "react";
import { userLogin } from "../../actions/actions";
import "./Login.css";
import { Row, Column } from "simple-flexbox";

const Login = () => {
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const query = await userLogin(formData);
      if (query.data.success) {
        localStorage.setItem("TECH_AUTH_TOKEN", query.data.payload.token);
        localStorage.setItem(
          "TECH_USER_DATA",
          JSON.stringify(query.data.payload.user)
        );
        window.location = "/dashboard";
      } else {
        alert("something went wrong");
      }
    } catch (err) {
      alert("something went wrong");
    }
  };
  return (
    <div style={{ backgroundColor: "#ecf0f1", height: "100vh" }}>
      <Row>
        <Column flexGrow={3}></Column>
        <Column
          flexGrow={6}
          vertical="center"
          horizontal="center"
          className="login__form"
        >
          <h2 style={{ marginTop: 20 }}>Login into your account</h2>
          <input
            type="text"
            placeholder="email"
            onChange={handleChange}
            name="email"
            className="login__input"
          />
          <input
            type="password"
            placeholder="password"
            onChange={handleChange}
            name="password"
            className="login__input"
          />
          <button onClick={handleSubmit} className="login__button">
            Login
          </button>
        </Column>
        <Column flexGrow={3}></Column>
      </Row>
    </div>
  );
};

export default Login;
