import { useMemo } from "react";
import { useAppSelector } from "../../../app/hooks";
import {
  selectCurrentWeather,
  selectCityData,
} from "../../../features/search-weather/weatherSlice";
import convertTemperature from "../../../utils/convertTemperature";
import getWeatherIconUrl from "../../../utils/getWeatherIconUrl";
import { getCurrentWeatherCardsData } from "../../../utils/weatherUtils";
import * as StyledCommon from "../../../common/components/styled";
import * as StyledWeatherDashboard from "../WeatherDashboard.styles";

const Styled = { ...StyledWeatherDashboard, Common: { ...StyledCommon } };

interface CurrentWeatherProps {
  currentTempUnit: "C" | "F";
  onToggleTempUnit: () => void;
}

function CurrentWeather({
  currentTempUnit,
  onToggleTempUnit,
}: CurrentWeatherProps) {
  const currentWeather = useAppSelector(selectCurrentWeather);
  const cityData = useAppSelector(selectCityData);

  const currentWeatherCardsData = useMemo(
    () => getCurrentWeatherCardsData(currentWeather, currentTempUnit),
    [currentWeather, currentTempUnit]
  );

  return (
    <Styled.Common.SectionFlexWrapper $padding="0 3rem">
      <Styled.Common.SectionTitle $padding="2rem 0">
        {currentWeather?.formattedDate.shortDate}.
        <span>{` ${cityData.name}, ${cityData.country}`}</span>
      </Styled.Common.SectionTitle>
      <Styled.Common.Flex $justifyContent="center" $gap="1rem" $flexWrap="wrap">
        <Styled.MainWeatherCard>
          <Styled.MainWeatherCardNowText>NOW</Styled.MainWeatherCardNowText>
          <Styled.MainWeatherCardIcon
            src={getWeatherIconUrl(currentWeather?.weather[0].icon ?? "")}
            alt={currentWeather?.weather[0].description}
          />
          <Styled.MainWeatherCardTemperature>
            {convertTemperature(
              currentWeather?.main.temp ?? 0,
              currentTempUnit
            )}
            °
          </Styled.MainWeatherCardTemperature>
          <Styled.ChangeTempUnitButton onClick={onToggleTempUnit}>
            Change to {currentTempUnit === "C" ? "F" : "C"}°
          </Styled.ChangeTempUnitButton>
        </Styled.MainWeatherCard>
        <Styled.ItemWeatherCardsFlexContainer
          $justifyContent="center"
          $flexWrap="wrap"
          $gap="1rem"
        >
          {currentWeatherCardsData.map(({ title, value, iconSrc }) => (
            <Styled.ItemWeatherCard key={title}>
              <div>
                <Styled.ItemWeatherCardTitle>
                  {title}
                </Styled.ItemWeatherCardTitle>
                <Styled.ItemWeatherCardValue>
                  {value}
                </Styled.ItemWeatherCardValue>
              </div>
              <Styled.ItemWeatherCardIcon src={iconSrc} alt={`${title} icon`} />
            </Styled.ItemWeatherCard>
          ))}
        </Styled.ItemWeatherCardsFlexContainer>
      </Styled.Common.Flex>
    </Styled.Common.SectionFlexWrapper>
  );
}

export default CurrentWeather;
