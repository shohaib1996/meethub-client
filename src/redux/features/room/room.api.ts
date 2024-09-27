import { baseApi } from "../../api/baseApi";

const roomApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllRooms: builder.query({
      query: (args) => {
        const {
          searchQuery,
          selectedCapacityRange,
          selectedPriceRange,
          sortOption,
        } = args || {};
        const params = new URLSearchParams();

        if (searchQuery) {
          params.append("name", searchQuery);
        }

        // Add selectedCapacityRange to params if it exists
        if (selectedCapacityRange) {
          const [minCapacity, maxCapacity] = selectedCapacityRange
            .split("&")
            .map((param: string) => param.split("=")[1]);
          params.append("minCapacity", minCapacity);
          params.append("maxCapacity", maxCapacity);
        }

        // Add selectedPriceRange to params if it exists
        if (selectedPriceRange) {
          const [minPrice, maxPrice] = selectedPriceRange
            .split("&")
            .map((param: string) => param.split("=")[1]);
          params.append("minPrice", minPrice);
          params.append("maxPrice", maxPrice);
        }

        // Add sortOption to params if it exists
        if (sortOption) {
          params.append("sortByPrice", sortOption.split("=")[1]);
        }

        return {
          url: "/rooms",
          method: "GET",
          params: params,
        };
      },
    }),
    getSingleRoom: builder.query({
      query: (id) => {
        return {
          url: `/rooms/${id}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const { useGetAllRoomsQuery, useGetSingleRoomQuery } = roomApi;
