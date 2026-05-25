import './globals.css';

export const metadata = { title: 'AI Hub Network', description: 'AI learning and content platform homepage.' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang='en'><body>{children}</body></html>;
}
