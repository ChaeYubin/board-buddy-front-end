import { cn } from '@/utils/tailwind';
import { ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
  badges: string[];
  nickname?: string;
}

const BadgeList = ({ badges, nickname }: Props) => {
  return (
    <div className="border-b-[1px] border-gray-200 py-4">
      <div className="flex justify-between items-center font-bold mb-4">
        <div className="flex gap-2 px-1">뱃지 목록</div>
        <Link href={nickname ? `${nickname}/badges` : '/my/badges'}>
          <div
            className={cn(
              'flex items-center text-sm text-gray-700 font-bold',
              badges.length === 0 ? 'hidden' : 'visible',
            )}
          >
            <p>전체보기</p>
            <ChevronRight className="w-5 h-5 text-gray-700" />
          </div>
        </Link>
      </div>
      <div
        className={cn(
          'flex justify-center items-center space-x-16',
          badges.length === 0 ? 'pb-4' : 'p-4',
        )}
      >
        {badges.length === 0 && (
          <div className="text-sm text-gray-600">획득한 뱃지가 없습니다.</div>
        )}
        {badges.map(
          (badge, i) =>
            badge && (
              <Image
                src={badge}
                alt="badge image"
                width={48}
                height={48}
                key={i}
              />
            ),
        )}
      </div>
    </div>
  );
};

export default BadgeList;
