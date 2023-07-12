import { baseApi } from "../baseApi/slice";
import type {
  PersonListApiResponse,
  PersonDetailsApiResponse,
  PersonCombinedCreditsApiResponse,
} from "./types";

const tmdbApiKey = "api_key=684e3f73d1ca0e692a3016c028aabf72";

export const personApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPopularPersons: builder.query<PersonListApiResponse, string | undefined>(
      {
        query: (params) =>
          `/person/popular?${tmdbApiKey}&${params ? params : ""}`,
        transformResponse: (response: PersonListApiResponse) => response,
      }
    ),

    getPersonDetails: builder.query<
      PersonDetailsApiResponse,
      { id: number; params?: string }
    >({
      query: ({ id, params }) =>
        `/person/${id}?${tmdbApiKey}&${params ? params : ""}`,
      transformResponse: (response: PersonDetailsApiResponse) => response,
    }),

    getPersonCombinedCredits: builder.query<
      PersonCombinedCreditsApiResponse,
      { id: number; params?: string }
    >({
      query: ({ id, params }) =>
        `/person/${id}/combined_credits?${tmdbApiKey}&${params ? params : ""}`,
      transformResponse: (response: PersonCombinedCreditsApiResponse) =>
        response,
    }),
  }),
});

export const {
  useLazyGetPopularPersonsQuery,
  useGetPersonDetailsQuery,
  useGetPersonCombinedCreditsQuery,
} = personApi;
