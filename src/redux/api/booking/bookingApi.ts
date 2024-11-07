import { baseApi } from "../baseApi";

const BookingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createBooking: builder.mutation({
      query: (bookingInfo) => ({
        url: "/bookings",
        method: "POST",
        body: bookingInfo,
      }),
      invalidatesTags: ["booking"],
    }),

    getBooking: builder.query({
      query: () => ({
        url: `/bookings`,
        method: "GET",
      }),
      providesTags: ["booking"],
    }),

    getmyBooking: builder.query({
      query: () => ({
        url: `/bookings/my-bookings`,
        method: "GET",
      }),
      providesTags: ["booking"],
    }),

    completeBooking: builder.mutation({
      query: (args) => ({
        url: `/bookings/${args.id}`,
        method: "PUT",
        body: args.data,
      }),
      invalidatesTags: ["booking"],
    }),

    deleteBooking: builder.mutation({
      query: (args) => ({
        url: `/bookings/${args.id}`,
        method: "DELETE",
        body: args.data,
      }),
      invalidatesTags: ["booking"],
    }),
  }),
});

export const {
  useCreateBookingMutation,
  useGetBookingQuery,
  useGetmyBookingQuery,
  useCompleteBookingMutation,
  useDeleteBookingMutation,
} = BookingApi;
