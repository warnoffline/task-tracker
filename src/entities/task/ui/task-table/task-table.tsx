import React, { useState } from "react";
import { formatDate } from "@/shared/lib";
import { TaskStatusDropdown } from "@/shared/ui";
import { Button } from "antd";
import { type DBTaskDTO } from "../../types";
import { useUpdateTaskStatus } from "../../api";
import { TaskDrawer } from "../task-drawer";
import styles from "./task-table.module.scss";

type TaskTableProps = {
  task: DBTaskDTO;
};

const TaskTable: React.FC<TaskTableProps> = ({ task }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [status, setStatus] = useState<DBTaskDTO["status"]>(task.status);
  const { mutate: updateStatus } = useUpdateTaskStatus();

  const handleStatusChange = (newStatus: DBTaskDTO["status"]) => {
    setStatus(newStatus);
    updateStatus(
      { id: task.id, dto: { status: newStatus } },
      {
        onError: () => setStatus(task.status),
      }
    );
  };

  return (
    <div className={styles.task}>
      <div className={styles.task__text}>
        <p>{task.name}</p>
        <p>{task.description}</p>
      </div>
      <TaskStatusDropdown value={status} onChange={handleStatusChange} />
      <p style={{ textAlign: "center" }}>{formatDate(task.changedAt)}</p>
      <Button onClick={() => setIsDrawerOpen(true)}>Подробнее</Button>
      <TaskDrawer
        task={task}
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        status={status}
        handleStatusChange={handleStatusChange}
      />
    </div>
  );
};

export default TaskTable;
