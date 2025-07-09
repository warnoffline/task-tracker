import React from 'react';
import { Card } from 'antd';
import CardColumn from '@/entities/task/ui/card-column/card-column';
import {type DBTaskDTO } from '@/entities/task/types'


interface TasksColumnProps {
  title: string;
  tasks: DBTaskDTO[];
}

const TasksColumn: React.FC<TasksColumnProps> = ({ title, tasks }) => {
  // Стили для заголовка колонки
  const getColumnStyle = () => {
    switch (title) {
      case 'Открыто':
        return {
          width: 368,
          height: 53,
          border: '2px solid #FFAF7D',
          background: '#FFFFFF',
          borderRadius: 16,
        };
      case 'В процессе':
        return {
          width: 368,
          height: 53,
          border: '2px solid #7D97FF',
          background: '#FFFFFF',
          borderRadius: 16,
        };
      case 'Завершено':
        return {
          width: 368,
          height: 53,
          border: '2px solid #00BD7B',
          background: '#FFFFFF',
          borderRadius: 16,
        };
      default:
        return {};
    }
  };

  // Стили для контейнера задач
  const getTasksContainerStyle = () => {
    switch (title) {
      case 'Открыто':
        return {
          marginTop: 13,
          background: 'linear-gradient(to bottom, #FFAF7D 0%, #FFAF7D 50%, rgba(255, 175, 125, 0.25) 100%)',
          borderRadius: 16,
          padding: '12px 0',
        };
      case 'В процессе':
        return {
          marginTop: 13,
          background: 'linear-gradient(to bottom, #7D97FF 0%, #7D97FF 50%, rgba(24, 144, 255, 0.25) 100%)',
          borderRadius: 16,
          padding: '12px 0',
        };
      case 'Завершено':
        return {
          marginTop: 13,
          background: 'linear-gradient(to bottom, #00BD7B 0%, #00BD7B 50%, rgba(82, 196, 26, 0.25) 100%)',
          borderRadius: 16,
          padding: '12px 0',
        };
      default:
        return {};
    }
  };

  // Цвет текста заголовка
  const getTitleColor = () => {
    switch (title) {
      case 'Открыто':
        return '#FFAF7D';
      case 'В процессе':
        return '#7D97FF';
      case 'Завершено':
        return '#00BD7B';
      default:
        return '#000000';
    }
  };

  return (
    <div style={{ marginRight: 8, display: 'inline-block', verticalAlign: 'top' }}>
      <Card
        title={<span style={{ color: getTitleColor(), fontSize: 18, fontWeight: 600 }}>{title}</span>}
        style={getColumnStyle()}
        headStyle={{ borderBottom: 'none', padding: '8px 16px' }}
        bodyStyle={{ display: 'none' }} // Скрываем тело Card, чтобы использовать свой контейнер
      />
      <div style={getTasksContainerStyle()}>
        {tasks.map((task) => (
          <CardColumn key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default TasksColumn;