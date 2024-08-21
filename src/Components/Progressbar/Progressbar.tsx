import React from "react";

interface ProgressBarProps {
  progressPercentage: number;
}
const ProgressBar: React.FC<ProgressBarProps> = ({
  progressPercentage,
}: ProgressBarProps) => (
  <div
    className="fs-progress"
    style={{ width: `${progressPercentage}%` }}
  ></div>
);

export default ProgressBar;
