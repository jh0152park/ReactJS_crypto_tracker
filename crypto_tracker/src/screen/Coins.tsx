import styled from "styled-components";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
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

const CoinList = styled.ul``;

const Coin = styled.li`
  background-color: whitesmoke;
  color: ${(p) => p.theme.backgroundColor};
  margin-bottom: 10px;
  border-radius: 15px;
  font-weight: bold;

  a {
    padding: 20px;
    transition: color 0.2s ease-in-out;
    display: block;
  }

  &:hover {
    a {
      color: ${(p) => p.theme.accentColor};
    }
  }
`;

const Loader = styled.div`
  text-align: center;
  font-size: 30px;
  font-weight: bold;
`;

const Image = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 10px;
`;

const CoinContainer = styled.div`
  display: flex;
  align-items: center;
`;

interface CoinInterface {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

function Coins() {
  const [coins, setCoins] = useState<CoinInterface[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const resp = await fetch("https://api.coinpaprika.com/v1/coins");
      const json = await resp.json();
      setCoins(json.slice(0, 100));
      setLoading(false);
    })();
  }, []);

  return (
    <Container>
      <Header>
        <Title>Coins</Title>
      </Header>

      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <CoinList>
          {coins.map((coin) => (
            <Coin key={coin.id}>
              <Link
                to={{
                  pathname: `/${coin.id}`,
                  state: { name: coin.name },
                }}
              >
                <CoinContainer>
                  <Image
                    src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                  />
                  {coin.name}
                </CoinContainer>
              </Link>
            </Coin>
          ))}
        </CoinList>
      )}
    </Container>
  );
}

export default Coins;
