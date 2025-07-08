import { Input } from "antd";
import { type TextAreaProps } from "antd/es/input";
import styles from "./text-area.module.scss";

const TextArea = (props: TextAreaProps) => {
  return <Input.TextArea {...props} className={styles["text-area"]} />;
};

export { TextArea };
