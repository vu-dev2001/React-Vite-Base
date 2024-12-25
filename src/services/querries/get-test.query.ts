import { useQuery } from '@tanstack/react-query';
import { Options } from 'ky';
import type { QueryParams } from "../misc/common-types";
import { authKyInstance } from "../http-service";

export interface GetTestOptionalParams {
  page?: number;
  per_page?: number;
  sort?: string;
  direction?: 'asc' | 'desc'
}

interface UseGetTestParams
  extends QueryParams<GetTestResponse> {
  mockMode?: boolean;
  payload: GetTestOptionalParams;
}

export const useGetTest = ({
  mockMode = false,
  payload,
  ...props
}: UseGetTestParams) => {
  let url = ``;
  const apiSearchParams = {
  } satisfies Options["searchParams"];
  const queryKey = ["get-test", apiSearchParams];

  const options: Options = {
    method: "get",
    searchParams: new URLSearchParams(apiSearchParams),
  };

  if (mockMode) {
    url = "";
    Object.assign(options, {
      prefixUrl: "",
      method: "get",
      json: undefined,
    } satisfies Options);
  }

  return [
    queryKey,
    useQuery({
      queryKey,
      queryFn: () =>
        authKyInstance(url, options).json<GetTestResponse>(),
      ...props,
    }),
  ] as const;
};

export interface GetTestResponse {
  status_code: number;
  groups: GetTestRecord[];
  pagination: GetTestPagination;
}

export interface GetTestRecord {
}

export interface GetTestPagination {
  total: number;
  per_page: number;
  current_page: number;
  last_page: number;
  from: number;
  to: number;
}
