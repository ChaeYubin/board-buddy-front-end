'use client';

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
  } = useGetBadgeList(nickname || myNickname);

  if (isPending) {
    return <Loading />;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
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
              <Image
                src={
                  badge.badgeImageS3SavedURL || '/images/default_profile.png'
                }
                alt="badge image"
                width={65}
                height={65}
                key={i}
              />
            ),
        )}
      </div>
    </div>
  );
};

export default BadgeListDetail;
