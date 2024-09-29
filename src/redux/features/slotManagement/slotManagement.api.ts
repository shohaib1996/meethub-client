import { baseApi } from "../../api/baseApi";

const slotManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createSlot: builder.mutation({
      query: (args) => {
        const { token, createBody } = args;

        return {
          url: "slots",
          body: createBody,
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,          },
        };
      },
    }),
    updateSlot: builder.mutation({
      query: (args) => {
        const { token, updateBody, id } = args;

        return {
          url: `slots/${id}`,
          body: updateBody,
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
    }),
    deleteSlot: builder.mutation({
      query: (args) => {
        const { token, id } = args;

        return {
          url: `slots/${id}`,
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
    }),
  }),
});

export const { useUpdateSlotMutation, useDeleteSlotMutation, useCreateSlotMutation } =
  slotManagementApi;
