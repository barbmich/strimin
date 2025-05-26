import { useQuery } from "@tanstack/react-query";
import { UserApi } from "../../api/UserApi";
import { useUser } from "@clerk/clerk-react";

export function useGetSubscriptions() {
  const { isSignedIn } = useUser();
  return useQuery({
    queryKey: ["subscriptions"],
    queryFn: UserApi.getSubscriptions,
    enabled: isSignedIn,
  });
}
