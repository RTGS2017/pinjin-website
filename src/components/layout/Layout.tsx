import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { FloatingQuote } from './FloatingQuote';
import { ScrollToTop } from './ScrollToTop';
import { CompareBar } from '@/components/ui/CompareBar';

export function Layout() {
  return (
    <div className='flex min-h-screen flex-col'>
      <ScrollToTop />
      <Header />
      <main className='flex-1'>
        <Outlet />
      </main>
      <Footer />
      <FloatingQuote />
      <CompareBar />
    </div>
  );
}
