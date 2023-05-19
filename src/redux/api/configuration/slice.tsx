import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ConfigurationApiResponse } from "./types/ConfigurationType";


const tmdbApiKey = "api_key=684e3f73d1ca0e692a3016c028aabf72";

export const configurationApi = createApi({
  reducerPath: "configurationApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.themoviedb.org/3",
  }),
  endpoints: (builder) => ({
    getConfigurationLanguages: builder.query({
      query: () => `/configuration/languages?${tmdbApiKey}`,
      transformResponse: (response: ConfigurationApiResponse) => response,
    }),
  }),
});

export const { useGetConfigurationLanguagesQuery } = configurationApi;
