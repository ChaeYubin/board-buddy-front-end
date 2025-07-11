import ChatList from '@/containers/chat/ChatList';
import ChatListContainer from '@/containers/chat/ChatListContainer';
import { getChatList } from '@/services/chat';
import getQueryClient from '@/utils/getQueryClient';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

const page = async () => {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['chat'],
    queryFn: getChatList,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ChatListContainer>
        <ChatList />
      </ChatListContainer>
    </HydrationBoundary>
  );
};

export default page;
