import styled from "styled-components";

export default styled.section `
  padding: 1rem 2rem;

  .user-review {
    margin-top: 2rem;
  }

  .users-list {
    margin-top: 2rem;
    max-width: 50rem;
    border: solid 1px ${({ theme: { colors } }) => colors.darkBlue};
    border-radius: .4rem;
  }

  .user-item {
    &:not(:first-child) {
      border-top: solid 1px ${({ theme: { colors } }) => colors.darkBlue}; 
    }
  }

  .user-list-item {
    padding: 2rem;
    cursor: pointer;
  }

  .feedback-container {
    width: 100%;
    padding: 0 2rem 2rem;
  }

  .feedback {
    width: 100%;
    height: 7rem;
    border-radius: .4rem;
    padding: 1rem;
    resize: none;
  }

  .btn-container {
    margin-top: 2rem;
  }

  .btn {
    border-radius: .4rem;
    padding: .8rem 1rem;
    background: ${({ theme: { colors } }) => colors.darkBlue};
    color: ${({ theme: { colors } }) => colors.lightGray};
    font-weight: 500;
  }

  .cancel-btn {
    margin-left: 2rem;
  }
`;