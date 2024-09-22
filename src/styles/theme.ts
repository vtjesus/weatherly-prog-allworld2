import type { DefaultTheme } from "styled-components";

const theme: DefaultTheme = {
  fontFamily: {
    main: "Open Sans, sans-serif",
    error: "Inter, sans-serif",
  },
  colors: {
    primary: "#136AAB",
    secondary: "#B0E0F5",
    hover: "#5CA3D8",
    background: "#F4F4F5",
    text: "#26272B",
    error: "#DB2351",
    lightGray: "#9FA2AB",
  },
  breakpoints: {
    mobile: "425px",
    tablet: "768px",
    laptop: "1024px",
    desktop: "1440px",
  },
};

export default theme;
