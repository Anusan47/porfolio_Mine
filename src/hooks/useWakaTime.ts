import { useState, useEffect } from 'react';

interface WakaTimeData {
  totalHours: number;
  totalCoffees: number;
  isLoading: boolean;
  error: string | null;
}

const BASE_HOURS = 543;
const BASE_COFFEES = 194;

export function useWakaTime(): WakaTimeData {
  const [totalHours, setTotalHours] = useState(BASE_HOURS);
  const [totalCoffees, setTotalCoffees] = useState(BASE_COFFEES);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchWakaTimeData() {
      try {
        const response = await fetch('/api/wakatime');

        if (!response.ok) {
          throw new Error('Failed to fetch WakaTime data');
        }

        const data = await response.json();

        // Add WakaTime hours to base values
        const liveHours = data.totalHours || 0;
        setTotalHours(BASE_HOURS + liveHours);
        setTotalCoffees(BASE_COFFEES + Math.ceil(liveHours / 4));
        setError(null);
      } catch (err) {
        console.error('WakaTime fetch error:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
        // Keep using base values on error
        setTotalHours(BASE_HOURS);
        setTotalCoffees(BASE_COFFEES);
      } finally {
        setIsLoading(false);
      }
    }

    fetchWakaTimeData();
  }, []);

  return { totalHours, totalCoffees, isLoading, error };
}
