import { Link, useParams } from "react-router-dom";
import useGetVideo from "../../hooks/videos/useGetVideo";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/Error";
import NoData from "../../components/NoData";

import { ThumbsUp, ThumbsDown, Share, Download, Bell } from "lucide-react";
import { Button } from "../../components/Button";

const suggestedVideos = Array.from({ length: 10 }, (_, i) => ({
  id: i + 2,
  title: `Suggested Video ${
    i + 1
  } - Interesting content that you might enjoy watching`,
  thumbnail: `/placeholder.svg?height=94&width=168&text=Video+${i + 1}`,
  channel: `Channel ${i + 1}`,
  views: `${Math.floor(Math.random() * 900) + 100}K`,
  duration: `${Math.floor(Math.random() * 10) + 1}:${Math.floor(
    Math.random() * 50
  )
    .toString()
    .padStart(2, "0")}`,
  uploadDate: `${Math.floor(Math.random() * 7) + 1} days ago`,
}));

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
          {/* Main Video Section */}
          <div className="lg:col-span-2">
            {/* Video Player */}
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

            {/* Video Info */}
            <div className="space-y-4">
              {/* Title */}
              <h1 className="text-xl font-semibold leading-tight">abababa</h1>

              {/* Video Stats and Actions */}
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span>{data.views} views</span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex items-center rounded-full bg-gray-100">
                    <Button
                      variant="ghost"
                      className="rounded-l-full rounded-r-none px-4"
                    >
                      <ThumbsUp className="mr-2 h-4 w-4" />
                      {data.likes}
                    </Button>
                    <div className="h-6 w-px bg-gray-300"></div>
                    <Button
                      variant="ghost"
                      className="rounded-l-none rounded-r-full px-4"
                    >
                      <ThumbsDown className="h-4 w-4" />
                    </Button>
                  </div>
                  <Button variant="ghost" className="rounded-full">
                    <Share className="mr-2 h-4 w-4" />
                    Share
                  </Button>
                  <Button variant="ghost" className="rounded-full">
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </div>
              </div>

              {/* Channel Info */}
              <div className="flex items-start justify-between border-t pt-4">
                <div className="flex items-start gap-3">
                  <img
                    src={data.userImageURL}
                    alt={data.user}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <div>
                    <div className="flex items-center gap-1">
                      <h3 className="font-medium">{data.user}</h3>
                    </div>
                    <p className="text-sm text-gray-600">
                      {data.likes} subscribers
                    </p>
                  </div>
                </div>
                <Button className="rounded-full bg-red-600 hover:bg-red-700">
                  <Bell className="mr-2 h-4 w-4" />
                  Subscribe
                </Button>
              </div>

              {/* Description */}
              <div className="rounded-lg bg-gray-50 p-4">
                <p className="whitespace-pre-line text-sm leading-relaxed">
                  video description
                </p>
              </div>

              {/* Comments Section */}
              <div className="border-t pt-6">
                <h3 className="mb-4 text-lg font-medium">Comments</h3>
                <div className="space-y-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="flex gap-3">
                      <div className="h-8 w-8 rounded-full bg-gray-300"></div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 text-sm">
                          <span className="font-medium">@user{i + 1}</span>
                          <span className="text-gray-500">
                            {Math.floor(Math.random() * 24) + 1} hours ago
                          </span>
                        </div>
                        <p className="mt-1 text-sm">
                          This is a sample comment for video {i + 1}. Great
                          content, really enjoyed watching this!
                        </p>
                        <div className="mt-2 flex items-center gap-4 text-xs text-gray-600">
                          <button className="flex items-center gap-1 hover:text-gray-900">
                            <ThumbsUp className="h-3 w-3" />
                            {Math.floor(Math.random() * 50) + 1}
                          </button>
                          <button className="flex items-center gap-1 hover:text-gray-900">
                            <ThumbsDown className="h-3 w-3" />
                          </button>
                          <button className="hover:text-gray-900">Reply</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar - Suggested Videos */}
          <div className="space-y-2">
            <h3 className="font-medium">Up next</h3>
            {suggestedVideos.map((video) => (
              <Link
                key={video.id}
                to={`/watch?v=${video.id}`}
                className="flex gap-2 rounded-lg p-2 hover:bg-gray-50"
              >
                <div className="relative flex-shrink-0">
                  <img
                    src={video.thumbnail || "/placeholder.svg"}
                    alt={video.title}
                    width={168}
                    height={94}
                    className="rounded-lg object-cover"
                  />
                  <div className="absolute bottom-1 right-1 rounded bg-black bg-opacity-80 px-1 py-0.5 text-xs text-white">
                    {video.duration}
                  </div>
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="line-clamp-2 text-sm font-medium leading-tight">
                    {video.title}
                  </h4>
                  <p className="mt-1 text-xs text-gray-600">{video.channel}</p>
                  <p className="text-xs text-gray-600">
                    {video.views} views • {video.uploadDate}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
