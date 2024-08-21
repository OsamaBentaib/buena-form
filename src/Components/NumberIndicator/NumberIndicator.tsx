import React from "react";

interface NumbersProps {
  currentStep: number;
  totalSteps: number;
}

const FormTitle: React.FC<NumbersProps> = ({
  currentStep,
  totalSteps,
}: NumbersProps) => (
  <div className="fs-numbers">
    <span className="fs-number-current">{currentStep}</span>
    <span className="fs-number-total">{totalSteps}</span>
  </div>
);

export default FormTitle;
