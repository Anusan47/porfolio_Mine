import { useEffect, useState } from 'react';

export interface LeetCodeContribution {
  date: string;
  count: number;
  level: 'NONE' | 'FIRST_QUARTILE' | 'SECOND_QUARTILE' | 'THIRD_QUARTILE' | 'FOURTH_QUARTILE';
}

export interface LeetCodeData {
  contributions: LeetCodeContribution[];
  totalContributions: number;
  period: string;
}

interface UseLeetCodeReturn {
  data: LeetCodeData | null;
  isLoading: boolean;
  error: string | null;
}

export function useLeetCode(username?: string): UseLeetCodeReturn {
  const [data, setData] = useState<LeetCodeData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchLeetCodeData() {
      try {
        const url = username ? `/api/leetcode?username=${encodeURIComponent(username)}` : '/api/leetcode';
        const response = await fetch(url, {
          cache: 'no-store',
        });

        if (!response.ok) {
          throw new Error('Failed to fetch LeetCode data');
        }

        const result = await response.json();

        if (result && !result.error) {
          setData(result);
          setError(null);
        } else {
          setError(result.error || 'Unknown error');
        }
      } catch (err) {
        console.error('Error fetching LeetCode data:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch LeetCode data');
      } finally {
        setIsLoading(false);
      }
    }

    fetchLeetCodeData();
  }, [username]);

  return { data, isLoading, error };
}
