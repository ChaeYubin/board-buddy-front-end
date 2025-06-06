import { API_BASE_URL } from '@/services/endpoint';
import { http, HttpResponse } from 'msw';

export const getMyArticles = http.get(
  `${API_BASE_URL}/my/gather-articles`,
  async () => {
    const result = {
      status: 'success',
      data: {
        posts: [
          {
            id: 1,
            title: '퇴근 후 보드게임 ㄱㄱ하실분',
            description: '스플렌더 하실 분~',
            meetingLocation: '레드버튼 신림점',
            maxParticipants: 4,
            currentParticipants: 2,
            startDateTime: '2024-07-20 11:00',
            endDateTime: '2024-07-20 13:00',
            createdAt: '2024-07-19 13:09',
            status: 'open',
          },
          {
            id: 2,
            title: '퇴근 후 보드게임 ㄱㄱ하실분',
            description: '스플렌더 하실 분~',
            meetingLocation: '레드버튼 신림점',
            maxParticipants: 4,
            currentParticipants: 2,
            startDateTime: '2024-07-20 11:00',
            endDateTime: '2024-07-20 13:00',
            createdAt: '2024-07-19 13:09',
            status: 'closed',
          },
        ],
      },
      message: '작성한 모집글이 조회되었습니다.',
    };

    return HttpResponse.json(result, { status: 200 });
  },
);
