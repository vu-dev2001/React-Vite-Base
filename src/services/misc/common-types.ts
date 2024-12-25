import type {
  InfiniteData,
  QueryKey,
  UndefinedInitialDataInfiniteOptions,
  UndefinedInitialDataOptions,
  UseMutationOptions,
} from "@tanstack/react-query";

export type QueryParams<ResponseData> = Omit<
  UndefinedInitialDataOptions<ResponseData, Error, ResponseData, QueryKey>,
  "queryKey" | "queryFn"
>;

export type InfiniteQueryParams<ResponseData, PageParams> = Omit<
  UndefinedInitialDataInfiniteOptions<ResponseData, Error, InfiniteData<ResponseData>, QueryKey, PageParams>,
  "queryKey" | "queryFn"| "initialPageParam" | "getNextPageParam" | "getPreviousPageParam"
>;

export type MutationParams<Response, Payload> = Omit<
  UseMutationOptions<Response, Error, Payload, unknown>,
  "mutationKey" | "mutationFn"
>;
