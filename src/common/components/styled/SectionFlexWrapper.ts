import styled from "styled-components";

interface SectionFlexWrapperProps {
  $backgroundColor?: string;
  $padding?: string;
}

const SectionFlexWrapper = styled.section<SectionFlexWrapperProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  background-color: ${({ $backgroundColor }) => $backgroundColor};
  padding: ${({ $padding }) => $padding};
  padding-bottom: 4.5rem;
`;

export default SectionFlexWrapper;
