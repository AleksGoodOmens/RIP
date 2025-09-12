'use client';

import Link from 'next/link';

function Navbar() {
  return (
    <nav>
      <Link href="/authentification/login">Enter</Link>
      <Link href="/authentification/register">Register</Link>
    </nav>
  );
}

export { Navbar };
