import { Bell } from "lucide-react";
import type { VideoInformation } from "../../api/types";
import { Button } from "../../components/Button";
import { useMutateSubscription } from "../../hooks/users/useMutateSubscription";
import { useGetSubscription } from "../../hooks/users/useGetSubscription";

export function ChannelInfo({ data }: { data: VideoInformation }) {
  const { data: subscriptionData, isLoading } = useGetSubscription(
    data.user_id
  );

  const { mutate } = useMutateSubscription();

  function handleSubscriptionAction() {
    if (isLoading) return;
    mutate({
      id: data.user_id,
      action: subscriptionData?.isSubscribed ? "unsubscribe" : "subscribe",
    });
  }

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
      {subscriptionData ? (
        <Button
          variant={subscriptionData.isSubscribed ? "default" : "important"}
          onClick={() => handleSubscriptionAction()}
        >
          <Bell className="mr-2 h-4 w-4" />
          {subscriptionData.isSubscribed ? "Subscribed" : "Subscribe"}
        </Button>
      ) : null}
    </div>
  );
}
