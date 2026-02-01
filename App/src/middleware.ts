import { NextRequest, NextResponse } from 'next/server';
import { locales, defaultLocale, isValidLocale } from './i18n/config';

// Paths that should not be localized
const publicPaths = ['/api', '/_next', '/favicon.ico', '/robots.txt', '/sitemap.xml'];

function getLocaleFromHeaders(request: NextRequest): string {
  const acceptLanguage = request.headers.get('accept-language');
  if (!acceptLanguage) return defaultLocale;
  
  // Parse accept-language header
  const languages = acceptLanguage.split(',').map(lang => {
    const [code] = lang.trim().split(';');
    return code.split('-')[0].toLowerCase();
  });
  
  // Find first matching locale
  for (const lang of languages) {
    if (isValidLocale(lang)) {
      return lang;
    }
  }
  
  return defaultLocale;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Skip public paths
  if (publicPaths.some(path => pathname.startsWith(path))) {
    return NextResponse.next();
  }
  
  // Check if pathname already has a locale
  const pathnameHasLocale = locales.some(
    locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );
  
  if (pathnameHasLocale) {
    return NextResponse.next();
  }
  
  // Redirect to locale-prefixed path
  // Check cookie first, then browser language
  const cookieLocale = request.cookies.get('perky-lang')?.value;
  const locale = (cookieLocale && isValidLocale(cookieLocale)) 
    ? cookieLocale 
    : getLocaleFromHeaders(request);
  
  const newUrl = new URL(`/${locale}${pathname}`, request.url);
  newUrl.search = request.nextUrl.search;
  
  return NextResponse.redirect(newUrl);
}

export const config = {
  matcher: [
    // Match all paths except static files
    '/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)',
  ],
};
