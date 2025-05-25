import { useParams } from "react-router-dom";
import useGetVideo from "../../hooks/videos/useGetVideo";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/Error";
import NoData from "../../components/NoData";
import { VideoInfo } from "./VideoInfo";
import { SuggestedVideos } from "./SuggestedVideos";

export default function WatchPage() {
  const { id } = useParams<{ id: string }>();
  const { isIdValid, isLoading, error, data } = useGetVideo(id);

  if (!isIdValid) {
    return <ErrorMessage error={new Error("Invalid video ID")} />;
  }

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorMessage error={error as Error} />;
  }

  if (!data) {
    return <NoData message="Video requested not found" />;
  }

  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto max-w-7xl p-4">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="relative mb-4">
              <video
                width="100%"
                height="auto"
                controls
                autoPlay
                className="aspect-video w-full rounded-lg bg-black shadow-lg"
                poster={data.videos.medium.thumbnail}
              >
                <source src={data.videos.medium.url} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            <VideoInfo data={data} />
          </div>
          <SuggestedVideos />
        </div>
      </div>
    </main>
  );
}
