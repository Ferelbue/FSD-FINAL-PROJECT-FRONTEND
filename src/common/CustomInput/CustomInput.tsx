import { CustomInputProps3 } from "../../interfaces";
import "./CustomInput.css";

export const CustomInput:React.FC<CustomInputProps3>  = ({ 
    className, 
    type, 
    placeholder, 
    name, 
    disabled, 
    value, 
    onChange

}) => {

    return (
        <input
            className={className}
            type={type}
            placeholder={placeholder}
            name={name}
            disabled={disabled}
            value={value}
            onChange={onChange}
        />
    )
}