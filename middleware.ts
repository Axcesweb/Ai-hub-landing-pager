import { type NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  try {
    return NextResponse.next({ request });
  } catch {
    return NextResponse.next({ request });
  }
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)']
};
