import styled from "styled-components";
import { hex2rgba } from "../../utils";

export default styled.div `
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.6);
  z-index: 1;

  .create-modal {
    padding: 2.4rem;
    border-radius: .4rem;
    box-shadow: 0 1rem 4rem rgba(0,0,0,.4);
    min-width: 45rem;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 11;
    background: #edf6f9;
  }
  
  .form {
    margin-top: 6rem;
  }
  .form-group {
    display: flex;
    flex-direction: column;
    &:not(:first-child) {
      margin-top: 2rem;
    }
  }

  .form-label {
    margin-top: .4rem;
    font-weight: 500;
    transition: ${({ theme: { transition } }) => transition};
    margin-left: .8rem;
    display: flex;
  }

  .form-control {
    border: none;
    background: #edf6f9;
    border-bottom: solid 1px;
    padding: 1rem .8rem;
    font-size: 1.4rem;
    letter-spacing: .1rem;

    &:placeholder-shown + .form-label {
      opacity: 0;
      visibility: hidden;
      transform: translateY(-3rem);
    }
  }

  .btn-container {
    display: flex;
    justify-content: space-between;
  }

  .cancel-btn, .submit-btn {
    margin-top: 5.2rem;
    width: calc(50% - 1rem);
    padding: 1.4rem 2rem;
    background: ${({ theme: { colors } }) => colors.darkBlue};
    color: ${({ theme: { colors } }) => colors.lightGray};
    border-radius: .3rem;
    text-transform: uppercase;
    letter-spacing: .2rem;
    font-size: 1.4rem;
    font-weight: 500;

    &:disabled {
      background: ${({ theme: { colors } }) => hex2rgba(colors.darkBlue, 0.4)};
      pointer-events: none;
    }
  }
`;