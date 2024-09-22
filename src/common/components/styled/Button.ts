import styled from "styled-components";

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.25rem;
  font-weight: 700;
  color: #fff;
  width: 30rem;
  min-width: 9.2rem;
  height: 2.8rem;
  border-radius: 50px;
  background-color: ${({ theme }) => theme.colors.primary};
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.hover};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.lightGray};
    cursor: not-allowed;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: auto;
  }
`;

export default Button;
