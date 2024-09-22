import styled from "styled-components";

const SectionTitle = styled.h2<{ $padding?: string }>`
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.primary};
  text-align: center;
  padding: ${({ $padding }) => $padding};

  span {
    font-weight: 400;
  }
`;

export default SectionTitle;
