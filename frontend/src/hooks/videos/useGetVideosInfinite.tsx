import {
  useInfiniteQuery,
  useQueryClient,
  type InfiniteData,
} from "@tanstack/react-query";
import type { VideosResponse } from "../../api/types";
import { VideoApi } from "../../api/VideoApi";
import { useEffect } from "react";

function useSetVideoCache(data: InfiniteData<VideosResponse> | undefined) {
  const queryClient = useQueryClient();
  const hits = data?.pages.flatMap((page) => page.hits);

  useEffect(() => {
    if (!hits) return;

    hits.forEach((v) => {
      queryClient.setQueryData(["video", v.id], v);
    });
  }, [hits, queryClient]);
}

function getNextPageParam(
  lastPage: VideosResponse,
  allPages: VideosResponse[]
) {
  const totalFetched = allPages.flatMap((p) => p.hits).length;
  if (totalFetched < lastPage.totalHits) {
    return allPages.length + 1; // next page number
  }
  return undefined; // no more pages
}

export default function useGetVideosInfinite(searchQuery: string) {
  const infiniteQuery = useInfiniteQuery({
    queryFn: ({ pageParam }) => VideoApi.getVideos({ pageParam, searchQuery }),
    queryKey: ["videos", searchQuery],
    initialPageParam: 1,
    getNextPageParam,
    staleTime: 5000,
  });

  useSetVideoCache(infiniteQuery.data);
  return infiniteQuery;
}
