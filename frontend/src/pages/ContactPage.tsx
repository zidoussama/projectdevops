import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Linkedin, Send } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

const ContactPage: React.FC = () => {
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: language === 'ar' ? 'تم إرسال الرسالة!' : language === 'fr' ? 'Message envoyé!' : 'Message sent!',
      description: language === 'ar' 
        ? 'شكرًا لتواصلك معنا. سنرد عليك قريبًا.'
        : language === 'fr'
        ? 'Merci de nous avoir contactés. Nous vous répondrons bientôt.'
        : 'Thank you for contacting us. We will respond shortly.',
    });
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const contactInfo = [
    { icon: MapPin, label: t('contact', 'info', 'address'), value: 'Beni Khiar, Nabeul, Tunisia 8060' },
    { icon: Phone, label: t('contact', 'info', 'phone'), value: '+216 XX XXX XXX' },
    { icon: Mail, label: t('contact', 'info', 'email'), value: 'contact@jcibenikhiar.org' },
    { icon: Clock, label: language === 'ar' ? 'ساعات العمل' : language === 'fr' ? 'Heures d\'ouverture' : 'Working Hours', value: language === 'ar' ? 'السبت - الخميس: 9:00 - 17:00' : language === 'fr' ? 'Sam - Jeu: 9h - 17h' : 'Sat - Thu: 9am - 5pm' },
  ];

  const socialLinks = [
    { icon: Facebook, href: 'https://facebook.com/jcibenikhiar', label: 'Facebook' },
    { icon: Instagram, href: 'https://instagram.com/jcibenikhiar', label: 'Instagram' },
    { icon: Linkedin, href: 'https://linkedin.com/company/jcibenikhiar', label: 'LinkedIn' },
  ];

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
            {t('contact', 'title')}
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            {t('contact', 'subtitle')}
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="shadow-lg">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-foreground mb-6">
                  {language === 'ar' ? 'أرسل لنا رسالة' : language === 'fr' ? 'Envoyez-nous un message' : 'Send us a message'}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">{t('contact', 'form', 'name')}</Label>
                      <Input 
                        id="name" 
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">{t('contact', 'form', 'email')}</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required 
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">{t('contact', 'form', 'subject')}</Label>
                    <Input 
                      id="subject" 
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">{t('contact', 'form', 'message')}</Label>
                    <Textarea 
                      id="message" 
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required 
                    />
                  </div>
                  <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                    <Send className="mr-2 h-4 w-4" />
                    {t('contact', 'form', 'send')}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <div className="space-y-6">
              {/* Info Cards */}
              <div className="grid sm:grid-cols-2 gap-4">
                {contactInfo.map((info, index) => (
                  <Card key={index} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                    <CardContent className="p-5 flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                        <info.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">{info.label}</p>
                        <p className="font-medium text-foreground">{info.value}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Social Links */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg mb-4">{t('contact', 'info', 'social')}</h3>
                  <div className="flex gap-3">
                    {socialLinks.map((social) => (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 bg-primary hover:bg-accent rounded-xl flex items-center justify-center transition-colors group"
                        aria-label={social.label}
                      >
                        <social.icon className="h-6 w-6 text-primary-foreground group-hover:text-accent-foreground transition-colors" />
                      </a>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Map */}
              <Card className="overflow-hidden">
                <div className="h-64 bg-muted">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12968.693831970482!2d10.7!3d36.75!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12e2cda2c15c5a4f%3A0x0!2sBeni%20Khiar!5e0!3m2!1sen!2stn!4v1234567890"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="JCI Beni Khiar Location"
                  />
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
