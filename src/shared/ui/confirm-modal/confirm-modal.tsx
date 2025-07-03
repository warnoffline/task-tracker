import React from "react";
import { Modal } from "antd";
import s from "./confirm-modal.module.scss";
import { CustomButton } from "../button";

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
      title={<p className={s.modal__title}>{title}</p>}
      centered
    >
      <div className={s.modal}>
        <p className={s.modal__text}>{content}</p>
        <div className={s.modal__btns}>
          <CustomButton onClick={onConfirm} variantBtn="delete">
            Удалить
          </CustomButton>
          <CustomButton onClick={onCancel} variantBtn="cancel">
            Отмена
          </CustomButton>
        </div>
      </div>
    </Modal>
  );
};

export { ConfirmModal };
