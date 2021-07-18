import React, { useState } from "react";
import { userLogin } from "../../actions/actions";

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
    <div>
      <input
        type="text"
        placeholder="email"
        onChange={handleChange}
        name="email"
      />
      <input
        type="password"
        placeholder="password"
        onChange={handleChange}
        name="password"
      />
      <button onClick={handleSubmit}>Login</button>
    </div>
  );
};

export default Login;
