import React from 'react';
import { ThemeProvider } from "styled-components";
import { Switch, Route } from "react-router-dom";

import StyledHome from './styled/StyledHome';
import Login from './Login';
import Nav from './Nav';
import theme from '../styles/theme';

const Home = () => {
  return (
    <ThemeProvider theme={theme}>
      <StyledHome>
        <Nav />
        <div className="main-container">
          <Switch>
            <Route path="/" exact component={Login} />
          </Switch>
        </div>
      </StyledHome>
    </ThemeProvider>
  )
}

export default Home;