// src/services/api.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getOrgId } from '../Zones/zonesSlice';

export const vehicleSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://dev.boldrides.com/api/boldriders/super/' }),
  endpoints: (builder) => ({
    getCarCategories: builder.query({
      query: () => `getVehiclesData`,
    }),
    getVehiclesdata: builder.query({
      query: () => `getVehiclesData`,
    }),
    getSinglevehicle: builder.query({
      query: (vehicleId) => `getVehicleById/${vehicleId}`,
    }),
    updateVehicle: builder.mutation({
      query: ({ vehicleId, data }) => ({
        url: `vehicle/${vehicleId} `,
        method: 'PUT',
        body: data,
      }),
    }),
  }),
});

export const { useGetCarCategoriesQuery, useGetVehiclesdataQuery, useGetSinglevehicleQuery, useUpdateVehicleMutation} = vehicleSlice;
