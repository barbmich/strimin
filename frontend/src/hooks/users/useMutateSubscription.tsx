import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UserApi } from "../../api/UserApi";

export type SubscriptionActionType = "subscribe" | "unsubscribe";
export type MutationFnParams = {
  id: number;
  action: SubscriptionActionType;
};

export function useMutateSubscription() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: MutationFnParams) => {
      if (params.action === "subscribe") {
        return UserApi.subscribeToUser(params.id);
      } else if (params.action === "unsubscribe") {
        return UserApi.unsubscribeFromUser(params.id);
      }
      throw new Error("Invalid subscription action");
    },
    onSuccess: (_data, variables) => {
      console.log(variables.id);
      queryClient.invalidateQueries({
        queryKey: ["subscriptions", variables.id],
      });
    },
  });
}
