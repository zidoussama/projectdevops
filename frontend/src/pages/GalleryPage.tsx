import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useGallery, GalleryItem } from '@/hooks/gallerie/useGallery';
// ---------------- CATEGORIES ----------------

const categories = [
  { key: 'all', label: { fr: 'Toutes', ar: 'الكل', en: 'All' } },
  { key: 'events', label: { fr: 'Événements', ar: 'الفعاليات', en: 'Events' } },
  { key: 'projects', label: { fr: 'Projets', ar: 'المشاريع', en: 'Projects' } },
  { key: 'team', label: { fr: 'Équipe', ar: 'الفريق', en: 'Team' } },
  { key: 'training', label: { fr: 'Formation', ar: 'التدريب', en: 'Training' } },
];

// ---------------- COMPONENT ----------------

const GalleryPage: React.FC = () => {

  const { t, language } = useLanguage();

  const { gallery, loading, error } = useGallery();

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  // ---------------- FILTER ----------------

  const filteredImages =
    activeCategory === 'all'
      ? gallery
      : gallery.filter(img => img.category === activeCategory);

  return (
    <div>

      {/* HERO SECTION */}
      <section className="relative py-24 md:py-32 bg-gradient-to-br from-primary to-jci-blue-light overflow-hidden">
        <div className="container-custom text-center text-white">
          <h1 className="text-5xl font-bold mb-4">
            {t('gallery', 'title')}
          </h1>
          <p className="text-xl opacity-80">
            {t('gallery', 'subtitle')}
          </p>
        </div>
      </section>

      {/* GALLERY SECTION */}
      <section className="section-padding">
        <div className="container-custom">

          {/* FILTER BUTTONS */}
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

          {/* STATES */}
          {loading && (
            <p className="text-center text-lg">Loading gallery...</p>
          )}

          {error && (
            <p className="text-center text-red-500">{error}</p>
          )}

          {/* GRID */}
          {!loading && !error && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">

              {filteredImages.map((image, index) => (
                <div
                  key={image.id}
                  className="relative group cursor-pointer overflow-hidden rounded-xl aspect-square animate-fade-in"
                  style={{ animationDelay: `${index * 0.05}s` }}
                  onClick={() => setSelectedImage(image)}
                >
                  <img
                    src={image.src}
                    alt={image.title[language]}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />

                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors flex items-end">
                    <p className="text-white font-medium p-4 translate-y-full group-hover:translate-y-0 transition-transform">
                      {image.title[language]}
                    </p>
                  </div>
                </div>
              ))}

            </div>
          )}

        </div>
      </section>

      {/* LIGHTBOX */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-white"
            onClick={() => setSelectedImage(null)}
          >
            <X size={32} />
          </button>

          <img
            src={selectedImage.src}
            alt={selectedImage.title[language]}
            className="max-w-full max-h-[90vh] rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />

          <p className="absolute bottom-8 text-white text-lg font-medium">
            {selectedImage.title[language]}
          </p>
        </div>
      )}

    </div>
  );
};

export default GalleryPage;
