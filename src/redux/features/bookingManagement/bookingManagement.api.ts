import { baseApi } from "../../api/baseApi";

const bookingManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllBookings: builder.query({
      query: (token) => ({
        url: "bookings",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    updateBooking: builder.mutation({
      query: ({ id, token, isConfirmed }) => {
        console.log(id);
        
        return {
          url: `bookings/${id}`,
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: { isConfirmed },
        };
      },
    }),
    deleteBooking: builder.mutation({
      query: ({ bookingId, token }) => ({
        url: `bookings/${bookingId}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
  }),
});

// Exporting hooks for all the endpoints
export const {
  useGetAllBookingsQuery,
  useUpdateBookingMutation,
  useDeleteBookingMutation,
} = bookingManagementApi;
