import React, { useState } from "react";
import { Card, Button } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { TaskDrawer } from "@/entities/task/ui";
import { type DBTaskDTO } from "@/entities/task/types";
import { formatDate } from "@/shared/lib";
import { useUpdateTaskStatus } from "@/entities/task/api";
import styles from "./card-column.module.scss";

interface CardColumnProps {
  task: DBTaskDTO;
}

const CardColumn: React.FC<CardColumnProps> = ({ task }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [currentStatus, setCurrentStatus] = useState<DBTaskDTO["status"]>(
    task.status
  );

  const { mutate: updateStatus } = useUpdateTaskStatus();

  const handleEdit = () => setDrawerOpen(true);

  const handleCloseDrawer = () => setDrawerOpen(false);

  const handleStatusChange = (newStatus: DBTaskDTO["status"]) => {
    setCurrentStatus(newStatus);
    updateStatus({ id: task.id, dto: { status: newStatus } });
  };

  return (
    <>
      <Card
        title={<p className={styles.card__text}>{task.name}</p>}
        extra={<Button icon={<EditOutlined />} onClick={handleEdit} />}
        style={{
          border: "none",
          borderRadius: 10,
        }}
      >
        <div className={styles.card}>
          <p className={styles.card__text}>{task.description}</p>
          <p className={styles.card__date}>{formatDate(task.changedAt)}</p>
        </div>
      </Card>
      <TaskDrawer
        task={task}
        open={drawerOpen}
        status={currentStatus}
        onClose={handleCloseDrawer}
        handleStatusChange={handleStatusChange}
      />
    </>
  );
};

export default CardColumn;
