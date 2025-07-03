import { Input } from "antd";
import s from "./text-area.module.scss";

const CustomTextArea = ({ ...props }) => {
  return <Input.TextArea {...props} className={s["text-area"]} />;
};

export { CustomTextArea };
