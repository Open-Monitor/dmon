import React from 'react';

import Header from './header';
import SideNav from './leftbar';

import './header.css'

export default (Component) => {
  return (props) => (
    <div className="" id="page-wrap">
      <Header style={{ position: 'absolute' }}>
        <SideNav />
        <Component {...props} />
      </Header>
    </div>
  )
}
