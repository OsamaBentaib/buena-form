import React, { forwardRef } from "react";
import { motion } from "framer-motion";

interface FormInputProps {
  label: string;
  name: string;
  type: string;
  value: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, name, type, value, placeholder, onChange }, ref) => {
    return (
      <motion.li
        key={name}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
      >
        <label className="fs-field-label" htmlFor={name}>
          {label}
        </label>
        <motion.input
          ref={ref}
          key={`${name}-input`}
          id={name}
          name={name}
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          className="fs-anim-lower"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        />
      </motion.li>
    );
  }
);

export default FormInput;
