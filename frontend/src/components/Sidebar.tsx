import { useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import { FolderOpenDotIcon } from "lucide-react";
import type { PropsWithChildren } from "react";
import { useGetSubscriptions } from "../hooks/users/useGetSubscriptions";
import Loading from "./Loading";
import ErrorMessage from "./Error";
import NoData from "./NoData";

function SectionLink({
  children,
  to,
  text,
}: PropsWithChildren<{ to: string; text: string }>) {
  return (
    <Link
      to={to}
      className="flex flex-col items-center justify-center rounded-lg px-2 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 md:flex-row md:justify-start"
    >
      {children}
      <span className="mt-1 text-xs md:mt-0 md:text-sm">{text}</span>
    </Link>
  );
}

function SubscriptionLink(subscription: { channelId: number }) {
  return (
    <Link
      to={`/users/${subscription.channelId}`}
      className="flex flex-col items-center justify-center rounded-lg px-2 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 md:flex-row md:justify-start"
    >
      <div className="h-6 w-6 rounded-full bg-red-500 md:mr-3"></div>
      <span className="mt-1 text-xs md:mt-0 md:text-sm">
        {subscription.channelId}
      </span>
    </Link>
  );
}

function SubscriptionSection() {
  const { data, isLoading, error } = useGetSubscriptions();

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorMessage error={error as Error} />;
  }

  if (!data) {
    return <NoData message="No subscriptions found" />;
  }

  return (
    <>
      <h3 className="text-center md:text-left md:px-4 text-xs font-semibold uppercase tracking-wider text-gray-500 md:block md:text-sm">
        Subscriptions
      </h3>
      <div className="mt-2 space-y-1 px-2">
        {data.subscriptions.map((subscription) => (
          <SubscriptionLink
            key={subscription.channelId}
            channelId={subscription.channelId}
          />
        ))}
      </div>
    </>
  );
}

export function Sidebar() {
  const { isSignedIn } = useUser();

  return (
    <aside className="hidden w-16 shrink-0 border-r bg-white sm:block sm:w-32 md:w-60">
      <nav className="flex h-full flex-col py-2">
        <div className="space-y-1 px-2">
          <SectionLink to={"/subscriptions"} text="Subscriptions">
            <FolderOpenDotIcon />
          </SectionLink>
        </div>
        <div className="mt-4 border-t pt-4 md:block">
          {isSignedIn ? <SubscriptionSection /> : null}
        </div>
      </nav>
    </aside>
  );
}
