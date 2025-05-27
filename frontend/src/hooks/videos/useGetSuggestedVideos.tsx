import { useQuery } from "@tanstack/react-query";
import { VideoApi } from "../../api/VideoApi";

export default function useGetSuggestedVideos() {
  return useQuery({
    queryFn: () => VideoApi.getVideos({}),
    queryKey: ["videos", "suggested"],
    staleTime: 5000,
  });
}
