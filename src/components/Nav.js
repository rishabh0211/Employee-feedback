import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import StyledNav from "./styled/StyledNav";
import { signOutUser } from "../actions";

const Nav = ({ signOutUser, currentUser, signedOut }) => {
  const history = useHistory();

  useEffect(() => {
    if (signedOut) {
      history.push('/');
    }
  }, [signedOut]);

  return (
    <StyledNav>
      <h1>Nav</h1>
      {currentUser && !!Object.keys(currentUser).length &&
        <button className="logout-btn" onClick={signOutUser}>Logout</button>
      }
    </StyledNav>
  )
}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser,
    signedOut: state.signedOut
  }
};

const mapDispatchToProps = dispatch => {
  return {
    signOutUser: () => dispatch(signOutUser())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Nav);