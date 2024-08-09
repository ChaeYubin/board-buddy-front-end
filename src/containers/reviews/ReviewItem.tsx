'use client';

import CustomAvatar from '@/components/CustomAvatar';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useSendReview } from '@/hooks/useReview';
import ReviewModal from './ReviewModal';

interface Props {
  nickname: string;
  profileImage: string | null;
  rank: number | null;
  hasReviewed: boolean;
  articleId: string;
}

const ReviewItem = ({
  nickname,
  profileImage,
  rank,
  hasReviewed,
  articleId,
}: Props) => {
  const [open, setOpen] = useState(false);

  const mutation = useSendReview(articleId, nickname, setOpen);

  const onSubmit = (review: string) => {
    mutation.mutate({ review });
  };

  return (
    <>
      <div className="flex items-center pb-3 border-b border-slate-100">
        <CustomAvatar
          src={profileImage}
          rank={rank}
          nickname={nickname}
          avatarSize="sm"
        />
        <span className="ml-2">{nickname}</span>
        <Button
          className="text-white rounded-lg px-3 py-2 h-8 ml-auto disabled:bg-slate-300 disabled:text-slate-600"
          disabled={hasReviewed}
          onClick={() => setOpen(true)}
        >
          {hasReviewed ? '작성 완료' : '후기 작성'}
        </Button>
      </div>
      <ReviewModal
        open={open}
        setOpen={setOpen}
        nickname={nickname}
        onSubmit={onSubmit}
      />
    </>
  );
};

export default ReviewItem;
