import { format, addSeconds } from "date-fns";

/**
 * Converts a UTC Unix timestamp to formatted date strings.
 * @param {number} timestamp - The Unix timestamp (in seconds) to be converted.
 * @param {number} [timezoneOffset] - The timezone offset from UTC in seconds (optional).
 * @returns {object} - An object containing the formatted date strings.
 */
const formatDateFromTimestamp = (
  timestamp: number,
  timezoneOffset?: number
) => {
  // Create a Date object for the given timestamp (in milliseconds)
  const utcDate = new Date(timestamp * 1000);

  // Adjust the date by adding the timezone offset (in seconds) if provided
  const localDate =
    timezoneOffset !== undefined
      ? addSeconds(utcDate, timezoneOffset)
      : utcDate;

  // Format the date in short form (e.g., 'Sat, Sep 14th')
  const shortDate = format(localDate, "EEE, MMM do");

  // Format the date in ISO form (e.g., '2024-09-14')
  const isoDate = format(localDate, "yyyy-MM-dd");

  return { shortDate, isoDate };
};

export default formatDateFromTimestamp;
