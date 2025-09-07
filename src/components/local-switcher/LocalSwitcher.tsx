'use client';
import { useLocale } from 'next-intl';

import { usePathname, useRouter } from '@/i18n/navigation';

export default function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const path = usePathname();

  const changeLocale = (newLocale: string) => {
    if (newLocale !== locale) {
      router.replace(path, { locale: newLocale });
      router.refresh();
    }
  };

  return (
    <select value={locale} onChange={(e) => changeLocale(e.target.value)}>
      <option value="en">EN</option>
      <option value="ru">RU</option>
    </select>
  );
}
