'use client';

import ErrorFallback from '@/components/ErrorFallback';
import Loading from '@/components/Loading';
import { useGetBadgeList } from '@/hooks/useProfile';
import { UserInfo } from '@/types/user';
import { cn } from '@/utils/tailwind';
import { useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';

interface Props {
  nickname?: string;
}

const BadgeListDetail = ({ nickname }: Props) => {
  const cache = useQueryClient();
  const userInfo = cache.getQueryData(['userInfo']) as UserInfo;
  const { nickname: myNickname } = userInfo;

  const {
    data: badges,
    isPending,
    isError,
    error,
    refetch,
  } = useGetBadgeList(nickname || myNickname);

  if (isPending) {
    return <Loading />;
  }

  if (isError) {
    return (
      <ErrorFallback errMsg={error.response?.data.message} reset={refetch} />
    );
  }

  return (
    <div className="px-4 py-8">
      <div className={cn('grid grid-cols-3 gap-y-10 place-items-center')}>
        {badges.length === 0 && (
          <div className="text-sm text-gray-600">획득한 뱃지가 없습니다.</div>
        )}
        {badges.map(
          (badge, i) =>
            badge && (
              <div>
                <div className="bg-gray-100 rounded-full size-24 flex justify-center items-center">
                  <Image
                    src={
                      badge.badgeImageS3SavedURL ||
                      '/images/default_profile.png'
                    }
                    alt="badge image"
                    width={65}
                    height={65}
                    key={i}
                    className="bg-transparent"
                  />
                </div>
                <div className="mt-2 text-sm text-center font-bold text-gray-600">
                  {badge.badgeYearMonth}
                </div>
              </div>
            ),
        )}
      </div>
    </div>
  );
};

export default BadgeListDetail;
