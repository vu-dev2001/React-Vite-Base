import { useMutation } from "@tanstack/react-query";
import type { MutationParams } from "../misc/common-types";
import { authKyInstance } from "../http-service";

interface PostTestParam
  extends MutationParams<ResponseAPI<unknown>, PostTestPayload> {}

export default function usePostTest(
  params: PostTestParam,
  groupId:string,
) {
  return useMutation({
    mutationKey: ["post-tag_folder"],
    mutationFn: async (payload: PostTestPayload) => {
      return authKyInstance
        .post(`${groupId}/tag_folder`, { json: payload })
        .json<ResponseAPI<unknown>>();
    },
    ...params,
  });
}

export interface PostTestPayload {
  folder_name: string;
}
