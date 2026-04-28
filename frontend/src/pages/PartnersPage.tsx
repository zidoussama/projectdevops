import React from 'react';
import { ExternalLink } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const partners = [
  {
    id: 1,
    name: 'JCI Tunisia',
    logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=200',
    description: { fr: 'Organisation nationale JCI en Tunisie', ar: 'المنظمة الوطنية JCI في تونس', en: 'JCI National Organization in Tunisia' },
    website: 'https://jcitunisia.org',
    type: 'strategic',
  },
  {
    id: 2,
    name: 'Municipalité de Beni Khiar',
    logo: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=200',
    description: { fr: 'Partenaire institutionnel local', ar: 'شريك مؤسسي محلي', en: 'Local institutional partner' },
    website: '#',
    type: 'institutional',
  },
  {
    id: 3,
    name: 'Université de Nabeul',
    logo: 'https://images.unsplash.com/photo-1562774053-701939374585?w=200',
    description: { fr: 'Partenaire académique pour les formations', ar: 'شريك أكاديمي للتدريب', en: 'Academic partner for training' },
    website: '#',
    type: 'academic',
  },
  {
    id: 4,
    name: 'Banque de Tunisie',
    logo: 'https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?w=200',
    description: { fr: 'Sponsor principal pour nos événements', ar: 'الراعي الرئيسي لفعالياتنا', en: 'Main sponsor for our events' },
    website: '#',
    type: 'sponsor',
  },
  {
    id: 5,
    name: 'Association Environnement Nabeul',
    logo: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=200',
    description: { fr: 'Partenaire pour les projets environnementaux', ar: 'شريك للمشاريع البيئية', en: 'Partner for environmental projects' },
    website: '#',
    type: 'ngo',
  },
  {
    id: 6,
    name: 'Tech Hub Tunisia',
    logo: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=200',
    description: { fr: 'Partenaire innovation et technologie', ar: 'شريك الابتكار والتكنولوجيا', en: 'Innovation and technology partner' },
    website: '#',
    type: 'business',
  },
];

const typeLabels: Record<string, Record<string, string>> = {
  strategic: { fr: 'Partenaire Stratégique', ar: 'شريك استراتيجي', en: 'Strategic Partner' },
  institutional: { fr: 'Partenaire Institutionnel', ar: 'شريك مؤسسي', en: 'Institutional Partner' },
  academic: { fr: 'Partenaire Académique', ar: 'شريك أكاديمي', en: 'Academic Partner' },
  sponsor: { fr: 'Sponsor', ar: 'راعي', en: 'Sponsor' },
  ngo: { fr: 'ONG Partenaire', ar: 'منظمة شريكة', en: 'Partner NGO' },
  business: { fr: 'Partenaire Business', ar: 'شريك أعمال', en: 'Business Partner' },
};

const PartnersPage: React.FC = () => {
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
            {t('partners', 'title')}
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            {t('partners', 'subtitle')}
          </p>
        </div>
      </section>

      {/* Partners Grid */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {partners.map((partner, index) => (
              <Card 
                key={partner.id} 
                className="overflow-hidden group hover:shadow-xl transition-all animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="h-32 bg-gradient-to-br from-secondary to-muted flex items-center justify-center p-6">
                  <img 
                    src={partner.logo} 
                    alt={partner.name}
                    className="max-h-full max-w-full object-contain opacity-80 group-hover:opacity-100 transition-opacity"
                  />
                </div>
                <CardContent className="p-6">
                  <span className="text-xs font-medium text-accent bg-accent/10 px-2 py-1 rounded-full">
                    {typeLabels[partner.type][language]}
                  </span>
                  <h3 className="font-bold text-lg text-foreground mt-3 mb-2">{partner.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {partner.description[language]}
                  </p>
                  {partner.website !== '#' && (
                    <a href={partner.website} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" size="sm" className="gap-2">
                        <ExternalLink className="h-4 w-4" />
                        {language === 'ar' ? 'زيارة الموقع' : language === 'fr' ? 'Visiter le site' : 'Visit Website'}
                      </Button>
                    </a>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Become a Partner CTA */}
      <section className="section-padding bg-gradient-to-r from-accent to-jci-gold-light">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-accent-foreground mb-4">
            {t('partners', 'becomePartner')}
          </h2>
          <p className="text-lg text-accent-foreground/80 mb-8 max-w-2xl mx-auto">
            {language === 'ar' 
              ? 'انضم إلى شبكة شركائنا وساهم في إحداث تأثير إيجابي في مجتمعنا.'
              : language === 'fr'
              ? 'Rejoignez notre réseau de partenaires et contribuez à créer un impact positif dans notre communauté.'
              : 'Join our partner network and contribute to creating positive impact in our community.'
            }
          </p>
          <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold text-lg px-10 py-6 rounded-full">
            {language === 'ar' ? 'تواصل معنا' : language === 'fr' ? 'Contactez-nous' : 'Contact Us'}
          </Button>
        </div>
      </section>
    </div>
  );
};

export default PartnersPage;
