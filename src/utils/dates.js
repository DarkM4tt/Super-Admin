import { format, parseISO } from "date-fns";

export const formatCreatedAt = (createdAt) => {
  return format(parseISO(createdAt), "dd MMM, yyyy");
};
