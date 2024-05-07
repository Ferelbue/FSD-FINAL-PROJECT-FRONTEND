import { CustomInputProps5 } from "../../interfaces";

export const CInput4: React.FC<CustomInputProps5> = ({
  className,
  type,
  name,
  placeholder,
  value,
  onChange,
  onBlur
}) => {
  return (
    <input
      className={className}
      type={type}
      name={name}
      placeholder={placeholder}
      value={value || ""}
      onChange={(e) => onChange(e)}
      onBlur={(e) => onBlur(e)}
    />
  );
};
