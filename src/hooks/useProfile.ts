import { editProfile, getProfile } from '@/services/profile';
import { UserInfo } from '@/types/user';
import { blobToJson } from '@/utils/blobToJson';
import { successToast } from '@/utils/customToast';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export const useGetMyProfile = () => {
  const queryClient = useQueryClient();
  const userInfo = queryClient.getQueryData(['userInfo']) as UserInfo;
  const { nickname } = userInfo;

  return useQuery({
    queryKey: ['profile', { nickname }],
    queryFn: () => getProfile(nickname),
    staleTime: 0,
    gcTime: 0,
  });
};

export const useGetOtherUserProfile = (nickname: string) => {
  return useQuery({
    queryKey: ['profile', { nickname }],
    queryFn: () => getProfile(nickname),
    staleTime: 0,
    gcTime: 0,
  });
};

export const useEditProfile = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (data: FormData) => editProfile(data),
    onSuccess: async (_, variables) => {
      const updatedData = variables.get('UpdateProfileDTO') as File;
      const json = await blobToJson(updatedData);
      const newNickname = json.nickname;

      // 성공 시 userInfo 업데이트
      await queryClient.setQueryData(['userInfo'], (old: UserInfo) => {
        return {
          ...old,
          nickname: newNickname ?? old.nickname,
        };
      });
      router.push('/my');
      successToast('profile update', '프로필이 수정되었습니다.');
    },
    retry: 0,
  });
};
