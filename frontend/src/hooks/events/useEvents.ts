import { useEffect, useState } from 'react';
import axios from 'axios';

export interface EventItem {
  id: string;
  title: {
    fr: string;
    en: string;
    ar: string;
  };
  description: {
    fr: string;
    en: string;
    ar: string;
  };
  date: string;
  time: string;
  location: {
    fr: string;
    en: string;
    ar: string;
  };
  image: string;
  details: {
    fr: string;
    en: string;
    ar: string;
  };
  status: 'upcoming' | 'past';
  isUpcoming: boolean;
}

export const useEvents = () => {

  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {

    const fetchEvents = async () => {
      try {

        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/events`
        );

        // 👉 Mapping frontend (SANS toucher backend)
        const formatted = response.data.map((item: any) => ({
          id: item._id,
          title: {
            fr: item.title,
            en: item.title,
            ar: item.title
          },
          description: {
            fr: item.description,
            en: item.description,
            ar: item.description
          },
          date: item.date,
          time: item.time,
          location: {
            fr: item.location,
            en: item.location,
            ar: item.location
          },
          image: item.image,  // Cloudinary URL
          details: {
            fr: item.details,
            en: item.details,
            ar: item.details
          },
          status: item.status,
          isUpcoming: item.status === 'upcoming'
        }));

        setEvents(formatted);

      } catch (err: any) {
        setError('Failed to load events');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();

  }, []);

  return { events, loading, error };
};
