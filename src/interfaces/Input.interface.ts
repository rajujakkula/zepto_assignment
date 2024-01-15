import { ChangeEvent, MouseEvent, KeyboardEvent } from "react";

export interface InputProps {
  name?: string;
  type?: string;
  ref?: React.RefObject<HTMLInputElement>;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onClick: (e: MouseEvent<HTMLInputElement>) => void;
  onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
  placeholder?: string;
  inputClassName?: string;
}
