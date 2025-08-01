import { checkUserLogin, login, logout, withdrawal } from '@/services/auth';
import { successToast } from '@/utils/customToast';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import useAppRouter from './custom/useAppRouter';

export const useUserLoginCheck = ({ isReady }: { isReady: boolean }) => {
  return useQuery({
    queryKey: ['userInfo'],
    queryFn: checkUserLogin,
    enabled: isReady,
    staleTime: Infinity,
    gcTime: Infinity,
  });
};

export const useUserLogin = () => {
  const queryClient = useQueryClient();
  const router = useAppRouter();

  return useMutation({
    mutationFn: (data: { username: string; password: string }) => login(data),
    onSuccess: async (data) => {
      const userInfo = data;

      await queryClient.prefetchQuery({
        queryKey: ['userInfo'],
        queryFn: () => Promise.resolve(userInfo),
        staleTime: Infinity,
        gcTime: Infinity,
      });

      router.replace({ href: '/home', screenName: 'HomeScreen' });
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  const router = useAppRouter();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.invalidateQueries();

      router.replace({ href: '/home', screenName: 'HomeScreen' });

      successToast('logout', '로그아웃되었습니다.');
    },
  });
};

export const useWithdrawal = () => {
  const queryClient = useQueryClient();
  const router = useAppRouter();

  return useMutation({
    mutationFn: withdrawal,
    onSuccess: () => {
      queryClient.invalidateQueries();

      router.replace({ href: '/home', screenName: 'HomeScreen' });

      successToast('withdrawal', '탈퇴되었습니다.');
    },
  });
};
