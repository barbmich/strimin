import type { VideoInformation } from "../../api/types";
import { formatDuration, formatViews } from "../../helpers";

export function ThumbnailCard({
  videoData: videoData,
}: {
  videoData: VideoInformation;
}) {
  return (
    <div
      key={videoData.id}
      className="overflow-hidden rounded-lg bg-white shadow"
    >
      <div className="relative overflow-hidden">
        <img
          src={videoData.videos["medium"].thumbnail}
          alt={`Video thumbnail ${videoData.id}`}
          width={320}
          height={180}
          className="h-48 w-full object-cover transition-transform duration-300 hover:scale-110"
        />
        <div className="absolute bottom-2 right-2 rounded bg-black bg-opacity-80 px-1 py-0.5 text-xs text-white">
          {formatDuration(videoData.duration)}
        </div>
      </div>
      <div className="p-3">
        <div className="flex">
          <div className="mr-3 h-9 w-9 flex-shrink-0">
            {videoData.userImageURL ? (
              <img
                src={videoData.userImageURL}
                alt={videoData.user}
                className="h-full w-full rounded-full bg-gray-300"
              />
            ) : (
              <div className="h-full w-full rounded-full bg-gray-300 flex items-center justify-center text-xl font-semibold text-gray-600">
                {videoData.user[0].toUpperCase() || "?"}
              </div>
            )}
          </div>
          <div className="text-end">
            <h3 className="line-clamp-2 font-medium">
              Video Title {videoData.id} - This is a longer title that might
              wrap to multiple lines
            </h3>
            <p className="mt-1 text-sm text-gray-500 pb-2">{videoData.user}</p>
            <p className="text-sm text-gray-500">
              {formatViews(videoData.views)} views
            </p>
            <p className="text-sm text-gray-500">
              {formatViews(videoData.likes)} likes
            </p>
            <p className="text-sm text-gray-500">
              {formatViews(videoData.comments)} comments
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
