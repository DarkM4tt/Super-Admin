import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authSlice = createApi({
  reducerPath: 'authapi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://boldrides.com/api/boldriders/' }),
  endpoints: (builder) => ({
    sendEmailOTP: builder.mutation({
      query: (email) => ({
        url: 'auth/sendEmailOTP',
        method: 'POST',
        body: email,
      }),
    }),
  
  verifyEmailOTP:builder.mutation({
    query: (otp)=>({
        url: 'auth/verifyEmailOTP',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'email-otp-token': localStorage.getItem('auth_token')
        },
        body: otp,
    })
  }),
  registerUser:builder.mutation({
    query: (userData)=>({
        url: 'organization/register',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'email-otp-token': localStorage.getItem('auth_token')
        },
        body: userData,
    })
  }),
  loginWithEmail: builder.query({
    query: () => ({
      url: 'organization/loginWithEmail',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'email-otp-token': localStorage.getItem('auth_token'),
      },
    }),
  }),
  verifyPhoneNumber: builder.mutation({
    query: (phoneData) => ({
      url: 'organization/isPhoneExist',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: phoneData,
    }),
  }),
  verifyEmail: builder.mutation({
    query: (emaildata) => ({
      url: 'organization/isEmailExists',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: emaildata,
    }),
  }),
}),
});

export const { useSendEmailOTPMutation, useVerifyEmailOTPMutation, useRegisterUserMutation ,useLazyLoginWithEmailQuery, useVerifyPhoneNumberMutation,useVerifyEmailMutation  } = authSlice;
export default authSlice;
