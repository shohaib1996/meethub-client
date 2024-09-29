import { baseApi } from "../../api/baseApi";

const roomManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createRoom: builder.mutation({
      query: (args) => {
        const { token, roomData } = args;
        return {
          url: `/rooms`,
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: roomData,
        };
      },
    }),
    deleteRoom: builder.mutation({
      query: (args) => {
        const { id, token } = args;
        console.log(id, token);

        return {
          url: `/rooms/${id}`,
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
    }),
    updateRoom: builder.mutation({
      query: (args) => {
        const { id, token, roomData } = args;
        return {
          url: `/rooms/${id}`,
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: roomData,
        };
      },
    }),
  }),
});

export const { useDeleteRoomMutation, useUpdateRoomMutation, useCreateRoomMutation } =
  roomManagementApi;
