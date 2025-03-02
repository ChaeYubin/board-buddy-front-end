import api from '@/services';

/** 참가 신청 리스트 조회 API */
export const getParticipants = ({ articleId }: { articleId: string }) =>
  api
    .get(`/gather-articles/${articleId}/participation`)
    .then((response) => response.data.data.participationAppliedMemberList);

/** 참가 신청 API */
export const applyParticipation = ({ articleId }: { articleId: string }) =>
  api.post(`/gather-articles/${articleId}/participation`);

/** 참가 신청 취소 API */
export const cancelParticipation = ({ articleId }: { articleId: string }) =>
  api.put(`/gather-articles/${articleId}/participation`);

/** 참가 신청 승인 API */
export const approveParticipation = ({
  articleId,
  participationId,
  applicantNickname,
}: {
  articleId: string;
  participationId: string;
  applicantNickname: string;
}) =>
  api.put(
    `/gather-articles/${articleId}/participation/${participationId}/approval?applicantNickname=${applicantNickname}`,
  );

/** 참가 신청 거절 API */
export const rejectParticipation = ({
  articleId,
  participationId,
  applicantNickname,
}: {
  articleId: string;
  participationId: string;
  applicantNickname: string;
}) =>
  api.put(
    `/gather-articles/${articleId}/participation/${participationId}/rejection?applicantNickname=${applicantNickname}`,
  );
