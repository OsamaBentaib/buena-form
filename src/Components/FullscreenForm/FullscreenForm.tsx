import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import FormInput from "../FormInput/FormInput";
import FormRadioGroup from "../FormRadioGroup/FormRadioGroup";
import FormNavigation from "../FormNavigation/FormNavigation";
import "./../../styles/FullscreenForm.scss";
import FormTitle from "../FormTitle/FormTitle";
import NumberIndicator from "../NumberIndicator/NumberIndicator";
import ProgressBar from "../Progressbar/Progressbar";
import NavDots from "../NavDots/NavDots";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { formatPhoneNumber } from "../../utils/utils";
import { useFormStore } from "../../store/formStore";
import { validationSchemas } from "../../utils/validationSchemas";

const FullscreenForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const { formData, setFormData } = useFormStore();
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [currentStep]);

  const totalSteps = 4;

  const handleNext = async () => {
    const isValid = await validateCurrentStep();
    if (isValid) {
      setError("");
      if (currentStep < totalSteps - 1) {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setError("");
      setCurrentStep(currentStep - 1);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;

    if (e.target.name === "phoneNumber") {
      value = formatPhoneNumber(value);
    }

    setFormData({
      ...formData,
      [e.target.name]: value,
    });
  };

  const handleSubmit = async () => {
    const isValid = await validateCurrentStep();
    if (!isValid) return;
    navigate("/submitted");
  };

  const validateCurrentStep = async () => {
    try {
      await validationSchemas[currentStep].validate(formData, {
        abortEarly: false,
      });
      return true;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.errors[0]);
      return false;
    }
  };

  const steps = [
    <FormInput
      label="What's your name?"
      name="fullName"
      placeholder="Luna Lovegood"
      type="text"
      value={formData.fullName}
      onChange={handleChange}
      ref={inputRef}
    />,
    <FormInput
      label="What's your email address?"
      name="email"
      placeholder="luna.lovegood@owlpost.com"
      type="email"
      value={formData.email}
      onChange={handleChange}
      ref={inputRef}
    />,
    <FormInput
      label="What's your phone number?"
      name="phoneNumber"
      placeholder="+49 171 9876543"
      type="tel"
      value={formData.phoneNumber}
      onChange={handleChange}
      ref={inputRef}
    />,
    <FormRadioGroup
      label="What's your salary indication?"
      name="salary"
      options={[
        "0 - 1.000",
        "1.000 - 2.000",
        "2.000 - 3.000",
        "3.000 - 4.000",
        "Mehr als 4.000",
      ]}
      selectedValue={formData.salary}
      onChange={handleChange}
    />,
  ];

  const progressPercentage = ((currentStep + 1) / totalSteps) * 100;

  return (
    <div className="container">
      <ProgressBar progressPercentage={progressPercentage} />
      <div className="fs-form-wrap">
        <div>
          <FormTitle />
          <NumberIndicator
            currentStep={currentStep + 1}
            totalSteps={totalSteps}
          />
        </div>
        <div className="fs-form fs-form-full">
          {error && <ErrorMessage message={error} />}
          <ol className="fs-fields">{steps[currentStep]}</ol>
        </div>
        <NavDots
          steps={steps.map((_, index) => index)}
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
        />
        <FormNavigation
          currentStep={currentStep}
          totalSteps={totalSteps}
          onNext={currentStep < totalSteps - 1 ? handleNext : handleSubmit}
          onPrev={handlePrev}
        />
      </div>
    </div>
  );
};

export default FullscreenForm;
