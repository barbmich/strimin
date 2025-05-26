import ErrorMessage from "../../components/Error";
import { HeadingOne } from "../../components/Heading";
import Loading from "../../components/Loading";
import NoData from "../../components/NoData";
import { useGetSubscriptions } from "../../hooks/users/useGetSubscriptions";
import HomePage from "../home";

export default function SubscriptionsPage() {
  const { isLoading, error, data } = useGetSubscriptions();

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorMessage error={error as Error} />;
  }

  if (!data || data.subscriptions.length === 0) {
    return <NoData message="No subscriptions found" />;
  }

  return (
    <div className="h-full overflow-y-auto flex flex-col pt-4">
      <HeadingOne className="pl-4">Subscriptions</HeadingOne>
      <HomePage />
    </div>
  );
}
