import styled from "styled-components";

export default styled.nav`
  padding: 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .logout-btn {
    border-radius: .4rem;
    padding: .8rem 1rem;
    margin-left: 2rem;
    background: ${({ theme: { colors } }) => colors.darkBlue};
    color: ${({ theme: { colors } }) => colors.lightGray};
    font-weight: 500;
  }
`;