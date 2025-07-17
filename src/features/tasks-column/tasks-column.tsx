import React from "react";
import CardColumn from "@/entities/task/ui/card-column/card-column";
import { type DBTaskDTO, type TaskStatus } from "@/entities/task/types";
import { Draggable, Droppable } from "@hello-pangea/dnd";
import styles from "./tasks-column.module.scss";
import { taskStatusIcon } from "@/shared/lib/helpers";
import clsx from "clsx";

type TasksColumnProps = {
    title: string;
    tasks: DBTaskDTO[];
    status: TaskStatus;
};

const TasksColumn: React.FC<TasksColumnProps> = ({ title, tasks, status }) => {
    return (
        <div className={styles.wrapper}>
            <div className={clsx(styles.column__title, styles[`column__title-${status}`])}>
                <div className={styles.column__icon}>{taskStatusIcon[status]}</div>
                <p className={clsx(styles.column__text, styles[`column__text-${status}`])}>{title}</p>
            </div>
            <Droppable droppableId={status}>
                {(provided) => (
                    <div
                        className={clsx(
                            styles.column,
                            styles[`column-${status}`],
                        )}
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
                                                    <CardColumn task={task}/>
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
