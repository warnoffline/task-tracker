import clsx from "clsx";
import { Button } from "antd";
import s from "./button.module.scss";

type CustomButtonProps = {
  variantBtn?: "delete" | "save" | "cancel" | "edit";
} & React.ComponentProps<typeof Button>;

const CustomButton: React.FC<CustomButtonProps> = ({
  variantBtn,
  className,
  ...props
}) => {
  return (
    <Button
      {...props}
      className={clsx(
        s.button,
        variantBtn && s[`button-${variantBtn}`],
        className
      )}
    />
  );
};

export { CustomButton };
