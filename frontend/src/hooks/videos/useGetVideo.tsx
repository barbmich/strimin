import { useQuery } from "@tanstack/react-query";
import { VideoApi } from "../../api/VideoApi";

export default function useGetVideo(id: string | undefined) {
  const idNumber = Number(id);
  const isIdValid = Number.isInteger(idNumber) && idNumber > 0;

  const { data, error, isLoading } = useQuery({
    queryFn: () => VideoApi.getVideo(idNumber),
    queryKey: ["video", idNumber],
    enabled: isIdValid,
    staleTime: 5000,
  });

  return {
    data,
    error,
    isLoading,
    isIdValid,
  };
}
