import { baseApi } from "../api/baseApi";

const roomApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllRooms: builder.query({
      query: (args) => {
        console.log(args);
        const params = new URLSearchParams();

        return {
          url: "/rooms",
          method: "GET",
          params: params,
        };
      },
    }),
  }),
});

export const { useGetAllRoomsQuery } = roomApi;
