// src/slices/driverSlice.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const driverSlice = createApi({
  reducerPath: 'driverApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://dev.boldrides.com/api/boldriders/super/' }),
  endpoints: (builder) => ({
    getAllDrivers: builder.query({
      query: () => `getAllDrivers`,
    }),
    activateDriver: builder.mutation({
      query: (driverID) => ({
        url: `${driverID}/activateDriver`,
        method: 'PUT',
      }),
    }),
    getDriverbyID:builder.query({
        query:(driverID)=>`getDriverById/${driverID}`
    })
  }),
});

export const { useGetAllDriversQuery, useActivateDriverMutation, useGetDriverbyIDQuery } = driverSlice;
