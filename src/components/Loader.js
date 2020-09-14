import React from 'react';
import { connect } from "react-redux";
import StyledLoader from './styled/StyledLoader';

const Loader = ({ isLoading }) => {
  return (
    <>
      {isLoading &&
        <StyledLoader>
          <div class="lds-spinner">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </StyledLoader>
      }
    </>
  )
}


const mapStateToProps = state => {
  return {
    isLoading: state.isLoading,
  }
};

export default connect(mapStateToProps)(Loader);