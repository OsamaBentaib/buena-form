import React from 'react';

interface NavDotsProps {
    steps: number[];
    currentStep: number;
    setCurrentStep: (step: number) => void;
}

const NavDots: React.FC<NavDotsProps> = ({
    steps,
    currentStep,
    setCurrentStep,
}: NavDotsProps) => (
    <nav className="fs-nav-dots">
    {steps.map((_, index) => (
      <button
        key={index}
        className={index === currentStep ? "fs-dot-current" : ""}
        onClick={() => setCurrentStep(index)}
        disabled={index > currentStep}
      />
    ))}
  </nav>
);

export default NavDots;
