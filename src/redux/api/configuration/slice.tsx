import { baseApi } from "../baseApi/slice";
import type {
  ConfigurationLanguagesApiResponse,
  ConfigurationJobsApiResponse,
} from "./types";

const tmdbApiKey = "api_key=684e3f73d1ca0e692a3016c028aabf72";

export const configurationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getConfigurationLanguages: builder.query<
      ConfigurationLanguagesApiResponse,
      null
    >({
      query: () => `/configuration/languages?${tmdbApiKey}`,
      transformResponse: (response: ConfigurationLanguagesApiResponse) =>
        response,
    }),

    getConfigurationJobs: builder.query<ConfigurationJobsApiResponse, null>({
      query: () => `/configuration/jobs?${tmdbApiKey}`,
      transformResponse: (response: ConfigurationJobsApiResponse) => response,
    }),
  }),
});

export const {
  useGetConfigurationLanguagesQuery,
  useGetConfigurationJobsQuery,
} = configurationApi;
