'use client';
import Link from 'next/link';

export default function HomePage() {
  return (
    <main>
      <div>
        <h1>Welcome to our App</h1>
        <p>Please enter or register</p>
        <Link href="/authentification">Authorize</Link>
      </div>
    </main>
  );
}
