import SearchWeather from "../../features/search-weather/SearchWeather";
import * as Styled from "./Home.styles";

function Home() {
  return (
    <Styled.Section>
      <SearchWeather />
    </Styled.Section>
  );
}

export default Home;
