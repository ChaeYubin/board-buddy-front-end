'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { UserInfo } from '@/types/user';
import { cn } from '@/utils/tailwind';
import { SparklesIcon, ThumbsDownIcon, ThumbsUpIcon, X } from 'lucide-react';
import { Dispatch, SetStateAction, useState } from 'react';

interface Props {
  open: boolean;
  nickname: UserInfo['nickname'];
  setOpen: Dispatch<SetStateAction<boolean>>;
  onSubmit: (review: string) => void;
}

const ReviewModal = ({ open, nickname, setOpen, onSubmit }: Props) => {
  const [selected, setSelected] = useState<string>('');

  const handleSelect = (choice: string) => {
    setSelected(choice);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mb-4 text-center">
            {nickname} 평가하기
          </DialogTitle>
          <DialogDescription>
            <div className="grid grid-cols-2 gap-2 px-6 pb-2">
              <Button
                className={cn(
                  'bg-white border border-gray-400 text-gray-500 flex items-center gap-1 transition-none',
                  selected === 'EXCELLENT' &&
                    'border-primary text-primary font-extrabold border-2',
                )}
                onClick={() => handleSelect('EXCELLENT')}
              >
                최고예요
                <SparklesIcon
                  size={16}
                  strokeWidth={selected === 'EXCELLENT' ? 2.5 : 2}
                />
              </Button>
              <Button
                className={cn(
                  'bg-white border border-gray-400 text-gray-500 flex items-center gap-1 transition-none',
                  selected === 'GOOD' &&
                    'border-primary text-primary font-extrabold border-2',
                )}
                onClick={() => handleSelect('GOOD')}
              >
                좋아요
                <ThumbsUpIcon
                  size={16}
                  strokeWidth={selected === 'GOOD' ? 2.5 : 2}
                />
              </Button>
              <Button
                className={cn(
                  'bg-white border border-gray-400 text-gray-500 flex items-center gap-1 transition-none',
                  selected === 'BAD' &&
                    'border-primary text-primary font-extrabold border-2',
                )}
                onClick={() => handleSelect('BAD')}
              >
                별로예요
                <ThumbsDownIcon
                  size={16}
                  strokeWidth={selected === 'BAD' ? 2.5 : 2}
                />
              </Button>
              <Button
                className={cn(
                  'bg-white border border-gray-400 text-gray-500 flex items-center gap-1 transition-none',
                  selected === 'NOSHOW' &&
                    'border-primary text-primary font-extrabold border-2',
                )}
                onClick={() => handleSelect('NOSHOW')}
              >
                노쇼
                <X size={16} strokeWidth={selected === 'NOSHOW' ? 2.5 : 2} />
              </Button>
            </div>
          </DialogDescription>
        </DialogHeader>
        <div className="flex grow text-center">
          <div
            className="h-10 w-full cursor-pointer place-content-center rounded-bl-lg bg-gray-300 text-sm font-semibold"
            onClick={() => setOpen(false)}
          >
            <p>취소</p>
          </div>
          <div
            className="w-full cursor-pointer place-content-center rounded-br-lg bg-primary text-sm font-semibold text-white"
            onClick={() => onSubmit(selected)}
          >
            <p>후기 보내기</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ReviewModal;
