import { useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import { FolderOpenDotIcon, UserSquareIcon } from "lucide-react";
import type { PropsWithChildren } from "react";

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

function SubscriptionLink(subscriptionInfo: { id: number; name: string }) {
  return (
    <Link
      to="#"
      className="flex flex-col items-center justify-center rounded-lg px-2 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 md:flex-row md:justify-start"
    >
      <div className="h-6 w-6 rounded-full bg-red-500 md:mr-3"></div>
      <span className="mt-1 text-xs md:mt-0 md:text-sm">
        {subscriptionInfo.name}
      </span>
    </Link>
  );
}

const subscriptions = [
  { id: 1, name: "Subscription 1" },
  { id: 2, name: "Subscription 2" },
  { id: 3, name: "Subscription 3" },
];

export function Sidebar() {
  const { isSignedIn } = useUser();

  return (
    <aside className="hidden w-16 shrink-0 border-r bg-white sm:block sm:w-32 md:w-60">
      <nav className="flex h-full flex-col py-2">
        {/* Main sections */}
        <div className="space-y-1 px-2">
          <SectionLink to={"/subscriptions"} text="Subscriptions">
            <FolderOpenDotIcon />
          </SectionLink>
          <SectionLink to={"/profile"} text="Profile">
            <UserSquareIcon />
          </SectionLink>
        </div>
        <div className="mt-4 border-t pt-4 md:block">
          {/* Subscription section */}
          {isSignedIn ? (
            <>
              <h3 className="text-center md:text-left md:px-4 text-xs font-semibold uppercase tracking-wider text-gray-500 md:block md:text-sm">
                Subscriptions
              </h3>
              <div className="mt-2 space-y-1 px-2">
                {subscriptions.map((subscription) => (
                  <SubscriptionLink key={subscription.id} {...subscription} />
                ))}
              </div>
            </>
          ) : null}
        </div>
      </nav>
    </aside>
  );
}
