import { baseApi } from "../baseApi";

const slotApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createSlot: builder.mutation({
      query: (slotInfo) => ({
        url: "/services/slots",
        method: "POST",
        body: slotInfo,
      }),
    }),
    getAvailableSlots: builder.query({
      query: () => ({
        url: `/services/slots/availability`,
        method: "GET",
      }),
      //invalidatesTags: ["user"],
    }),
    getSlotByService: builder.query({
      query: (id) => ({
        url: `/services/slots/${id}`,
        method: "GET",
      }),
      //invalidatesTags: ["user"],
    }),
    getSlotsById: builder.query({
      query: (id) => ({
        url: `/services/slots/slot/${id}`,
        method: "GET",
      }),
      //invalidatesTags: ["user"],
    }),
  }),
});

export const {
  useCreateSlotMutation,
  useGetSlotByServiceQuery,
  useGetSlotsByIdQuery,
} = slotApi;
