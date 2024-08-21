import React, { useEffect } from "react";

interface FormNavigationProps {
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onPrev: () => void;
}

const FormNavigation: React.FC<FormNavigationProps> = ({
  currentStep,
  totalSteps,
  onNext,
  onPrev,
}) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        event.preventDefault();
        onNext();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentStep, onNext]);

  return (
    <div className="fs-nav-buttons">
      <div>
        {currentStep > 0 && (
          <button type="button" className="fs-previous" onClick={onPrev}>
            Previous
          </button>
        )}
      </div>
      <div className="fs-continue-w-text">
        {currentStep < totalSteps - 1 ? (
            <button type="button" className="fs-submit" onClick={onNext}>
              Continue
            </button>
            
        ) : (
          <button type="submit" className="fs-submit">
            Submit
          </button>
        )}
        <div className="press-enter">
              <p>or press ENTER</p>
            </div>
      </div>
    </div>
  );
};

export default FormNavigation;
