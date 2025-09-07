'use client';

import Link from 'next/link';

export default function Navbar() {
  return (
    <nav>
      <Link href="/login">Enter</Link>
      <Link href="/register">Register</Link>
    </nav>
  );
}
