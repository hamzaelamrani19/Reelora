import type {Metadata} from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'NetMirror',
  description: 'Streaming platform interface',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body className="bg-[#141414] text-white min-h-screen font-sans selection:bg-red-600 selection:text-white" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
