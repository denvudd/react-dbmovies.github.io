import { baseApi } from "../baseApi/slice";
import type { PersonListApiResponse } from "./types";

const tmdbApiKey = "api_key=684e3f73d1ca0e692a3016c028aabf72";

export const personApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPopularPersons: builder.query<PersonListApiResponse, string | undefined>({
      query: (params) =>
        `/person/popular?${tmdbApiKey}&${params ? params : ""}`,
      transformResponse: (response: PersonListApiResponse) => response,
    }),

  }),
});

export const {
  useLazyGetPopularPersonsQuery
} = personApi;
