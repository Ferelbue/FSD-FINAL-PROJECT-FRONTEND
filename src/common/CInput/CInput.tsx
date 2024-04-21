import { CustomInputProps } from "../../interfaces";

export const CInput: React.FC<CustomInputProps> = ({
  type,
  name,
  placeholder,
  value,
  onChange,
}) => {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value || ""}
      onChange={(e) => onChange(e)}
    />
  );
};
