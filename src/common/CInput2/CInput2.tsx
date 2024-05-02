import { CustomInputProps2 } from "../../interfaces";
import "./CInput2.css";

export const CInput2: React.FC<CustomInputProps2> = ({
    className,
    placeholder, 
    name, 
    disabled, 
    value, 
    onChange
}) => {

    return (
        <textarea
            className={className}
            placeholder={placeholder}
            name={name}
            disabled={disabled}
            value={value}
            onChange={(e) => onChange(e)}
        />
    )
}