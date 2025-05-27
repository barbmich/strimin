import { Link } from "react-router-dom";
import Loading from "../../components/Loading";
import useGetSuggestedVideos from "../../hooks/videos/useGetSuggestedVideos";
import ErrorMessage from "../../components/Error";
import NoData from "../../components/NoData";
import type { VideoInformation } from "../../api/types";

function ThumbnailSuggested({ videoData }: { videoData: VideoInformation }) {
  return (
    <>
      <div className="relative flex-shrink-0 w-[168px] h-[94px]">
        <img
          src={videoData.videos.medium.thumbnail || "/placeholder.svg"}
          alt={videoData.id.toString()}
          width={168}
          height={94}
          className="rounded-lg object-cover w-full h-full"
        />
        <div className="absolute bottom-1 right-1 rounded bg-black bg-opacity-80 px-1 py-0.5 text-xs text-white">
          {videoData.duration}
        </div>
      </div>
      <div className="min-w-0 flex-1">
        <h4 className="line-clamp-2 text-sm font-medium leading-tight">
          {videoData.id}
        </h4>
        <p className="mt-1 text-xs text-gray-600">{videoData.user}</p>
        <p className="text-xs text-gray-600">{videoData.views} views</p>
      </div>
    </>
  );
}

export function SuggestedVideos() {
  const { isLoading, error, data } = useGetSuggestedVideos();

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorMessage error={error as Error} />;
  }

  if (!data || data.hits.length === 0) {
    return <NoData message="No suggested videos available" />;
  }

  return (
    <div className="space-y-2">
      <h3 className="font-medium">Up next</h3>
      {data.hits.map((video) => (
        <Link
          key={video.id}
          to={`/watch?v=${video.id}`}
          className="flex gap-2 rounded-lg p-2 hover:bg-gray-50"
        >
          <ThumbnailSuggested videoData={video} />
        </Link>
      ))}
    </div>
  );
}
