import { API_BASE_URL } from '@/services/endpoint';
import { http, HttpResponse } from 'msw';

export const getUserProfile = http.get(
  `${API_BASE_URL}/profiles/:nickname`,
  async () => {
    const result = {
      status: 'success',
      data: {
        profile: {
          profileImageSignedURL: '/images/banner/banner_1.jpeg',
          description: '안녕하세요',
          rank: 2,
          buddyScore: 68,
          badges: [
            {
              badgeImageSignedURL: null,
              badgeYearMonth: '2024.09',
            },
            {
              badgeImageSignedURL: null,
              badgeYearMonth: '2024.08',
            },
            {
              badgeImageSignedURL: null,
              badgeYearMonth: '2024.07',
            },
          ],
          joinCount: 4,
          totalExcellentCount: 2,
          totalGoodCount: 2,
          totalBadCount: 0,
        },
      },
      message: '프로필이 조회되었습니다.',
    };

    return HttpResponse.json(result, { status: 200 });
  },
);
