import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { TaskListTable } from "../task-list-table";
import { CreateTask } from "@/features/create-task";
import { ColumnBoard } from "../column-board";
import styles from "./main.module.scss";
import { Button, Segmented } from "antd";

type Display = "table" | "kanban";

const Main = () => {
  const [display, setDisplay] = useState<Display>("table");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <div className={styles.main}>
      <div className={styles.main__header}>
        <h1>Мои задачи</h1>
        <Button variant="solid" onClick={() => setIsModalOpen(true)}>
          <PlusIcon />
          <span>Создать новую задачу</span>
        </Button>
      </div>
      <Segmented
        className={styles.main__navigation}
        options={[
          { label: "Таблица", value: "table" },
          { label: "Канбан-доска", value: "kanban" },
        ]}
        value={display}
        onChange={(value) => setDisplay(value as Display)}
      />
      {display === "table" ? <TaskListTable /> : <ColumnBoard />}
      <CreateTask open={isModalOpen} closeModal={() => setIsModalOpen(false)} />
    </div>
  );
};

export default Main;
