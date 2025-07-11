import React from "react";
import CardColumn from "@/entities/task/ui/card-column/card-column";
import { type DBTaskDTO, type TaskStatus } from "@/entities/task/types";
import { Droppable, Draggable } from "@hello-pangea/dnd";
import styles from "./tasks-column.module.scss";
import { taskStatusIcon } from "@/shared/lib/helpers";
import clsx from "clsx";

type TasksColumnProps = {
  title: string;
  tasks: DBTaskDTO[];
  status: TaskStatus;
};

const TasksColumn: React.FC<TasksColumnProps> = ({ title, tasks, status }) => {
  const getColumnColorClass = () => {
    switch (title) {
      case "Открыто":
        return styles["column--open"];
      case "В процессе":
        return styles["column--in-progress"];
      case "Завершено":
        return styles["column--done"];
      default:
        return "";
    }
  };

  const getTitleColorClass = () => {
    switch (title) {
      case "Открыто":
        return styles["title--open"];
      case "В процессе":
        return styles["title--in-progress"];
      case "Завершено":
        return styles["title--done"];
      default:
        return "";
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={clsx(styles.title, getTitleColorClass())}>
        <div className={styles.title__icon}>{taskStatusIcon[status]}</div>
        <p className={styles.title__text}>{title}</p>
      </div>
      <Droppable droppableId={status}>
        {(provided) => (
          <div
            className={clsx(styles.column, styles[`column-${status}`], getColumnColorClass())}
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {tasks.length < 1 ? (
              <div className={styles.column__empty}>
                <p>Нет задач</p>
              </div>
            ) : (
              <>
                {tasks.map((task, index) => (
                  <Draggable draggableId={task.id} index={index} key={task.id}>
                    {(provided) => {
                      return (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <CardColumn task={task} />
                        </div>
                      );
                    }}
                  </Draggable>
                ))}
                {provided.placeholder}
              </>
            )}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default TasksColumn;