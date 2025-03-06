import { format, parseISO } from "date-fns";
import countries from "world-countries";

export const formatCreatedAt = (createdAt) => {
  return format(parseISO(createdAt), "dd MMM, yyyy");
};

export const getCountryCenter = (isoCode) => {
  const country = countries.find((c) => c.cca2 === isoCode.toUpperCase());
  return country ? country.latlng : "Country not found";
};
