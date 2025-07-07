import React, { useState } from "react";
import { Drawer } from "antd";
import { formatDate } from "@/shared/lib";
import { DateIcon, StatusIcon } from "@/shared/assets";
import { FormProvider, useForm } from "react-hook-form";
import {
  TaskStatusDropdown,
  Button,
  ConfirmModal,
  InputControl,
  TextAreaControl,
} from "@/shared/ui";
import { type DBTaskDTO, type TaskDTO } from "../../types";
import { useDeleteTask, useUpdateTask } from "../../api";
import styles from "./task-drawer.module.scss";

type TaskDrawerProps = {
  task: DBTaskDTO;
  open: boolean;
  status: DBTaskDTO["status"];
  onClose: () => void;
  handleStatusChange: (newStatus: DBTaskDTO["status"]) => void;
};

const TaskDrawer: React.FC<TaskDrawerProps> = ({
  task,
  open,
  status,
  onClose,
  handleStatusChange,
}) => {
  const { mutate: deleteTask } = useDeleteTask();
  const { mutate: updateTask } = useUpdateTask();

  const [isEditing, setIsEditing] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const methods = useForm<TaskDTO>({
    defaultValues: {
      name: task.name,
      description: task.description,
    },
  });

  const onSubmit = (data: TaskDTO) => {
    updateTask({ id: task.id, dto: { ...data, status: task.status } });
    setIsEditing(false);
  };

  const handleCancel = () => {
    methods.reset({
      name: task.name,
      description: task.description,
    });
    setIsEditing(false);
  };

  return (
    <Drawer
      className={styles.drawer}
      width={"30%"}
      open={open}
      onClose={() => {
        onClose();
        handleCancel();
      }}
      closable={false}
    >
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div className={styles.drawer__body}>
            {!isEditing ? (
              <h1>{task.name}</h1>
            ) : (
              <InputControl
                name="name"
                label="Название"
                placeholder="Введите название"
              />
            )}
            <div className={styles.drawer__sections}>
              <div className={styles.drawer__section}>
                <div className={styles["drawer__section-title"]}>
                  <DateIcon width={"24px"} />
                  <p>Дата создания</p>
                </div>
                <p className={styles["drawer__section-value"]}>
                  {formatDate(task.changedAt)}
                </p>
              </div>
              <div className={styles.drawer__section}>
                <div className={styles["drawer__section-title"]}>
                  <StatusIcon width={"24px"} />
                  <p>Статус</p>
                </div>
                <div className={styles["drawer__section-value"]}>
                  <TaskStatusDropdown
                    value={status}
                    onChange={handleStatusChange}
                  />
                </div>
              </div>
            </div>

            <div className={styles.drawer__description}>
              <p className={styles["drawer__description-title"]}>Описание</p>
              {!isEditing ? (
                <div className={styles["drawer__description-text"]}>
                  {task.description}
                </div>
              ) : (
                <TextAreaControl
                  name="description"
                  placeholder="Введите описание"
                />
              )}
            </div>
            <div className={styles.drawer__actionSlot}>
              {!isEditing && (
                <>
                  <Button state="edit" onClick={() => setIsEditing(true)}>
                    Редактировать
                  </Button>
                  <Button
                    state="delete"
                    className={styles["drawer__actionSlot-delete"]}
                    onClick={() => setIsModalOpen(true)}
                  >
                    Удалить
                  </Button>
                </>
              )}
              {isEditing && (
                <>
                  <Button state="save" htmlType="submit">
                    Сохранить
                  </Button>
                  <Button state="cancel" onClick={handleCancel}>
                    Отмена
                  </Button>
                </>
              )}
            </div>
          </div>
          <ConfirmModal
            open={isModalOpen}
            onConfirm={() => {
              deleteTask(task.id);
              setIsModalOpen(false);
              onClose();
            }}
            onCancel={() => setIsModalOpen(false)}
          />
        </form>
      </FormProvider>
    </Drawer>
  );
};

export default TaskDrawer;
