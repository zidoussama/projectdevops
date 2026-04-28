import React from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTeam, TeamMember } from '@/hooks/team/useTeam';
import president from "@/assets/equipe/p1.jpg";
import vp from "@/assets/equipe/vpfd.png";
import sc from "@/assets/equipe/Secrétaire Général.png";
import conseillerjuridiques from "@/assets/equipe/comseiller juridique.png";

const boardMembers = [
  {
    id: 1,
    name: { fr: 'Hadi Slama', ar: 'هادي سلامة', en: 'Hadi Slama' },
    role: 'president',
    image: president,
    bio: { fr: '', ar: '', en: '' },
  },
  {
    id: 2,
    name: { fr: 'Ranim Chahata', ar: 'رنين شحاتة', en: 'Ranim Chahata' },
    role: 'VPFD',
    image: vp,
    bio: { fr: '', ar: '', en: '' },
  },
  {
    id: 3,
    name: { fr: 'Mayssa Elgarsi', ar: 'ميساء الجرسي', en: 'Mayssa Elgarsi' },
    role: 'secretary',
    image: sc,
    bio: { fr: '', ar: '', en: '' },
  },
  {
    id: 4,
    name: { fr: 'Salma Bouaziz', ar: 'سلمى بوعزيز', en: 'Salma Bouaziz' },
    role: 'treasurer',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
    bio: { fr: '', ar: '', en: '' },
  },
  {
    id: 5,
    name: { fr: 'Dhia daoud', ar: 'ضياء داود', en: 'Dhia daoud' },
    role: 'conseillerjuridique',
    image: conseillerjuridiques,
    bio: { fr: '', ar: '', en: '' },
  
  }
];

const pastPresidents = [
  { year: 2024, name: { fr: 'Karim Mansour', ar: 'كريم منصور', en: 'Karim Mansour' }, image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400' },
  { year: 2023, name: { fr: 'Nadia Ferchichi', ar: 'نادية الفرشيشي', en: 'Nadia Ferchichi' }, image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400' },
  { year: 2022, name: { fr: 'Omar Jebali', ar: 'عمر الجبالي', en: 'Omar Jebali' }, image: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400' },
  { year: 2021, name: { fr: 'Leila Hamdi', ar: 'ليلى الحمدي', en: 'Leila Hamdi' }, image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400' },
];

const testimonials = [
  {
    id: 1,
    name: { fr: 'Youssef Mejri', ar: 'يوسف المجري', en: 'Youssef Mejri' },
    role: { fr: 'Membre depuis 2020', ar: 'عضو منذ 2020', en: 'Member since 2020' },
    quote: { fr: 'JCI a transformé ma vie. J\'ai développé des compétences de leadership que je n\'aurais jamais imaginées.', ar: 'غيرت JCI حياتي. طورت مهارات قيادية لم أكن أتخيلها.', en: 'JCI has transformed my life. I\'ve developed leadership skills I never imagined.' },
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400',
  },
  {
    id: 2,
    name: { fr: 'Ines Chaabane', ar: 'إيناس شعبان', en: 'Ines Chaabane' },
    role: { fr: 'Membre depuis 2021', ar: 'عضو منذ 2021', en: 'Member since 2021' },
    quote: { fr: 'L\'opportunité de servir ma communauté tout en construisant un réseau international est incroyable.', ar: 'فرصة خدمة مجتمعي مع بناء شبكة دولية أمر مذهل.', en: 'The opportunity to serve my community while building an international network is incredible.' },
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400',
  },
];

const TeamPage: React.FC = () => {
  const { t, language } = useLanguage();
  const { team, loading, error } = useTeam();

  const roleLabels: Record<string, Record<string, string>> = {
    'President': { fr: 'Président(e)', ar: 'الرئيس', en: 'President' },
    'Executive Vice President': { fr: 'Vice Président Exécutif', ar: 'نائب الرئيس التنفيذي', en: 'Executive Vice President' },
    'Vice President': { fr: 'Vice Président', ar: 'نائب الرئيس', en: 'Vice President' },
    'Secretary': { fr: 'Secrétaire Général(e)', ar: 'الأمين العام', en: 'Secretary General' },
    'Treasurer': { fr: 'Trésorier(ère)', ar: 'أمين المال', en: 'Treasurer' },
    'User': { fr: 'Membre', ar: 'عضو', en: 'Member' },
  };

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
            {t('team', 'title')}
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            {t('team', 'subtitle')}
          </p>
        </div>
      </section>

      {/* Team Section */}
      <section className="section-padding">
        <div className="container-custom">

          {/* STATES */}
          {loading && (
            <p className="text-center text-lg">Loading team...</p>
          )}

          {error && (
            <p className="text-center text-red-500">{error}</p>
          )}

          {!loading && !error && (
          <Tabs defaultValue="current" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-10">
              <TabsTrigger value="current" className="text-base">
                {t('team', 'currentBoard')}
              </TabsTrigger>
              <TabsTrigger value="past" className="text-base">
                {t('team', 'pastPresidents')}
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="current">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {team.map((member, index) => (
                  <Card 
                    key={member.id} 
                    className="overflow-hidden group hover:shadow-xl transition-all text-center animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="relative h-64 overflow-hidden">
                      <img 
                        src={member.image} 
                        alt={member.name?.[language] || member.name?.fr || 'Team member'}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4 text-white">
                        
                        <h3 className="font-bold text-lg">{member.name?.[language] || member.name?.fr || 'N/A'}</h3>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <p className="text-xs bg-accent text-accent-foreground px-2 py-1 rounded-full inline-block mb-2">
                          {roleLabels[member.role]?.[language] || member.role}
                        </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="past">
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {pastPresidents.map((president, index) => (
                  <Card 
                    key={president.year} 
                    className="overflow-hidden group hover:shadow-lg transition-all text-center animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={president.image} 
                        alt={president.name[language]}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    </div>
                    <CardContent className="p-4">
                      <p className="text-2xl font-bold text-primary mb-1">{president.year}</p>
                      <h3 className="font-medium text-foreground">{president.name[language]}</h3>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
          )}
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-secondary/30">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              {language === 'ar' ? 'ماذا يقول أعضاؤنا' : language === 'fr' ? 'Ce que disent nos membres' : 'What our members say'}
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={testimonial.id} className="p-6 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="p-0">
                  <div className="flex items-start gap-4">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name[language]}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <p className="text-muted-foreground italic mb-4">"{testimonial.quote[language]}"</p>
                      <p className="font-bold text-foreground">{testimonial.name[language]}</p>
                      <p className="text-sm text-primary">{testimonial.role[language]}</p>
                    </div>
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

export default TeamPage;
