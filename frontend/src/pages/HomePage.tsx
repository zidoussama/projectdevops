import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, Target, Calendar, Award, ChevronRight } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

// Sample data for featured content
const upcomingEvents = [
  {
    id: 1,
    title: { fr: 'Formation Leadership', ar: 'تدريب القيادة', en: 'Leadership Training' },
    date: '2026-02-15',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400',
  },
  {
    id: 2,
    title: { fr: 'Nettoyage de Plage', ar: 'تنظيف الشاطئ', en: 'Beach Cleanup' },
    date: '2026-02-22',
    image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=400',
  },
  {
    id: 3,
    title: { fr: 'Conférence Entrepreneuriat', ar: 'مؤتمر ريادة الأعمال', en: 'Entrepreneurship Conference' },
    date: '2026-03-10',
    image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=400',
  },
];

const featuredProjects = [
  {
    id: 1,
    title: { fr: 'Éducation pour Tous', ar: 'التعليم للجميع', en: 'Education for All' },
    category: { fr: 'Communauté', ar: 'المجتمع', en: 'Community' },
    image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=400',
  },
  {
    id: 2,
    title: { fr: 'Développement Durable', ar: 'التنمية المستدامة', en: 'Sustainable Development' },
    category: { fr: 'Environnement', ar: 'البيئة', en: 'Environment' },
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400',
  },
  {
    id: 3,
    title: { fr: 'Mentorat Jeunes', ar: 'إرشاد الشباب', en: 'Youth Mentorship' },
    category: { fr: 'Formation', ar: 'التدريب', en: 'Training' },
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400',
  },
];

const HomePage: React.FC = () => {
  const { t, language } = useLanguage();

  const stats = [
    { icon: Users, value: '50+', label: t('stats', 'members') },
    { icon: Target, value: '30+', label: t('stats', 'projects') },
    { icon: Calendar, value: '20+', label: t('stats', 'events') },
    { icon: Award, value: '10+', label: t('stats', 'years') },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary via-primary to-jci-blue-light">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px',
          }} />
        </div>
        
        {/* Floating Shapes */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-accent/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-accent/30 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
        
        <div className="container-custom relative z-10 text-center">
          <div className="max-w-4xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8 animate-fade-in">
              <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
              <span className="text-sm text-white/90">JCI Tunisia • Beni Khiar</span>
            </div>
            
            {/* Title */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              {t('hero', 'title')}
            </h1>
            
            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-white/80 mb-10 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.4s' }}>
              {t('hero', 'subtitle')}
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in" style={{ animationDelay: '0.6s' }}>
              <Link to="/join">
                <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 font-bold text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all">
                  {t('hero', 'cta')}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/about">
                <Button size="lg" variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white/20 font-semibold text-lg px-8 py-6 rounded-full">
                  {t('hero', 'learnMore')}
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
            <div className="w-1.5 h-3 bg-white/50 rounded-full" />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 md:py-16 bg-background relative -mt-16 z-20">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-shadow bg-card">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <stat.icon className="h-6 w-6 text-primary" />
                  </div>
                  <p className="text-3xl md:text-4xl font-bold text-primary mb-1">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Preview Section */}
      <section className="section-padding bg-secondary/30">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-accent font-semibold text-sm uppercase tracking-wider">
                {t('about', 'subtitle')}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-6">
                {t('about', 'title')}
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                {t('about', 'jciIntro')}
              </p>
              <p className="text-muted-foreground leading-relaxed mb-8">
                {t('about', 'localIntro')}
              </p>
              <Link to="/about">
                <Button className="bg-primary hover:bg-primary/90">
                  {t('common', 'viewMore')}
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="bg-primary text-primary-foreground p-6 rounded-2xl">
                  <h3 className="font-bold mb-2">{t('about', 'mission', 'title')}</h3>
                  <p className="text-sm text-primary-foreground/80">{t('about', 'mission', 'description')}</p>
                </div>
                <img 
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400" 
                  alt="Team collaboration"
                  className="rounded-2xl w-full h-40 object-cover"
                />
              </div>
              <div className="space-y-4 pt-8">
                <img 
                  src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=400" 
                  alt="Community work"
                  className="rounded-2xl w-full h-40 object-cover"
                />
                <div className="bg-accent text-accent-foreground p-6 rounded-2xl">
                  <h3 className="font-bold mb-2">{t('about', 'vision', 'title')}</h3>
                  <p className="text-sm">{t('about', 'vision', 'description')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
            <div>
              <span className="text-accent font-semibold text-sm uppercase tracking-wider">
                {t('events', 'upcoming')}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2">
                {t('events', 'title')}
              </h2>
            </div>
            <Link to="/events">
              <Button variant="outline">
                {t('events', 'viewAll')}
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {upcomingEvents.map((event, index) => (
              <Card key={event.id} className="overflow-hidden group hover:shadow-lg transition-all animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={event.image} 
                    alt={event.title[language]}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-medium">
                    {new Date(event.date).toLocaleDateString(language === 'ar' ? 'ar-TN' : language === 'fr' ? 'fr-TN' : 'en-US', { month: 'short', day: 'numeric' })}
                  </div>
                </div>
                <CardContent className="p-5">
                  <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors">
                    {event.title[language]}
                  </h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container-custom">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
            <div>
              <span className="text-accent font-semibold text-sm uppercase tracking-wider">
                {t('projects', 'subtitle')}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mt-2">
                {t('projects', 'title')}
              </h2>
            </div>
            <Link to="/projects">
              <Button variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                {t('events', 'viewAll')}
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {featuredProjects.map((project, index) => (
              <div key={project.id} className="group cursor-pointer animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="relative h-64 rounded-2xl overflow-hidden mb-4">
                  <img 
                    src={project.image} 
                    alt={project.title[language]}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="inline-block bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs font-medium mb-2">
                      {project.category[language]}
                    </span>
                    <h3 className="text-white font-bold text-xl">{project.title[language]}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-accent to-jci-gold-light">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-accent-foreground mb-4">
            {t('join', 'title')}
          </h2>
          <p className="text-lg text-accent-foreground/80 mb-8 max-w-2xl mx-auto">
            {t('join', 'subtitle')}
          </p>
          <Link to="/join">
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold text-lg px-10 py-6 rounded-full shadow-lg">
              {t('hero', 'cta')}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
