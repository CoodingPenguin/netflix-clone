import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import Home from "../Routes/Home";
import TV from "../Routes/TV";
import Search from "../Routes/Search";
import Detail from "../Routes/Detail";
import Header from "./Header";

export default () => (
  <Router>
    <>
      <Header />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/tv" exact component={TV} />
        <Route path="/search" component={Search} />
        <Route exact path="/movie/:id" component={Detail} />
        <Route path="/movie/:id/details" component={Detail} />
        <Route path="/movie/:id/collections" component={Detail} />
        <Route exact path="/show/:id" component={Detail} />
        <Route path="/show/:id/details" component={Detail} />
        <Route path="/show/:id/collections" component={Detail} />
        <Redirect from="*" to="/" />
      </Switch>
    </>
  </Router>
);
