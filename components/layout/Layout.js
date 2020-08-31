import React from 'react';
import HeadSeo from './HeadSeo';
import Header from './Header';

const Layout = ({ children }) => {
  return (
    <>
      <HeadSeo title={'Product Hunt'} />
      <Header />
      <main>{children}</main>
    </>
  );
};

export default Layout;
