import dayjs from "dayjs";

export function formatDate(date: Date | string): string {
  return dayjs(date).format("D [de] MMMM [de] YYYY");
}
