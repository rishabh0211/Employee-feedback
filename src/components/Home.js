import React, { Suspense } from 'react';
import { ThemeProvider } from "styled-components";
import { Switch, Route } from "react-router-dom";

import StyledHome from './styled/StyledHome';
import Nav from './Nav';
import theme from '../styles/theme';

/** Lazy Loaded Modules */
const LazyDashboard = React.lazy(() => import("./Dashboard"));
const LazyEmployee = React.lazy(() => import("./Employee"));
const LazyLogin = React.lazy(() => import("./Login"));

const Home = () => {
  return (
    <ThemeProvider theme={theme}>
      <StyledHome>
        <Nav />
        <div className="main-container">
          <Suspense fallback={<div>Loading...</div>}>
            <Switch>
              <Route path="/" exact component={LazyLogin} />
              <Route path="/dashboard" component={LazyDashboard} />
              <Route path="/employee" component={LazyEmployee} />
            </Switch>
          </Suspense>
        </div>
      </StyledHome>
    </ThemeProvider>
  )
}

export default Home;