import React from 'react';
import { ThemeProvider } from "styled-components";
import { Switch, Route } from "react-router-dom";

import StyledHome from './styled/StyledHome';
import Login from './Login';
import Nav from './Nav';
import theme from '../styles/theme';
import Dashboard from './Dashboard';
import Employee from './Employee';

const Home = () => {
  return (
    <ThemeProvider theme={theme}>
      <StyledHome>
        <Nav />
        <div className="main-container">
          <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/employee" component={Employee} />
          </Switch>
        </div>
      </StyledHome>
    </ThemeProvider>
  )
}

export default Home;