'use client';
import Link from 'next/link';
import { useState } from 'react';

export function AppShell({ children }: { children: React.ReactNode }) {
  const [dark, setDark] = useState(false);
  return (
    <div data-theme={dark ? 'dark' : 'light'}>
      <header className='container row' style={{justifyContent:'space-between'}}>
        <strong>AI Hub Network</strong>
        <nav className='row'>
          <Link href='/feed'>Feed</Link><Link href='/courses'>Courses</Link><Link href='/news'>News</Link><Link href='/community'>Community</Link>
          <button className='btn' onClick={() => setDark(v=>!v)}>{dark ? 'Light' : 'Dark'}</button>
        </nav>
      </header>
      <main className='container'>{children}</main>
    </div>
  );
}
