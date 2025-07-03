import { Input } from "antd";
import s from "./input.module.scss";

const CustomInput = ({ ...props }) => {
  return <Input {...props} className={s.input} />;
};

export { CustomInput };
