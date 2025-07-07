import { Input as InputAntd, type InputProps } from "antd";
import styles from "./input.module.scss";

const Input = (props: InputProps) => {
  return <InputAntd {...props} className={styles.input} />;
};

export { Input };
