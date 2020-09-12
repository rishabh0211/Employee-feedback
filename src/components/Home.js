import React from 'react';
import StyledHome from './styled/StyledHome';
import { Switch, Route } from "react-router-dom";
import Login from './Login';

const Home = () => {
  return (
    <StyledHome>
      <h1>Home</h1>
      <Switch>
        <Route path="/" exact component={Login} />
      </Switch>
    </StyledHome>
  )
}

export default Home;