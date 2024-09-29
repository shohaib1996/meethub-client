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
    getSingleUser: builder.query({
      query: (args) => {
        const { email } = args;
        console.log(email);
        
        return {
          url: `auth/user?email=${email}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation, useGetSingleUserQuery } =
  authApi;
