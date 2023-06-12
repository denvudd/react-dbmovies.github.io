import { baseApi } from "../baseApi/slice";
import type { ConfigurationApiResponse } from "./types/ConfigurationType";

const tmdbApiKey = "api_key=684e3f73d1ca0e692a3016c028aabf72";

export const configurationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getConfigurationLanguages: builder.query<ConfigurationApiResponse, null>({
      query: () => `/configuration/languages?${tmdbApiKey}`,
      transformResponse: (response: ConfigurationApiResponse) => response,
    }),
  }),
});

export const { useGetConfigurationLanguagesQuery } = configurationApi;
