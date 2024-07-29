import { addComment, editComment, getComments } from '@/services/comment';
import { Comment } from '@/types/comment';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useGetComments = (articleId: number) => {
  return useQuery<Comment[]>({
    queryKey: ['comments', { articleId }],
    queryFn: () => getComments({ gatherArticleId: articleId }),
    staleTime: 0,
    gcTime: 0,
  });
};

export const useAddComment = (articleId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      content,
      parentId,
    }: {
      content: string;
      parentId?: string;
    }) =>
      addComment({
        gatherArticleId: articleId,
        content,
        parentId,
      }),
    onSuccess: () => {
      // 성공 시 댓글 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: ['comments', { articleId }] });
    },
    retry: 0,
  });
};

export const useEditComment = (articleId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      content,
      commentId,
    }: {
      content: string;
      commentId: string;
    }) =>
      editComment({
        gatherArticleId: articleId,
        content,
        commentId,
      }),
    onSuccess: () => {
      // 성공 시 댓글 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: ['comments', { articleId }] });
    },
    retry: 0,
  });
};
