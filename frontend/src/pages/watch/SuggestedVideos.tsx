import { Link } from "react-router-dom";

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

export function SuggestedVideos() {
  return (
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
  );
}
