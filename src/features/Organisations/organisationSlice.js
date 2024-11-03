import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const OrganisationSlice = createApi({
  reducerPath: 'Organisationapi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://dev.boldrides.com/api/boldriders/super/' }),
  endpoints: (builder) => ({
    getOrganizations: builder.query({
      query: () => 'getOrganization',
    }),
    getSingleOrganization: builder.query({
      query: (orgId) => `getSingleOrganization/${orgId}`,
    }),
    updateOrganizationStatus: builder.mutation({
      query: (orgId) => ({
        url: `updateOrganization/${orgId}`, // Adjust this URL as needed
        method: 'PUT',
        body: { isActive: true },
      }),
    }),
  }),
});

export const {
  useGetOrganizationsQuery,
  useGetSingleOrganizationQuery,
  useUpdateOrganizationStatusMutation,
} = OrganisationSlice;
