import { httpClient } from "./client";
import { singleVideoResponseSchema, videosResponseSchema } from "./types";

export class VideoApi {
  static async getVideos({ pageParam = 1, searchQuery = "" }) {
    const data = await httpClient
      .get("videos", {
        searchParams: {
          page: pageParam,
          q: searchQuery,
        },
      })
      .json();
    return videosResponseSchema.parse(data, {
      error: () => ({ message: "A schema error happened" }),
    });
  }

  static async getVideo(id: number) {
    const data = await httpClient.get("videos/" + id).json();
    const parsedData = singleVideoResponseSchema.parse(data, {
      error: () => ({ message: "A schema error happened" }),
    });
    return parsedData.hits[0];
  }
}
