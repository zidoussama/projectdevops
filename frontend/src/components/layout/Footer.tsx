import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

const Footer: React.FC = () => {
  const { t, language } = useLanguage();
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { key: 'about', path: '/about' },
    { key: 'events', path: '/events' },
    { key: 'projects', path: '/projects' },
    { key: 'team', path: '/team' },
    { key: 'contact', path: '/contact' },
  ];

  const socialLinks = [
    { icon: Facebook, href: 'https://facebook.com/jcibenikhiar', label: 'Facebook' },
    { icon: Instagram, href: 'https://instagram.com/jcibenikhiar', label: 'Instagram' },
    { icon: Linkedin, href: 'https://linkedin.com/company/jcibenikhiar', label: 'LinkedIn' },
  ];

  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Main Footer */}
      <div className="container-custom py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center">
                <span className="text-accent-foreground font-bold text-xl">JCI</span>
              </div>
              <div>
                <p className="font-bold text-lg">JCI Beni Khiar</p>
                <p className="text-sm text-primary-foreground/70">Tunisia</p>
              </div>
            </Link>
            <p className="text-sm text-primary-foreground/80 leading-relaxed">
              {t('footer', 'description')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-accent">
              {t('footer', 'quickLinks')}
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.key}>
                  <Link
                    to={link.path}
                    className="text-sm text-primary-foreground/80 hover:text-accent transition-colors"
                  >
                    {t('nav', link.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-accent">
              {t('contact', 'title')}
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                <span className="text-sm text-primary-foreground/80">
                  Beni Khiar, Nabeul, Tunisia
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-accent shrink-0" />
                <span className="text-sm text-primary-foreground/80">+216 XX XXX XXX</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-accent shrink-0" />
                <span className="text-sm text-primary-foreground/80">contact@jcibenikhiar.org</span>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-accent">
              {t('footer', 'followUs')}
            </h3>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-primary-foreground/10 hover:bg-accent rounded-lg flex items-center justify-center transition-colors group"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5 text-primary-foreground group-hover:text-accent-foreground transition-colors" />
                </a>
              ))}
            </div>
            
            {/* JCI Network */}
            <div className="mt-6">
              <p className="text-sm text-primary-foreground/60 mb-2">Part of</p>
              <div className="flex flex-wrap gap-2 text-xs">
                <a href="https://jci.org" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                  JCI International
                </a>
                <span className="text-primary-foreground/40">•</span>
                <a href="https://jcitunisia.org" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                  JCI Tunisia
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="container-custom py-4">
          <p className="text-center text-sm text-primary-foreground/60">
            © {currentYear} JCI Beni Khiar. {t('footer', 'copyright')}.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
