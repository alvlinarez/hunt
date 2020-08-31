import React, { useContext } from 'react';
import Link from 'next/link';
import { AuthContext } from '../../context/auth/AuthContext';
import { Nav } from '../../styles/components/layout/navigationStyles';

const Navigation = () => {
  const authContext = useContext(AuthContext);
  const { authenticated } = authContext;
  return (
    <Nav>
      <Link href="/populars">
        <a>Populars</a>
      </Link>
      {authenticated && (
        <Link href="/new-product">
          <a>New Product</a>
        </Link>
      )}
    </Nav>
  );
};

export default Navigation;
