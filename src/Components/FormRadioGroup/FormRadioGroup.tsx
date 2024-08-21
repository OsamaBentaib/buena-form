import React from "react";

interface FormRadioGroupProps {
  label: string;
  name: string;
  options: string[];
  selectedValue: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormRadioGroup: React.FC<FormRadioGroupProps> = ({
  label,
  name,
  options,
  selectedValue,
  onChange,
}) => {
  return (
    <li>
      <fieldset className="fs-fieldset">
        <legend className="fs-field-label">{label}</legend>
        <div className="fs-radio-group">
          {options.map((option, index) => (
            <label key={index} className="fs-radio-custom">
              <input
                type="radio"
                name={name}
                value={option}
                checked={selectedValue === option}
                onChange={onChange}
              />
              <span className="custom-radio"></span>
              {option}
            </label>
          ))}
        </div>
      </fieldset>
    </li>
  );
};

export default FormRadioGroup;
