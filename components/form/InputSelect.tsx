"use client";

import { classJoin, getErrorValue } from "@/lib/utils";
import { OtherInputProps } from "@/models/components/other-input-props";
import { InputHTMLAttributes } from "react";
import FormErrorMessage from "./FormErrorMessage";

type GeneralData = {
  id: string;
  name: string;
};

type InputSelectProps = InputHTMLAttributes<HTMLSelectElement> &
  OtherInputProps & {
    model: GeneralData[],
  };

export default function InputSelect(props: InputSelectProps){
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
    model,
    ...rest
  } = props;

  return (
    <>
      {label && (
        <label
          htmlFor={id}
          className={classJoin(
            "block text-sm font-medium text-gray-700",
            labelClassName ?? ""
          )}
        >
          {label}
        </label>
      )}
      <div
        className={classJoin(
          `mt-1`,
          inputContainerClassName ?? "",
          label ? "col-span-3" : "col-span-4"
        ).trim()}
      >
        <select
          name={name}
          {...register}
          {...(id && { id: id })}
          {...rest}
          onChange={(e) => {
            if (!setValue) return;
            setValue(name!, e.target.value);
          }}
          autoComplete={name}
          className={classJoin(
            "block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm",
            inputClassName ?? ""
          )}
        >
          {model.map((m: GeneralData, index: number) => (
            <option key={index} value={m.id}>
              {m.name}
            </option>
          ))}
        </select>
        {description && (
          <p
            className={classJoin(
              "mt-2 text-xs sm:text-sm text-gray-500",
              descriptionClassName ?? ""
            )}
            id={id + "-description"}
          >
            {description}
          </p>
        )}
        {getErrorValue(name ?? "", errors) && (
          <FormErrorMessage name={name ?? ""} errors={errors as any} />
        )}
      </div>
    </>
  );
};