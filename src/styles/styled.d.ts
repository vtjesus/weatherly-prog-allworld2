import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    fontFamily: {
      main: string;
      error: string;
    };
    colors: {
      primary: string;
      secondary: string;
      hover: string;
      background: string;
      text: string;
      error: string;
      lightGray: string;
    };
  }
}
