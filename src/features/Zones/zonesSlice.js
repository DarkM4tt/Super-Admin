import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
export const getOrgId = () => localStorage.getItem('org_id');

export const zonesSlice = createApi({
  reducerPath: 'zonesApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://dev.boldrides.com/api/boldriders/super/' }),
  endpoints: (builder) => ({
    getZones: builder.query({
      query: () => `zones`,
    }),
    updateZone: builder.mutation({
      query: ({ id, updatedZone }) => ({
        url: `organization/${getOrgId()}/zone/${id}`,
        method: 'PUT',
        body: updatedZone,
      }),
    }),
    deleteZone: builder.mutation({
      query: (id) => ({
        url: `zones/${id}/deleteZone`,
        method: 'DELETE',
      }),
    }),
    toggleZoneStatus: builder.mutation({
      query: ({ id, is_active }) => ({
        url: `zones/${id}/toggle-status`,
        method: 'PUT',
        body: { is_active },
      }),
    }),
    addZone: builder.mutation({
      query: (newZone) => ({
        url: `createZone`, 
        method: 'POST',
        body: newZone,
      }),
    }),
    getZonePrices: builder.query({
      query: (zid) => ({
        url: `/organization/${getOrgId()}/zoneprices`,
        method: 'GET',
        params: { zid },
      }),
    }),
  }),
});

export const { 
  useGetZonesQuery, 
  useUpdateZoneMutation, 
  useDeleteZoneMutation, 
  useToggleZoneStatusMutation, 
  useAddZoneMutation, 
  useGetZonePricesQuery 
} = zonesSlice;
