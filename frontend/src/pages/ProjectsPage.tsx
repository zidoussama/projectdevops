import React, { useState } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const categories = [
  { key: 'all', label: { fr: 'Tous', ar: 'الكل', en: 'All' } },
  { key: 'community', label: { fr: 'Communauté', ar: 'المجتمع', en: 'Community' } },
  { key: 'training', label: { fr: 'Formation', ar: 'التدريب', en: 'Training' } },
  { key: 'environment', label: { fr: 'Environnement', ar: 'البيئة', en: 'Environment' } },
  { key: 'business', label: { fr: 'Entreprise', ar: 'الأعمال', en: 'Business' } },
];

const projects = [
  {
    id: 1,
    title: { fr: 'Éducation pour Tous', ar: 'التعليم للجميع', en: 'Education for All' },
    description: { fr: 'Distribution de fournitures scolaires aux enfants défavorisés de la région.', ar: 'توزيع اللوازم المدرسية على الأطفال المحتاجين في المنطقة.', en: 'Distribution of school supplies to underprivileged children in the region.' },
    category: 'community',
    image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600',
    impact: { fr: '500+ enfants aidés', ar: '500+ طفل مستفيد', en: '500+ children helped' },
    year: 2025,
  },
  {
    id: 2,
    title: { fr: 'Développement Durable', ar: 'التنمية المستدامة', en: 'Sustainable Development' },
    description: { fr: 'Plantation d\'arbres et sensibilisation à l\'environnement dans les écoles.', ar: 'غرس الأشجار والتوعية البيئية في المدارس.', en: 'Tree planting and environmental awareness in schools.' },
    category: 'environment',
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600',
    impact: { fr: '1000+ arbres plantés', ar: '1000+ شجرة مغروسة', en: '1000+ trees planted' },
    year: 2025,
  },
  {
    id: 3,
    title: { fr: 'Mentorat Jeunes Entrepreneurs', ar: 'إرشاد رواد الأعمال الشباب', en: 'Young Entrepreneurs Mentorship' },
    description: { fr: 'Programme de mentorat pour accompagner les jeunes dans leurs projets d\'entreprise.', ar: 'برنامج إرشاد لدعم الشباب في مشاريعهم التجارية.', en: 'Mentorship program to support young people in their business projects.' },
    category: 'business',
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600',
    impact: { fr: '50+ entrepreneurs formés', ar: '50+ رائد أعمال مدرب', en: '50+ entrepreneurs trained' },
    year: 2025,
  },
  {
    id: 4,
    title: { fr: 'Formation en Communication', ar: 'تدريب على التواصل', en: 'Communication Training' },
    description: { fr: 'Ateliers de prise de parole en public et communication professionnelle.', ar: 'ورش عمل في فن الخطابة والتواصل المهني.', en: 'Public speaking and professional communication workshops.' },
    category: 'training',
    image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=600',
    impact: { fr: '200+ participants', ar: '200+ مشارك', en: '200+ participants' },
    year: 2024,
  },
  {
    id: 5,
    title: { fr: 'Nettoyage des Plages', ar: 'تنظيف الشواطئ', en: 'Beach Cleanup' },
    description: { fr: 'Action de nettoyage mensuelle des plages de Beni Khiar.', ar: 'حملة تنظيف شهرية لشواطئ بني خيار.', en: 'Monthly beach cleanup action in Beni Khiar.' },
    category: 'environment',
    image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=600',
    impact: { fr: '5 tonnes de déchets collectés', ar: '5 أطنان من النفايات المجمعة', en: '5 tons of waste collected' },
    year: 2024,
  },
  {
    id: 6,
    title: { fr: 'Aide aux Personnes Âgées', ar: 'مساعدة كبار السن', en: 'Elderly Support' },
    description: { fr: 'Visite et soutien aux personnes âgées isolées de notre communauté.', ar: 'زيارة ودعم كبار السن المعزولين في مجتمعنا.', en: 'Visiting and supporting isolated elderly people in our community.' },
    category: 'community',
    image: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=600',
    impact: { fr: '100+ personnes visitées', ar: '100+ شخص تمت زيارتهم', en: '100+ people visited' },
    year: 2024,
  },
];

const ProjectsPage: React.FC = () => {
  const { t, language } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredProjects = activeCategory === 'all' 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

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
            {t('projects', 'title')}
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            {t('projects', 'subtitle')}
          </p>
        </div>
      </section>

      {/* Projects Section */}
      <section className="section-padding">
        <div className="container-custom">
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {categories.map((category) => (
              <Button
                key={category.key}
                variant={activeCategory === category.key ? 'default' : 'outline'}
                onClick={() => setActiveCategory(category.key)}
                className={cn(
                  'rounded-full',
                  activeCategory === category.key && 'bg-primary text-primary-foreground'
                )}
              >
                {category.label[language]}
              </Button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, index) => (
              <Card 
                key={project.id} 
                className="overflow-hidden group hover:shadow-xl transition-all animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative h-56 overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title[language]}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs font-medium">
                      {categories.find(c => c.key === project.category)?.label[language]}
                    </span>
                    <span className="bg-white/90 text-foreground px-3 py-1 rounded-full text-xs font-medium">
                      {project.year}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white font-bold text-xl">{project.title[language]}</h3>
                  </div>
                </div>
                <CardContent className="p-6">
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {project.description[language]}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                      {project.impact[language]}
                    </div>
                    <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
                      {t('projects', 'viewProject')}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProjectsPage;
