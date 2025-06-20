import React, { Fragment, useEffect, useState } from "react";
import Select from "react-select";
import "./rds-select-list.css";

export interface RdsSelectProps {
  label?: string;
  isBold?: boolean;
  isMultiple?: boolean;
  selectItems: {
    option: any;
    value: any;
  }[];
  selectedValue?: string;
  id: string;
  required?: boolean;
  classes?: string;
  onChange?: any;
  placeholder?: string;
  dataTestId?: string;
  isSearchable?: boolean;
  isDisabled?: boolean;
  reset?: boolean;
}

const RdsSelectList = (props: RdsSelectProps) => {
  const [selectedValue, setselectedValue] = useState<any | null>(
    props.selectedValue || null
  );
  const [options, setOptions] = useState<any>([]);

  useEffect(() => {
    setselectedValue(props.selectedValue);
  }, [props.selectedValue]);

  useEffect(() => {
    if (props.selectItems) {
      const tempOptions = props.selectItems.map((item) => ({
        value: item.value,
        label: item.option,
        className: "rds-select-list-items",
      }));
      // Check if tempOptions is different from the current options
      if (!areArraysEqual(tempOptions, options)) {
        setOptions(tempOptions);
      }
    }
  }, [props.selectItems, options]);
  useEffect(() => {
    if (props.reset) {
      setselectedValue(null); 
    }
  }, [props.reset]);
  // Function to compare arrays
  function areArraysEqual(arr1: { value: any; label: any; className: string; }[], arr2: { value: any; label: any; className: string; }[]) {
    return JSON.stringify(arr1) === JSON.stringify(arr2);
  }

  const handleSelectChange = (items: any) => {
    if (!props.isMultiple) {
      props.onChange(items);
      setselectedValue(items.value);
    } else {
      const multiSelectValue = items.map((item: any) => {
        return { option: item.label, value: item.value };
      });
      props.onChange(multiSelectValue);
      setselectedValue(items);
    }
  };

  const selectedItem = props.isMultiple
    ? options.filter((item: any) => selectedValue?.includes(item.value))
    : options.find((item: any) => item.value === selectedValue);

  const placeholder =
    selectedValue === null || selectedValue === undefined
      ? props.placeholder
      : selectedItem?.label;

  return (
    <Fragment>
      <div>
        {props.label && (
          <label
            htmlFor={props.id}
            className={`form-label ${props?.isBold ? "fw-bold" : ""}`}
          >
            {props.label}
          </label>
        )}
        {props.required && <span className="text-danger ms-1">*</span>}
        <Select
          id={props.id}
          value={selectedItem || null}
          placeholder={props.placeholder}
          isMulti={props.isMultiple}
          options={options}
          aria-label="select example"
          data-testid={props.dataTestId}
          onChange={handleSelectChange}
          isSearchable={props.isSearchable ?? false}
          required={props.required}
          isDisabled={props.isDisabled}
          className={props.classes}
          classNamePrefix={
            !selectedValue ? "raaghu-not-select" : "raaghu-select"
          }
          classNames={{
            control: (state) =>
              state.isFocused ? "border-red-600 mt-1" : "border-grey-300 mt-1",
          }}
        />
      </div>
    </Fragment>
  );
};

export default RdsSelectList;