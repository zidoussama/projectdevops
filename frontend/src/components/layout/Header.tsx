import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Globe, ChevronDown } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { Language } from '@/i18n/translations';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import logo from '../../assets/logojci.png';

const languageLabels: Record<Language, string> = {
  fr: 'Français',
  ar: 'العربية',
  en: 'English',
};

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language, setLanguage, t, dir } = useLanguage();
  const location = useLocation();

  const navItems = [
    { key: 'home', path: '/' },
    { key: 'about', path: '/about' },
    { key: 'events', path: '/events' },
    { key: 'projects', path: '/projects' },
    { key: 'team', path: '/team' },
    { key: 'news', path: '/news' },
    { key: 'gallery', path: '/gallery' },
    { key: 'partners', path: '/partners' },
    { key: 'contact', path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border shadow-sm">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
              <img
                src={logo}
                alt="JCI Benikhiar Connect Logo"
                className=" h-10 w-auto"
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.key}
                to={item.path}
                className={cn(
                  'px-3 py-2 text-sm font-medium rounded-md transition-colors',
                  isActive(item.path)
                    ? 'text-primary bg-primary/10'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                )}
              >
                {t('nav', item.key)}
              </Link>
            ))}
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-2">
            {/* Join Button (Desktop) */}
            <Link to="/join" className="hidden md:block">
              <Button className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold">
                {t('nav', 'join')}
              </Button>
            </Link>

            {/* Language Switcher */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-1">
                  <Globe className="h-4 w-4" />
                  <span className="hidden sm:inline">{languageLabels[language]}</span>
                  <ChevronDown className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align={dir === 'rtl' ? 'start' : 'end'}>
                {(Object.keys(languageLabels) as Language[]).map((lang) => (
                  <DropdownMenuItem
                    key={lang}
                    onClick={() => setLanguage(lang)}
                    className={cn(
                      'cursor-pointer',
                      language === lang && 'bg-primary/10 text-primary'
                    )}
                  >
                    {languageLabels[lang]}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="lg:hidden py-4 border-t border-border animate-fade-in">
            <div className="flex flex-col gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.key}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={cn(
                    'px-4 py-3 text-sm font-medium rounded-md transition-colors',
                    isActive(item.path)
                      ? 'text-primary bg-primary/10'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  )}
                >
                  {t('nav', item.key)}
                </Link>
              ))}
              <Link
                to="/join"
                onClick={() => setIsMenuOpen(false)}
                className="mt-2"
              >
                <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-semibold">
                  {t('nav', 'join')}
                </Button>
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
