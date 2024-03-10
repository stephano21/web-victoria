import React, { useState, useEffect, ChangeEvent } from "react";
import Select from 'react-select'
import makeAnimated from 'react-select/animated';
const animatedComponents = makeAnimated();
interface Option {
  value: string;
  label: string;

}

interface SelectSearchProps<T> {
  value?: string;
  label?: string;
  placeholder?: string;
  bclass?: string;
  options: Option[];
  multiOptions?: boolean;
  onChange?: (selectedOption: any) => void;
}
export const SelectSearch = ({
  options,
  value,
  label,
  placeholder,
  bclass,
  multiOptions = false,
  onChange,

}: SelectSearchProps<any>) => {
  const handleChange = (selectedOption: any) => {
    // Llama a la función de devolución de llamada si está presente
    if (onChange) {
      onChange(selectedOption);
    }
  };

  return (
    <>
      {label && <label className="form-label">{label}</label>}
      <Select
        closeMenuOnSelect={!multiOptions}
        components={animatedComponents}
        isMulti={multiOptions}
        options={options}
        onChange={handleChange}
        defaultValue={options.find(x => x.value === value)}
      />
    </>

  );
};
