import React from "react";
import { Dropdown, Button, type MenuProps } from "antd";
import type { TaskStatus } from "@/entities/task/types";
import { taskStatus } from "@/shared/lib";
import styles from "./status-dropdown.module.scss";

type Props = {
  value: TaskStatus;
  onChange: (newStatus: TaskStatus) => void;
};

const TaskStatusDropdown: React.FC<Props> = ({ value, onChange }) => {
  const menu: MenuProps = {
    items: Object.entries(taskStatus).map(([key, label]) => ({
      key,
      label,
    })),
    onClick: ({ key }) => onChange(key as TaskStatus),
  };

  return (
    <Dropdown menu={menu} trigger={["click"]}>
      <Button className={styles.dropdown__button}>{taskStatus[value]}</Button>
    </Dropdown>
  );
};

export default TaskStatusDropdown;
