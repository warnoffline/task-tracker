import { DateTime } from "luxon";

export function formatDate(isoString: string): string {
  return DateTime.fromISO(isoString).toFormat("HH:mm, dd.MM.yyyy");
}
