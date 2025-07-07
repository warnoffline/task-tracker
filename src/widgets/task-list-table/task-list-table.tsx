import { useQuery } from "@tanstack/react-query";
import { taskQueries } from "@/entities/task/api";
import { TaskTable } from "@/entities/task/ui";
import React, { useState } from "react";
import { Input } from "antd";
import styles from "./task-list-table.module.scss";

const tableHead = [
  "Название",
  "Описание",
  "Статус выполнения",
  "Дата создания",
];

const TaskListTable = () => {
  const { data: tasks, isLoading, error } = useQuery(taskQueries.list());
  const [searchTerm, setSearchTerm] = useState<string>("");

  if (isLoading) return <div className={styles.no_items}>Loading...</div>;

  if (error) return <div className={styles.no_items}>{error.message}</div>;

  if (!tasks || tasks.length < 1)
    return <div className={styles.no_items}>Нет задач</div>;

  const filteredTasks = tasks.filter((task) =>
    task.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className={styles["task-search"]}>
        <Input
          variant="filled"
          type="text"
          placeholder="Поиск по названию"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.search_input}
        />
      </div>
      <div className={styles["task-list"]}>
        <div className={styles["task-list__header"]}>
          <div className={styles["task-list__header-content"]}>
            {tableHead.map((head, i) => (
              <p key={i}>{head}</p>
            ))}
            <div style={{ width: "150px" }} />
          </div>
        </div>

        <div className={styles["task-list__body"]}>
          {filteredTasks.length > 0 ? (
            filteredTasks.map((item) => (
              <React.Fragment key={item.id}>
                <TaskTable task={item} />
              </React.Fragment>
            ))
          ) : (
            <div className={styles.no_items}>Задачи не найдены</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskListTable;
