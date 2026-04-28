import React from 'react';
import { Link } from 'react-router-dom';
import { Check, Users, Globe, Award, Heart, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const benefits = [
  { icon: Users, key: 'network' },
  { icon: Award, key: 'skills' },
  { icon: Globe, key: 'leadership' },
  { icon: Heart, key: 'impact' },
];

const steps = [
  { number: 1, title: { fr: 'Contactez-nous', ar: 'تواصل معنا', en: 'Contact Us' }, description: { fr: 'Envoyez-nous un message ou venez à l\'une de nos réunions.', ar: 'أرسل لنا رسالة أو احضر أحد اجتماعاتنا.', en: 'Send us a message or attend one of our meetings.' } },
  { number: 2, title: { fr: 'Rencontrez l\'équipe', ar: 'قابل الفريق', en: 'Meet the Team' }, description: { fr: 'Découvrez notre organisation et nos projets.', ar: 'اكتشف منظمتنا ومشاريعنا.', en: 'Discover our organization and projects.' } },
  { number: 3, title: { fr: 'Adhérez', ar: 'انضم', en: 'Join' }, description: { fr: 'Complétez votre inscription et devenez membre.', ar: 'أكمل تسجيلك وكن عضوًا.', en: 'Complete your registration and become a member.' } },
  { number: 4, title: { fr: 'Agissez', ar: 'تحرك', en: 'Take Action' }, description: { fr: 'Participez aux projets et créez un impact.', ar: 'شارك في المشاريع وأحدث تأثيرًا.', en: 'Participate in projects and create impact.' } },
];

const requirements = [
  { fr: 'Avoir entre 18 et 40 ans', ar: 'أن يكون عمرك بين 18 و40 سنة', en: 'Be between 18 and 40 years old' },
  { fr: 'Être motivé et engagé', ar: 'أن تكون متحمسًا وملتزمًا', en: 'Be motivated and committed' },
  { fr: 'Vouloir servir la communauté', ar: 'الرغبة في خدمة المجتمع', en: 'Want to serve the community' },
  { fr: 'Être prêt à apprendre et grandir', ar: 'الاستعداد للتعلم والنمو', en: 'Be ready to learn and grow' },
];

const JoinPage: React.FC = () => {
  const { t, language } = useLanguage();

  return (
    <div>
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 bg-gradient-to-br from-primary to-jci-blue-light overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px',
          }} />
        </div>
        <div className="container-custom relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            {t('join', 'title')}
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            {t('join', 'subtitle')}
          </p>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <span className="text-accent font-semibold text-sm uppercase tracking-wider">
              {language === 'ar' ? 'لماذا تنضم؟' : language === 'fr' ? 'Pourquoi nous rejoindre?' : 'Why Join Us?'}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2">
              {t('join', 'benefits', 'title')}
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <Card 
                key={benefit.key} 
                className="text-center group hover:shadow-lg transition-all animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary group-hover:scale-110 transition-all">
                    <benefit.icon className="h-8 w-8 text-primary group-hover:text-primary-foreground transition-colors" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{t('join', 'benefits', benefit.key)}</h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How to Join */}
      <section className="section-padding bg-secondary/30">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              {t('join', 'howToJoin')}
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <div 
                key={step.number} 
                className="relative animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                    {step.number}
                  </div>
                  <h3 className="font-bold text-lg mb-2">{step.title[language]}</h3>
                  <p className="text-sm text-muted-foreground">{step.description[language]}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-border" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                {t('join', 'requirements')}
              </h2>
              <ul className="space-y-4">
                {requirements.map((req, index) => (
                  <li key={index} className="flex items-start gap-3 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                    <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="h-4 w-4 text-accent-foreground" />
                    </div>
                    <span className="text-foreground">{req[language]}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gradient-to-br from-primary to-jci-blue-light p-8 rounded-2xl text-white">
              <h3 className="text-2xl font-bold mb-4">
                {language === 'ar' ? 'مستعد للانضمام؟' : language === 'fr' ? 'Prêt à nous rejoindre?' : 'Ready to Join?'}
              </h3>
              <p className="text-white/80 mb-6">
                {language === 'ar' 
                  ? 'تواصل معنا اليوم وابدأ رحلتك مع JCI بني خيار.'
                  : language === 'fr'
                  ? 'Contactez-nous aujourd\'hui et commencez votre voyage avec JCI Beni Khiar.'
                  : 'Contact us today and start your journey with JCI Beni Khiar.'
                }
              </p>
              <Link to="/contact">
                <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 font-bold rounded-full">
                  {language === 'ar' ? 'تواصل معنا' : language === 'fr' ? 'Contactez-nous' : 'Contact Us'}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default JoinPage;
