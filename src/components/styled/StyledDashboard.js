import styled from "styled-components";
import { hex2rgba } from "../../utils";

export default styled.section`
  padding: 2rem;
  
  .search-container {
    margin-top: 2rem;
    max-width: 45rem;
    display: flex;
  }

  .search-dropdown {
    flex-grow: 1;
    position: relative;
  }

  .search-input {
    width: 100%;
    border: none;
    background: inherit;
    padding: 1rem;
    border-bottom: solid .1rem ${({ theme: { colors } }) => colors.darkBlue};
    color: ${({ theme: { colors } }) => colors.darkBlue};
  }

  .search-btn {
    border-radius: .4rem;
    padding: 1rem 2rem;
    margin-left: 2rem;
    background: ${({ theme: { colors } }) => colors.darkBlue};
    color: ${({ theme: { colors } }) => colors.lightGray};
    font-weight: 500;

    &:disabled {
      background: ${({ theme: { colors } }) => hex2rgba(colors.darkBlue, 0.6)};
      pointer-events: none;
    }
  }

  .dropdown-list {
    position: absolute;
    top: 100%;
    width: 100%;
    margin-top: 0.8rem;
    border: solid 1px;
    border-radius: .4rem;
    z-index: 1111;
    background: ${({ theme: { colors } }) => colors.lightGray};
  }

  .user-item {
    padding: 1rem;
    cursor: pointer;

    &:first-child {
      border-top-left-radius: .2rem;
      border-top-right-radius: .2rem;
    }
    &:last-child {
      border-bottom-left-radius: .2rem;
      border-bottom-right-radius: .2rem;
    }
    &:hover {
      background: ${({ theme: { colors } }) => hex2rgba(colors.darkBlue, 0.8)};
      color: ${({ theme: { colors } }) => colors.lightGray};
    }
  }

  .user-details {
    margin-top: 4rem;
  }

  .feedbacks-container {
    margin-top: 4rem;
  }
  .feedback-list {
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
  }
  .feedback-item {
    position: relative;
    &:not(:first-child) {
      margin-top: 2rem;
    }
  }
  .feedback-user {
    margin-top: .4rem;
    font-size: 1.2rem;
  }
  .feedback-edit {
    position: absolute;
    top: 0;
    right: -3rem;
    cursor: pointer;
  }
  .feedback-textarea {
    resize: none;
    width: 100%;
    background: inherit;
    border: solid 1px;
    border-radius: 4px;
    padding: 1rem;
  }
  .btn-container {
    margin-top: 1rem;
  }
  .save-btn {
    border-radius: .4rem;
    padding: .8rem 1rem;
    background: ${({ theme: { colors } }) => colors.darkBlue};
    color: ${({ theme: { colors } }) => colors.lightGray};
    font-weight: 500;
  }
  .cancel-btn {
    border-radius: .4rem;
    padding: .8rem 1rem;
    margin-left: 2rem;
    background: ${({ theme: { colors } }) => colors.darkBlue};
    color: ${({ theme: { colors } }) => colors.lightGray};
    font-weight: 500;
  }
  .assign-employee-section {
    padding: 0 1rem;
    margin-top: 2rem;
  }
  .assign-dropdown {
    margin-top: 2rem;
  }
  .add-btn {
    border-radius: .4rem;
    margin-left: 2rem;
    background: ${({ theme: { colors } }) => colors.darkBlue};
    color: ${({ theme: { colors } }) => colors.lightGray};
    font-weight: 500;
    padding: .4rem 1rem;
  }
`;