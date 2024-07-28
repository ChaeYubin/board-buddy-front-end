'use client';

import { Article } from '@/types/article';
import {
  formatMeetingTime,
  formatRelativeTime,
  getTimeFormParameters,
} from '@/utils/date';
import { cn } from '@/utils/tailwind';
import Image from 'next/image';
import Map from './Map';
import { EllipsisVerticalIcon } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useWriteFormContext } from '@/context/WriteFormContext';
import { useRouter } from 'next/navigation';

interface Props extends Omit<Article, 'author'> {
  isAuthor: boolean;
}

const ArticleContent = ({
  id,
  title,
  description,
  meetingLocation,
  sigu,
  sido,
  dong,
  x,
  y,
  maxParticipants,
  currentParticipants,
  startDateTime,
  endDateTime,
  createdAt,
  status,
  isAuthor,
}: Props) => {
  const { formState, setFormState } = useWriteFormContext();
  const router = useRouter();

  const handleEditButtonClick = () => {
    const { startHour, startMinute, endHour, endMinute } =
      getTimeFormParameters(startDateTime, endDateTime);

    setFormState({
      title,
      description,
      meetingLocation,
      maxParticipants: maxParticipants.toString(),
      startHour,
      startMinute,
      endHour,
      endMinute,
      x: x!.toString(),
      y: y!.toString(),
      date: new Date(startDateTime),
      sido: sido!,
      sigu: sigu!,
      dong: dong!,
    });

    router.push(`/article/${id}/edit`);
  };

  const handleRemoveButtonClick = () => {
    // 수정 요청
  };

  return (
    <div className="p-4">
      <div className="text-lg flex gap-2 font-bold ">
        <span
          className={cn(status === 'open' ? 'text-primary' : 'text-gray-500')}
        >
          {status === 'open' ? '모집중' : '모집마감'}
        </span>
        <span className="text-gray-800 ">{title}</span>
        <DropdownMenu>
          <DropdownMenuTrigger
            className={cn(
              isAuthor ? 'visible' : 'hidden',
              'ml-auto cursor-pointer',
            )}
          >
            <EllipsisVerticalIcon />
            <DropdownMenuContent className="bg-white mt-1 -ml-8 w-16">
              <DropdownMenuItem
                className="hover:bg-slate-50 transition-all"
                onClick={handleEditButtonClick}
              >
                수정
              </DropdownMenuItem>
              <DropdownMenuItem
                className="hover:bg-slate-50 transition-all"
                onClick={handleRemoveButtonClick}
              >
                삭제
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenuTrigger>
        </DropdownMenu>
      </div>
      <div className="text-md mt-2 text-gray-800 py-4">{description}</div>
      <div className="text-sm">
        <div className="mr-auto text-gray-500 py-3">
          {formatRelativeTime(createdAt)}
        </div>
        <div>
          <div className="text-gray-600 flex items-center">
            <Image
              src="/images/icon/participants_icon.png"
              alt="participants"
              width={12}
              height={12}
              className="mr-1"
            />
            {currentParticipants}/{maxParticipants}명 참여
          </div>
          <div className="text-gray-700 flex items-center">
            <Image
              src="/images/icon/clock_icon.png"
              alt="clock"
              width={12}
              height={12}
              className="mr-1"
            />
            {formatMeetingTime(startDateTime, endDateTime)}
          </div>
        </div>
      </div>
      <div className="mt-10">
        <span className="text-gray-700 text-lg font-bold">위치</span>
        <div className="text-secondary flex items-center text-sm mt-2 mb-2">
          <Image
            src="/images/icon/map_icon.png"
            alt="map"
            width={12}
            height={12}
            className="mr-1"
          />
          {meetingLocation}
        </div>
        <Map lat={y!} lng={x!} />
      </div>
    </div>
  );
};

export default ArticleContent;
