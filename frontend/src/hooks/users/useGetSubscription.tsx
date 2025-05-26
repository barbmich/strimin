import { useQuery } from "@tanstack/react-query";
import { UserApi } from "../../api/UserApi";

export function useGetSubscription(id: number) {
  console.log(id);
  return useQuery({
    queryFn: () => UserApi.isSubscribed(id),
    queryKey: ["subscriptions", id],
    enabled: !!id,
    staleTime: 100000000,
  });
}
