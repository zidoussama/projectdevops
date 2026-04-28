import Header from './Header';
import Footer from './Footer';
import { useLanguage } from '@/i18n/LanguageContext';
import { cn } from '@/lib/utils';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  const { language, dir } = useLanguage();

  return (
    <div
      className={cn('min-h-screen flex flex-col', language === 'ar' && 'font-arabic')}
      dir={dir}
    >
      <Header />
      <main className="flex-1 pt-16 md:pt-20">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;