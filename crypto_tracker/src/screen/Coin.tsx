import { useEffect, useState } from "react";
import {
  Switch,
  Route,
  useParams,
  useLocation,
  useRouteMatch,
} from "react-router";
import { styled } from "styled-components";

import Price from "./Price";
import Chart from "./Chart";
import { Link } from "react-router-dom";

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

const Overview = styled.div`
  width: 100%;
  height: 50px;
  border-radius: 15px;
  background-color: #636e72;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 20px;
  text-align: center;
  font-weight: bold;
  p:nth-child(1) {
    font-size: 10px;
    margin-bottom: 5px;
  }
`;

const Description = styled.p`
  color: whitesmoke;
  font-size: 15px;
  margin: 20px 0px;
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;

const Tab = styled.span<{ isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: bolder;
  background-color: #636e72;
  padding: 7px 0px;
  border-radius: 10px;
  color: ${(prop) =>
    prop.isActive ? prop.theme.accentColor : prop.theme.textColor};
  a {
    display: block;
  }
`;

interface RouteState {
  name: string;
}

interface InfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  isActive: boolean;
  type: string;
  logo: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
}

interface PriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

function Coin() {
  const [loading, setLoading] = useState(true);
  const [info, setInfo] = useState<InfoData>();
  const [price, setPrice] = useState<PriceData>();

  const { coinId } = useParams<{ coinId: string }>();
  const { state } = useLocation<RouteState>();

  const priceMatch = useRouteMatch("/:coinId/price");
  const chartMatch = useRouteMatch("/:coinId/chart");

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
      setLoading(false);
    })();
  }, []);

  return (
    <Container>
      <Header>
        <Title>
          {state?.name ? state?.name : loading ? "Loading..." : info?.name}
        </Title>
      </Header>

      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Overview>
            <div>
              <p>Rank</p>
              <p>{info?.rank}</p>
            </div>
            <div>
              <p>Symbol</p>
              <p>{info?.symbol}</p>
            </div>
            <div>
              <p>Type</p>
              <p>{info?.type}</p>
            </div>
          </Overview>
          <Description>{info?.description}</Description>
          <Overview>
            <div>
              <p>Total Suply</p>
              <p>{price?.total_supply}</p>
            </div>
            <div>
              <p>Max Suply</p>
              <p>{price?.max_supply}</p>
            </div>
          </Overview>

          <Tabs>
            <Tab isActive={chartMatch !== null}>
              <Link to={`/${coinId}/chart`}>Chart</Link>
            </Tab>

            <Tab isActive={priceMatch !== null}>
              <Link to={`/${coinId}/price`}>Price</Link>
            </Tab>
          </Tabs>

          <Switch>
            <Route path={`/:coinId/price`}>
              <Price></Price>
            </Route>
            <Route path={`/:coinId/chart`}>
              <Chart></Chart>
            </Route>
          </Switch>
        </>
      )}
    </Container>
  );
}

export default Coin;
