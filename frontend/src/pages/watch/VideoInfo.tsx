import { ThumbsUp, ThumbsDown, Share, Download } from "lucide-react";
import { Button } from "../../components/Button";
import type { VideoInformation } from "../../api/types";
import { ChannelInfo } from "./ChannelInfo";

function VideoStats({ data }: { data: VideoInformation }) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-4 text-sm text-gray-600">
        <span>{data.views} views</span>
      </div>

      <div className="flex items-center gap-2">
        <div className="flex items-center rounded-full bg-gray-100">
          <Button
            variant="ghost"
            className="rounded-l-full rounded-r-full px-4"
          >
            <ThumbsUp className="mr-2 h-4 w-4" />
            {data.likes}
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
  );
}

export function VideoInfo({ data }: { data: VideoInformation }) {
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold leading-tight">abababa</h1>
      <VideoStats data={data} />
      <ChannelInfo data={data} />
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
                  This is a sample comment for video {i + 1}. Great content,
                  really enjoyed watching this!
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
  );
}
