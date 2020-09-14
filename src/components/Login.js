import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import StyledLogin from "./styled/StyledLogin";
import { loginUser } from '../actions';
import { useHistory } from "react-router-dom";

/**
 * Login Component
 */
const Login = ({ user, loginUser, isLoading }) => {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (user && Object.keys(user).length) {
      if (user.admin) {
        return history.push("/dashboard");
      }
      history.push("/employee");
    }
  }, [user]);

  /**
   * Change listener for login and password
   */
  const handleChange = (type) => {
    return (e) => {
      setError('');
      type === 'email' ? setEmail(e.target.value) : setPassword(e.target.value);
    };
  };

  /**
   * Form submit handler
   */
  const handleFormSubmit = e => {
    e.preventDefault();
    loginUser(email, password);
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
              value={email}
              onChange={handleChange('email')}
            />
            <label htmlFor="email" className="form-label">Email</label>
          </div>
          <div className="form-group">
            <input type="password"
              name="password"
              id="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={handleChange('password')}
            />
            <label htmlFor="password" className="form-label">Password</label>
          </div>
          <button className="submit-btn" disabled={isLoading}>{isLoading ? "Submitting...." : "Submit"}</button>
        </form>
      </div>
    </StyledLogin>
  )
}

const mapStateToProps = state => {
  return {
    user: state.currentUser,
    isLoading: state.isLoading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loginUser: (email, password) => dispatch(loginUser(email, password))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Login);