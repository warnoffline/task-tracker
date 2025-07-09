import React from 'react';
import { Row } from 'antd';
import TasksColumn from '@/features/create-task/tasks-column';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import {type DBTaskDTO } from '@/entities/task/types' 


const ColumnBoard: React.FC = () => {
  const queryClient = useQueryClient();

  const { data: tasks = [] } = useQuery<DBTaskDTO[], Error>({
    queryKey: ['tasks'],
    queryFn: () => [
      { id: '1', name: 'Задача 1', description: 'Описание...', status: 'open', changedAt: '02.02.2025' },
      { id: '2', name: 'Задача 2', description: 'Описание...', status: 'inProgress', changedAt: '02.02.2025' },
      { id: '3', name: 'Задача 3', description: 'Описание...', status: 'done', changedAt: '02.02.2025' },
    ],
    staleTime: 5 * 60 * 1000, // Опционально: данные свежие 5 минут
  });

  const columns = [
    { key: 'open', title: 'Открыто' },
    { key: 'inProgress', title: 'В процессе' },
    { key: 'done', title: 'Завершено' },
  ];

  const getTasksByStatus = (status: string) => tasks.filter((task) => task.status === status);

    return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '20px 0', width: '100%' }}>
      <Row gutter={[8, 0]} style={{ display: 'flex', flexWrap: 'nowrap' }}>
        {columns.map((column) => (
          <TasksColumn
            key={column.key}
            title={column.title}
            tasks={getTasksByStatus(column.key)}
          />
        ))}
      </Row>
    </div>
  );
};

export default ColumnBoard;