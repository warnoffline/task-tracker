import { Button, Modal } from "antd";
import { FormProvider, useForm } from "react-hook-form";
import { useCreateTask } from "@/entities/task/api";
import { type TaskDTO } from "@/entities/task/types";
import { InputControl, TextAreaControl } from "@/shared/ui";
import type React from "react";
import styles from "./create-task.module.scss";

type CreateTaskProps = {
  open: boolean;
  closeModal: () => void;
};

const CreateTask: React.FC<CreateTaskProps> = ({ open, closeModal }) => {
  const methods = useForm<TaskDTO>({
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const createTask = useCreateTask();

  const onSubmit = (data: TaskDTO) => {
    createTask.mutate(data);
    methods.reset();
    closeModal();
  };

  return (
    <Modal
      className={styles.modal}
      open={open}
      onCancel={closeModal}
      footer={() => <></>}
      title={<p className={styles.modal__title}>Создание новой задачи</p>}
    >
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div className={styles.modal__body}>
            <InputControl
              name="name"
              label="Название"
              placeholder="Введите название"
            />
            <TextAreaControl
              name="description"
              label="Описание"
              placeholder="Введите описание"
            />
          </div>
          <div className={styles.modal__footer}>
            <Button htmlType="submit">Сохранить</Button>
          </div>
        </form>
      </FormProvider>
    </Modal>
  );
};

export default CreateTask;
