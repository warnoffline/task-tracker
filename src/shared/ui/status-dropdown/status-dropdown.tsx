import React from "react";
import { Dropdown, Button, type MenuProps } from "antd";
import type { TaskStatus } from "@/entities/task";
import { taskStatus } from "@/shared/lib";
import s from "./status-dropdown.module.scss";

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
      <Button className={s.dropdown__button}>{taskStatus[value]}</Button>
    </Dropdown>
  );
};

export default TaskStatusDropdown;
