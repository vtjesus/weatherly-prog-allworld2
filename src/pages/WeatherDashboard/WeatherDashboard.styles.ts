import styled, { css } from "styled-components";
import { Button, Flex } from "../../common/components/styled";
import type { DefaultTheme } from "styled-components/dist/types";

export const Header = styled.header<{ $isScrolled: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  padding: 1.5rem 2rem;
  background-color: ${({ theme }) => theme.colors.background};
  width: 100%;

  @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: row;
    align-items: stretch;
    position: fixed;
    top: 0;
    height: 5.97rem;
    transition: box-shadow 0.3s ease;

    ${({ $isScrolled }) =>
      $isScrolled &&
      css`
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      `}
  }
`;

export const Main = styled.main`
  @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
    margin-top: 5.85rem;
  }
`;

const weatherCardSharedStyles = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 21rem;
  background-color: #fff;
  border-radius: 36px;
  border: 1px solid ${({ theme }) => theme.colors.lightGray};
`;

export const MainWeatherCard = styled.div`
  ${weatherCardSharedStyles}
  flex-direction: column;
  height: 26rem;
  padding: 3.5rem 4rem;
`;

export const MainWeatherCardNowText = styled.div`
  font-size: 1.1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.lightGray};
  align-self: flex-start;
`;

export const MainWeatherCardIcon = styled.img`
  width: 11rem;
  margin: -2.5rem 0 -2.5rem;
`;

export const MainWeatherCardTemperature = styled.div`
  font-size: 6.5rem;
  color: ${({ theme }) => theme.colors.primary};
`;

export const ChangeTempUnitButton = styled(Button)`
  width: 100%;
`;

export const ItemWeatherCardsFlexContainer = styled(Flex)`
  max-width: 43rem;
`;

export const ItemWeatherCard = styled.div`
  ${weatherCardSharedStyles}
  height: 10rem;
  padding: 1.25rem 5rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
    height: 12.5rem;
  }
`;

export const ItemWeatherCardTitle = styled.h4`
  font-weight: 400;
`;

export const ItemWeatherCardValue = styled.div`
  font-size: 1.9rem;
  font-weight: 600;
  margin-top: 0.2rem;
`;

export const ItemWeatherCardIcon = styled.img`
  width: 3rem;
  height: 3rem;
`;

export const ForecastWeatherFlexWrapper = styled(Flex)`
  background-color: #fff;
  padding: 2rem;
`;

const getGradient = (theme: DefaultTheme, angle: string) => {
  const { primary, secondary } = theme.colors;

  return `linear-gradient(${angle}, ${secondary} 0%, ${primary} 100%)`;
};

export const ForecastWeatherFlexCard = styled(Flex)`
  font-size: 1.3rem;
  width: 80%;
  min-width: 28rem;
  height: 10rem;
  background: ${({ theme }) => getGradient(theme, "to bottom")};
  padding: 1.5rem 0;
  border: 1px solid ${({ theme }) => theme.colors.lightGray};
  border-radius: 100px;

  div:not(:first-child) {
    color: #fff;
    font-weight: 700;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: row;
    font-size: 1.2rem;
    width: 38rem;
    height: 4.87rem;
    background: ${({ theme }) => getGradient(theme, "to right")};
    padding: 0 1.9rem;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 1.1rem;
  }
`;

export const ForecastIcon = styled.img`
  width: 6.5rem;
`;
