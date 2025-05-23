import z from "zod/v4";

export const VideoInformationSchema = z.object({
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
  userImageURL: z.string(),
});
export type VideoInformation = z.infer<typeof VideoInformationSchema>;

export const videosResponseSchema = z.object({
  totalHits: z.number(),
  hits: z.array(VideoInformationSchema),
});
export type GetVideosResponse = z.infer<typeof videosResponseSchema>;
