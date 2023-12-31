import styled from "styled-components";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { fetchCoins } from "./api";
import { Helmet } from "react-helmet";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isDarkAtom } from "./atoms";

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
  background-color: white;
  color: ${(p) => p.theme.textColor};
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

interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

interface ICoinsProps {}

function Coins({}: ICoinsProps) {
  const { isLoading, data } = useQuery<ICoin[]>("allCoins", fetchCoins);
  const isDark = useRecoilValue(isDarkAtom);
  const setTheme = useSetRecoilState(isDarkAtom);
  const sun = "☀️";
  const moon = "🌙";

  return (
    <Container>
      <Helmet>
        <title>Coins</title>
      </Helmet>
      <Header>
        <Title>Coins</Title>
        <button
          onClick={() => setTheme((prev) => !prev)}
          style={{
            backgroundColor: "inherit",
            border: "0px",
            fontSize: "20px",
          }}
        >
          {isDark ? sun : moon}
        </button>
      </Header>

      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <CoinList>
          {data?.slice(0, 100).map((coin) => (
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
