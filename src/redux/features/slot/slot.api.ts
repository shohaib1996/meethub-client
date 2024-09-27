import { baseApi } from "../../api/baseApi";

const slotApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSlotByRoomAndDate: builder.query({
      query: (query) => {
        return {
          url: `/slots/availability?${query}`,
          method: "GET",
        };
      },
      keepUnusedDataFor: 0,
    }),
  }),
});

export const { useGetSlotByRoomAndDateQuery } = slotApi;
