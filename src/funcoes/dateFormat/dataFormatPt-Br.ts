export function formatDate(date: Date | string): string {
  const parsedData = new Date(date);
  return new Intl.DateTimeFormat("pt-br", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(parsedData);
}
