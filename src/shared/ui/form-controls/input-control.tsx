import { Space } from "antd";
import { Input } from "../input";
import { Controller, useFormContext } from "react-hook-form";

type Props = {
  name: string;
  label?: string;
  placeholder?: string;
};

const InputControl = ({ name, label, placeholder }: Props) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const error = errors[name]?.message as string | undefined;

  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: "Поле не может быть пустым!" }}
      render={({ field }) => (
        <Space direction="vertical">
          {label && (
            <label style={{ fontWeight: "600", fontSize: "18px" }}>
              {label}
            </label>
          )}
          <Input
            {...field}
            placeholder={placeholder}
            status={error ? "error" : ""}
          />
          {error && <p className="error">{error}</p>}
        </Space>
      )}
    />
  );
};

export { InputControl };
