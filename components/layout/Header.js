import React, { useContext } from 'react';
import Link from 'next/link';
import {
  AuthContainer,
  Container,
  Logo,
  NavContainer
} from '../../styles/components/layout/headerStyles';
import Search from './Search';
import Navigation from './Navigation';
import { AuthContext } from '../../context/auth/AuthContext';
import { Button } from '../../styles/components/ui/buttonStyles';
import { useRouter } from 'next/router';

const Header = () => {
  const authContext = useContext(AuthContext);
  const { user, signOut, authenticated } = authContext;
  const router = useRouter();
  return (
    <header
      style={{
        borderBottom: '2px solid var(--gray3)',
        padding: '1rem 0'
      }}
    >
      <Container>
        <NavContainer>
          <Link href="/">
            <a>
              <Logo>P</Logo>
            </a>
          </Link>

          <Search />

          <Navigation />
        </NavContainer>
        <AuthContainer>
          {authenticated ? (
            <>
              <p>Hi: {user.name}</p>
              <Button bgColor="true" onClick={() => signOut(router)}>
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
        </AuthContainer>
      </Container>
    </header>
  );
};

export default Header;
