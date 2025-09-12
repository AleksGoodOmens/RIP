'use client';

import Link from 'next/link';

import { Button } from '../ui';

function Navbar() {
  return (
    <nav>
      <Button variant="link" asChild>
        <Link href="/authentification/login">Login</Link>
      </Button>
      <Button variant="link" asChild>
        <Link href="/authentification/register">Register</Link>
      </Button>
    </nav>
  );
}

export { Navbar };
