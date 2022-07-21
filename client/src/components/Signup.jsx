import React, { useState } from "react";

const Signup = () => {
  const [user, setUser] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
  });

  const handleInputChange = (event) => {
    setUser({
      ...user,
      [event.target.name]: event?.target?.value,
    });
  };

  function handleSubmit(e) {
    e.preventDefault();
    const { fname, lname, email, password } = user;

    fetch('http://localhost:5000/register', {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Acces-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        fname,
        lname,
        email,
        password
      }),
    }).then((res) => res.json())
      .then((data) => {
        console.log(data, 'User Register')
      })
  }

  return (
    <div className="text-center mt-5 ">
      <form
        onSubmit={handleSubmit}
        style={{
          display: "inline-block",
          width: "400px",
        }}
      >
        <h3>Sign up</h3>

        <div className="mb-3">
          <label>First Name</label>
          <input
            type="text"
            name="fname"
            className="form-control"
            placeholder="Enter First Name"
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-3">
          <label>Last Name</label>
          <input
            type="text"
            name="lname"
            className="form-control"
            placeholder="Enter Last Name"
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-3">
          <label>Email Adress</label>
          <input
            type="email"
            name="email"
            className="form-control"
            placeholder="Enter Email"
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            placeholder="Enter Password"
            onChange={handleInputChange}
          />
        </div>

        <div className="d-grid mt-5">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
        <p className="forgot-password text-right mt-4">
          <p className="display-4" style={{ fontSize: "24px" }}>
            Already an Account?
          </p>
          <a href="/sign-in">Sign in</a>
        </p>
      </form>
    </div>
  );
};

export default Signup;
