import { CustomInputProps1 } from "../../interfaces";

export const CInput1: React.FC<CustomInputProps1> = ({
  className,
  type,
  name,
  placeholder,
  value,
  onChange,
  maxLength
}) => {
  return (
    <input
      className={className}
      type={type}
      name={name}
      placeholder={placeholder}
      value={value || ""}
      onChange={(e) => onChange(e)}
      maxLength={maxLength}
    />
  );
};
