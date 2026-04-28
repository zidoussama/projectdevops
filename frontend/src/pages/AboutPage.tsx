import React from 'react';
import { Target, Eye, Heart, Users, Globe, Award, Lightbulb, Shield } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import benikhiar from "@/assets/benikhiar.jpg"

const values = [
  { key: 'belief', icon: Heart },
  { key: 'brotherhood', icon: Users },
  { key: 'service', icon: Globe },
  { key: 'rights', icon: Shield },
];

const whyJoinReasons = [
  { icon: Award, title: { fr: 'Leadership', ar: 'القيادة', en: 'Leadership' }, description: { fr: 'Développez vos compétences de leader', ar: 'طور مهاراتك القيادية', en: 'Develop your leadership skills' } },
  { icon: Globe, title: { fr: 'Réseau International', ar: 'شبكة دولية', en: 'International Network' }, description: { fr: 'Connectez-vous avec des jeunes du monde entier', ar: 'تواصل مع شباب من جميع أنحاء العالم', en: 'Connect with young people worldwide' } },
  { icon: Lightbulb, title: { fr: 'Innovation', ar: 'الابتكار', en: 'Innovation' }, description: { fr: 'Lancez des projets innovants', ar: 'أطلق مشاريع مبتكرة', en: 'Launch innovative projects' } },
  { icon: Target, title: { fr: 'Impact', ar: 'التأثير', en: 'Impact' }, description: { fr: 'Créez un changement positif dans votre communauté', ar: 'أحدث تغييرًا إيجابيًا في مجتمعك', en: 'Create positive change in your community' } },
];

const AboutPage: React.FC = () => {
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
            {t('about', 'title')}
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            {t('about', 'subtitle')}
          </p>
        </div>
      </section>

      {/* JCI Introduction */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-accent font-semibold text-sm uppercase tracking-wider">
                Junior Chamber International
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-6">
                {language === 'ar' ? 'ما هي JCI؟' : language === 'fr' ? 'Qu\'est-ce que JCI?' : 'What is JCI?'}
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                {t('about', 'jciIntro')}
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-secondary/50 p-4 rounded-xl">
                  <p className="text-3xl font-bold text-primary mb-1">200K+</p>
                  <p className="text-sm text-muted-foreground">{language === 'ar' ? 'عضو حول العالم' : language === 'fr' ? 'Membres dans le monde' : 'Members worldwide'}</p>
                </div>
                <div className="bg-secondary/50 p-4 rounded-xl">
                  <p className="text-3xl font-bold text-primary mb-1">100+</p>
                  <p className="text-sm text-muted-foreground">{language === 'ar' ? 'دولة' : language === 'fr' ? 'Pays' : 'Countries'}</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=600" 
                alt="JCI Global"
                className="rounded-2xl shadow-xl w-full"
              />
              <div className="absolute -bottom-6 -left-6 bg-accent text-accent-foreground p-6 rounded-2xl shadow-lg">
                <p className="text-4xl font-bold">1915</p>
                <p className="text-sm">{language === 'ar' ? 'سنة التأسيس' : language === 'fr' ? 'Année de fondation' : 'Year founded'}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* JCI Beni Khiar */}
      <section className="section-padding bg-secondary/30">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <img 
                src={benikhiar} 
                alt="JCI Beni Khiar Team"
                className="rounded-2xl shadow-xl w-full"
              />
            </div>
            <div className="order-1 lg:order-2">
              <span className="text-accent font-semibold text-sm uppercase tracking-wider">
                JCI Tunisia
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-6">
                JCI Beni Khiar
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                {t('about', 'localIntro')}
              </p>
              <p className="text-muted-foreground leading-relaxed">
                {language === 'ar' 
                  ? 'بني خيار هي مدينة ساحلية جميلة في محافظة نابل، ومنظمتنا تعمل على تمكين الشباب المحلي من خلال مشاريع متنوعة تشمل التعليم والبيئة وريادة الأعمال.'
                  : language === 'fr'
                  ? 'Beni Khiar est une belle ville côtière du gouvernorat de Nabeul, et notre organisation travaille à autonomiser les jeunes locaux à travers divers projets incluant l\'éducation, l\'environnement et l\'entrepreneuriat.'
                  : 'Beni Khiar is a beautiful coastal town in the Nabeul Governorate, and our organization works to empower local youth through various projects including education, environment, and entrepreneurship.'
                }
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-none shadow-lg bg-primary text-primary-foreground overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-bl-full" />
              <CardContent className="p-8 relative z-10">
                <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center mb-6">
                  <Target className="h-8 w-8 text-accent-foreground" />
                </div>
                <h3 className="text-2xl font-bold mb-4">{t('about', 'mission', 'title')}</h3>
                <p className="text-primary-foreground/90 leading-relaxed">
                  {t('about', 'mission', 'description')}
                </p>
              </CardContent>
            </Card>
            <Card className="border-none shadow-lg bg-accent text-accent-foreground overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-bl-full" />
              <CardContent className="p-8 relative z-10">
                <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mb-6">
                  <Eye className="h-8 w-8 text-primary-foreground" />
                </div>
                <h3 className="text-2xl font-bold mb-4">{t('about', 'vision', 'title')}</h3>
                <p className="leading-relaxed">
                  {t('about', 'vision', 'description')}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-secondary/30">
        <div className="container-custom">
          <div className="text-center mb-12">
            <span className="text-accent font-semibold text-sm uppercase tracking-wider">
              {language === 'ar' ? 'ما نؤمن به' : language === 'fr' ? 'Ce en quoi nous croyons' : 'What we believe in'}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2">
              {t('about', 'values', 'title')}
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={value.key} className="border-none shadow-md hover:shadow-lg transition-shadow text-center group animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary group-hover:scale-110 transition-all">
                    <value.icon className="h-8 w-8 text-primary group-hover:text-primary-foreground transition-colors" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{t('values', value.key, 'title')}</h3>
                  <p className="text-sm text-muted-foreground">{t('values', value.key, 'description')}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Join */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">
              {language === 'ar' ? 'لماذا تنضم إلى JCI؟' : language === 'fr' ? 'Pourquoi rejoindre JCI?' : 'Why Join JCI?'}
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyJoinReasons.map((reason, index) => (
              <div key={index} className="text-center group animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <reason.icon className="h-8 w-8 text-accent-foreground" />
                </div>
                <h3 className="font-bold text-lg mb-2">{reason.title[language]}</h3>
                <p className="text-sm text-primary-foreground/80">{reason.description[language]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
