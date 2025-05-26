import { httpClient } from "./client";
import {
  isSubscribedResponseSchema,
  subscriptionsResponseSchema,
} from "./types";

export class UserApi {
  static async getSubscriptions() {
    const data = await httpClient.get("users/subscriptions").json();
    return subscriptionsResponseSchema.parse(data, {
      error: () => ({ message: "A schema error happened" }),
    });
  }

  static async isSubscribed(id: number) {
    const data = await httpClient.get(`users/subscriptions/${id}`).json();
    return isSubscribedResponseSchema.parse(data, {
      error: () => ({ message: "A schema error happened" }),
    });
  }

  static async subscribeToUser(id: number) {
    await httpClient.post(`users/subscriptions/${id}`, {
      credentials: "include",
    });
  }

  static async unsubscribeFromUser(id: number) {
    await httpClient.delete(`users/subscriptions/${id}`, {
      credentials: "include",
    });
  }
}
