'use client';

import ErrorFallback from '@/components/ErrorFallback';
import Loading from '@/components/Loading';
import { useUserInfo } from '@/hooks/custom/useUserInfo';
import { useGetBadgeList } from '@/hooks/useProfile';
import { UserInfo } from '@/types/user';
import { cn } from '@/utils/tailwind';
import Image from 'next/image';

interface Props {
  nickname?: UserInfo['nickname'];
}

const BadgeListDetail = ({ nickname }: Props) => {
  const userInfo = useUserInfo();
  const myNickname = userInfo?.nickname || '';

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
    if (error.response?.status === 401) {
      throw error;
    }

    return (
      <ErrorFallback reset={refetch} errMsg={error.response!.data.message} />
    );
  }

  return (
    <div className="px-4 py-8">
      <div className={cn('grid grid-cols-3 gap-y-10 place-items-center')}>
        {badges.length === 0 && (
          <div className="text-sm text-gray-600">획득한 뱃지가 없습니다.</div>
        )}
        {badges.map(
          (badge) =>
            badge && (
              <div key={badge.badgeYearMonth}>
                <div className="flex size-24 items-center justify-center rounded-full bg-bgGray">
                  <Image
                    src={
                      badge.badgeImageSignedURL || '/images/default_profile.png'
                    }
                    alt="badge image"
                    width={65}
                    height={65}
                    className="bg-transparent"
                  />
                </div>
                <div className="mt-2 text-center text-sm font-bold text-gray-600">
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
