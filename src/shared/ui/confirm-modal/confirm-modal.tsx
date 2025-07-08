import React from "react";
import { Modal } from "antd";
import styles from "./confirm-modal.module.scss";
import { Button } from "../button";

type ConfirmModalProps = {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  title?: string;
  content?: string;
};

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  open,
  onConfirm,
  onCancel,
  title = "Удалить задачу?",
  content = "Это действие нельзя отменить",
}) => {
  return (
    <Modal
      open={open}
      footer={""}
      onCancel={onCancel}
      title={<p className={styles.modal__title}>{title}</p>}
      centered
    >
      <div className={styles.modal}>
        <p className={styles.modal__text}>{content}</p>
        <div className={styles.modal__btns}>
          <Button onClick={onConfirm} state="delete">
            Удалить
          </Button>
          <Button onClick={onCancel} state="cancel">
            Отмена
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export { ConfirmModal };
