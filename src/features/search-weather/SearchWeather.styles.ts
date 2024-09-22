import styled, { css, keyframes } from "styled-components";
import searchIcon from "../../assets/search.svg";

const mediaQueryBetweenMobileAndTablet = css`
  ${({ theme }) =>
    `@media (min-width: ${theme.breakpoints.mobile}) and (max-width: ${theme.breakpoints.tablet})`}
`;

export const AppTitle = styled.h1<{ $isHomePage: boolean }>`
  font-size: ${({ $isHomePage }) => ($isHomePage ? "6.5rem" : "2.6rem")};
  font-weight: 700;
  background: linear-gradient(93deg, #136aab 1.87%, #b0e0f5 96.48%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  cursor: ${({ $isHomePage }) => !$isHomePage && "pointer"};

  &::before {
    content: "Weatherly";
  }

  ${mediaQueryBetweenMobileAndTablet} {
    &::before {
      ${({ $isHomePage }) =>
        !$isHomePage &&
        css`
          content: "W";
        `}
    }
  }
`;

export const SearchInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

export const SearchIcon = styled.img.attrs({ src: searchIcon })`
  position: absolute;
  top: 0.7rem;
  left: 1rem;
  width: 1.5rem;
`;

interface SearchInputProps {
  $isError: boolean;
  $isHomePage: boolean;
}

export const SearchInput = styled.input.attrs<SearchInputProps>({
  type: "search",
  placeholder: "Search for a city...",
  name: "citySearch",
})`
  font-size: 1.2rem;
  width: 30rem;
  height: 2.813rem;
  padding: 1.25rem;
  padding-left: 2.6rem;
  border-radius: 50px;
  border: 2px double transparent;
  background-image: linear-gradient(white, white),
    linear-gradient(
      to right,
      ${({ theme }) => theme.colors.primary},
      ${({ theme }) => theme.colors.secondary}
    );
  background-origin: border-box;
  background-clip: padding-box, border-box;

  &:focus {
    outline: none;
  }

  ${({ $isError, theme }) =>
    $isError &&
    css`
      border: 2px solid ${theme.colors.error};
      color: ${theme.colors.error};
    `}

  ${mediaQueryBetweenMobileAndTablet} {
    ${({ $isHomePage }) =>
      !$isHomePage &&
      css`
        width: 22rem;
      `}
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 1.17rem;
  }
`;

export const InputErrorHelperText = styled.span`
  font-family: ${({ theme }) => theme.fontFamily.error};
  font-size: 1rem;
  font-weight: 300;
  color: ${({ theme }) => theme.colors.error};
  padding: 0.3rem 0 0 1.3rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 0.9rem;
  }
`;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const ButtonSpinner = styled.div`
  border: 3px solid rgba(0, 0, 0, 0.1);
  border-top: 3px solid #fff;
  border-radius: 50%;
  width: 1.75rem;
  height: 1.75rem;
  animation: ${spin} 0.9s linear infinite;
`;
