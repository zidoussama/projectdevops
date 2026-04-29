import { useEffect, useState } from 'react';
import axios from 'axios';

type GalleryApiItem = {
  _id: string;
  image: string;
  type: string;
  title: string;
};

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

        const response = await axios.get<GalleryApiItem[]>(
          `${import.meta.env.VITE_API_URL}/gallery`
        );

        // 👉 Mapping frontend (SANS toucher backend)
        const formatted = response.data.map((item) => ({
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

      } catch (err: unknown) {
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
