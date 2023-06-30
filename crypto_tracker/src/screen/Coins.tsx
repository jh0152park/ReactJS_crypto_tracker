import styled from "styled-components";
import { Link } from "react-router-dom";

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

const coins = [
  {
    id: "btc-bitcoin",
    name: "Bitcoin",
    symbol: "BTC",
    rank: 1,
    is_new: false,
    is_active: true,
    type: "coin",
  },
  {
    id: "eth-ethereum",
    name: "Ethereum",
    symbol: "ETH",
    rank: 2,
    is_new: false,
    is_active: true,
    type: "coin",
  },
  {
    id: "hex-hex",
    name: "HEX",
    symbol: "HEX",
    rank: 3,
    is_new: false,
    is_active: true,
    type: "token",
  },
];

function Coins() {
  return (
    <Container>
      <Header>
        <Title>Coins</Title>
      </Header>

      <CoinList>
        {coins.map((coin) => (
          <Coin key={coin.id}>
            <Link to={`/${coin.id}`}> {coin.name}</Link>
          </Coin>
        ))}
      </CoinList>
    </Container>
  );
}

export default Coins;
