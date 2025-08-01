'use client';

import { useIntersectionObserver } from '@/hooks/custom/useIntersectionObserver';
import { useGetArticles } from '@/hooks/useArticle';
import Loading from '@/components/Loading';
import ErrorFallback from '@/components/ErrorFallback';
import Selectors from './Selectors';
import Article from '../../containers/home/Article';
import { GetArticleRequestParams } from '@/types/article';
import useSearchPageDetection from '@/hooks/custom/useSearchPageDetection';
import { Province } from '@/types/location';
import useAppRouter from '@/hooks/custom/useAppRouter';

export interface ArticleListProps extends GetArticleRequestParams {
  emptyGuideMessage: string;
  province: Province | null;
  setStatus: (status: string | null) => void;
  setSort: (sort: string | null) => void;
}

const ArticleList = ({
  status,
  sort,
  sido,
  sgg,
  keyword,
  emptyGuideMessage,
  province,
  setStatus,
  setSort,
}: ArticleListProps) => {
  const router = useAppRouter();

  const { isSearchPage: search } = useSearchPageDetection();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isPending,
    isFetching,
    isError,
    error,
    refetch,
  } = useGetArticles({ status, sort, sido, sgg, keyword, search });

  const { setTarget } = useIntersectionObserver({
    hasNextPage,
    fetchNextPage,
  });

  if (isError) {
    if (error.response?.status === 401) {
      throw error;
    }

    return (
      <ErrorFallback reset={refetch} errMsg={error.response!.data.message} />
    );
  }

  return (
    <div>
      <Selectors
        province={province}
        sgg={sgg}
        status={status}
        sort={sort}
        setStatus={setStatus}
        setSort={setSort}
      />
      {isPending && isFetching && <Loading />}
      {!isPending && (
        <>
          {data.pages.map(
            (group) =>
              group.posts && (
                <div
                  key={
                    group.posts.length > 0 ? group.posts[0].id : 'last-group'
                  }
                  className="flex flex-col gap-y-4 pb-4"
                >
                  {group.posts.map((article) => (
                    <Article
                      onClick={() =>
                        router.push({
                          href: `/article/${article.id}`,
                          headerTitle: '모집글 상세',
                        })
                      }
                      key={article.id}
                      id={article.id}
                      title={article.title}
                      description={article.description}
                      author={article.author}
                      meetingLocation={article.meetingLocation}
                      maxParticipants={article.maxParticipants}
                      currentParticipants={article.currentParticipants}
                      startDateTime={article.startDateTime}
                      endDateTime={article.endDateTime}
                      createdAt={article.createdAt}
                      status={article.status}
                    />
                  ))}
                </div>
              ),
          )}
          {(data.pages[0].posts === null ||
            data.pages[0].posts.length === 0) && (
            <div className="py-12 text-center text-sm text-gray-600">
              {emptyGuideMessage}
            </div>
          )}

          <div ref={setTarget} className="h-0" />
        </>
      )}
    </div>
  );
};

export default ArticleList;
