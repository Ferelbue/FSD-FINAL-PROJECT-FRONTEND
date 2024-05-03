import { CustomInputProps4 } from "../../interfaces";

export const CInput3: React.FC<CustomInputProps4> = ({
  className,
  type,
  name,
  placeholder,
  disabled,
  value,
  onChange,
}) => {
  return (
    <input
      className={className}
      type={type}
      name={name}
      placeholder={placeholder}
      disabled={disabled}
      value={value || ""}
      onChange={(e) => onChange(e)}
    />
  );
};
