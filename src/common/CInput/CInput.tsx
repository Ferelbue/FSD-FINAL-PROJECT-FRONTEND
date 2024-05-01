import { CustomInputProps } from "../../interfaces";

export const CInput: React.FC<CustomInputProps> = ({
  className,
  type,
  name,
  placeholder,
  value,
  onChange,
}) => {
  return (
    <input
      className={className}
      type={type}
      name={name}
      placeholder={placeholder}
      value={value || ""}
      onChange={(e) => onChange(e)}
    />
  );
};
