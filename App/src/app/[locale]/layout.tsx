import { notFound } from 'next/navigation';
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { LanguageProvider } from "@/lib/i18n";
import { locales, type Locale } from '@/i18n/config';

interface Props {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  
  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  return (
    <LanguageProvider initialLocale={locale as Locale}>
      <div className="noise-overlay">
        <Header locale={locale as Locale} />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
}
