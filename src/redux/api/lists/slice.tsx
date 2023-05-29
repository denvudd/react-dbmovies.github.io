import { ListDetailsApiResponse } from "./types/ListDetailsType";
import { ListCreateApiResponse } from "./types/ListCreateType";
import { baseApi } from "../baseApi/slice";

const tmdbApiKey = "api_key=684e3f73d1ca0e692a3016c028aabf72";

export const listsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getListDetails: builder.query({
      query: ({ id, params }) =>
        `/list/${id}?${tmdbApiKey}&${params ? params : ""}`,
      transformResponse: (response: ListDetailsApiResponse) => response,
    }),
    postCreateList: builder.mutation({
      query: ({ session_id, name, description }) => ({
        url: `/list?session_id=${session_id}&${tmdbApiKey}`,
        method: "POST",
        body: { name: name, description: description },
      }),
      transformResponse: (response: ListCreateApiResponse) => response,
    }),
    deleteList: builder.mutation({
      query: ({ session_id, list_id }) => ({
        url: `/list/${list_id}?session_id=${session_id}&${tmdbApiKey}`,
        method: "DELETE",
      }),
      transformResponse: (response: ListCreateApiResponse) => response,
    }),
  }),
});

export const {
  useGetListDetailsQuery,
  usePostCreateListMutation,
  useDeleteListMutation,
} = listsApi;
