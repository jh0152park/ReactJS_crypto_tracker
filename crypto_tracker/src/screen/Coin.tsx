import { useParams } from "react-router";

function Coin() {
  const { coinId } = useParams<{ coinId: string }>();

  return <h1>Coin: {coinId}</h1>;
}

export default Coin;
