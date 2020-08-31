import React, { useContext } from 'react';
import Link from 'next/link';
import { Container, Logo } from '../../styles/components/layout/headerStyles';
import Search from '../ui/Search';
import Navigation from './Navigation';
import { AuthContext } from '../../context/auth/AuthContext';
import { Button } from '../../styles/components/ui/buttonStyles';

const Header = () => {
  const authContext = useContext(AuthContext);
  const { user, signOut, authenticated } = authContext;
  return (
    <header
      style={{
        borderBottom: '2px solid var(--gray3)',
        padding: '1rem 0'
      }}
    >
      <Container>
        <div
          style={{
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <Link href="/">
            <a>
              <Logo>P</Logo>
            </a>
          </Link>

          <Search />

          <Navigation />
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center'
          }}
        >
          {authenticated ? (
            <>
              <p
                style={{
                  marginRight: '2rem'
                }}
              >
                Hi: {user.name}
              </p>
              <Button bgColor="true" onClick={() => signOut()}>
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <Link href="/signin">
                <Button bgColor="true">Sign In</Button>
              </Link>
              <Link href="/signup">
                <Button>Sign Up</Button>
              </Link>
            </>
          )}
        </div>
      </Container>
    </header>
  );
};

export default Header;
