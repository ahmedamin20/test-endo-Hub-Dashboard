import { cn } from "@/utilities/cn";
import React from "react";
type Type =
  | "text"
  | "email"
  | "phone"
  | "longText"
  | "date"
  | "datetime-local"
  | "password";

export default function FormInput({
  input,
  className,
  ...rest
}: React.HTMLAttributes<HTMLDivElement> & {
  input: React.HTMLAttributes<HTMLInputElement> & {
    name: string;
    type: Type;
    value?: string;
    setValue: React.Dispatch<React.SetStateAction<any>>;
    required?: boolean;
    pattern?: string;
  };
}) {
  const onInputChange = (
    e: React.FormEvent<HTMLInputElement> | React.FormEvent<HTMLTextAreaElement>
  ) => {
    const data = e.currentTarget.value;
    if (input.type === "datetime-local") {
      input.setValue((prev: any) => ({
        ...prev,
        [input.name]: data.replace("T", " "),
      }));
      return;
    }
    if (input.type == "phone") {
      if (data == "") {
        input.setValue((prev: any) => ({ ...prev, [input.name]: data }));
        return;
      }
      const pattern = new RegExp(
        /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/i
      );
      if (pattern.test(data)) {
        input.setValue((prev: any) => ({ ...prev, [input.name]: data }));
      }
      return;
    }
    input.setValue((prev: any) => ({ ...prev, [input.name]: data }));
  };

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label
        className="before:content[' '] before:border-2 before:border-secondary-light-1 gap-2 flex flex-row font-bold"
        htmlFor={input.name}
      >
        {input.content}
      </label>
      {input.type == "longText" ? (
        <textarea
          className={cn("form-control", input.className)}
          placeholder={input.placeholder}
          value={input.value}
          onChange={onInputChange}
          required={input.required}
        />
      ) : (
        <input
          className={cn("form-control", input.className)}
          type={input.type}
          placeholder={input.placeholder}
          value={input.value}
          onChange={onInputChange}
          required={input.required}
          pattern={input.pattern}
        />
      )}
    </div>
  );
}
