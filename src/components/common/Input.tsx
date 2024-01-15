import { InputProps } from "../../interfaces/Input.interface";

const Input: React.FC<InputProps> = ({
  name,
  onChange,
  onClick,
  onKeyDown,
  value,
  type = "text",
  placeholder,
  inputClassName,
}) => {
  return (
    <input
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      onClick={onClick}
      onKeyDown={onKeyDown}
      className={inputClassName}
      placeholder={placeholder}
    />
  );
};

export default Input;
