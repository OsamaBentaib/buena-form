import React from "react";

interface ProgressBarProps {
  progressPercentage: number;
}
const ProgressBar: React.FC<ProgressBarProps> = ({
  progressPercentage,
}: ProgressBarProps) => (
  <div
    className="fs-progress"
    data-testid="progress-bar"
    style={{ width: `${progressPercentage}%` }}
  ></div>
);

export default ProgressBar;
