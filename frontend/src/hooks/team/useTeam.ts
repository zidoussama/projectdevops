import { useEffect, useState } from 'react';
import axios from 'axios';

type TeamApiItem = {
  _id: string;
  name: string;
  role: TeamMember['role'];
  year?: number;
  image: string;
};

export interface TeamMember {
  id: string;
  name: {
    fr: string;
    en: string;
    ar: string;
  };
  role: 'President' | 'Executive Vice President' | 'Vice President' | 'Secretary' | 'Treasurer' | 'User';
  year?: number;
  image: string;
  bio?: {
    fr: string;
    en: string;
    ar: string;
  };
}

export const useTeam = () => {

  const [team, setTeam] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {

    const fetchTeam = async () => {
      try {

        const response = await axios.get<{ teams?: TeamApiItem[] }>(
          `${import.meta.env.VITE_API_URL}/team`
        );

        // 👉 Mapping frontend (SANS toucher backend)
        const formatted = (response.data.teams || []).map((item) => ({
          id: item._id,
          name: {
            fr: item.name,
            en: item.name,
            ar: item.name
          },
          role: item.role,
          year: item.year,
          image: item.image,  // Cloudinary URL
          bio: {
            fr: '',
            en: '',
            ar: ''
          }
        }));

        setTeam(formatted);

      } catch (err: unknown) {
        setError('Failed to load team');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTeam();

  }, []);

  return { team, loading, error };
};
