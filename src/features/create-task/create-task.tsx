import { Button, Modal } from "antd";
import { Controller, useForm } from "react-hook-form";
import { useCreateTask, type TaskDTO } from "@/entities/task";
import { CustomInput, CustomTextArea } from "@/shared/ui";
import type React from "react";
import s from "./create-task.module.scss";

type CreateTaskProps = {
  open: boolean;
  closeModal: () => void;
};

const CreateTask: React.FC<CreateTaskProps> = ({ open, closeModal }) => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<TaskDTO>({
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const createTask = useCreateTask();

  const onSubmit = (data: TaskDTO) => {
    createTask.mutate(data);
    reset();
    closeModal();
  };

  return (
    <Modal
      className={s["modal"]}
      open={open}
      onCancel={closeModal}
      footer={() => <></>}
      title={<p className={s["modal__title"]}>Создание новой задачи</p>}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={s["modal__body"]}>
          <p>Название</p>
          <Controller
            name="name"
            control={control}
            rules={{ required: "Введите название" }}
            render={({ field }) => (
              <CustomInput
                {...field}
                placeholder="Введите название"
                status={errors.name ? "error" : ""}
              />
            )}
          />
          {errors.name && <p className="error">{errors.name.message}</p>}
          <p>Описание</p>
          <Controller
            name="description"
            control={control}
            rules={{ required: "Введите описание" }}
            render={({ field }) => (
              <CustomTextArea
                {...field}
                placeholder="Введите описание"
                rows={4}
                status={errors.name ? "error" : ""}
              />
            )}
          />
          {errors.description && (
            <p className="error">{errors.description.message}</p>
          )}
        </div>
        <div className={s["modal__footer"]}>
          <Button htmlType="submit">Сохранить</Button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateTask;
