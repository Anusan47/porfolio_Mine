import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get('username') || 'anusan47';

  try {
    const query = `
      query($username: String!, $year: Int) {
        matchedUser(username: $username) {
          userCalendar(year: $year) {
            submissionCalendar
          }
        }
      }
    `;

    const response = await fetch('https://leetcode.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables: { username, year: new Date().getFullYear() },
      }),
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
      throw new Error(`LeetCode API error: ${response.statusText}`);
    }

    const data = await response.json();

    if (data.errors) {
      throw new Error(data.errors[0].message || 'Invalid LeetCode response');
    }

    const submissionCalendarStr = data.data?.matchedUser?.userCalendar?.submissionCalendar;
    
    if (!submissionCalendarStr) {
      throw new Error('Could not find submission calendar in response');
    }

    const calendar = JSON.parse(submissionCalendarStr);
    
    // We want the last 49 days (7 weeks) to match the dashboard widget layout
    const to = new Date();
    to.setUTCHours(12, 0, 0, 0); // Noon UTC to avoid timezone issues
    
    const contributions = [];
    let totalContributions = 0;

    // Better approach: convert all keys in calendar to YYYY-MM-DD
    const submissionsByDate: Record<string, number> = {};
    for (const [timestampStr, count] of Object.entries(calendar)) {
      const timestamp = parseInt(timestampStr, 10);
      const date = new Date(timestamp * 1000);
      const dateStr = date.toISOString().split('T')[0];
      submissionsByDate[dateStr] = (submissionsByDate[dateStr] || 0) + (count as number);
      totalContributions += count as number;
    }

    for (let i = 48; i >= 0; i--) {
      const d = new Date(to);
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      
      const count = submissionsByDate[dateStr] || 0;
      
      let level = 'NONE';
      if (count > 0) {
        if (count <= 2) level = 'FIRST_QUARTILE';
        else if (count <= 4) level = 'SECOND_QUARTILE';
        else if (count <= 6) level = 'THIRD_QUARTILE';
        else level = 'FOURTH_QUARTILE';
      }

      contributions.push({
        date: dateStr,
        count,
        level,
      });
    }

    return NextResponse.json({
      contributions,
      totalContributions,
      period: '7 weeks',
    });
  } catch (error) {
    console.error('Error fetching LeetCode contributions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch LeetCode contributions' },
      { status: 500 }
    );
  }
}
