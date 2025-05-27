import z from "zod/v4";

export const videoInformationSchema = z.object({
  id: z.number(),
  duration: z.number(),
  videos: z.object({
    medium: z.object({
      thumbnail: z.string(),
      url: z.string(),
    }),
  }),
  views: z.number(),
  likes: z.number(),
  comments: z.number(),
  downloads: z.number(),
  user: z.string(),
  user_id: z.number(),
  userImageURL: z.string(),
});
export type VideoInformation = z.infer<typeof videoInformationSchema>;

export const videosResponseSchema = z.object({
  totalHits: z.number(),
  hits: z.array(videoInformationSchema),
});
export type VideosResponse = z.infer<typeof videosResponseSchema>;

export const singleVideoResponseSchema = videosResponseSchema.refine(
  (data) => data.totalHits === 1 && data.hits.length === 1
);

export const subscriptionSchema = z.object({
  channelId: z.number(),
});

export const subscriptionsResponseSchema = z.object({
  subscriptions: z.array(subscriptionSchema),
});

export const isSubscribedResponseSchema = z.object({
  isSubscribed: z.boolean(),
});
