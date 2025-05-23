import { useInfiniteQuery } from "@tanstack/react-query";
import type { GetVideosResponse } from "../../api/types";
import { VideoApi } from "../../api/VideoApi";

function getNextPageParam(
  lastPage: GetVideosResponse,
  allPages: GetVideosResponse[]
) {
  const totalFetched = allPages.flatMap((p) => p.hits).length;
  if (totalFetched < lastPage.totalHits) {
    return allPages.length + 1; // next page number
  }
  return undefined; // no more pages
}

export default function useGetVideosInfinite() {
  return useInfiniteQuery({
    queryFn: VideoApi.getVideos,
    queryKey: ["videos"],
    initialPageParam: 1,
    getNextPageParam,
  });
}
