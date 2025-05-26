import ErrorMessage from "../../components/Error";
import useGetVideosInfinite from "../../hooks/videos/useGetVideosInfinite";
import NoData from "../../components/NoData";
import { ThumbnailCard } from "./Card";
import { Link, useSearchParams } from "react-router-dom";
import Loading from "../../components/Loading";
import { SEARCH_QUERY_PARAM } from "../../constants";

export default function HomePage() {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get(SEARCH_QUERY_PARAM) || "";
  const {
    data,
    error,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useGetVideosInfinite(searchQuery);

  function handleScroll(e: React.UIEvent<HTMLDivElement, UIEvent>) {
    const target = e.target as HTMLElement;

    if (
      target.scrollHeight - target.scrollTop - target.clientHeight < 100 &&
      hasNextPage &&
      !isFetchingNextPage
    ) {
      fetchNextPage();
    }
  }

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorMessage error={error as Error} />;
  }

  if (!data || data.pages[0].hits.length === 0) {
    return <NoData message="No videos found" />;
  }

  return (
    <main className="h-full overflow-y-auto p-4" onScroll={handleScroll}>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {data.pages
          .flatMap((page) => page.hits)
          .map((videoData) => (
            <Link to={`/watch/${videoData.id}`} key={videoData.id}>
              <ThumbnailCard videoData={videoData} />
            </Link>
          ))}
      </div>
      {isFetchingNextPage && "Loading more..."}
    </main>
  );
}
