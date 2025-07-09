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
  /* 
    TODO: 
    1. Такие функции в начале лучше выносить в отдельные файлы, например, в shared/lib/helpers,
    в компоненте это занимает много места и создает шум

    2. Для задания цвета лучше использовать css-переменные,
    посмотри в app/styles/index.scss какие переменные у меня есть

    3. Ты прописываешь одинаковые стили для каждой колонки и меняешь только цвета,
    лучше объединить одинаковую часть и взаимодействовать только с цветом
    
    4. Наш код стайл - стили и компоненты в разных файлах,
    стили лучше вынести в tasks-column.module.scss, и вот эти функции в начале
    лучше тоже на ксс классы перенести

    5. Задать максимальную высоту колонки и сделать возможность скролла

    Лично я бы вынес стили в другой файл, прописал бы классы для колонки, заголовка и т.д.,
    и отдельными css-классами прописал бы цвета и с помощью clsx давал бы дополнительный класс цвета для колонки. 
    Ну впринципе я сейчас так и сделал, можешь на это ориентироваться
  */

  const getColumnStyle = () => {
    switch (title) {
      case "Открыто":
        return {
          width: 368,
          height: 53,
          border: "2px solid #FFAF7D",
          background: "#FFFFFF",
          borderRadius: 16,
        };
      case "В процессе":
        return {
          width: 368,
          height: 53,
          border: "2px solid #7D97FF",
          background: "#FFFFFF",
          borderRadius: 16,
        };
      case "Завершено":
        return {
          width: 368,
          height: 53,
          border: "2px solid #00BD7B",
          background: "#FFFFFF",
          borderRadius: 16,
        };
      default:
        return {};
    }
  };

  const getTitleColor = () => {
    switch (title) {
      case "Открыто":
        return "#FFAF7D";
      case "В процессе":
        return "#7D97FF";
      case "Завершено":
        return "#00BD7B";
      default:
        return "#000000";
    }
  };

  return (
    <div>
      <div style={getColumnStyle()} className={styles.column__title}>
        <div>{taskStatusIcon[status]}</div>
        <p style={{ color: getTitleColor(), fontSize: 20, fontWeight: 400 }}>
          {title}
        </p>
      </div>
      <Droppable droppableId={status}>
        {(provided) => (
          <div
            className={clsx(styles.column, styles[`column-${status}`])}
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
