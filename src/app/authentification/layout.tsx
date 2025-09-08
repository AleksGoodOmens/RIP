import Navbar from '@/components/NavBar';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <Navbar />
      {children}
    </section>
  );
}
