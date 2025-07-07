import clsx from "clsx";
import {
  Button as ButtonAntd,
  type ButtonProps as ButtonPropsAntd,
} from "antd";
import styles from "./button.module.scss";

type ButtonProps = {
  state?: "delete" | "save" | "cancel" | "edit";
} & ButtonPropsAntd;

const Button: React.FC<ButtonProps> = ({ state, className, ...props }) => {
  return (
    <ButtonAntd
      {...props}
      className={clsx(
        styles.button,
        state && styles[`button-${state}`],
        className
      )}
    />
  );
};

export { Button };
