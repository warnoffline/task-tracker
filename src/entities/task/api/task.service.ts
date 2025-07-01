import { instance } from "@/shared/api";
import type { DBTaskDTO, SuccessDTO, TaskDTO, TaskStatusDTO } from "../types";

export const fetchTasks = async (): Promise<DBTaskDTO[]> => {
  const { data } = await instance.get("/tasks");
  return data;
};

export const fetchTaskById = async (id: string): Promise<DBTaskDTO> => {
  const { data } = await instance.get(`/tasks/${id}`);
  return data;
};

export const createTask = async (task: TaskDTO): Promise<SuccessDTO> => {
  const { data } = await instance.post("/tasks", task);
  return data;
};

export const updateTask = async (
  id: string,
  task: TaskDTO
): Promise<SuccessDTO> => {
  const { data } = await instance.patch(`/tasks/${id}`, task);
  return data;
};

export const updateTaskStatus = async (
  id: string,
  status: TaskStatusDTO
): Promise<SuccessDTO> => {
  const { data } = await instance.patch(`/tasks/${id}/status`, status);
  return data;
};

export const deleteTask = async (id: string): Promise<SuccessDTO> => {
  const { data } = await instance.delete(`/tasks/${id}`);
  return data;
};
