import { baseApi } from "../baseApi/slice";
import type {
  ListDetailsApiResponse,
  ListCreateApiResponse,
  ListAddMovieApiResponse,
  ListRemoveMovieApiResponse,
  ListClearApiResponse,
  ListDeleteApiResponse,
  ListDetailsQueryArgs,
  ListCreateQueryArgs,
  ListAddMovieQueryArgs,
  ListRemoveMovieQueryArgs,
  ListClearQueryArgs,
  ListDeleteQueryArgs,
} from "./types";

const tmdbApiKey = "api_key=684e3f73d1ca0e692a3016c028aabf72";

export const listsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getListDetails: builder.query<ListDetailsApiResponse, ListDetailsQueryArgs>(
      {
        query: ({ id, params }) =>
          `/list/${id}?${tmdbApiKey}&${params ? params : ""}`,
        transformResponse: (response: ListDetailsApiResponse) => response,
      }
    ),

    postCreateList: builder.mutation<
      ListCreateApiResponse,
      ListCreateQueryArgs
    >({
      query: ({ session_id, name, description }) => ({
        url: `/list?session_id=${session_id}&${tmdbApiKey}`,
        method: "POST",
        body: { name: name, description: description },
      }),
      transformResponse: (response: ListCreateApiResponse) => response,
      invalidatesTags: [{ type: "Lists", id: "LIST" }],
    }),

    postAddMovieToList: builder.mutation<
      ListAddMovieApiResponse,
      ListAddMovieQueryArgs
    >({
      query: ({ session_id, list_id, media_id }) => ({
        url: `/list/${list_id}/add_item?session_id=${session_id}&${tmdbApiKey}`,
        method: "POST",
        body: { media_id: media_id },
      }),
      transformResponse: (response: ListAddMovieApiResponse) => response,
      invalidatesTags: [{ type: "Lists", id: "LIST" }],
    }),

    postRemoveMovieFromList: builder.mutation<
      ListRemoveMovieApiResponse,
      ListRemoveMovieQueryArgs
    >({
      query: ({ session_id, list_id, media_id }) => ({
        url: `/list/${list_id}/remove_item?session_id=${session_id}&${tmdbApiKey}`,
        method: "POST",
        body: { media_id: media_id },
      }),
      transformResponse: (response: ListRemoveMovieApiResponse) => response,
      invalidatesTags: [{ type: "Lists", id: "LIST" }],
    }),

    postClearList: builder.mutation<ListClearApiResponse, ListClearQueryArgs>({
      query: ({ session_id, list_id, confirm }) => ({
        url: `/list/${list_id}/clear?confirm=${confirm}&session_id=${session_id}&${tmdbApiKey}`,
        method: "POST",
      }),
      transformResponse: (response: ListClearApiResponse) => response,
      invalidatesTags: [{ type: "Lists", id: "LIST" }],
    }),

    deleteList: builder.mutation<ListDeleteApiResponse, ListDeleteQueryArgs>({
      query: ({ session_id, list_id }) => ({
        url: `/list/${list_id}?session_id=${session_id}&${tmdbApiKey}`,
        method: "DELETE",
      }),
      transformResponse: (response: ListDeleteApiResponse) => response,
      invalidatesTags: [{ type: "Lists", id: "LIST" }],
    }),
  }),
});

export const {
  useGetListDetailsQuery,
  useLazyGetListDetailsQuery,
  usePostCreateListMutation,
  usePostClearListMutation,
  usePostAddMovieToListMutation,
  usePostRemoveMovieFromListMutation,
  useDeleteListMutation,
} = listsApi;
