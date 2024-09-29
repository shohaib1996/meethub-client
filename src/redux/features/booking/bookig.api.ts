import { baseApi } from "../../api/baseApi";

const bookingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createBooking: builder.mutation({
      query: (bookingInfo) => {
        return {
          url: "/bookings",
          method: "POST",
          body: bookingInfo,
        };
      },
    }),
    getBookedSlotByUser: builder.query({
      query: (token) => {
        return {
          url: "/my-bookings",
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
    }),
  }),
});

export const { useCreateBookingMutation, useGetBookedSlotByUserQuery } = bookingApi;
