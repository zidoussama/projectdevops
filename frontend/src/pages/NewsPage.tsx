import React from 'react';
import { Calendar, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const newsArticles = [
  {
    id: 1,
    title: { fr: 'JCI Beni Khiar remporte le prix du meilleur projet environnemental', ar: 'JCI بني خيار تفوز بجائزة أفضل مشروع بيئي', en: 'JCI Beni Khiar wins best environmental project award' },
    excerpt: { fr: 'Notre projet de nettoyage des plages a été reconnu au niveau national pour son impact positif sur l\'environnement.', ar: 'تم الاعتراف بمشروعنا لتنظيف الشواطئ على المستوى الوطني لتأثيره الإيجابي على البيئة.', en: 'Our beach cleanup project was recognized nationally for its positive environmental impact.' },
    date: '2026-01-02',
    image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=600',
    category: { fr: 'Récompenses', ar: 'جوائز', en: 'Awards' },
  },
  {
    id: 2,
    title: { fr: 'Lancement du programme de mentorat 2026', ar: 'إطلاق برنامج الإرشاد 2026', en: 'Launch of 2026 mentorship program' },
    excerpt: { fr: 'Inscrivez-vous dès maintenant pour bénéficier de l\'accompagnement de nos mentors expérimentés.', ar: 'سجل الآن للاستفادة من مرافقة مرشدينا ذوي الخبرة.', en: 'Register now to benefit from the guidance of our experienced mentors.' },
    date: '2025-12-28',
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600',
    category: { fr: 'Programmes', ar: 'برامج', en: 'Programs' },
  },
  {
    id: 3,
    title: { fr: 'Retour sur le gala annuel 2025', ar: 'نظرة على الحفل السنوي 2025', en: 'Looking back at the 2025 annual gala' },
    excerpt: { fr: 'Une soirée mémorable célébrant les réalisations de notre organisation et de nos membres.', ar: 'أمسية لا تُنسى للاحتفال بإنجازات منظمتنا وأعضائنا.', en: 'A memorable evening celebrating the achievements of our organization and members.' },
    date: '2025-12-22',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600',
    category: { fr: 'Événements', ar: 'فعاليات', en: 'Events' },
  },
  {
    id: 4,
    title: { fr: 'Partenariat avec l\'université de Nabeul', ar: 'شراكة مع جامعة نابل', en: 'Partnership with Nabeul University' },
    excerpt: { fr: 'Un nouveau partenariat pour offrir des opportunités de formation aux étudiants.', ar: 'شراكة جديدة لتوفير فرص التدريب للطلاب.', en: 'A new partnership to offer training opportunities to students.' },
    date: '2025-12-15',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600',
    category: { fr: 'Partenariats', ar: 'شراكات', en: 'Partnerships' },
  },
  {
    id: 5,
    title: { fr: 'Campagne de sensibilisation au don de sang', ar: 'حملة توعية للتبرع بالدم', en: 'Blood donation awareness campaign' },
    excerpt: { fr: 'Rejoignez-nous pour sauver des vies en participant à notre campagne de don de sang.', ar: 'انضم إلينا لإنقاذ الأرواح من خلال المشاركة في حملتنا للتبرع بالدم.', en: 'Join us to save lives by participating in our blood donation campaign.' },
    date: '2025-12-10',
    image: 'https://images.unsplash.com/photo-1615461066841-6116e61058f4?w=600',
    category: { fr: 'Actions', ar: 'أعمال', en: 'Actions' },
  },
];

const NewsPage: React.FC = () => {
  const { t, language } = useLanguage();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(
      language === 'ar' ? 'ar-TN' : language === 'fr' ? 'fr-TN' : 'en-US',
      { year: 'numeric', month: 'long', day: 'numeric' }
    );
  };

  const featuredArticle = newsArticles[0];
  const otherArticles = newsArticles.slice(1);

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
            {t('news', 'title')}
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            {t('news', 'subtitle')}
          </p>
        </div>
      </section>

      {/* Featured Article */}
      <section className="section-padding">
        <div className="container-custom">
          <Card className="overflow-hidden group hover:shadow-xl transition-all">
            <div className="grid lg:grid-cols-2">
              <div className="relative h-64 lg:h-auto overflow-hidden">
                <img
                  src={featuredArticle.image}
                  alt={featuredArticle.title[language]}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-medium">
                  {featuredArticle.category[language]}
                </div>
              </div>
              <CardContent className="p-8 flex flex-col justify-center">
                <div className="flex items-center gap-2 text-muted-foreground text-sm mb-4">
                  <Calendar className="h-4 w-4" />
                  <span>{formatDate(featuredArticle.date)}</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
                  {featuredArticle.title[language]}
                </h2>
                <p className="text-muted-foreground mb-6">
                  {featuredArticle.excerpt[language]}
                </p>
                <Button className="w-fit">
                  {t('news', 'readMore')}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </div>
          </Card>
        </div>
      </section>

      {/* Other Articles */}
      <section className="section-padding pt-0">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {otherArticles.map((article, index) => (
              <Card
                key={article.id}
                className="overflow-hidden group hover:shadow-lg transition-all animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title[language]}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-accent text-accent-foreground px-2 py-0.5 rounded-full text-xs font-medium">
                    {article.category[language]}
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 text-muted-foreground text-xs mb-2">
                    <Calendar className="h-3 w-3" />
                    <span>{formatDate(article.date)}</span>
                  </div>
                  <h3 className="font-bold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                    {article.title[language]}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {article.excerpt[language]}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default NewsPage;
