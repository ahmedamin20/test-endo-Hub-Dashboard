import { cn } from "@/utilities/cn";
import React from "react";
import Select, { ActionMeta } from "react-select";

export default function FormSelect({
  input,
  className,
  menuPlacement,

  ...rest
}: React.HTMLAttributes<HTMLDivElement> & {
  menuPlacement?: any,
  input: React.HTMLAttributes<HTMLInputElement> & {
    name: string;
    value: any;
    setValue: React.Dispatch<React.SetStateAction<any>>;
    required?: boolean;
    options: number[];
    isLoading?: boolean;
    idKey?: string;
    contentKey?: string;
    onScroll?: () => void;
  };
}) {
  const onInputChange = (newValue: any, actionMeta: ActionMeta<any>) => {
    if (input.idKey && input.contentKey) input.setValue(newValue);
    else input.setValue(newValue.value);
  };
  const handleMenuScroll = ({ target }: any) => {
    if (
      target.scrollHeight - target.scrollTop <= target.clientHeight &&
      !input.isLoading &&
      input.onScroll
    ) {
      input.onScroll();
    }
  };
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label
        className="before:content[' '] before:border-2 before:border-secondary-light-1 gap-2 flex flex-row"
        htmlFor={input.name}
      >
        {input.content}
      </label>

      <Select
        className={cn(
          " rounded-md  active:border-secondary-light-1 relative bg-transparent text-black",
          input.className
        )}
        placeholder={input.placeholder}
        value={input.value}
        onChange={onInputChange}
        menuPlacement={menuPlacement ? menuPlacement : 'bottom'}
        required={input.required}
        onMenuScrollToBottom={handleMenuScroll}
        onMenuScrollToTop={handleMenuScroll}
        options={input?.options?.map((option: any) => {
          return {
            label:
              input.contentKey !== undefined
                ? option[input.contentKey]
                : option,
            value: input.idKey !== undefined ? option[input.idKey] : option,
          };
        })}
      />
    </div>
  );
}
