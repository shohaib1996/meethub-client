import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (userInfo) => {
        return {
          url: "/auth/signup",
          method: "POST",
          body: userInfo,
        };
      },
    }),
    login: builder.mutation({
      query: (uderInfo) => {
        return {
          url: "auth/login",
          method: "POST",
          body: uderInfo,
        };
      },
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation } = authApi;
