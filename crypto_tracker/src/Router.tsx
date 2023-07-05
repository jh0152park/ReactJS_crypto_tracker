import { BrowserRouter, Switch, Route } from "react-router-dom";
import Coin from "./screen/Coin";
import Coins from "./screen/Coins";

interface IRouterProps {
  isDark: boolean;
  toggleDark: () => void;
}

function Router({toggleDark, isDark}: IRouterProps) {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/:coinId">
          <Coin isDark={isDark} />
        </Route>

        <Route path="/">
          <Coins toggleDark={toggleDark}/>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
