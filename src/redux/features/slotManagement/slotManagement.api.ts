import { baseApi } from "../../api/baseApi";

const slotManagementApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        updateSlot: builder.mutation({
            query: (args) => {
                const {token, updateBody, id} = args

                return {
                    url: `slots/${id}`,
                    body: updateBody,
                    method: "PATCH",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }
            }
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
    })
})

export const {useUpdateSlotMutation, useDeleteSlotMutation} = slotManagementApi