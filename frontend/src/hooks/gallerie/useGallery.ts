import { useEffect, useState } from 'react';
import axios from 'axios';

export interface GalleryItem {
  id: string;
  src: string;
  category: string;
  title: {
    fr: string;
    en: string;
    ar: string;
  };
}

export const useGallery = () => {

  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {

    const fetchGallery = async () => {
      try {

        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/gallery`
        );

        // 👉 Mapping frontend (SANS toucher backend)
        const formatted = response.data.map((item: any) => ({
          id: item._id,
          src: item.image,          // Cloudinary URL
          category: item.type,      // event, project...
          title: {
            fr: item.title,
            en: item.title,
            ar: item.title
          }
        }));

        setGallery(formatted);

      } catch (err: any) {
        setError('Failed to load gallery');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();

  }, []);

  return { gallery, loading, error };
};
