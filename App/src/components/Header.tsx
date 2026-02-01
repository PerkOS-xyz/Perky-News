'use client';

import Link from 'next/link';
import { useLanguage } from '@/lib/i18n';
import { LanguageSelector } from './LanguageSelector';
import { type Locale } from '@/i18n/config';

interface Props {
  locale?: Locale;
}

export function Header({ locale }: Props) {
  const { t, language } = useLanguage();
  const currentLocale = locale || language;

  return (
    <header className="bg-white border-b border-gray-100">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href={`/${currentLocale}`} className="flex items-center gap-3">
            <img 
              src="/perkos-logo.jpg" 
              alt="PerkOS" 
              className="w-10 h-10 rounded-lg"
            />
            <div>
              <span className="text-xl font-bold text-[#0E0716]">
                Perky <span className="text-[#EB1B69]">News</span>
              </span>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link href={`/${currentLocale}`} className="text-sm font-medium text-gray-600 hover:text-[#EB1B69]">
              {t.nav.news}
            </Link>
            <Link href={`/${currentLocale}/articles`} className="text-sm font-medium text-gray-600 hover:text-[#EB1B69]">
              {t.nav.articles}
            </Link>
            <Link href={`/${currentLocale}/about`} className="text-sm font-medium text-gray-600 hover:text-[#EB1B69]">
              {t.nav.about}
            </Link>
          </nav>

          {/* Right side: Language + Subscribe */}
          <div className="flex items-center gap-3">
            <LanguageSelector />
            <Link 
              href={`/${currentLocale}/subscribe`}
              className="px-4 py-2 bg-[#EB1B69] text-white text-sm font-semibold rounded-lg hover:bg-[#d01860] transition-colors"
            >
              {t.nav.subscribe}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
