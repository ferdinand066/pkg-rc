import { OtherInputProps } from "@/models/components/other-input-props";
import { InputHTMLAttributes } from "react";
import FormErrorMessage from "./FormErrorMessage";
import { classJoin, getErrorValue } from "@/lib/utils";

export type InputTextProps = InputHTMLAttributes<HTMLInputElement> &
  OtherInputProps;

export default function InputText(props: InputTextProps) {
  const {
    labelClassName,
    inputContainerClassName,
    inputClassName,
    descriptionClassName,
    id,
    name,
    label,
    description,
    setValue,
    errors,
    register,
    onChange,
    component,
    prefix,
    ...rest
  } = props;

  return (
    <>
      {label && (
        <label
          htmlFor="booked_by"
          className={classJoin(
            "block text-sm font-medium text-gray-700",
            labelClassName ?? ""
          )}
        >
          {label}
        </label>
      )}

      <div className={classJoin("mt-1 flex flex-col", label ? "col-span-3" : "col-span-4")}>
        <input
          name={name}
          {...register}
          {...(id && { id: id })}
          autoComplete={name}
          {...rest}
          className={classJoin(
            "block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm",
            inputClassName ?? ""
          )}
        />
        {errors &&
          (getErrorValue(name ?? "", errors) ||
            (errors as any)[name ?? ""]) && (
            <FormErrorMessage name={name ?? ""} errors={errors as any} />
          )}
      </div>
    </>
  );
}
