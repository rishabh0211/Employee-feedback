import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import StyledCreateEmployee from './styled/StyledCreateEmployee';
import { registerUser, setShowCreateModal } from '../actions';

const CreateEmployee = ({ showCreateModal, registerUser, setShowCreateModal }) => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    return () => {
      setName('');
      setEmail('');
      setPassword('');
    };
  }, [showCreateModal]);

  const handleChange = e => {
    const targetName = e.target.name;
    const value = e.target.value;
    switch (targetName) {
      case 'name':
        setName(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'password':
        setPassword(value);
        break;
      default:
        break;
    }
  };

  const handleFormSubmit = e => {
    e.preventDefault();
    registerUser(name, email, password);
  };

  const handleCancelClick = () => {
    setShowCreateModal(false);
  }

  return (
    <>
      {showCreateModal && <StyledCreateEmployee className="create-modal-container">
        <div className="create-modal">
          <h1>Create Employee</h1>
          <form className="form" onSubmit={handleFormSubmit} autoComplete="off" noValidate>
            <div className="form-group">
              <input type="text"
                name="name"
                id="name"
                className="form-control"
                placeholder="Name"
                value={name}
                onChange={handleChange}
              />
              <label htmlFor="email" className="form-label">Name</label>
            </div>
            <div className="form-group">
              <input type="email"
                name="email"
                id="email"
                className="form-control"
                placeholder="Email"
                value={email}
                onChange={handleChange}
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
                onChange={handleChange}
              />
              <label htmlFor="password" className="form-label">Password</label>
            </div>
            <div className="btn-container">
              <button className="submit-btn">Submit</button>
              <button className="cancel-btn" onClick={handleCancelClick}>Cancel</button>
            </div>
          </form>
        </div>
      </StyledCreateEmployee>}
    </>
  )
}

const mapStateToProps = state => {
  return {
    showCreateModal: state.showCreateModal
  }
};

const mapDispatchToProps = dispatch => {
  return {
    registerUser: (name, email, password) => dispatch(registerUser(name, email, password)),
    setShowCreateModal: (showModal) => dispatch(setShowCreateModal(showModal))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateEmployee);
