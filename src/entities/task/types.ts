export type DBTaskDTO = {
  id: string;
  name: string;
  description: string;
  changedAt: string;
  status: "open" | "inProgress" | "done";
};

export type TaskDTO = {
  name: string;
  description: string;
};

export type TaskStatusDTO = {
  status: "open" | "inProgress" | "done";
};

export type SuccessDTO = {
  message: string;
};

export type ErrorDTO = {
  message: string;
};
