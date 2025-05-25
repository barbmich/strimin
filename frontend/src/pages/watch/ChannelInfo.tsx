import { Bell } from "lucide-react";
import type { VideoInformation } from "../../api/types";
import { Button } from "../../components/Button";

export function ChannelInfo({ data }: { data: VideoInformation }) {
  return (
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
          <p className="text-sm text-gray-600">{data.likes} subscribers</p>
        </div>
      </div>
      <Button className="rounded-full bg-red-600 hover:bg-red-700">
        <Bell className="mr-2 h-4 w-4" />
        Subscribe
      </Button>
    </div>
  );
}
