import { queryOptions, keepPreviousData } from "@tanstack/react-query";
import { fetchTasks, fetchTaskById } from "./task.service";

export const taskQueries = {
  all: () => ["tasks"] as const,

  list: () =>
    queryOptions({
      queryKey: taskQueries.all(),
      queryFn: fetchTasks,
      placeholderData: keepPreviousData,
      select: (tasks) => tasks.slice().reverse(),
    }),

  detail: (id?: string) =>
    queryOptions({
      queryKey: [...taskQueries.all(), "detail", id] as const,
      queryFn: () => fetchTaskById(id!),
      enabled: Boolean(id),
      staleTime: 5000,
    }),
};
