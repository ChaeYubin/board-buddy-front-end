'use client';

import { cn } from '@/utils/tailwind';
import { Bell, ChevronLeft, SearchIcon } from 'lucide-react';
import { usePathname } from 'next/navigation';

const Header = () => {
  const pathname = usePathname();

  if (
    pathname === '/' ||
    pathname === '/login' ||
    pathname === '/register/terms' ||
    pathname === '/register/accounts' ||
    pathname === '/register/additionalSettings' ||
    pathname === '/login/oauth/callback'
  )
    return null;

  const headerParams: Record<string, { title: string; leftArrow: boolean }> = {
    '/': {
      title: '',
      leftArrow: false,
    },
    '/home': {
      title: '홈',
      leftArrow: false,
    },
    '/chat': {
      title: '채팅 목록',
      leftArrow: false,
    },
    '/map': {
      title: '보드게임 카페 찾기',
      leftArrow: true,
    },
    '/my': {
      title: '마이페이지',
      leftArrow: false,
    },
    '/setting/location': {
      title: '동네 설정',
      leftArrow: true,
    },
    '/write/locationSetting': {
      title: '모임 위치 선택',
      leftArrow: true,
    },
  };

  let title = headerParams[pathname]?.title || '';
  let leftArrow = headerParams[pathname]?.leftArrow || false;

  if (pathname.startsWith('/article/')) {
    if (pathname.includes('write')) {
      title = '모집글 작성';
      leftArrow = true;
    } else if (pathname.includes('edit')) {
      title = '모집글 수정';
      leftArrow = true;
    } else {
      title = '모집글 상세';
      leftArrow = true;
    }
  }

  if (pathname.includes('participants')) {
    title = '참가 신청 목록';
    leftArrow = true;
  }

  if (pathname.split('/').length >= 3) {
    title = '채팅';
    leftArrow = true;
  }

  return (
    <div className="flex items-center border-b py-3 px-2 border-gray-200">
      <div className="left-section basis-1/3">
        {leftArrow && (
          <ChevronLeft
            className="w-5 h-5 cursor-pointer"
            onClick={() => {
              window.history.back();
            }}
          />
        )}
      </div>
      <div className="title-section basis-1/3 text-center">
        <span className="font-bold">{title}</span>
      </div>
      <div className="right-section ml-auto flex gap-2 items-center">
        <SearchIcon
          className={cn(
            'w-5 h-5 cursor-pointer',
            pathname === '/home' ? 'visible' : 'hidden',
          )}
        />
        <Bell
          className={cn(
            'w-5 h-5 cursor-pointer',
            pathname === '/home' ? 'visible' : 'hidden',
          )}
        />
      </div>
    </div>
  );
};

export default Header;
