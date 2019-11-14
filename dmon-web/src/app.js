import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import LayoutHoc from './components/layout';

import {Live} from './containers';

import 'bootstrap/dist/css/bootstrap.min.css';

export default () => (
  <BrowserRouter>
    <Route exact path="/" component={LayoutHoc(Live)}/>
    <Route exact path="/live" component={LayoutHoc(Live)} />
    <Route exact path="/live/:ip" component={LayoutHoc(Live)} />
  </BrowserRouter>
)
