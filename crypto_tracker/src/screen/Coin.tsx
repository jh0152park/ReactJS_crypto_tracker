import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router";
import { styled } from "styled-components";

const Container = styled.div`
  padding: 0px 20px;
  /* max-width: 500px; */
  margin: 0 auto;
`;

const Header = styled.header`
  height: 10vh;
  margin-bottom: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  color: ${(props) => props.theme.accentColor};
  font-size: 50px;
  font-weight: bold;
`;

const Loader = styled.div`
  text-align: center;
  font-size: 30px;
  font-weight: bold;
`;

interface RouteState {
  name: string;
}

function Coin() {
  const [loading, setLoading] = useState(true);
  const [info, setInfo] = useState({});
  const [price, setPrice] = useState({});

  const { coinId } = useParams<{ coinId: string }>();
  const { state } = useLocation<RouteState>();

  useEffect(() => {
    (async () => {
      const infoData = await (
        await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
      ).json();

      const priceData = await (
        await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
      ).json();
      setInfo(infoData);
      setPrice(priceData);
    })();
  }, []);

  return (
    <Container>
      <Header>
        <Title>{state?.name || "Loading"}</Title>
      </Header>

      {/* {loading ? <Loader>Loading...</Loader> : null} */}
    </Container>
  );
}

export default Coin;
