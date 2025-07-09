import React, { useState } from 'react';
import { Card, Button } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { TaskDrawer } from '@//entities/task/ui/task-drawer'; 
import {type DBTaskDTO } from '@/entities/task/types' 

interface CardColumnProps {
  task: DBTaskDTO;
}

const CardColumn: React.FC<CardColumnProps> = ({ task }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [currentStatus, setCurrentStatus] = useState<DBTaskDTO['status']>(task.status);

  const handleEdit = () => setDrawerOpen(true);
  const handleCloseDrawer = () => setDrawerOpen(false);
  const handleStatusChange = (newStatus: DBTaskDTO['status']) => setCurrentStatus(newStatus);

  return (
    <>
      <Card
        title={task.name}
        extra={<Button icon={<EditOutlined />} onClick={handleEdit} />}
        style={{
          margin: '0 16px 12px 16px', // Отступы 16px слева/справа, 12px снизу
          border: 'none',
          background: '#FFFFFF',
          borderRadius: 8,
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        <p>{task.description}</p>
        <p>Дата: {task.changedAt}</p>
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