import moment from "moment";

export const getLocalTimeZone = (originalDate: string) => {
  const parsedDate = moment(originalDate);
  return moment(parsedDate).local();
};
