interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}
const ProgressBar: React.FC<ProgressBarProps> = ({
  currentStep,
  totalSteps,
}) => {
  const progress = (currentStep / totalSteps) * 100;
  return (
    <div className="mt-1">
      <div className="mb-2 flex items-center justify-between">
        <div />
        <span
          className="rounded-full px-3 py-1 text-xs font-semibold text-sky-600"
          style={{ background: "rgba(73, 100, 91, 0.05)" }}
        >
          Step {currentStep} of {totalSteps}
        </span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-slate-200">
        <div
          className="h-full rounded-full bg-primary transition-all"
          style={{
            width: `${progress}%`,
          }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
