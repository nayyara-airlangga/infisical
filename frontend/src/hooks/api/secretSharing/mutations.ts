import { useMutation, useQueryClient } from "@tanstack/react-query";

import { apiRequest } from "@app/config/request";

import { TCreateSharedSecretRequest, TDeleteSharedSecretRequest, TSharedSecret } from "./types";

export const useCreateSharedSecret = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (inputData: TCreateSharedSecretRequest) => {
      const { data } = await apiRequest.post<TSharedSecret>("/api/v1/secret-sharing", inputData);
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries(["sharedSecrets"])
  });
};

export const useDeleteSharedSecret = () => {
  const queryClient = useQueryClient();
  return useMutation<
    TSharedSecret,
    { message: string },
    { sharedSecretId: string }
  >({
    mutationFn: async ({ sharedSecretId }: TDeleteSharedSecretRequest) => {
      const { data } = await apiRequest.delete<TSharedSecret>(
        `/api/v1/secret-sharing/${sharedSecretId}`
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["sharedSecrets"]);
    }
  });
};
