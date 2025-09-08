import { useTranslations } from 'next-intl';

export default function Home() {
  const t = useTranslations('home');
  return (
    <div>
      <header>{t('header')}</header>
      <main>Main</main>
      <footer>Footer</footer>
    </div>
  );
}
