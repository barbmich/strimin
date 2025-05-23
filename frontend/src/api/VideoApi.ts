import { httpClient } from "./client";
import { videosResponseSchema } from "./types";

export class VideoApi {
  static async getVideos({ pageParam = 1 }) {
    const data = await httpClient.get("videos?page=" + pageParam).json();
    return videosResponseSchema.parse(data, {
      error: () => ({ message: "A schema error happened" }),
    });
  }
}
