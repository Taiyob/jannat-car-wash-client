import { format, isValid } from "date-fns";

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  if (!isValid(date)) {
    return ""; // Return an empty string for invalid dates
  }
  return format(date, "dd MMMM, yyyy");
};
