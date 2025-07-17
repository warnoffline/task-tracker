import React, { useCallback, useEffect, useState } from "react";
import TasksColumn from "@/features/tasks-column/tasks-column";
import { useQuery } from "@tanstack/react-query";
import { taskQueries, useUpdateTaskStatus } from "@/entities/task/api";
import { DragDropContext, type DropResult } from "@hello-pangea/dnd";
import styles from "./column-board.module.scss";
import type { TaskStatus } from "@/entities/task/types";

type ColumnType = {
  key: TaskStatus;
  title: string;
};

const columns = [
  { key: "open", title: "Открыто" },
  { key: "inProgress", title: "В процессе" },
  { key: "done", title: "Завершено" },
] satisfies ColumnType[];

const ColumnBoard: React.FC = () => {
  const { data: initialTasks, isLoading, error } = useQuery(taskQueries.list());
  const { mutate: updateStatus } = useUpdateTaskStatus();

  const [tasks, setTasks] = useState(initialTasks || []);

  useEffect(() => {
    if (initialTasks) setTasks(initialTasks);
  }, [initialTasks]);

  const getTasksByStatus = useCallback(
    (status: TaskStatus) => tasks.filter((t) => t.status === status),
    [tasks]
  );
  
  const handleDragEnd = ({ source, destination, draggableId }: DropResult) => {
    if (!destination) return;
    if (source.droppableId === destination.droppableId) return;

    setTasks((prevTasks) => {
      const taskToMove = prevTasks.find((t) => String(t.id) === draggableId);
      if (!taskToMove) return prevTasks;

      const updatedTasks = prevTasks.filter(
        (t) => String(t.id) !== draggableId
      );

      const newTask = {
        ...taskToMove,
        status: destination.droppableId as TaskStatus,
      };

      const tasksInDest = updatedTasks.filter(
        (t) => t.status === destination.droppableId
      );
      const otherTasks = updatedTasks.filter(
        (t) => t.status !== destination.droppableId
      );

      tasksInDest.splice(destination.index, 0, newTask);

      updateStatus({ id: taskToMove.id, dto: { status: newTask.status } });

      return [...tasksInDest, ...otherTasks];
    });
  };

  if (isLoading) return <div className={styles.no_items}>Loading...</div>;
  if (error) return <div className={styles.no_items}>{error.message}</div>;
  if (!tasks || tasks.length < 1)
    return <div className={styles.no_items}>Нет задач</div>;

  return (
    <div className={styles.board}>
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className={styles.board__columns}>
          {columns.map((column) => (
            <TasksColumn
              key={column.key}
              status={column.key}
              title={column.title}
              tasks={getTasksByStatus(column.key)}
            />
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default ColumnBoard;
