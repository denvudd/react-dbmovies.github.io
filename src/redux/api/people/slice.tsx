import { baseApi } from "../baseApi/slice";
import type {
  PersonListApiResponse,
  PersonDetailsApiResponse,
  PersonCombinedCreditsApiResponse,
  PersonExternalIDsApiResponse,
} from "./types";

const tmdbApiKey = `api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`;

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

    getPersonExternalIDs: builder.query<
      PersonExternalIDsApiResponse,
      { id: number; }
    >({
      query: ({ id }) =>
        `/person/${id}/external_ids?${tmdbApiKey}`,
      transformResponse: (response: PersonExternalIDsApiResponse) =>
        response,
    }),
  }),
});

export const {
  useLazyGetPopularPersonsQuery,
  useGetPersonDetailsQuery,
  useGetPersonCombinedCreditsQuery,
  useGetPersonExternalIDsQuery,
} = personApi;
