import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default function Home() {
  const t = useTranslations('home');
  return (
    <div>
      <header>
        <Link href="/authentification">Authorize</Link>
        {t('header')}
      </header>
      <main>Main</main>
      <footer>Footer</footer>
    </div>
  );
}
