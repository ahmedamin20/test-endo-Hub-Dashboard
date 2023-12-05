import createIntlMiddleware from 'next-intl/middleware';
import {NextRequest,NextResponse} from 'next/server';
import { ACCESS_TOKEN } from './constants/Constants';
 
export default async function middleware(request: NextRequest) {
  // Step 1: Use the incoming request
  const defaultLocale = request.headers.get('x-default-locale') || 'en';
 
  // Step 2: Create and call the next-intl middleware
  const handleI18nRouting = createIntlMiddleware({
    locales: ['en', 'ar','fr'],
    defaultLocale
  });
  const response = handleI18nRouting(request);
 
  // Step 3: Alter the response
  response.headers.set('x-default-locale', defaultLocale);

  if (request.nextUrl.pathname!==("/")) {
    if (!request.cookies.get(ACCESS_TOKEN)) {
      return NextResponse.redirect(new URL("/", request.url));
    }}
 
  return response;
}
 
export const config = {
  matcher: ['/((?!_next|.*\\..*).*)']
};