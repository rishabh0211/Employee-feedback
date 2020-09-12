import styled from "styled-components";
import { hex2rgba } from "../../utils";

export default styled.section`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  .modal {
    box-shadow: 1rem 1rem 6rem ${({ theme: { colors } }) => colors.darkGray}, 
                -1rem -1rem 6rem ${({ theme: { colors } }) => colors.white};
    min-width: 50rem;
    padding: 4rem;
    border-radius: 1rem;
    background: rgb(237, 246, 249);
  }
  .modal-title {
    font-size: 2.8rem;
    text-align: center;
    text-transform: uppercase;
    font-weight: 700;
    letter-spacing: 0.2rem;
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

  .submit-btn {
    margin-top: 5.2rem;
    width: 100%;
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