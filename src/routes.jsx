import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Main from '@/modules/Main'
import Customers from '@/modules/Customers';
import Products from '@/modules/Products'
import Edit from '@/modules/Edit'

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Main} />
    <Route exact path="/edit" component={Edit} />
    <Route exact path="/products" component={Products} />
    <Route exact path="/customers" component={Customers} />
  </Switch>
);

export default Routes;
