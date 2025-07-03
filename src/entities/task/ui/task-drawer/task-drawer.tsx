import React, { useState } from "react";
import { Drawer } from "antd";
import { formatDate } from "@/shared/lib";
import { DateIcon, StatusIcon } from "@/shared/assets";
import { Controller, useForm } from "react-hook-form";
import {
  CustomTextArea,
  TaskStatusDropdown,
  CustomInput,
  CustomButton,
  ConfirmModal,
} from "@/shared/ui";
import {
  type DBTaskDTO,
  useDeleteTask,
  type TaskDTO,
  useUpdateTask,
} from "@/entities/task";
import s from "./task-drawer.module.scss";

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

  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const showDeleteModal = () => setIsModalOpen(true);
  const handleConfirmDelete = () => {
    deleteTask(task.id);
    setIsModalOpen(false);
    onClose();
  };
  const handleCancelDelete = () => setIsModalOpen(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TaskDTO>();

  const onSubmit = (data: TaskDTO) => {
    const dto = {
      ...data,
      status: task.status,
    };

    updateTask({
      id: task.id,
      dto,
    });

    setIsEditing(false);
  };

  const handleCancel = () => {
    reset();
    setIsEditing(false);
  };

  return (
    <Drawer
      className={s.drawer}
      width={"30%"}
      open={open}
      onClose={() => {
        onClose();
        handleCancel();
      }}
      closable={false}
    >
      <div className={s.drawer__body}>
        {!isEditing ? (
          <h1>{task.name}</h1>
        ) : (
          <div className={s.drawer__title}>
            <p>Название</p>
            <Controller
              name="name"
              control={control}
              rules={{ required: "Введите название" }}
              defaultValue={task.name}
              render={({ field }) => (
                <CustomInput
                  {...field}
                  placeholder="Название задачи"
                  status={errors.name ? "error" : ""}
                />
              )}
            />
            {errors.name && <p className="error">{errors.name.message}</p>}
          </div>
        )}
        <div className={s.drawer__sections}>
          <div className={s.drawer__section}>
            <div className={s["drawer__section-title"]}>
              <DateIcon width={"24px"} />
              <p>Дата создания</p>
            </div>
            <p className={s["drawer__section-value"]}>
              {formatDate(task.changedAt)}
            </p>
          </div>
          <div className={s.drawer__section}>
            <div className={s["drawer__section-title"]}>
              <StatusIcon width={"24px"} />
              <p>Статус</p>
            </div>
            <div className={s["drawer__section-value"]}>
              <TaskStatusDropdown
                value={status}
                onChange={handleStatusChange}
              />
            </div>
          </div>
        </div>

        <div className={s.drawer__description}>
          <p className={s["drawer__description-title"]}>Описание</p>
          {!isEditing ? (
            <div className={s["drawer__description-text"]}>
              {task.description}
            </div>
          ) : (
            <div>
              <Controller
                name="description"
                control={control}
                rules={{ required: "Введите описание" }}
                defaultValue={task.description}
                render={({ field }) => (
                  <CustomTextArea
                    {...field}
                    rows={4}
                    placeholder="Описание задачи"
                    status={errors.description ? "error" : ""}
                  />
                )}
              />
              {errors.description && (
                <p className="error">{errors.description.message}</p>
              )}
            </div>
          )}
        </div>
        <div className={s.drawer__actionSlot}>
          {!isEditing && (
            <>
              <CustomButton
                variantBtn="edit"
                onClick={() => setIsEditing(true)}
              >
                Редактировать
              </CustomButton>
              <CustomButton
                variantBtn="delete"
                className={s["drawer__actionSlot-delete"]}
                onClick={showDeleteModal}
              >
                Удалить
              </CustomButton>
            </>
          )}
          {isEditing && (
            <>
              <CustomButton variantBtn="save" onClick={handleSubmit(onSubmit)}>
                Сохранить
              </CustomButton>
              <CustomButton variantBtn="cancel" onClick={handleCancel}>
                Отмена
              </CustomButton>
            </>
          )}
        </div>
      </div>
      <ConfirmModal
        open={isModalOpen}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </Drawer>
  );
};

export default TaskDrawer;
