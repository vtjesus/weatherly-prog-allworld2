import styled from "styled-components";
import type { CSSProperties } from "react";

interface FlexProps {
  $flexDirection?: "row" | "column" | "row-reverse" | "column-reverse";
  $justifyContent?:
    | "flex-start"
    | "flex-end"
    | "center"
    | "space-between"
    | "space-around"
    | "space-evenly";
  $alignItems?: "flex-start" | "flex-end" | "center" | "baseline" | "stretch";
  $flexWrap?: "wrap" | "nowrap" | "wrap-reverse";
  $gap?: CSSProperties["gap"];
  $flex?: CSSProperties["flex"];
}

const Flex = styled.div<FlexProps>`
  display: flex;
  flex-direction: ${({ $flexDirection }) => $flexDirection};
  justify-content: ${({ $justifyContent }) => $justifyContent};
  align-items: ${({ $alignItems }) => $alignItems};
  flex-wrap: ${({ $flexWrap }) => $flexWrap};
  gap: ${({ $gap }) => $gap};
  flex: ${({ $flex }) => $flex};
`;

export default Flex;
