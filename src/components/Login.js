import React from "react";
import StyledLogin from "./styled/StyledLogin";

const Login = () => {

  const handleFormSubmit = e => {
    e.preventDefault();
  };

  return (
    <StyledLogin>
      <div className="modal">
        <h1 className="modal-title">Login</h1>
        <form className="form" onSubmit={handleFormSubmit} autoComplete="off" noValidate>
          <div className="form-group">
            <input type="email"
              name="email"
              id="email"
              className="form-control"
              placeholder="Email"
            />
            <label htmlFor="email" className="form-label">Email</label>
          </div>
          <div className="form-group">
            <input type="password"
              name="password"
              id="password"
              className="form-control"
              placeholder="Password"
            />
            <label htmlFor="password" className="form-label">Password</label>
          </div>
          <button className="submit-btn">Submit</button>
        </form>
      </div>
    </StyledLogin>
  )
}

export default Login;