import React from 'react';
import { useFormStore } from '../../store/formStore';

const SubmittedData: React.FC = () => {
  const { formData } = useFormStore();

  return (
    <div className="submitted-data">
      <h2>Thank You for Your Submission!</h2>
      <div className="submitted-data-item">
        <p><strong>Full Name:</strong></p>
        <p>{formData.fullName}</p>
      </div>
      <div className="submitted-data-item">
        <p><strong>Email:</strong></p>
        <p>{formData.email}</p>
      </div>
      <div className="submitted-data-item">
        <p><strong>Phone Number:</strong></p>
        <p>{formData.phoneNumber}</p>
      </div>
      <div className="submitted-data-item">
        <p><strong>Salary Indication:</strong></p>
        <p>{formData.salary}</p>
      </div>
    </div>
  );
};

export default SubmittedData;
