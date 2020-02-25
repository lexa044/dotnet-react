import React from 'react';
import HeaderNav from './HeaderNav';
import CartHeaderNav from './CartHeaderNav';

const PageHeader = () => {
  return (
    <header className="section-header">
      <HeaderNav />
      <CartHeaderNav/>
    </header>
  );
};

export default PageHeader;
