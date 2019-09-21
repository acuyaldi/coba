import React from "react";
import { Route, IndexRoute, Redirect } from "react-router";
import App from "./App";
import AppPages from "./Container/AppPages";
import Dashboard from "./Container/Dashboard";
import Header from "./Component/header";


// ui elements
import addProduct from "./Container/Ui/index.js";
import Typography from "./Container/Ui/Typography";

export default (
  <Route>
    <Route component={App} path="/">
      <IndexRoute component={Dashboard} />
      <Route path="app-pages" component={AppPages} />
      <Route path="ui" component={addProduct} />
      <Route path="ui/typography" component={Typography} />
      
    </Route>
  </Route>
);
