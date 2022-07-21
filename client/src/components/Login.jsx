import React, { useState } from "react";

const Login = () => {
  const [loginUser, setLoginUser] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (event) => {
    setLoginUser({
      ...loginUser,
      [event.target.name]: event?.target?.value,
    });
  };

  const handleLoginSubmit = (event) => {
    event.preventDefault();

    const { email, password } = loginUser;

    fetch('http://localhost:5000/login-user', {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Acces-Control-Allow-Origin": '*',
      },
      body: JSON.stringify({
        email,
        password
      })
    }).then((res) => res.json())
      .then((data) => {
        console.log(data, 'User Logged in');
        if(data.status === 'ok'){
          alert('Login Successfully');
          window.localStorage.setItem("token", data.data);
          window.location.href='./userDetail'
        }
      })



  };

  return (
    <div className="text-center mt-5">
      <form onSubmit={handleLoginSubmit} style={{display:'inline-block', width: '400px'}}>
        <h3>Sign In</h3>

        <div className="mb-3 mt-3">
          <label>Email Adress</label>
          <input
            type="email"
            name="email"
            className="form-control"
            placeholder="Enter Email"
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-3 mt-3">
          <label>Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            placeholder="Enter Password"
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-3 mt-3">
          <div className="custom-control custom-checkbox">
            <input
              type="checkbox"
              className="custom-control-input"
              id="customCheck1"
            />
            <label className="custom-control-label mx-2" htmlFor="customCheck1">
            <h3 className="display-3" style={{fontSize: '18px'}}>Remember me</h3>
            </label>
          </div>
        </div>

        <div className="d-grid mb-3">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
        <p className="forgot-password text-right">
          <h3 className="display-3" style={{fontSize: '20px'}}>Don't have an account?</h3>
          <a href="/sign-up">Sign Up</a>
        </p>
      </form>
    </div>
  );
};

export default Login;
